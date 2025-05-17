from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from api.core import create_account
from api.database import SessionLocal
from api.model.payload import AccountCreate

from sqlalchemy.orm import Session

app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
@app.post("/api/py/accounts/instagram")
async def create_user_account(account: AccountCreate, db: Session = Depends(get_db)):
    try:
        new_account = create_account(db, account)
    except HTTPException as e:
        print(e)
        return {"failed": e.detail}
    return {"id": new_account.id, "username": new_account.username}