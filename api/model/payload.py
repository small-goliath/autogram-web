from typing import Optional
from pydantic.main import BaseModel

class ProducerCreate(BaseModel):
    username: str
    password: str
    verification_code: str
    group_id: int

class AdminCommon(BaseModel):
    type: Optional[str]
    created_consumer: Optional[str]
    removed_consumer: Optional[str]