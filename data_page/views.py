from django.http import HttpResponse
from django.shortcuts import render, redirect
from .forms import search_form

def data_page(request):
    form = search_form()
    context = {'form': form}
    # retrieve information from session
    ticker = request.session['ticker'] 
    print(ticker)    
    return render(request, "data_page.html", context)