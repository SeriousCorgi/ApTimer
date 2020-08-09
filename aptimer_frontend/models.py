from django.db import models
from django.db import models


# Create your models here.
class Counter(models.Model):
    name = models.CharField(max_length=7, primary_key=True)
    count = models.IntegerField(default=0,)
