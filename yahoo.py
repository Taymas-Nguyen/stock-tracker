import yfinance as yf
import pandas as pd


def get_info(ticker_name):
    
    # TODO add range and truncate date based on range
 
    # get ticker information
    ticker = yf.Ticker(ticker_name)
    hist = ticker.history(period = 'max')

    close = list(hist.Close)
    dates = list(str(i).split(" ")[0] for i in list(hist.index))
 
    # output data into list of strings into csv format
    data = [['date', 'value']]
    for i,j in zip(dates,close):
        data.append([i,j])

    return data

