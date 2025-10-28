from django.http import HttpResponse
from django.shortcuts import render, redirect
import csv
from io import StringIO
from yahoo import get_info
from cache import cache_stock_minute0, form_stock

def csv_page_minute1(request):
    try:
        # indicates when user presses on range buttons, return cvs from cache
        if request.headers.get("Requesttype") == "changeRange":
            return HttpResponse(cache_stock_minute0[request.session['ticker']], content_type='text/plain')
    except:

        # get data from yahoo.py and turn into csv in this views  
        data = get_info(request.session['ticker'])[1] 
        output = StringIO()
        writer = csv.writer(output)
        for row in data:
            writer.writerow(row)
        csv_page = output.getvalue()

        # store known stocks as cvs
        cache_stock_minute0[request.session['ticker']] = csv_page


        return HttpResponse(csv_page, content_type='text/plain')