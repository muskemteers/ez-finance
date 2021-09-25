# All nsetools library/wrapper/util functions to be added here
from nsetools import Nse


def get_all_stock_symbols():
    nse = Nse()
    stock_codes_dict = nse.get_stock_codes()
    del stock_codes_dict["SYMBOL"]
    return stock_codes_dict.keys()
