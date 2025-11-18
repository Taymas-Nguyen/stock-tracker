from django.urls import path
from . import views

urlpatterns = [
    path('js-py-api-getRange', views.get_range),
    path('js-py-api-changeRange', views.change_range),
    path('js-py-api-getStock', views.get_stock),
    path('js-py-api-getVisibility', views.get_visibility),
    path('js-py-api-changeVisibility', views.change_visibility)
]