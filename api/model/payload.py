from pydantic.main import BaseModel

class AccountCreate(BaseModel):
    username: str
    password: str
    verification_code: str
    group_id: int