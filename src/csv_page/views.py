from django.http import HttpResponse
from django.shortcuts import render, redirect
import csv
from io import StringIO
from yahoo import get_info
from cache import cache_stock_max, cache_stock_minute, form_stock
import re 

def csv_page(request, max_or_minute = 'default', form_name = 'default'):
    # currently only works for forms with one digit

    # when any csv page is requested/fetched by d3.csv in js, no min/max or form name is provided
    # so those values are determined from the url itself
    if form_name == 'default':
        form_name = f"form{int(re.search(r"\d+", str(request.path)).group())}"
    if max_or_minute == 'default':
        if 'max' in str(request.path):
            max_or_minute = 'max'
        else:
            max_or_minute = 'minute'

    if max_or_minute == 'max':
        cache = cache_stock_max
    else:
        cache = cache_stock_minute

    # empty csv page if stock hasnt been submitted for a form yet
    if form_name not in form_stock:
        return HttpResponse("", content_type='text/plain')
    
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