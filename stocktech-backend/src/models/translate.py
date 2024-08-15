from pydantic import BaseModel

class TranslateSchema(BaseModel):
    target_language : str
    message : str