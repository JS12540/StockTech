from src import database
from src.database import stocks_client


def get_management_report(company_id, year):
    """
    Retrieves the management report for a specific company and year.

    Parameters:
        company_id (str): The ID of the company.
        year (int): The year for which the management report is requested.

    Returns:
        dict: The management report for the specified company and year.
    """
    collection = database.Reports
    result = collection.find_one({"isin_number": company_id, "year": year})
    return result


async def get_stocks_data():
    """
    Retrieves stocks data from the database.
    
    :return: A list of documents containing stocks data.
    """
    collection = database.Stocks
    result = []
    async for document in collection.find({}):
        result.append(document)
    return result


def get_data_for_isin(isin_number):
    """
    Retrieves data for a given ISIN number.

    Parameters:
        isin_number (str): The ISIN number of the stock.

    Returns:
        dict: A dictionary containing the data for the stock with the given ISIN number.
    """
    collection = database.Stocks
    result = collection.find_one({"isin_number": isin_number})
    return result


async def get_all_years_from_reports(isin_number):
    """
    Retrieves all the years from the reports in the database associated with the given ISIN number.

    Parameters:
    - isin_number (str): The ISIN number used to filter the reports.

    Returns:
    - list: A list of years extracted from the reports.
      Returns None if no reports are found.

    Raises:
    - None

    Examples:
    - get_all_years_from_reports("US1234567890")
    - get_all_years_from_reports("GB0987654321")
    """
    print("Fetching details from DB")
    collection = database.Reports
    result = collection.find({"isin_number": isin_number})
    result_list = await result.to_list(length=None)
    years = [data['year'] for data in result_list]
    if years:
        return years
    else:
        print("No result found")
        return None


def search_stocks(query: str):
    result = list(stocks_client.find(
        {
            "$or": [
                {"isin_number": {"$regex": f"{query}", "$options": "i"}},
                {"name": {"$regex": f"{query}", "$options": "i"}},
                {"symbol": {"$regex": f"{query}", "$options": "i"}},
            ]
        },
        {
            '_id': 0,
            'isin_number': 1,
            'name': 1,
            'symbol': 1
        }
    ).limit(10))

    print(result)

    return list(result)
