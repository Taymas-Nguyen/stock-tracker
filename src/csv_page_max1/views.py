from django.http import HttpResponse
from django.shortcuts import render, redirect
import csv
from io import StringIO
from yahoo import get_info
from cache import cache_stock_max0, form_stock

def csv_page_max1(request):
    print("max1", form_stock['form1'], request.session['ticker'])
    # indicates when user presses on range buttons, return cvs from cache
    try:
        return HttpResponse(cache_stock_max0[form_stock['form1']], content_type='text/plain')
    except:
        # get data from yahoo.py and turn into csv in this views  
        data = get_info(form_stock['form1'])[0] 
        output = StringIO()
        writer = csv.writer(output)
        for row in data:
            writer.writerow(row)
        csv_page = output.getvalue()

        # store known stocks as csv
        cache_stock_max0[form_stock['form1']] = csv_page

        return HttpResponse(csv_page, content_type='text/plain')