from django.http import HttpResponse
from django.shortcuts import render, redirect
from .forms import search_form
from data_page.views import data_page
from cache import cache_stock_max0, cache_stock_minute0, form_stock
from csv_page_max0.views import csv_page_max0
from csv_page_minute0.views import csv_page_minute0

def home_page(request):    
    # on home page call, clear cache
    cache_stock_max0.clear()
    cache_stock_minute0.clear()

    form0 = search_form()

    # when user searches for query and presses enter
    if request.method == "POST":
        form0 = search_form(request.POST)
        request.session['ticker'] = request.POST['ticker']
        form_stock['form0'] = request.POST['ticker']
        if 'form0' not in form_stock:
            form_stock['form0'] = "NONE"
        if 'form1' not in form_stock:
            form_stock['form1'] = "NONE"  
        csv_page_max0(request, 'form0')
        csv_page_minute0(request)
            
        # go to data page when ticker is submitted
        # all information in request is stored in session
        return redirect("/data_page/")
            
    context = {'form': form0}
    return render(request, "home_page.html", context)  