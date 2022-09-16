from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from config import postgres_db_creds

username = postgres_db_creds["username"]
password = postgres_db_creds["password"]
endpoint = postgres_db_creds["endpoint"]

SQLALCHEMY_DATABASE_URL = f"postgresql://{username}:{password}@{endpoint}/postgres"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
