from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from .forms import search_form
from csv_page.views import csv_page
from cache import form_stock, form_ranges, cache_stock_max, cache_stock_minute
import re
from django.views.decorators.csrf import csrf_exempt
import json 

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


    # if user searches for stock from home page
    if request.method == "GET":
        form_ranges.clear()
        cache_stock_max.clear()
        cache_stock_minute.clear()

        for i in form_as_string:
            if i != 'form0':
                form_stock[i] = ''

        mutable_data = form_dict['form0'].data.copy()
        mutable_data['ticker'] = form_stock['form0']
        form_dict['form0'] = search_form(mutable_data)

    # if user searches for ticker via button in data_page
    if request.method == "POST":
        request.session['ticker'] =  request.POST['ticker']
        for form_name in form_as_string:
            if form_name in request.POST:
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

@csrf_exempt
def get_range(request):
    try:
        return JsonResponse({'range' : form_ranges[json.loads(request.body).get('stock_number')]})
    except:
        return JsonResponse({'range' : None})
    
@csrf_exempt
def change_range(request = None):
    form_name = json.loads(request.body).get('stock_number')
    new_range = json.loads(request.body).get('new_range')
    form_ranges[form_name] = new_range
    return JsonResponse({'reponse': new_range})