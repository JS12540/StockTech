from datetime import datetime

from pydantic import BaseModel, constr, EmailStr


class UserBaseSchema(BaseModel):
    name: str
    email: str
    created_at: datetime = None
    modified_at: datetime = None

    class Config:
        from_attributes = True


class CreateUserSchema(UserBaseSchema):
    password: constr(min_length=8)
    passwordConfirm: str


class LoginUserSchema(BaseModel):
    email: EmailStr
    password: constr(min_length=8)
