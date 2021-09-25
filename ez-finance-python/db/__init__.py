from pymongo import MongoClient


class DBHandler:
    # singleton pattern
    # all variables declared below are static in nature by default
    # hence for multiple instances of DBHandler, only a single database reference will be sent

    client_ref = MongoClient()
    db_ref = client_ref["stock_data"]
    collection_historical_ref = db_ref["historical_stock_data"]
    collection_stockinfo_ref = db_ref["stock_info"]

    def get_coll_historical_ref(self):
        return self.collection_historical_ref

    def get_coll_stockinfo_ref(self):
        return self.collection_stockinfo_ref
