import motor.motor_asyncio

from constants import MONGO_URL, DB

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URL)

database = client[DB]

Reports = database["reports"]