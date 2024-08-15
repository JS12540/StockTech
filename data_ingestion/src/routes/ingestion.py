from fastapi import HTTPException, APIRouter, Form, File
from src import database
import pandas as pd
import json
from fastapi import UploadFile
from typing import Dict
from src.utility.utils import to_camel_case

router = APIRouter(prefix='/report', tags=['report'])
collection = database.Reports

@router.post("/data_ingest")
async def data_ingest(
    isin_number: str = Form(...),
    year: str = Form(...),
    file: UploadFile = File(...)
) -> Dict[str, str]:
    """
    A function that handles the data ingest endpoint.
    
    Parameters:
        isin_number (str): The ISIN number for the data.
        year (str): The year for the data.
        file (UploadFile): The uploaded file containing the data.
        
    Returns:
        Dict[str, str]: A dictionary containing a message indicating the success of the data processing and addition to MongoDB.
    """
    try:
        csv_data = pd.read_csv(file.file)
        print(f"CSV Data: {csv_data}")
        print(f"Loaded CSV data for ISIN: {isin_number} Year: {year}")

        existing_data = await collection.find_one(
            {"isin_number": isin_number, "year": year}
        )

        print(f"Existed data: {list(existing_data.keys())}")

        if existing_data is None:
            # If data does not exist, insert new data
            data_to_insert = {
                "isin_number": isin_number,
                "year": year,
            }
            collection.insert_one(data_to_insert)
            print(f"Inserted new data for ISIN: {isin_number} Year: {year}")

            for _, row in csv_data.iterrows():
                header = to_camel_case(row["Header"].lower().replace(" ", "_"))
                json_data_str = row["json"]

                try:
                    json_data = json.loads(json_data_str)
                except json.JSONDecodeError as e:
                    print(f"Error decoding JSON for header: {header}")
                    print(f"Problematic JSON data: {json_data_str}")
                    print(f"Error details: {e}")
                    if hasattr(e, 'pos') and e.pos is not None:
                        problematic_char = json_data_str[e.pos]
                        print(f"Problematic character: {problematic_char}")
                    continue

                filter_criteria = {
                    "isin_number": isin_number,
                    "year": year
                }
                update_query = {
                    "$set": json_data
                }
                collection.update_one(filter_criteria, update_query, upsert=True)
                print(f"Inserted data for header: {header}")

            print(f"Inserted rows to MongoDB for ISIN: {isin_number} Year: {year}")
        else:
            # If data already exists, check and insert missing headers and associated data
            print(f"Data already exists , adding missing headers.")
            for _, row in csv_data.iterrows():
                header = to_camel_case(row["Header"].lower().replace(" ", "_"))
                json_data_str = row["Json"]

                try:
                    json_data = json.loads(json_data_str)
                except json.JSONDecodeError as e:
                    print(f"Error decoding JSON for header: {header}")
                    print(f"Problematic JSON data: {json_data_str}")
                    print(f"Error details: {e}")
                    if hasattr(e, 'pos') and e.pos is not None:
                        problematic_char = json_data_str[e.pos]
                        print(f"Problematic character: {problematic_char}")
                    continue

                if header not in list(existing_data.keys()):
                    filter_criteria = {
                        "isin_number": isin_number,
                        "year": year
                    }
                    update_query = {
                        "$set": json_data
                    }
                    collection.update_one(filter_criteria, update_query, upsert=True)
                    print(f"Added missing header and data: {header}")

            print(f"Data already exists. Checked and added missing headers.")

        return {"message": f"Data processed and added to MongoDB for ISIN: {isin_number} Year: {year}"}

    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
