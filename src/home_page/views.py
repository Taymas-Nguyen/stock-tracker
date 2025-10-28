from django.http import HttpResponse
from django.shortcuts import render, redirect
from .forms import search_form
from data_page.views import data_page
from cache import cache_stock_max0, cache_stock_minute0
from csv_page_max0.views import csv_page_max0
from csv_page_minute0.views import csv_page_minute0

def home_page(request):    
    # on home page call, clear cache
    cache_stock_max0.clear()
    cache_stock_minute0.clear()

    form = search_form()
    context = {'form': form}

    # when user searches for query and presses enter
    if request.method == "POST":
        form = search_form(request.POST)
        request.session['ticker'] =  request.POST['ticker']  
        csv_page_max0(request)
        csv_page_minute0(request)
            
        # go to data page when ticker is submitted
        # all information in request is stored in session
          
        return redirect("/data_page/")
            
    return render(request, "home_page.html", context)  