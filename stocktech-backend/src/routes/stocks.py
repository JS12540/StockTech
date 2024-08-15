import json

from fastapi import HTTPException, APIRouter, Query

from src.utility.mongodb_utils import get_stocks_data, get_data_for_isin, search_stocks

router = APIRouter(prefix='/stocks', tags=['stock'])


@router.get("/data")
async def get_stocks():
    """
    Retrieves stocks data from the database and returns it as a JSON response.

    :return: A JSON response containing the stocks data.
    :rtype: dict
    :raises HTTPException: If an error occurs while fetching the data.
    """
    try:
        stocks = await get_stocks_data()
        result = []

        for document in stocks:
            # Remove fields you want to skip
            document.pop('_id', None)
            document.pop('modified_at', None)
            document.pop('created_at', None)

            result.append(document)

        stocks_json = json.dumps(result)

        return {"data": stocks_json}
    except Exception as error:
        print(f"Error fetching data: {str(error)}")
        raise HTTPException(status_code=500, detail="An error occurred while fetching data")


@router.get("/{isin_number}/data")
async def get_stock_by_isin(isin_number):
    """
    Retrieves stock data for a given ISIN number.

    Parameters:
        isin_number (str): The ISIN number of the stock.

    Returns:
        dict: A dictionary containing the stock data.

    Raises:
        HTTPException: If the stock is not found or if an error occurs while fetching the data.
    """
    try:
        stock = await get_data_for_isin(isin_number)
        if not stock:
            raise HTTPException(status_code=404, detail="Stock not found")

        # Remove fields you want to skip
        stock.pop('_id', None)
        stock.pop('modified_at', None)
        stock.pop('created_at', None)

        print(f"Stock data retrieved successfully: {stock}")
        return {"data": stock}
    except Exception as error:
        print(f"Error fetching data: {str(error)}")
        raise HTTPException(status_code=500, detail="An error occurred while fetching data")


@router.get("/search")
async def search_stock(
        query: str = Query(..., min_length=3, description="Search query")
):
    """
    Search for stocks by ISIN number, stock name, or stock symbol.
    """
    try:
        results = search_stocks(query)
        if not results:
            raise HTTPException(status_code=404, detail="No matching stocks found.")
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
