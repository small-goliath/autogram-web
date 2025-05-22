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