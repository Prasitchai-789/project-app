from django.shortcuts import render,redirect
from django.http import HttpResponse
from .models import Rpo_po
from django.contrib import messages
# Create your views here.
def rpo_po(request):
    return render(request,"palm/rpo_po.html")