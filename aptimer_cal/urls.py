from django.urls import path, include
from rest_framework import routers

from .views import CalView

router = routers.DefaultRouter()

# router.register(r'cal', CalView, basename="cal")

urlpatterns = [
    path('cal', CalView.as_view(), name="cal")
]
