import motor.motor_asyncio
import pymongo

from constants import MONGO_URL, DB

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URL)

database = client[DB]

User = database["users"]

Reports = database["reports"]

Stocks = database["stocks"]

mongo_client = pymongo.MongoClient(MONGO_URL)

stocks_client = mongo_client[DB]["stocks"]

