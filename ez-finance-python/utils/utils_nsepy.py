# All nsepy library/wrapper/util functions to be added here
from nsepy import get_history


def get_historical_data(stock_symbol, start_date, end_date):
    return get_history(symbol=stock_symbol, start=start_date, end=end_date)
