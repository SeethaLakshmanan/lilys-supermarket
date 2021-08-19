"""django_backend URL Configuration
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login_api/', include('login_api.urls'), name='login_api'),
    path('shopping_api/', include('shopping_api.urls'), name='shopping_api')
]
