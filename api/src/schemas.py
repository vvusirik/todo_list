from typing import List

import sqlalchemy
import databases
from pydantic import BaseModel

# Contains the attributes that are common to the object creation 
# and the full object that you'd get from the database
class TodoBase(BaseModel):
    text: str
    completed: bool


# This is the type for creating a todo item programatically
class TodoCreate(TodoBase):
    pass


# This is the type with all the attributes from the db
class Todo(TodoBase):
    id: int

    class Config:
        orm_mode = True
