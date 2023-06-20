from django.shortcuts import render,redirect
from django.utils.timezone import now
from django.http import HttpResponse
from .models import Person ,Ffb,Labtank,temp_dense,tank_volume
from django.contrib import messages
from django.db.models import Max,Subquery, OuterRef
from datetime import datetime,timedelta
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.db.models import Sum


# Create your views here.
# <=== line_notification ===>

        
# <=== index ===>
def login(request):
    return render(request,"login.html")

def index(request):
    all_person = Person.objects.all()
    return render(request,"index.html",{"all_person":all_person})

def form(request):
    if request.method == "POST":
        # รับข้อมูล
        name = request.POST["name"]
        age = request.POST["age"]
        print(name , age)
        
        # บันทึกข้อมูล
        person = Person.objects.create(
            name=name,
            age=age
        )
        person.save()
        messages.success(request,"บันทึกข้อมูลเรียบร้อย")
        # เปลี่ยนเส้นทาง
        return redirect("/")
    else :
        return render(request,"myapp/form.html")
    
def edit(request,person_id):
    if request.method == "POST":
        person = Person.objects.get(id=person_id)
        person.name = request.POST["name"]
        person.age = request.POST["age"]
        person.save()
        messages.success(request,"อัพเดทข้อมูลเรียบร้อย")
        return redirect("/")
    
    else :
   
        #ดึงข้อมูล
        person = Person.objects.get(id=person_id)
        return render(request,"myapp/edit.html",{"person":person})
    
def delete(request,person_id):
    person = Person.objects.get(id=person_id)
    person.delete()
    messages.success(request,"ลบข้อมูลเรียบร้อย")
    return redirect("/")


# <=== FFB ===>
def rpo_po(request):
    all_ffb = Ffb.objects.all().order_by('-docudate','-billid')
    current_date = datetime.now().date()  # วันปัจจุบัน
    total_sum = Ffb.objects.filter(docudate=current_date).aggregate(sum=Sum('goodnet'))
    total_count = Ffb.objects.filter(docudate=current_date).count()
    return render(request,"palm/rpo_po.html",{"all_ffb":all_ffb,'total_sum': total_sum['sum'],'total_count': total_count})




    # items_per_page = 20  # จำนวนรายการต่อหน้า

    # paginator = Paginator(all_ffb, items_per_page)
    # page = request.GET.get('page')
    # try:
    #     current_page = paginator.get_page(page)
    # except PageNotAnInteger:
    #     current_page = paginator.get_page(1)  # หากไม่ได้รับค่าหรือค่าไม่ถูกต้อง กำหนดให้เป็นหน้าแรก
    # return render(request, "palm/rpo_po.html", {'current_page': current_page})





def add(request):
    if request.method == "POST":
        # รับข้อมูล
        poinvid = request.POST["poinvid"]
        billid = request.POST["billid"]
        vendorcardid = request.POST["vendorcardid"]
        typecarid = request.POST["typecarid"]
        goodib = float(request.POST["goodib"])
        goodob = float(request.POST["goodob"])
        goodnet = float(goodib - goodob)
        price1 = float(request.POST["price1"])
        vendorcode = request.POST["vendorcode"]
        vendorname = request.POST["vendorname"]
        statusbill = request.POST["statusbill"]
        grade = request.POST["grade"]
        impurity = request.POST["impurity"]
        scaler = request.POST["scaler"]
        docutype = request.POST["docutype"]
        # print(poinvid,billid,vendorcardid,vendorname,typecarid,goodib,goodob,goodnet,vendorcode,statusbill,grade,impurity,scaler,docutype)
        
        # บันทึกข้อมูล
        ffb = Ffb.objects.create(
            poinvid=poinvid,
            billid=billid,
            vendorcardid=vendorcardid,
            typecarid=typecarid,
            goodib=goodib,
            goodob=goodob,
            goodnet=goodnet,
            price1=price1,
            vendorcode=vendorcode,
            vendorname=vendorname,
            statusbill=statusbill,
            grade=grade,
            impurity=impurity,
            scaler=scaler,
            docutype=docutype,
        )
        ffb.save()
        messages.success(request,"บันทึกข้อมูลเรียบร้อย")
        # เปลี่ยนเส้นทาง
        return redirect("/rpo_po")
    else :
        messages.success(request,"บันทึกข้อมูลไม่ได้")
        return render(request,"palm/rpo_po.html")
    

    
def edit_f(request,ffb_id):
    if request.method == "POST":
        ffb = Ffb.objects.get(id=ffb_id)
        ffb.poinvid = request.POST["poinvid"]
        ffb.billid = request.POST["billid"]
        ffb.vendorcardid = request.POST["vendorcardid"]
        ffb.typecarid = request.POST["typecarid"]
        ffb.goodib = float(request.POST["goodib"])
        ffb.goodob = float(request.POST["goodob"])
        ffb.goodnet = ffb.goodib - ffb.goodob
        ffb.price1 = float(request.POST["price1"])
        ffb.amnt1 = float(ffb.goodnet * ffb.price1)
        ffb.vendorcode = request.POST["vendorcode"]
        ffb.vendorname = request.POST["vendorname"]
        ffb.grade = request.POST["grade"]
        ffb.impurity = request.POST["impurity"]
        ffb.save()
        messages.success(request,"อัพเดทข้อมูลเรียบร้อย")
        return redirect("/rpo_po")
    
    else :
   
        #ดึงข้อมูล
        ffb = Ffb.objects.get(id=ffb_id)
        return render(request,"/rpo_po",{"ffb":ffb})
    
def delete_f(request,ffb_id):
        ffb = Ffb.objects.get(id=ffb_id)
        ffb.delete()
        messages.success(request,"ลบข้อมูลเรียบร้อย")
        return redirect("/rpo_po")
    



def rpo_soplan(request):
    return render(request,"palm/rpo_soplan.html")

# <=== SALE ===>

def soplan(request):
    return render(request,"sale/soplan.html")



# <=== LAB ===>

def labtank(request):
    all_labtank = Labtank.objects.all().order_by('-docudate')
    latest_labtank_subquery = Labtank.objects.values('tankid').annotate(latest_docudate=Max('docudate')).values('latest_docudate')

    all_labtank1 = Labtank.objects.filter(
        tankid=1,
        docudate__date=Subquery(latest_labtank_subquery.filter(tankid=1).values('latest_docudate')[:1])
    ).values('volume', 'tempid', 'ffa_top', 'moisture_top', 'dobi_top', 'ffa_low', 'moisture_low', 'dobi_low')

    all_labtank2 = Labtank.objects.filter(
        tankid=2,
        docudate__date=Subquery(latest_labtank_subquery.filter(tankid=2).values('latest_docudate')[:1])
    ).values('volume', 'tempid', 'ffa_top', 'moisture_top', 'dobi_top', 'ffa_low', 'moisture_low', 'dobi_low')

    all_labtank3 = Labtank.objects.filter(
        tankid=3,
        docudate__date=Subquery(latest_labtank_subquery.filter(tankid=3).values('latest_docudate')[:1])
    ).values('volume', 'tempid', 'ffa_top', 'moisture_top', 'dobi_top', 'ffa_low', 'moisture_low', 'dobi_low')

    all_labtank4 = Labtank.objects.filter(
        tankid=4,
        docudate__date=Subquery(latest_labtank_subquery.filter(tankid=4).values('latest_docudate')[:1])
    ).values('volume', 'tempid', 'ffa_top', 'moisture_top', 'dobi_top', 'ffa_low', 'moisture_low', 'dobi_low')

    return render(request, "lab/labtank.html", {
        "all_labtank": all_labtank,
        "all_labtank1": all_labtank1,
        "all_labtank2": all_labtank2,
        "all_labtank3": all_labtank3,
        "all_labtank4": all_labtank4,
            
        })


def add_labtank(request):
    if request.method == "POST":
        # รับข้อมูล
        docudate = request.POST["docudate"]
        tankid = request.POST["tankid"]
        level = float(request.POST["level"])
        tempid = float(request.POST["tempid"])
        
        dense = float(temp_dense.objects.get(tempid=tempid).cpo_dense)
        cpo_v = tank_volume.objects.get(tank_id=tankid).tank_v
        cpo_h = tank_volume.objects.get(tank_id=tankid).tank_high
        volume1 = (cpo_v * dense) / (cpo_h * 100)
        volume = round(level*volume1,3)
        
        ffa_top = float(request.POST["ffa_top"])
        moisture_top = float(request.POST["moisture_top"])
        dobi_top = float(request.POST["dobi_top"])
        ffa_low = float(request.POST["ffa_low"])
        moisture_low = float(request.POST["moisture_low"])
        dobi_low = float(request.POST["dobi_low"])
        user_rec = request.POST["user_rec"]
        

            
        print(docudate,tankid,level,tempid,volume,ffa_top,moisture_top,dobi_top,ffa_low,moisture_low,dobi_low,user_rec,)
        
        
        # บันทึกข้อมูล
        labtank = Labtank.objects.create(
            docudate=docudate,
            tankid=tankid,
            level=level,
            tempid=tempid,
            volume=volume,
            ffa_top=ffa_top,
            moisture_top=moisture_top,
            dobi_top=dobi_top,
            ffa_low=ffa_low,
            moisture_low=moisture_low,
            dobi_low=dobi_low,
            user_rec=user_rec,
        )
        labtank.save()
        messages.success(request,"บันทึกข้อมูลเรียบร้อย")
        # เปลี่ยนเส้นทาง
        return redirect("/labtank",{'labtank':Labtank})
    else :
        messages.success(request,"บันทึกข้อมูลไม่ได้")
        return render(request,"/labtank")
    

    
def edit_labtank(request,labtank_id):
    if request.method == "POST":
        labtank = Labtank.objects.get(id=labtank_id)
        labtank.docudate = request.POST["docudate"]
        labtank.tankid = request.POST["tankid"]
        labtank.level = request.POST["level"]
        labtank.tempid = float(request.POST["tempid"])
        
        level = float(request.POST["level"])
        tempid = float(request.POST["tempid"])
        dense = float(temp_dense.objects.get(tempid=tempid).cpo_dense)
        tankid = request.POST["tankid"]
        cpo_v = tank_volume.objects.get(tank_id=tankid).tank_v
        cpo_h = tank_volume.objects.get(tank_id=tankid).tank_high
        volume1 = (cpo_v * dense) / (cpo_h * 100)
        volume = round(level*volume1,3)
        
        
        labtank.volume = volume
        labtank.ffa_top = float(request.POST["ffa_top"])
        labtank.moisture_top = float(request.POST["moisture_top"])
        labtank.dobi_top = float(request.POST["dobi_top"])
        labtank.ffa_low = float(request.POST["ffa_low"])
        labtank.moisture_low = float(request.POST["moisture_low"])
        labtank.dobi_low = float(request.POST["dobi_low"])
        labtank.user_rec = request.POST["user_rec"]
        labtank.save()
        messages.success(request,"อัพเดทข้อมูลเรียบร้อย")
        return redirect("/labtank")
    
    else :
   
        #ดึงข้อมูล
        labtank = Labtank.objects.get(id=labtank_id)
        return render(request,"/labtank",{"labtank":labtank})
    
def delete_labtank(request,labtank_id):
        labtank = Labtank.objects.get(id=labtank_id)
        labtank.delete()
        messages.success(request,"ลบข้อมูลเรียบร้อย")
        return redirect("/labtank")


def volume2(request):
    volume1 = Labtank.objects.all()
    volume2 = Labtank.objects.filter(id=17).values('volume')

    return render(request,"lab/labtank.html", { "volume1": volume1,"volume2": volume2 })
    


def Webapp_Emp(request):
    emp = Webapp_Emp.objects.all()
    emp_name = Webapp_Emp.objects.filter().values('EmpName')
    return render(request,"sale/soplan.html",{ "emp": emp,"emp_name": emp_name })