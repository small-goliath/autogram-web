from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from api.core import create_producer, create_group, get_groups, create_consumer, remove_consumer
from api.model.payload import ProducerCreate, AdminCommon

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
        producer = create_producer(account)
    except HTTPException as e:
        return {"failed": e.detail}
    return {"id": producer.id, "username": producer.username}

@app.get("/api/groups")
async def search_groups():
    try:
        instagramGroups = get_groups()
    except HTTPException as e:
        return {"failed": e.detail}
    return [{"id": instagramGroup.id, "type": instagramGroup.type} for instagramGroup in instagramGroups]

@app.post("/api/admin/common")
async def create_type(adminCommon: AdminCommon):
    try:
        if adminCommon.type:
            create_group(adminCommon.type)
        if adminCommon.created_consumer:
            create_consumer(adminCommon.created_consumer)
        if adminCommon.removed_consumer:
            remove_consumer(adminCommon.removed_consumer)
    except HTTPException as e:
        return {"failed": e.detail}
    return {"status": "ok"}