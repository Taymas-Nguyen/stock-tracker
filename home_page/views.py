from django.http import HttpResponse
from django.shortcuts import render

def home_page(request):
    print("AASD")
    return render(request, "home_page.html")