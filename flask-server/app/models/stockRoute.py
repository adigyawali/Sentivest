import os, requests
from flask import Blueprint, jsonify
from datetime import date, timedelta
from dotenv import load_dotenv
from .sentiment_analysis import analyzeSentiment  # import the FinBERT helper

# Load environment variables
load_dotenv()
API_KEY = os.getenv("FINNHUB_API_KEY")

# Flask Blueprint for stock routes
stock_routes = Blueprint("stocks", __name__)

@stock_routes.route("/stock/<ticker>", methods=["GET"])
def get_stock_news(ticker):
    """
    Fetch news for a given stock ticker from Finnhub,
    run sentiment analysis with FinBERT, and return JSON.
    """

    # Date range for the last 7 days
    range_to = date.today()
    range_from = range_to - timedelta(days=7)

    # Call Finnhub API
    url = "https://finnhub.io/api/v1/company-news"
    params = {
        "symbol": ticker,
        "from": range_from.strftime("%Y-%m-%d"),
        "to": range_to.strftime("%Y-%m-%d"),
        "token": API_KEY
    }
    r = requests.get(url, params=params)

    # If Finnhub errors
    if r.status_code != 200:
        return jsonify({"message": "Error fetching news", "error": r.text}), 500

    news_data = r.json()

    # Extract up to 20 headlines with full metadata
    articles = []
    headlines = []
    for item in news_data[:20]:
        if "headline" in item:
            headlines.append(item["headline"])
            articles.append({
                "headline": item["headline"],
                "url": item.get("url", ""),
                "source": item.get("source", ""),
                "publishedAt": item.get("datetime", 0),  # timestamp in seconds
                "summary": item.get("summary", "")
            })

    if not headlines:
        return jsonify({"message": "No recent news found"}), 404

    # Run sentiment analysis on headlines
    analyzed = analyzeSentiment(headlines)

    # Merge sentiment results into articles
    for i in range(len(articles)):
        articles[i]["sentiment"] = analyzed[i]["sentiment"]
        articles[i]["confidence"] = analyzed[i]["confidence"]

    # Return structured response
    return jsonify({
        "ticker": ticker.upper(),
        "news": articles
    })
