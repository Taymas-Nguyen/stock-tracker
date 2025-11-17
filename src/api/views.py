from django.http import JsonResponse
from cache import form_stock, form_ranges
from django.views.decorators.csrf import csrf_exempt
import json
import re

@csrf_exempt
def get_range(request):
    try:
        return JsonResponse({'range' : form_ranges[json.loads(request.body).get('stock_number')]})
    except:
        return JsonResponse({'range' : None})
    
@csrf_exempt
def change_range(request):
    form_name = json.loads(request.body).get('stock_number')
    new_range = json.loads(request.body).get('new_range')
    form_ranges[form_name] = new_range
    return JsonResponse({'None': None})

@csrf_exempt
def get_stock(request):
    form_name = f"form{int(re.search(r"\d+", json.loads(request.body).get('stock_number')).group())}"
    return JsonResponse({'stock': form_stock[form_name] if form_stock[form_name] != "" else None})