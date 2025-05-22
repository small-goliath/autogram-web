import json
import locale
from typing import List
from sqlalchemy.orm import Session
from datetime import datetime, timedelta, timezone
from fastapi import HTTPException

from api.database import read_only_session, transactional_session
from api.insta import Insta
from api.model.entity import Consumer, InstagramGroup, Payment, Producer
from api.model.payload import ProducerCreate

def get_account_by_username(username: str):
    with read_only_session() as db:
        return db.query(Producer).filter(Producer.username == username).first()

def get_groups(db: Session) -> List[InstagramGroup]:
    with read_only_session() as db:
        return db.query(InstagramGroup).all()

def create_producer(account: ProducerCreate) -> Producer:
    with transactional_session() as db:
        db_account = get_account_by_username(db, account.username)
        if db_account:
            raise HTTPException(status_code=400, detail="이미 등록되어 있습니다.")
        
        try:
            insta = Insta(account)
            session = insta.login()
        except Exception as e:
            raise HTTPException(status_code=400, detail="로그인할 수 없습니다.")

        new_account = Producer(username=account.username, session=json.dumps(session), group_id=account.group_id)

        db.add(new_account)
        
        return new_account

def create_group(type: str) -> InstagramGroup:
    with transactional_session() as db:
        instagramGroup = InstagramGroup(type=type)
        db.add(instagramGroup)

        return instagramGroup

def create_consumer(username: str) -> Consumer:
    with transactional_session() as db:
        consumer = Consumer(username=username)
        db.add(consumer)

        locale.setlocale(locale.LC_TIME, 'ko_KR.UTF-8')
        KST = timezone(timedelta(hours=9))
        today = datetime.now(KST)
        
        payment = Payment(username=username, year_month=today.strftime("%Y-%m"))
        db.add(payment)

        return consumer

def create_payment(username: str) -> Consumer:
    with transactional_session() as db:
        locale.setlocale(locale.LC_TIME, 'ko_KR.UTF-8')
        KST = timezone(timedelta(hours=9))
        today = datetime.now(KST)
        
        payment = Payment(username=username, year_month=today.strftime("%Y-%m"))
        db.add(payment)

        return payment

def remove_consumer(username: str) -> Consumer:
    with transactional_session() as db:
        consumer = db.query(Consumer).filter(Consumer.username == username).first()
        
        if consumer:
            db.delete(consumer)
            return consumer
        return None