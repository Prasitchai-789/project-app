from django.db import models
from django.utils import timezone


# Create your models here.
class Person(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name
    
class Ffb(models.Model):
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
    price2 = models.FloatField(default=0)
    amnt2 = models.FloatField(default=0)
    vendorcode = models.CharField(max_length=20)
    vendorname = models.CharField(max_length=100)
    statusbill = models.CharField(max_length=10, default='N', null=True)
    grade = models.CharField(max_length=10)
    impurity = models.CharField(max_length=5)
    scaler = models.CharField(max_length=5)
    docutype = models.IntegerField()
    
    def __str__(self):
        self.statusbill = 'N'
        self.save()
        return self.vendorname
    
class Labtank(models.Model):
    create_at = models.DateTimeField(auto_now_add=True)
    docudate = models.DateTimeField()
    tankid = models.CharField(max_length=255, null=True)
    level = models.FloatField(default=0)
    tempid = models.FloatField(default=0)
    volume = models.FloatField(default=0)
    ffa_top = models.FloatField(default=0)
    moisture_top = models.FloatField(default=0)
    dobi_top = models.FloatField(default=0)
    ffa_low = models.FloatField(default=0)
    moisture_low = models.FloatField(default=0)
    dobi_low = models.FloatField(default=0)
    user_rec = models.CharField(max_length=255, null=True)
    sector = models.CharField(max_length=255, null=True)
    softDeletes = models.DateTimeField(null=True)
    
    # class Meta:
    #     db_table = 'labtanks'
    
    def __str__(self):
        return self.tankid
    

class temp_dense(models.Model):
    tempid = models.IntegerField(default=0)
    cpo_dense = models.FloatField(default=0)
    
    def __str__(self):
        return self.tempid
    
class tank_volume(models.Model):
    tank_id = models.CharField(max_length=5)
    tank_high = models.FloatField(default=0)
    tank_r = models.FloatField(default=0)
    tank_v = models.FloatField(default=0)
    
    def __str__(self):
        return self.tank_id
    
    
class SOPlan(models.Model):
    sopid = models.AutoField(primary_key=True)
    SOPDate = models.DateField(null=True)
    GoodID = models.IntegerField(null=True)
    GoodName = models.CharField(max_length=128, null=True)
    NumberCar = models.CharField(max_length=50, null=True)
    DriverName = models.CharField(max_length=128, null=True)
    CustID = models.IntegerField(null=True)
    Recipient = models.CharField(max_length=128, null=True)
    AmntLoad = models.IntegerField(null=True)
    IBWei = models.IntegerField(null=True)
    OBWei = models.IntegerField(null=True)
    NetWei = models.IntegerField(null=True)
    GoodPrice = models.FloatField(null=True)
    GoodAmnt = models.DecimalField(max_digits=19, decimal_places=4, null=True)
    Status = models.CharField(max_length=20, default='W', null=True)
    ReceivedDate = models.DateTimeField(null=True)
    Remarks = models.TextField(null=True)

    class Meta:
        db_table = 'SOPlan'
    def __str__(self):
        return self.Goodname