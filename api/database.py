from contextlib import contextmanager
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()
DATABASE_URI = os.environ.get('DATABASE_URI')

engine = create_engine(DATABASE_URI)
Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@contextmanager
def transactional_session():
    session = Session()
    try:
        yield session
        session.commit()
    except Exception as e:
        session.rollback()
        raise
    finally:
        session.close()

@contextmanager
def read_only_session():
    session = Session()
    try:
        yield session
        session.rollback()
    finally:
        session.close()