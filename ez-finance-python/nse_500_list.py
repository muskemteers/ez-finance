from datetime import datetime
from db import DBHandler
import csv


def upload_to_db(symbol_list):
    coll_ref = DBHandler().get_coll_nse500_ref()
    inserted_data = coll_ref.insert_one(
        {"update_date": datetime.today(), "symbol_list": symbol_list}
    )


def update_symbol_data():
    with open("docs/nifty500/2021_09.csv") as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=",")
        line_count = 0
        symbol_list = []
        for row in csv_reader:
            if line_count == 0:
                print("Column names are: {col_name}".format(col_name=row[0]))
                line_count += 1
            else:
                print("Symbol Name is: {symbol}.".format(symbol=row[0]))
                line_count += 1
                symbol_list.append(row[0])
        print(f"Processed {line_count} lines.")
    upload_to_db(symbol_list)


if __name__ == "__main__":
    update_symbol_data()
