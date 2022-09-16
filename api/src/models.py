from typing import List

from database import Base
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String


class Todo(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String)
    completed = Column(Boolean)
