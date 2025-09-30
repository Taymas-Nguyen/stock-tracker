from django.http import HttpResponse
from django.shortcuts import render, redirect
from .forms import search_form
from csv_page_max.views import csv_page_max
from csv_page_minute.views import csv_page_minute
from cache import cache_stock_max, cache_stock_minute

from csv_page_max.views import csv_page_max
from csv_page_minute.views import csv_page_minute

def data_page(request):
    form = search_form()
    context = {'form': form}

    # if user searches for ticker via button in data_page
    # else get ticker from home_page
    if request.method == "POST":
        request.session['ticker'] =  request.POST['ticker']    
    context['ticker_name'] = request.session['ticker']

    # reset cache on refresh
    if request.method == 'POST':
        cache_stock_max.clear()
        cache_stock_minute.clear()

    # return same page if user presses range buttons instead of search bar from data_page
    if "ticker" not in request.POST:
        return render(request, "data_page.html", context)    
    

    csv_page_max(request)
    csv_page_minute(request)
 
    return render(request, "data_page.html", context)