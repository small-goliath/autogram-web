from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from api.core import create_producer, create_group, get_groups, create_consumer, remove_consumer, search_payments
from api.model.payload import ConsumerCreate, GroupCreate, ProducerCreate

app = FastAPI(docs_url="/api/docs", openapi_url="/api/openapi.json")

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
        
@app.post("/api/accounts/instagram")
async def create_user_account(account: ProducerCreate):
    try:
        create_producer(account)
    except HTTPException as e:
        return {"status": e.detail}
    return {"status": "ok"}

@app.get("/api/groups")
async def search_groups():
    try:
        instagramGroups = get_groups()
    except HTTPException as e:
        return {"status": e.detail}
    return instagramGroups

@app.post("/api/admin/groups")
async def setting_group(groupCreate: GroupCreate):
    try:
        create_group(groupCreate.type)
    except HTTPException as e:
        return {"status": e.detail}
    return {"status": "ok"}

@app.post("/api/admin/consumers")
async def setting_consumer(consumerCreate: ConsumerCreate):
    try:
        create_consumer(consumerCreate)
    except HTTPException as e:
        return {"status": e.detail}
    return {"status": "ok"}

@app.delete("/api/admin/consumers")
async def delete_consumer(username: str):
    try:
        remove_consumer(username)
    except HTTPException as e:
        return {"status": e.detail}
    return {"status": "ok"}

@app.get("/api/admin/payments")
async def search_payment(duration: str):
    try:
        return search_payments(duration)
    except HTTPException as e:
        return {"status": e.detail}