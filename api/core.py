import json
import os
from typing import Any, Dict, List
from datetime import datetime, timedelta, timezone
from fastapi import HTTPException

from api.database import read_only_session, transactional_session
from api.insta import Insta
from api.model.entity import Consumer, InstagramGroup, Payment, Producer
from api.model.payload import ConsumerCreate, ProducerCreate
from dotenv import load_dotenv

load_dotenv()
PRICE_BY_ACTION = int(os.environ.get('PRICE_BY_ACTION'))

def get_groups() -> List[Dict[str, Any]]:
    with read_only_session() as db:
        instagramGroups = db.query(InstagramGroup).all()
        return [{"id": group.id, "type": group.type} for group in instagramGroups]

def create_producer(account: ProducerCreate):
    with transactional_session() as db:
        db_account = db.query(Producer).filter(Producer.username == account.username).first()
        if db_account:
            raise HTTPException(status_code=400, detail="이미 등록되어 있습니다.")
        
        try:
            insta = Insta(account)
            session = insta.login()
        except Exception as e:
            raise HTTPException(status_code=400, detail="로그인할 수 없습니다.")
        new_account = Producer(username=account.username, session=json.dumps(session), group_id=account.group_id)
        db.add(new_account)
        pass

def create_group(type: str):
    with transactional_session() as db:
        instagramGroup = InstagramGroup(type=type)
        db.add(instagramGroup)

        pass

def create_consumer(consumerCreate: ConsumerCreate):
    with transactional_session() as db:
        consumer = Consumer(username=consumerCreate.username, group_id=consumerCreate.group_id)
        db.add(consumer)

        KST = timezone(timedelta(hours=9))
        today = datetime.now(KST)
        
        payment = Payment(username=consumerCreate.username, year_month=today.strftime("%Y-%m"))
        db.add(payment)

        pass

def remove_consumer(username: str):
    with transactional_session() as db:
        consumer = db.query(Consumer).filter(Consumer.username == username).first()
        
        if consumer:
            db.delete(consumer)

        pass

def search_payments(duration: str):
    with read_only_session() as db:
        payments = db.query(Payment).filter(Payment.year_month == duration).all()
        return [{"username": payment.username, "price": (payment.count * PRICE_BY_ACTION)} for payment in payments]