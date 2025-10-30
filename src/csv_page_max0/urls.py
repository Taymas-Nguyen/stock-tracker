from django.urls import path
from . import views 

urlpatterns = [
    path('', views.csv_page_max0),
    path('max0', views.csv_page_max0),
    path('max1', views.csv_page_max0),
]