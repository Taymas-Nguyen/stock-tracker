from django.http import HttpResponse
from django.shortcuts import render, redirect
from .forms import search_form
from data_page.views import data_page
from cache import cache_stock_max, cache_stock_minute
from csv_page_max.views import csv_page_max
from csv_page_minute.views import csv_page_minute

def home_page(request):    
    # on home page call, clear cache
    cache_stock_max.clear()
    cache_stock_minute.clear()

    form = search_form()
    context = {'form': form}

    # when user searches for query and presses enter
    if request.method == "POST":
        form = search_form(request.POST)
        request.session['ticker'] =  request.POST['ticker']  
        csv_page_max(request)
        csv_page_minute(request)
            
        # go to data page when ticker is submitted
        # all information in request is stored in session
          
        return redirect("/data_page/")
            
    return render(request, "home_page.html", context)  