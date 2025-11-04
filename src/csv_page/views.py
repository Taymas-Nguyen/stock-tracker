from django.http import HttpResponse
from django.shortcuts import render, redirect
import csv
from io import StringIO
from yahoo import get_info
from cache import cache_stock_max, cache_stock_minute, form_stock

def csv_page(request, max_or_minute = 'default', form_name = 'default'):
    # when page loads from home page
    # currently only works for forms with one digit
    if form_name == 'default':
        form_name = f"form{str(request.path)[-2]}"
    if max_or_minute == 'default':
        if 'max' in str(request.path):
            max_or_minute = 'max'
        else:
            max_or_minute = 'minute'

    if max_or_minute == 'max':
        cache = cache_stock_max
    else:
        cache = cache_stock_minute
    
    try:
        return HttpResponse(cache[form_stock[form_name]], content_type='text/plain')
    except:
        # get data from yahoo.py and turn into csv in this views
        if max_or_minute == 'max':
            data = get_info(form_stock[form_name])[0]
        else:
            data = get_info(form_stock[form_name])[1]

        output = StringIO()
        writer = csv.writer(output)
        for row in data:
            writer.writerow(row)
        csv_page = output.getvalue()

        # store known stocks as csv
        cache[form_stock[form_name]] = csv_page

        return HttpResponse(csv_page, content_type='text/plain')