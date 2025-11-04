from django.http import HttpResponse
from django.shortcuts import render, redirect
from .forms import search_form
from data_page.views import data_page
from cache import cache_stock_max, cache_stock_minute, form_stock
from csv_page.views import csv_page

def home_page(request):    
    # on home page call, clear cache
    cache_stock_max.clear()
    cache_stock_minute.clear()

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
        csv_page(request, 'max', 'form0')
        csv_page(request, 'minute', 'form0')
            
        # go to data page when ticker is submitted
        # all information in request is stored in session
        return redirect("/data_page/")
            
    context = {'form': form0}
    return render(request, "home_page.html", context)  