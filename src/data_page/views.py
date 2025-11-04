from django.http import HttpResponse
from django.shortcuts import render, redirect
from .forms import search_form
from csv_page.views import csv_page
from cache import form_stock

def data_page(request):
    form0 = search_form(request.POST)
    form1 = search_form(request.POST)

    if 'form0' not in form_stock:
        form_stock['form0'] = "NONE"
    if 'form1' not in form_stock:
        form_stock['form1'] = "NONE"

    # if user searches for stock from home page
    if request.method == "GET":
        mutable_data0 = form0.data.copy()
        mutable_data0['ticker'] = form_stock['form0']
        form0 = search_form(mutable_data0)

    # if user searches for ticker via button in data_page
    # else get ticker from home_page
    if request.method == "POST":
        request.session['ticker'] =  request.POST['ticker']
        if "form0" in request.POST:
            form_stock['form0'] = request.session['ticker']

            mutable_data0 = form0.data.copy()
            mutable_data0['ticker'] = request.session['ticker']
            form0 = search_form(mutable_data0)

            mutable_data1 = form1.data.copy()
            mutable_data1['ticker'] = form_stock['form1']
            form1 = search_form(mutable_data1)

            csv_page(request, 'max', 'form0')
            csv_page(request, 'minute', 'form0')
        if "form1" in request.POST:
            form_stock['form1'] = request.session['ticker']

            mutable_data1 = form1.data.copy()
            mutable_data1['ticker'] = request.session['ticker']
            form1 = search_form(mutable_data1)

            mutable_data0 = form0.data.copy()
            mutable_data0['ticker'] = form_stock['form0']
            form0 = search_form(mutable_data0)

            csv_page(request, 'max', 'form1')
            csv_page(request, 'minute', 'form1')


    context = {'form0': form0, 'form1': form1}
    context['ticker_name'] = request.session['ticker']
    return render(request, "data_page.html", context)