'''
Obtain Stock Information from tickers
'''

import os, requests
from flask import Blueprint, request, jsonify
from dotenv import load_dotenv
from datetime import datetime, timedelta, date


#Obtain the API key
load_dotenv()
API_KEY = os.getenv("FINNHUB_API_KEY")

#Create stock route
stock_routes = Blueprint("stocks", __name__)

@stock_routes.route("/stock/<ticker>", methods=["GET"])
def newsInfo(ticker):
    rangeTo = date.today()
    rangeFrom = rangeTo - timedelta(days=7)

    url = "https://finnhub.io/api/v1/company-news"
    params = {
        "symbol": ticker,
        "from": rangeFrom.strftime("%Y-%m-%d"),
        "to": rangeTo.strftime("%Y-%m-%d"),
        "token": API_KEY
    }

    r = requests.get(url, params=params)
    return jsonify(r.json())


# Test Code for API
'''

def newsInfo(ticker):
    rangeTo = date.today()
    rangeFrom = rangeTo - timedelta(days=7)

    url = "https://finnhub.io/api/v1/company-news"
    params = {
        "symbol": ticker,
        "from": rangeFrom.strftime("%Y-%m-%d"),
        "to": rangeTo.strftime("%Y-%m-%d"),
        "token": API_KEY
    }

    r = requests.get(url, params=params)
    
    data = r.json()


    for j in data[1].keys():
        print(j)
    
    for i in range(len(data)):
        for key,value in data[i].items():
            print(f"{key}: {value}\n")
        print("+-----+------+")

userinput = input("Ticker: ")
newsInfo(userinput)


'''


