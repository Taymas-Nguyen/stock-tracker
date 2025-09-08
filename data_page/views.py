from django.http import HttpResponse
from django.shortcuts import render, redirect
from .forms import search_form
from csv_page.views import csv_page
def data_page(request):
    form = search_form()
    context = {'form': form}

    # if user searches for ticker via button in data_page
    # else get ticker from home_page
    if request.method == "POST":
        request.session['ticker'] =  request.POST['ticker']    

    csv_page(request)
 
    return render(request, "data_page.html", context)