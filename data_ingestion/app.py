from fastapi import FastAPI
from constants import PORT
import uvicorn
from src.routes.ingestion import router as ingestion_router 

app = FastAPI()

app.include_router(ingestion_router)

@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Data-ingestion-microservice is working fine"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=PORT, reload=True)
