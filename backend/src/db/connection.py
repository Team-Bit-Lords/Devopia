import os, sys
from pymongo import MongoClient
from src.constants import DATABASE_NAME
from dotenv import find_dotenv, load_dotenv

load_dotenv(find_dotenv())

try:
    db = MongoClient(os.environ["MONGO_URI"])[DATABASE_NAME]
except Exception as e:
    print("MongoDB connection failed", e)
    sys.exit(1)