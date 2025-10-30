from django.http import HttpResponse
from django.shortcuts import render, redirect
from .forms import search_form
from csv_page_max0.views import csv_page_max0
from csv_page_minute0.views import csv_page_minute0
from csv_page_max1.views import csv_page_max1
from csv_page_minute1.views import csv_page_minute1
from cache import cache_stock_max0, cache_stock_minute0, form_stock

def data_page(request):
    form0 = search_form(request.POST)
    form1 = search_form(request.POST)

    if 'form0' not in form_stock:
        form_stock['form0'] = "NONE"
    if 'form1' not in form_stock:
        form_stock['form1'] = "NONE"

    # if user searches for ticker via button in data_page
    # else get ticker from home_page
    if request.method == "POST":
        request.session['ticker'] =  request.POST['ticker']
        if "form0" in request.POST:
            form_stock['form0'] = request.session['ticker']

            mutable_data = request.POST.copy()
            mutable_data['ticker'] = request.session['ticker']
            form0 = search_form(mutable_data)

            print('form0',form0.data.get('ticker'))
            csv_page_max0(request)
            csv_page_minute0(request)
        if "form1" in request.POST:
            form_stock['form1'] = request.session['ticker']

            mutable_data = request.POST.copy()
            mutable_data['ticker'] = request.session['ticker']
            form1 = search_form(mutable_data)

            print('form1', form1.data.get('ticker'))
            csv_page_max1(request)
            csv_page_minute1(request)


    context = {'form0': form0, 'form1': form1}
    context['ticker_name'] = request.session['ticker']
    return render(request, "data_page.html", context)