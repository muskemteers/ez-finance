# All nsetools library/wrapper/util functions to be added here
from nsetools import Nse


def get_all_stock_symbols_names():
    nse = Nse()
    stock_codes_dict = nse.get_stock_codes()
    del stock_codes_dict["SYMBOL"]
    return stock_codes_dict


def get_all_stock_symbols():
    stock_symbols_names = get_all_stock_symbols_names()
    return stock_symbols_names.keys()
