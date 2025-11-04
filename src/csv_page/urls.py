from django.urls import path
from . import views 

urlpatterns = [

    path('max0/', views.csv_page),
    path('minute0/', views.csv_page),
    
    path('max1/', views.csv_page),
    path('minute1/', views.csv_page),
]