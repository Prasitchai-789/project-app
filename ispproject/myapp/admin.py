from django.contrib import admin
from .models import Person,Ffb,temp_dense,Labtank,Webapp_Emp

# Register your models here.
admin.site.register(Person)
admin.site.register(Ffb)
admin.site.register(Labtank)
admin.site.register(temp_dense)
admin.site.register(Webapp_Emp)
