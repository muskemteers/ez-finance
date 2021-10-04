from datetime import date, datetime
from utils.utils_nsepy import get_historical_data
from utils.utils_nsetools import get_all_stock_symbols
from db import DBHandler


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

    def show_with_index(self, index):
        print("Index: ", index, ", Symbol: ", self.stock_symbol)

    def upload_to_db(self):
        coll_ref = DBHandler().get_coll_historical_ref()
        stockdata_to_upload = []
        for i in range(self.total_trading_days):
            stockdata_to_upload.append(
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
        if len(stockdata_to_upload) == 0:
            print(self.stock_symbol, " has no data in given interval")
        else:
            inserted_data = coll_ref.insert_many(stockdata_to_upload)


def update_stock_data():
    stock_symbols = get_all_stock_symbols()
    start_date = date(2021, 10, 4)
    end_date = date(2021, 10, 5)
    print("Collecting Data for the interval: ", start_date, end_date)
    count = 0
    for stock_symbol in stock_symbols:
        if count >= 0 and count < 1800:
            historical_data = get_historical_data(stock_symbol, start_date, end_date)
            stock_data = StockData(stock_symbol, historical_data)
            # print(historical_data)
            # exit()
            del historical_data
            stock_data.show_with_index(count)
            stock_data.upload_to_db()
        # if count == n:
        #     exit()
        count += 1


if __name__ == "__main__":
    update_stock_data()
