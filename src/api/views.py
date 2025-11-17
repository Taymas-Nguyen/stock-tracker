from django.http import JsonResponse
from cache import form_stock, form_ranges
from django.views.decorators.csrf import csrf_exempt
import json

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
    return JsonResponse({'reponse': new_range})