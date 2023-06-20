from django.contrib import admin
from django.urls import path, re_path
from django.urls.conf import include
from . import views
urlpatterns = [
    path('',views.index),
    path('form',views.form),
    path('edit/<int:person_id>',views.edit),
    path('delete/<int:person_id>',views.delete),
    path('login',views.login),
    
#<== RPO ==>

    path('rpo_po',views.rpo_po),
    path('add',views.add),
    path('delete_f/<ffb_id>',views.delete_f),
    path('edit_f/<int:ffb_id>',views.edit_f),
    
    path('rpo_soplan',views.rpo_soplan),

#<== sale ==>    
    path('soplan',views.soplan),
    
    
#<== LAB ==>    
    path('labtank',views.labtank),
    path('add_labtank',views.add_labtank),
    path('delete_labtank/<labtank_id>',views.delete_labtank),
    path('edit_labtank/<int:labtank_id>',views.edit_labtank),
]