from typing import List
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import api.core as core
from api.model.model import ActionVerification, Group
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

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"message": f"An unexpected error occurred: {exc}"},
    )
        
@app.post("/api/accounts/instagram", status_code=201)
async def create_user_account(account: ProducerCreate):
    core.create_producer(account)
    return JSONResponse(status_code=201, content={"status": "ok"})

@app.get("/api/groups", response_model=List[Group])
async def search_groups():
    return core.get_groups()

@app.get("/api/sns-raise/verifications", response_model=List[ActionVerification])
async def search_sns_raise_verifications():
    return core.search_sns_raise_verifications()

# admin

@app.post("/api/admin/groups", status_code=201)
async def setting_group(groupCreate: GroupCreate):
    core.create_group(groupCreate.type)
    return JSONResponse(status_code=201, content={"status": "ok"})

@app.post("/api/admin/consumers", status_code=201)
async def setting_consumer(consumerCreate: ConsumerCreate):
    core.create_consumer(consumerCreate)
    return JSONResponse(status_code=201, content={"status": "ok"})

@app.delete("/api/admin/consumers", status_code=204)
async def delete_consumer(username: str):
    core.remove_consumer(username)
    return JSONResponse(status_code=204, content={"status": "ok"})

@app.get("/api/admin/payments", response_model=List[Group])
async def search_payment(duration: str):
    return core.get_payments(duration)