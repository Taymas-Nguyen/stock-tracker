from django.db import models

# Create your models here.
class search_model(models.Model):
    ticker = models.CharField(max_length=6)