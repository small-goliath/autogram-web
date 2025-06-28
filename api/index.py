import io
import os
from typing import List
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import api.core as core
from api.model.model import ActionVerification, Group
from api.model.payload import ConsumerCreate, GroupCreate, ProducerCreate
from dotenv import load_dotenv

app = FastAPI(docs_url="/api/docs", openapi_url="/api/openapi.json")

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
        
@app.post("/api/accounts/instagram", status_code=201)
async def create_user_account(account: ProducerCreate):
    try:
        core.create_producer(account)
    except HTTPException as e:
        return JSONResponse(status_code=e.status_code, content={"status": e.detail})
    return JSONResponse(status_code=201, content={"status": "ok"})

@app.get("/api/groups", response_model=List[Group])
async def search_groups():
    try:
        return core.get_groups()
    except HTTPException as e:
        return JSONResponse(status_code=e.status_code, content={"status": e.detail})

@app.get("/api/sns-raise/verifications", response_model=List[ActionVerification])
async def search_sns_raise_verifications():
    try:
        return core.search_sns_raise_verifications()
    except Exception as e:
        return JSONResponse(status_code=e.status_code, content={"status": e.detail})

# admin

@app.post("/api/admin/groups", status_code=201)
async def setting_group(groupCreate: GroupCreate):
    try:
        core.create_group(groupCreate.type)
    except HTTPException as e:
        return JSONResponse(status_code=e.status_code, content={"status": e.detail})
    return JSONResponse(status_code=201, content={"status": "ok"})

@app.post("/api/admin/consumers", status_code=201)
async def setting_consumer(consumerCreate: ConsumerCreate):
    try:
        core.create_consumer(consumerCreate)
    except HTTPException as e:
        return JSONResponse(status_code=e.status_code, content={"status": e.detail})
    return JSONResponse(status_code=201, content={"status": "ok"})

@app.delete("/api/admin/consumers", status_code=204)
async def delete_consumer(username: str):
    try:
        core.remove_consumer(username)
    except HTTPException as e:
        return JSONResponse(status_code=e.status_code, content={"status": e.detail})
    return JSONResponse(status_code=204, content={"status": "ok"})

@app.get("/api/admin/payments", response_model=List[Group])
async def search_payment(duration: str):
    try:
        return core.get_payments(duration)
    except HTTPException as e:
        return JSONResponse(status_code=e.status_code, content={"status": e.detail})