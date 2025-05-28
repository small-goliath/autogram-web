from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import api.core as core
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
        core.create_producer(account)
    except HTTPException as e:
        return {"status": e.detail}
    return {"status": "ok"}

@app.get("/api/groups")
async def search_groups():
    try:
        instagramGroups = core.get_groups()
    except HTTPException as e:
        return {"status": e.detail}
    return instagramGroups

@app.get("/api/unfollowers")
async def search_groups(username: str):
    if username is None or username == "":
        return []
    try:
        unfollowers = core.get_unfollowers(username)
    except HTTPException as e:
        return {"status": e.detail}
    return unfollowers

@app.post("/api/admin/groups")
async def setting_group(groupCreate: GroupCreate):
    try:
        core.create_group(groupCreate.type)
    except HTTPException as e:
        return {"status": e.detail}
    return {"status": "ok"}

@app.post("/api/admin/consumers")
async def setting_consumer(consumerCreate: ConsumerCreate):
    try:
        core.create_consumer(consumerCreate)
    except HTTPException as e:
        return {"status": e.detail}
    return {"status": "ok"}

@app.delete("/api/admin/consumers")
async def delete_consumer(username: str):
    try:
        core.remove_consumer(username)
    except HTTPException as e:
        return {"status": e.detail}
    return {"status": "ok"}

@app.get("/api/admin/payments")
async def search_payment(duration: str):
    try:
        return core.get_payments(duration)
    except HTTPException as e:
        return {"status": e.detail}