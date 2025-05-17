from sqlalchemy import Boolean, Column, String, Integer, Text
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class InstagramAccount(Base):
    __tablename__ = "instagram_account"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username = Column(String(32), unique=True, index=True)
    # password = Column(String(32), nullable=False)
    enabled = Column(Boolean, default=False, nullable=False)
    session = Column(Text, nullable=False)