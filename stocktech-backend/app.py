from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from constants import PORT
from src.routes.authenticate import router as auth_router
from src.routes.reports import router as reports_router
from src.routes.stocks import router as stocks_router
from src.routes.translate import router as translate_router
import uvicorn

app = FastAPI()

app.include_router(auth_router)
app.include_router(reports_router)
app.include_router(stocks_router)
app.include_router(translate_router)

origins = [
        "*",
    ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Stock-Tech-Microservice is working fine"}

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=PORT, reload=True)
