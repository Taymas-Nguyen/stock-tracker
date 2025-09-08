from django.http import HttpResponse
from django.shortcuts import render, redirect
from .forms import search_form
from data_page.views import data_page

def home_page(request):    
    form = search_form()
    context = {'form': form}

    # when user searches for query and presses enter
    if request.method == "POST":
        form = search_form(request.POST)
            
        # go to data page when ticker is submitted
        # all information in request is stored in session
        # TODO verify ticker exists
        request.session['ticker'] =  request.POST['ticker']    
        return redirect("/data_page/")
            
    return render(request, "home_page.html", context)  