from pydantic import BaseModel

class ReportSchema(BaseModel):
    company_id: str
    year: str
    key: str