import json
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from api.core import create_account, create_group, get_groups, create_consumer, remove_consumer
from api.database import SessionLocal
from api.model.payload import AccountCreate, AdminCommon

from sqlalchemy.orm import Session

app = FastAPI(docs_url="/api/docs", openapi_url="/api/openapi.json")

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
        
@app.post("/api/accounts/instagram")
async def create_user_account(account: AccountCreate, db: Session = Depends(get_db)):
    try:
        new_account = create_account(db, account)
    except HTTPException as e:
        return {"failed": e.detail}
    return {"id": new_account.id, "username": new_account.username}

@app.get("/api/groups")
async def searcg_groups(db: Session = Depends(get_db)):
    try:
        instagramGroups = get_groups(db)
    except HTTPException as e:
        return {"failed": e.detail}
    return [{"id": instagramGroup.id, "type": instagramGroup.type} for instagramGroup in instagramGroups]

@app.post("/api/admin/common")
async def create_type(adminCommon: AdminCommon, db: Session = Depends(get_db)):
    try:
        if adminCommon.type:
            create_group(db, adminCommon.type)
        if adminCommon.created_consumer:
            create_consumer(db, adminCommon.created_consumer)
        if adminCommon.removed_consumer:
            remove_consumer(db, adminCommon.removed_consumer)
    except HTTPException as e:
        return {"failed": e.detail}
    return {"status": "ok"}