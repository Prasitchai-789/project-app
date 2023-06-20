from django.contrib import admin
from .models import Rpo_po


class Rpo_poAdmin(admin.ModelAdmin):
    list_display = ['poinvid','docudate','billid','vendorcardid']
    
# Register your models here.
admin.site.register(Rpo_po, Rpo_poAdmin)