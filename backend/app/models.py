from pydantic import BaseModel

class CreatePersonRequest(BaseModel):
    person_name: str

class TrainPersonRequest(BaseModel):
    person_name: str