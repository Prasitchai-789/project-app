from django.contrib import admin
from django.urls import path, re_path
from . import views

urlpatterns = [
    path('rpo_po',views.rpo_po)
    
    
]