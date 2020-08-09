from django.shortcuts import render
from django.db.models import F

from .models import Counter

# Create your views here.
def frontend_view(request):
    counter, _ = Counter.objects.get_or_create(name = 'Counter')
    count = counter.count

    counter.count = F('count') + 1
    counter.save( update_fields=["count"] )

    return render(request, 'index.html', {"count": count,})