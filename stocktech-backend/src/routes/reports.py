from fastapi import HTTPException, APIRouter
from src.utility.mongodb_utils import get_management_report, get_all_years_from_reports
from src.models.reports import ReportSchema

router = APIRouter(prefix='/report', tags=['report'])

# Keys to skip
keys_to_skip = ['_id', 'stock_name', 'isin_number', 'year', 'created_at', 'modified_at']
EXCLUDE_HEADERS = ['_id', 'stock_name', 'isin_number', 'year', 'created_at', 'modified_at',"standaloneProfitAndLoss", "standaloneBalanceSheet", "standaloneStatementsOfChangesInEquity", 
                   "standaloneCashFlowStatement", "standaloneFinancialNotes", "managementDiscussionAnalysis", "consolidatedCashFlowStatement", "consolidatedBalanceSheet", "consolidatedProfitAndLoss", 
                   "consolidatedFinancialNotes", "consolidatedStatementsOfChangesInEquity"]

@router.get("/{company_id}/{year}/keys")
async def get_keys(company_id: str, year: str):
    """
    Retrieves the keys for a specific company and year.
    
    Args:
        company_id (str): The ID of the company.
        year (str): The year for which the keys are being retrieved.
    
    Returns:
        dict: A dictionary containing the keys for the specified company and year.
    
    Raises:
        HTTPException: If the keys are not found or if there is an error processing the request.
    """
    try:
        # Print request details
        print(f"Received request to get keys - Company ID: {company_id}, Year: {year}")
        
        # Call get_management_report to retrieve the keys
        result = await get_management_report(company_id, year)
        
        if result:
            # Filter out keys to skip
            filtered_keys = {key: result[key] for key in result.keys() if key not in keys_to_skip}
            
            # Return the filtered keys
            return {"data": list(filtered_keys.keys())}
        else:
            # Return a 404 error if keys are not found
            print("Keys not found")
            raise HTTPException(status_code=404, detail="Data not found")
    except Exception as exc:
        # Handle any exceptions and return a 500 error
        print(f"Error processing keys request: {str(exc)}")
        raise HTTPException(status_code=500, detail=str(exc))
    

@router.post("/get_data")
async def retrieve_data(payload: ReportSchema):
    """
    Retrieves data based on the provided payload.
    
    Parameters:
    - payload: The payload containing the key, company ID, and year.
    
    Returns:
    - A dictionary containing the retrieved data or an error message if the data is not found.
    """
    try:
        # Print the request details
        print(f"Request received for {payload.key} - Company ID: {payload.company_id}, Year: {payload.year}")

        # Call the function to get the management report data
        result = await get_management_report(payload.company_id, payload.year)

        if result:
            key = payload.key
            data_to_send = {}

            if key == "companyOverview":
                keys_present = list(result.keys())
                print(f"Keys Present: {keys_present}")
                for header in keys_present:
                    if header not in EXCLUDE_HEADERS:
                        data_to_send[header] = result[header]
            elif key == "financialNotes":
                data_to_send[key] = result.get("financialNotes", "")
                if "statementOfChangesInEquity" in result:
                    data_to_send["statementOfChangesInEquity"] = result.get("statementsOfChangesInEquity", "")
            else:
                if key in result:
                    data_to_send[key] = result[key]
                else:
                    data_to_send["error"] = "Header not found. Please check"

            print("Sending response for data")
            return {"data": data_to_send}
        else:
            print("Data not found")
            raise HTTPException(status_code=404, detail="Data not found")
    except Exception as e:
        # Print the error message when an exception occurs
        print(f"Error processing data request: {str(e)}")
        raise HTTPException(status_code=500, detail="An error occured. Please try again later.")
    

@router.get("/{isin_number}/all_years")
async def get_all_years(isin_number: str):
    """
    Retrieves all years for a given ISIN number.

    Parameters:
        isin_number (str): The ISIN number to retrieve years for.

    Returns:
        dict: A dictionary containing the retrieved data or an HTTPException if the data is not found or an error occurs.
    """
    try:
        print(f"Request received to get all years - ISIN Number: {isin_number}")
        result = await get_all_years_from_reports(isin_number)
        if result:
            return {"data" : result}
        else:
            print("Data not found")
            raise HTTPException(status_code=500, detail="Data not found")
    except Exception as e:
        print(f"Error processing data request: {str(e)}")
        raise HTTPException(status_code=500, detail="An error occured. Please try again later.")



