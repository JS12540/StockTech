from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str):
    """
        Hashes a given password using the pwd_context.

        Args:
            password (str): The password to be hashed.

        Returns:
            str: The hashed password.
    """
    return pwd_context.hash(password)


def verify_password(password: str, hashed_password: str):
    """
    Verify if a given password matches the hashed password.

    Args:
        password (str): The password to be verified.
        hashed_password (str): The hashed password to compare against.

    Returns:
        bool: True if the password matches the hashed password, False otherwise.
    """
    return pwd_context.verify(password, hashed_password)
