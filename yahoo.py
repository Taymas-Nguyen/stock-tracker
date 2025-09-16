import yfinance as yf
import pandas as pd
import pytz as tz
from datetime import datetime, timedelta

def get_info(ticker_name):
    
    # get ticker information
    # yahoo only downloads last 7 days of data if interval is 1 minute
    # import both max and minute interval data
    minute_hist = yf.download(ticker_name, period="max", interval="1m")
    max_hist = yf.download(ticker_name, period="max", interval="1d")
    original_timezone = "UTC"
    target_timezone = "America/Los_Angeles" # pdt

    max_close = [i[0].item() for i in list(max_hist.Close.values)]
    minute_close = [i[0].item() for i in list(minute_hist.Close.values)]

    # time format for minute interval is yy-mm-dd HH-MM-SS+time zone utc-0
    # time format for max interval is just yy-mm-dd
    # convert all timezones to california/pdt
    # cut off time zone from format
    max_dates = list(tz.timezone(original_timezone).localize(datetime.strptime((str(i)), "%Y-%m-%d %H:%M:%S")).astimezone(tz.timezone(target_timezone)).strftime("%Y-%m-%d %H:%M:%S") for i in list(max_hist.index))
    minute_dates = list(tz.timezone(original_timezone).localize(datetime.strptime((str(i)[:-6]), "%Y-%m-%d %H:%M:%S")).astimezone(tz.timezone(target_timezone)).strftime("%Y-%m-%d %H:%M:%S") for i in list(minute_hist.index))
    target_timezone

    # output data into list of strings into csv format
    max_data = [['date', 'value']]
    minute_data = [['date', 'value']]
    # add data from max interval
    for i,j in zip(max_dates,max_close):
        max_data.append([i,j])

    # add data from all of minute interval
    for i,j in zip(minute_dates,minute_close):
        minute_data.append([i,j]) 

    return [max_data, minute_data]

