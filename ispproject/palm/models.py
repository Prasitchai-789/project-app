from django.db import models

# Create your models here.
class Rpo_po(models.Model):
    poinvid = models.CharField(max_length=50)
    docudate = models.DateField(auto_now_add=True)
    billid = models.CharField(max_length=50)
    vendorcardid = models.CharField(max_length=50)
    typecarid = models.CharField(max_length=50)
    goodib = models.FloatField(default=0)
    goodob = models.FloatField(default=0)
    goodnet = models.FloatField(default=0)
    price1 = models.FloatField(default=0)
    amnt1 = models.FloatField(default=0)
    price2= models.FloatField(default=0)
    amnt2 = models.FloatField(default=0)
    vendorcode = models.CharField(max_length=20)
    statusbill = models.CharField(max_length=20)
    grade = models.CharField(max_length=10)
    impurity = models.CharField(max_length=5)
    scaler = models.CharField(max_length=10)
    docutype = models.CharField(max_length=50)
    
    def __str__(self):
        return self.poinvid