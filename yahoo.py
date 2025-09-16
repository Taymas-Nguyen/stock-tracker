import yfinance as yf
import pandas as pd
import pytz as tz
from datetime import datetime, timedelta

def get_info(ticker_name):
    
    # get ticker information
    # yahoo only downloads last 7 days of data if interval is 1 minute
    # TODO get max interval data and replace last 7 days with 1 minute interval data
    # how to complete TODO ^^^ : make list - append all max interval data to list - stop when time is less than the first of the 1 minute interval data
    # ------ psuedocode -------
    # for i in max_data:
    #     if max_data.date < min_data_first_date:
    #         new_data.append(i)
    #     else:
    #         new_data.append(min_data)
    minute_hist = yf.download(ticker_name, period="max", interval="1m")
    max_hist = yf.download(ticker_name, period="max", interval="1d")
    original_timezone = "UTC"
    target_timezone = "America/Los_Angeles" # pdt

    # current date in pdt 
    current_date = tz.timezone(original_timezone).localize(datetime.strptime(datetime.now().strftime("%Y-%m-%d %H:%M:%S"), "%Y-%m-%d %H:%M:%S")).astimezone(tz.timezone(target_timezone))
    
    seven_days_ago = timedelta(days=7)
    result_date = current_date - seven_days_ago

    # date 7 days ago in pdt
    result_date = tz.timezone(original_timezone).localize(datetime.strptime((result_date).strftime("%Y-%m-%d %H:%M:%S"), "%Y-%m-%d %H:%M:%S")).astimezone(tz.timezone(target_timezone))

    max_close = [i[0].item() for i in list(max_hist.Close.values)]
    minute_close = [i[0].item() for i in list(minute_hist.Close.values)]

    # time format for minute interval is yy-mm-dd HH-MM-SS+time zone
    # time format for max interval is just yy-mm-dd
    # convert all timezones to california/pdt
    # cut off time zone from format
    max_dates = list(tz.timezone(original_timezone).localize(datetime.strptime((str(i)), "%Y-%m-%d %H:%M:%S")).astimezone(tz.timezone(target_timezone)).strftime("%Y-%m-%d %H:%M:%S") for i in list(max_hist.index))
    minute_dates = list(tz.timezone(original_timezone).localize(datetime.strptime((str(i)[:-6]), "%Y-%m-%d %H:%M:%S")).astimezone(tz.timezone(target_timezone)).strftime("%Y-%m-%d %H:%M:%S") for i in list(minute_hist.index))
    target_timezone

    # output data into list of strings into csv format
    data = [['date', 'value']]

    # add data from max interval data except last 7 days
    for i,j in zip(max_dates,max_close):
        if tz.timezone(target_timezone).localize(datetime.strptime(i, "%Y-%m-%d %H:%M:%S")) < result_date: 
            data.append([i,j])

    # add data from all of minute interval
    for i,j in zip(minute_dates,minute_close):
        data.append([i,j])
        
    return data 

