from sqlalchemy import Boolean, Column, String, Integer, Text
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
class InstagramGroup(Base):
    __tablename__ = "instagram_group"

    id = Column(Integer, primary_key=True, autoincrement=True)
    type = Column(String(32))

class Producer(Base):
    __tablename__ = "producer"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username = Column(String(32), unique=True, index=True)
    enabled = Column(Boolean, default=False, nullable=False)
    group_id = Column(Integer, index=True)
    session = Column(Text, nullable=False)

class Consumer(Base):
    __tablename__ = "consumer"

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(32))
    group_id = Column(Integer, index=True)

class Payment(Base):
    __tablename__ = "payment"

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(32), index=True)
    count = Column(Integer, default=0)
    year_month = Column(String(10), index=True)

class SNSRaiseUser(Base):
    __tablename__ = "sns_raise_user"

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(32), nullable=True)

class UserActionVerification(Base):
    __tablename__ = "user_action_verification"

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(32), nullable=True)
    link = Column(String(255))