############################################################

import uvicorn
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from typing import Optional
import json
import time
import pymongo
from urllib.parse import urlparse
from os import path
import sys
from datetime import datetime

############################################################

from utils.utils_nsetools import get_all_stock_symbols, get_all_stock_symbols_names
from db import DBHandler

############################################################

app = FastAPI()
origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

############################################################


@app.get("/stocks/all")
async def get_stocks_all(request: Request):
    try:
        stock_symbols_names = get_all_stock_symbols_names()
        out_data = []
        for (item, value) in stock_symbols_names.items():
            out_data.append({"stock_symbol": item, "stock_name": value})
        return {"status": 200, "stock_symbols_names": out_data}
    except Exception as e:
        print(e)


@app.get("/stocks/nse500")
async def get_stocks_nse500(request: Request):
    try:
        d = datetime(2021, 9, 1)
        coll_ref = DBHandler().get_coll_nse500_ref()
        stock_symbols_names = get_all_stock_symbols_names()
        out_data = []
        stock_symbols = []
        for data in coll_ref.find({"update_date": {"$gt": d}}).sort(
            "update_date", pymongo.DESCENDING
        ):
            stock_symbols = data["symbol_list"]
            break
        for item in stock_symbols:
            out_data.append(
                {"stock_symbol": item, "stock_name": stock_symbols_names[item]}
            )
        return {"status": 200, "stock_symbols": out_data}
    except Exception as e:
        print(e)


@app.get("/stocks/{stock_symbol}")
async def get_stock(request: Request, stock_symbol: str):
    try:
        coll_ref = DBHandler().get_coll_historical_ref()
        stock_data = []
        for doc in coll_ref.find({"stock_symbol": stock_symbol}).sort("trading_date"):
            stock_data.append(
                {
                    "date": doc["trading_date"],
                    "o": doc["open"],
                    "h": doc["high"],
                    "l": doc["low"],
                    "c": doc["close"],
                }
            )
        return {
            "status": 200,
            "stock_symbol": stock_symbol,
            "historical_data": stock_data,
        }
    except Exception as e:
        print(e)


@app.get("/")
async def common() -> dict:
    return {"message": "AOK"}


config = {
    "HOST": "127.0.0.1",
    "SERVER_PORT": 9000,
}


if __name__ == "__main__":
    sys.path.insert(0, ".")
    uvicorn.run("api:app", host=config["HOST"], port=config["SERVER_PORT"], reload=True)
