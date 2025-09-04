from django.http import HttpResponse
from django.shortcuts import render, redirect
from .forms import search_form
import yahoo

def data_page(request):
    form = search_form()
    context = {'form': form}

    # user searches for ticker  via button in data_page
    # else get ticker from home_page
    if request.method == "POST":
        ticker = request.POST['ticker']
        print(ticker)    
    else:
        # retrieve information from session from home_page
        ticker = request.session['ticker'] 

    # --------------- HARD CODED VALUE ---------------
    ticker = "aapl"
    # --------------- HARD CODED VALUE ---------------

    yahoo.get_info(ticker)

    print(ticker)    
    return render(request, "data_page.html", context)