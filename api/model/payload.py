from typing import Optional
from pydantic.main import BaseModel

class ProducerCreate(BaseModel):
    username: str
    password: str
    verification_code: str
    group_id: int

class GroupCreate(BaseModel):
    type: str

class ConsumerCreate(BaseModel):
    username: str
    group_id: int

class InstagramAccount(BaseModel):
    username: Optional[str] = None
    password: Optional[str] = None
    verification_code: Optional[str] = None
    group_id: Optional[int] = None
    session: Optional[str] = None