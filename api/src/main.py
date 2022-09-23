from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import SessionLocal, engine
from sqlalchemy.orm import Session
import crud
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


@app.get("/todos", response_model=List[schemas.Todo])
def todos(db: Session = Depends(get_db)):
    return crud.get_todos(db)


@app.post("/create_todo", response_model=schemas.Todo)
def create_todo(todo: schemas.TodoCreate, db: Session = Depends(get_db)):
    """Insert todo into db"""
    return crud.create_todo(db, todo)


@app.put("/update_todo/{todo_id}")
def update_todo(todo_id: int, todo: schemas.TodoBase, db: Session = Depends(get_db)):
    """An example of how to apply partial updates to a model. (Only update based on params that are actually set)"""
    return crud.update_todo(db=db, todo_id=todo_id, todo=todo)


@app.delete("/archive_completed")
def archive_completed(db: Session = Depends(get_db)):
    """Delete completed tasks"""
    return crud.archive_completed(db=db)


@app.delete("/delete_todo/{todo_id}")
def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    """Delete specific task"""
    return crud.delete_todo(db=db, todo_id=todo_id)
