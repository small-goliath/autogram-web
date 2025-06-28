from pydantic.main import BaseModel

class Group(BaseModel):
    id: int
    type: str

class ActionVerification(BaseModel):
    username: str
    link: str