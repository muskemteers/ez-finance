from datetime import date, datetime
from nsepy import get_history
from pymongo import MongoClient


class DBHandler:
    client_ref = MongoClient()
    db_ref = client_ref["stock_data"]
    collection_historical_ref = db_ref["historical_stock_data"]
    collection_stockinfo_ref = db_ref["stock_info"]

    def get_coll_historical_ref(self):
        return self.collection_historical_ref

    def get_coll_stockinfo_ref(self):
        return self.collection_stockinfo_ref


class StockData:
    def __init__(self, stock_symbol, historical_data):
        self.stock_symbol = stock_symbol
        self.prev_close = historical_data["Prev Close"]
        self.curr_open = historical_data["Open"]
        self.curr_high = historical_data["High"]
        self.curr_low = historical_data["Low"]
        self.curr_close = historical_data["Close"]
        self.curr_last = historical_data["Last"]
        self.vwap = historical_data["VWAP"]
        self.volume = historical_data["Volume"]
        self.total_trading_days = len(historical_data)
        self.dates = historical_data.index

    def show(self):
        print("Symbol: ", self.stock_symbol)
        print("Total Trading Days: ", self.total_trading_days)

    def upload_to_db(self):
        coll_ref = DBHandler().get_coll_historical_ref()
        stocks_array = []
        for i in range(self.total_trading_days):
            stocks_array.append(
                {
                    "trading_date": datetime(
                        self.dates[i].year, self.dates[i].month, self.dates[i].day
                    ),
                    "stock_symbol": str(self.stock_symbol),
                    "prev_close": float(self.prev_close[i]),
                    "open": float(self.curr_open[i]),
                    "high": float(self.curr_high[i]),
                    "low": float(self.curr_low[i]),
                    "close": float(self.curr_close[i]),
                    "open": float(self.curr_open[i]),
                    "last": float(self.curr_last[i]),
                    "vwap": float(self.vwap[i]),
                    "volume": int(self.volume[i]),
                }
            )
        inserted_data = coll_ref.insert_many(stocks_array)


def get_stock_data():
    stock_symbols = ["SBIN", "HDFCBANK"]
    start_date = date(2001, 1, 1)
    end_date = date(2021, 9, 1)
    for stock_symbol in stock_symbols:
        historical_data = get_history(
            symbol=stock_symbol, start=start_date, end=end_date
        )
        stock_data = StockData(stock_symbol, historical_data)
        stock_data.show()
        stock_data.upload_to_db()


if __name__ == "__main__":
    get_stock_data()
