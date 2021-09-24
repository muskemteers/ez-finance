############## Python Package Imports Here ###################
from mftool import Mftool
import time
import mysql.connector
from datetime import datetime

############# Relative Modules Imports Here ###############

############# Global Variable Declarations & Initialization Here #################

mydb = mysql.connector.connect(
    host="localhost", user="root", password="Hm@090216000", db="mf_historical_data"
)
mycursor = mydb.cursor()
mf = Mftool()
########### Actual Code Here #################


def insert_mfdata_into_mysql(mf_data):
    mf_info_sql = "INSERT INTO mf_info VALUES (%s, %s, %s, %s, %s, %s)"
    start_date = mf_data["scheme_start_date"]["date"]
    mysql_start_date = datetime.strptime(start_date, "%d-%m-%Y").strftime("%Y-%m-%d")
    mf_info_val = (
        int(mf_data["scheme_code"]),
        mf_data["scheme_name"],
        mf_data["fund_house"],
        mf_data["scheme_type"],
        mf_data["scheme_category"],
        mysql_start_date,
    )
    mycursor.execute(mf_info_sql, mf_info_val)
    mydb.commit()

    historical_nav_sql = "INSERT INTO historical_nav VALUES (%s, %s, %s)"
    historical_nav_val = []
    for date_nav in mf_data["data"]:
        historical_nav_val.append(
            (
                int(mf_data["scheme_code"]),
                datetime.strptime(date_nav["date"], "%d-%m-%Y").strftime("%Y-%m-%d"),
                float(date_nav["nav"]),
            )
        )
    mycursor.executemany(historical_nav_sql, historical_nav_val)
    mydb.commit()


def get_mf_data():
    all_scheme_codes = mf.get_scheme_codes()
    count = 0
    print("Starting Execution for 13600 to 13799")
    start_time = time.time()
    for scheme_codes in all_scheme_codes:
        if count >= 13600 and count <= 13799:
            print(count, ": ", scheme_codes)
            mf_data = mf.get_scheme_historical_nav(scheme_codes)
            insert_mfdata_into_mysql(mf_data)
        count += 1
    end_time = time.time()
    print("Total Execution time(13600 to 13799): ", (end_time - start_time), " seconds")


if __name__ == "__main__":
    get_mf_data()
