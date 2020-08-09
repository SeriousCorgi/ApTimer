from django.urls import path, include

from .views import frontend_view

urlpatterns = [
    path('', frontend_view),
]