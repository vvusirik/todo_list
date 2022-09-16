from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import SessionLocal, engine
from sqlalchemy.orm import Session
from crud import get_todos
import schemas
from typing import List

app = FastAPI()

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def root(db: Session = Depends(get_db)):
    return {"message": "hey"}


@app.get("/todos", response_model=List[schemas.Todo])
def todos(db: Session = Depends(get_db)):
    return get_todos(db)
