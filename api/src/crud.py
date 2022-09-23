from sqlalchemy.orm import Session
from sqlalchemy import delete

import models
import schemas


def get_todo(db: Session, todo_id: int):
    return db.query(models.Todo).filter(models.Todo.id == todo_id).first()


def get_todos(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Todo).offset(skip).limit(limit).all()


def create_todo(db: Session, todo: schemas.TodoCreate):
    db_todo = models.Todo(text=todo.text, completed=todo.completed)
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo


def update_todo(db: Session, todo_id: int, todo: schemas.TodoBase):
    update_dict = todo.dict(exclude_unset=True)
    db.query(models.Todo).filter(models.Todo.id == todo_id).update(update_dict)
    db.commit()


def delete_todo(db: Session, todo_id: int):
    db.query(models.Todo).filter(models.Todo.id == todo_id).delete()
    db.commit()


def archive_completed(db: Session):
    db.query(models.Todo).where(models.Todo.completed).delete()
    db.commit()
