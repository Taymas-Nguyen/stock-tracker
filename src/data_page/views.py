from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from .forms import search_form
from csv_page.views import csv_page
from cache import form_stock, form_ranges, cache_stock_max, cache_stock_minute, stock_visibility
import re

with open('./static/data_page.js', 'r') as file:
    for line in file:
        if 'amount_of_forms' in line:
            amount_of_forms = int(re.search(r"\d+", line).group())
            break
            
form_as_string = [f"form{i}" for i in range(amount_of_forms)]

# key = form name , value = search_form() objecy
form_dict = {}

def data_page(request):
    # update form_dict
    for i in form_as_string:
        form_dict[i] = search_form(request.POST)
        if i not in form_stock:
            form_stock[i] = ''


    # if user searches for stock from home page or refreshes page
    if request.method == "GET":
        print("ANISDIFSDFDSIFFFIDSFISDFDSUIFNSDFI")
        form_ranges.clear()
        cache_stock_max.clear()
        cache_stock_minute.clear()

        for i in range(amount_of_forms):
            if i != 0:
                form_stock[f"form{i}"] = ''
                stock_visibility[f"stock{i}"] = 'invisible'

        stock_visibility["stock0"] = 'show'
        mutable_data = form_dict['form0'].data.copy()
        mutable_data['ticker'] = form_stock['form0']
        form_dict['form0'] = search_form(mutable_data)

    # if user searches for ticker via button in data_page
    if request.method == "POST":
        request.session['ticker'] =  request.POST['ticker']
        for form_name in form_as_string:
            if form_name in request.POST:
                stock_number = f"stock{int(re.search(r"\d+", form_name).group())}"
                stock_visibility[stock_number] = 'show'

                form_stock[form_name] = request.session['ticker']
                mutable_data = form_dict[form_name].data.copy()
                mutable_data['ticker'] = request.session['ticker'] 
                form_dict[form_name] = search_form(mutable_data)
                csv_page(request, 'max', form_name)
                csv_page(request, 'minute', form_name)
            else:
                mutable_data = form_dict[form_name].data.copy()
                mutable_data['ticker'] = form_stock[form_name]
                form_dict[form_name] = search_form(mutable_data)

    context = {}
    for form_name in form_as_string:
        context[form_name] = form_dict[form_name]
    context['ticker_name'] = request.session['ticker']
    return render(request, "data_page.html", context)