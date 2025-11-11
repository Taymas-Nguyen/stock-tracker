from django.urls import path
from . import views 
import json
import re

with open('./static/data_page.js', 'r') as file:
    for line in file:
        if 'amount_of_forms' in line:
            amount_of_forms = int(re.search(r"\d+", line).group())
            break

urlpatterns = [
]

for i in range(amount_of_forms):
    urlpatterns.append(path(f'max{i}/', views.csv_page))
    urlpatterns.append(path(f'minute{i}/', views.csv_page))