import json
from sqlalchemy.orm import Session
from fastapi import HTTPException

from api.insta import Insta
from api.model.entity import InstagramAccount
from api.model.payload import AccountCreate

def get_account_by_username(db: Session, username: str):
    return db.query(InstagramAccount).filter(InstagramAccount.username == username).first()

def create_account(db: Session, account: AccountCreate):
    try:
        insta = Insta(account)
        session = insta.login()
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail="로그인할 수 없습니다.")
    
    db_account = get_account_by_username(db, account.username)
    if db_account:
        raise HTTPException(status_code=400, detail="이미 등록되어 있습니다.")
    

    new_account = InstagramAccount(username=account.username, session=json.dumps(session))

    db.add(new_account)
    db.commit()
    db.refresh(new_account)
    
    return new_account