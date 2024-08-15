from datetime import datetime, timedelta

import jwt
from fastapi import APIRouter, Response, status, HTTPException

import src.models.user as user_schema
from constants import TOKEN_EXPIRES_IN_MIN, SECRET_KEY, JWT_ALGORITHM
from src.database import User
from src.utility.manage_password import hash_password, verify_password
from src.utility.request_response import send_response

router = APIRouter(prefix='/users', tags=['User'])


@router.post('/signup', status_code=status.HTTP_201_CREATED)
async def create_user(payload: user_schema.CreateUserSchema, response: Response):
    """
    Create a new user.

    Parameters:
        - payload: An instance of the CreateUserSchema class containing the user's information.
        - response: A Response object to set the JWT token cookie.

    Returns:
        - A dictionary containing the user's name and email if the user is created successfully.

    Raises:
        - HTTPException with status code 409 if the account already exists.
        - HTTPException with status code 400 if the passwords do not match.
        - HTTPException with status code 500 if there is an internal server error.
    """
    try:
        user = await User.find_one({'email': payload.email.lower()})
        if user:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail='Account already exist')

        if payload.password != payload.passwordConfirm:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Passwords do not match')

        payload.password = hash_password(payload.password)
        del payload.passwordConfirm
        payload.email = payload.email.lower()
        payload.created_at = datetime.utcnow()
        payload.modified_at = payload.created_at

        result = await User.insert_one(dict(payload))
        new_user = await User.find_one({'_id': result.inserted_id}, {'name': 1, 'email': 1})

        token_data = {'_id': str(new_user['_id']), 'email': new_user['email'],
                      'exp': datetime.utcnow() + timedelta(minutes=TOKEN_EXPIRES_IN_MIN)}

        access_token = jwt.encode(token_data, SECRET_KEY, JWT_ALGORITHM)

        response.set_cookie('jwt_token', access_token, TOKEN_EXPIRES_IN_MIN * 60,
                            TOKEN_EXPIRES_IN_MIN * 60, '/', None, False, True, 'lax')

        del new_user['_id']

        return send_response(new_user, 'Signup done successfully.')

    except Exception as error:
        print(error)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail='Please try again later.')


@router.post('/signin')
async def login(payload: user_schema.LoginUserSchema, response: Response):
    """
    Endpoint for user login.
    
    Parameters:
        payload (user_schema.LoginUserSchema): The payload containing user login information.
        response (Response): The response object.
        
    Returns:
        dict: A dictionary containing the response message.
        
    Raises:
        HTTPException: If the email or password is incorrect or there is an internal server error.
    """
    try:
        user = await User.find_one({'email': payload.email.lower()})
        if not user:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Incorrect Email or Password.')

        if not verify_password(payload.password, user['password']):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email and Password won't match.")

        token_data = {'_id': str(user['_id']), 'email': user['email'],
                      'exp': datetime.utcnow() + timedelta(minutes=TOKEN_EXPIRES_IN_MIN)}

        access_token = jwt.encode(token_data, SECRET_KEY, JWT_ALGORITHM)

        response.set_cookie('jwt_token', access_token, TOKEN_EXPIRES_IN_MIN * 60,
                            TOKEN_EXPIRES_IN_MIN * 60, '/', None, False, True, 'lax')

        return send_response({}, 'Successfully Signed in.')

    except Exception as error:
        print(error)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail='Please try again later.')
