from django.http import HttpResponse
from django.shortcuts import render, redirect
import csv
from io import StringIO
from yahoo.yahoo import get_info
def csv_page_minute(request):

    # get data from yahoo.py and turn into csv in this views  

    data = get_info(request.session['ticker'])[1] 

    output = StringIO()
    writer = csv.writer(output)

    for row in data:
        writer.writerow(row)

    csv_page = output.getvalue()

    return HttpResponse(csv_page, content_type='text/plain')