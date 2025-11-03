from django.http import HttpResponse
from django.shortcuts import render, redirect
import csv
from io import StringIO
from yahoo import get_info
from cache import cache_stock_max0, form_stock
from django.urls import resolve

def csv_page_max0(request, form_name = 'default'):
    if form_name == 'default':
        form_name = f"form{str(request.path)[-2]}"
    try:
        return HttpResponse(cache_stock_max0[form_stock[form_name]], content_type='text/plain')
    except:
        # get data from yahoo.py and turn into csv in this views  
        data = get_info(form_stock[form_name])[0] 
        output = StringIO()
        writer = csv.writer(output)
        for row in data:
            writer.writerow(row)
        csv_page = output.getvalue()

        # store known stocks as csv
        cache_stock_max0[form_stock[form_name]] = csv_page

        return HttpResponse(csv_page, content_type='text/plain')