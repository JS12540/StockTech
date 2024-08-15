def send_response(data, message):
    """
    Creates a response object with the given data and message.

    Parameters:
        data (Any): The data to be included in the response.
        message (str): The message to be included in the response.

    Returns:
        dict: A dictionary representing the response object with the following keys:
            - "data" (Any): The data included in the response.
            - "code" (int): The HTTP status code of the response (always 200).
            - "message" (str): The message included in the response.
    """
    return {
        "data": data,
        "code": 200,
        "message": message
    }


def error_response(code, message):
    """
    Generates an error response object.

    Args:
        code (int): The error code.
        message (str): The error message.

    Returns:
        dict: The error response object containing the error code and message.
    """
    return {
        "code": code,
        "message": message
    }
