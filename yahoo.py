import yfinance as yf

import yfinance as yf


def get_info(ticker):
    meta = yf.Ticker(ticker)
    print(meta.info)