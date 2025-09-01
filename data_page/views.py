from django.http import HttpResponse
from django.shortcuts import render
from .forms import search_form

def data_page(request):
    form = search_form()
    # when user searches for query and presses enter
    if request.method == "POST":
        form = search_form(request.POST)
        if form.is_valid():
            print(request.POST['ticker'])
            
            
        return render(request, "data_page")
            
    context = {'form': form}
    return render(request, "home_page.html", context)  