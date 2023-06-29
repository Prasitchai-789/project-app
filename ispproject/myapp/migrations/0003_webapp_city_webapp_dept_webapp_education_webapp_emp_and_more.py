# Generated by Django 4.2.1 on 2023-06-29 04:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0002_soplan_alter_ffb_statusbill'),
    ]

    operations = [
        migrations.CreateModel(
            name='Webapp_City',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('SubDistrictID', models.CharField(max_length=255, null=True)),
                ('SubDistrictName', models.CharField(max_length=255, null=True)),
                ('DistrictID', models.CharField(max_length=255, null=True)),
                ('DistrictName', models.CharField(max_length=255, null=True)),
                ('ProvinceID', models.CharField(max_length=255, null=True)),
                ('ProvinceName', models.CharField(max_length=255, null=True)),
            ],
            options={
                'db_table': 'Webapp_City',
            },
        ),
        migrations.CreateModel(
            name='Webapp_Dept',
            fields=[
                ('DeptID', models.CharField(max_length=255, primary_key=True, serialize=False)),
                ('DeptName', models.CharField(max_length=255, null=True)),
                ('DeptShort', models.CharField(max_length=255, null=True)),
            ],
            options={
                'db_table': 'Webapp_Dept',
            },
        ),
        migrations.CreateModel(
            name='Webapp_Education',
            fields=[
                ('EduID', models.CharField(max_length=255, primary_key=True, serialize=False)),
                ('EduName', models.CharField(max_length=255, null=True)),
            ],
            options={
                'db_table': 'Webapp_Education',
            },
        ),
        migrations.CreateModel(
            name='Webapp_Emp',
            fields=[
                ('EmpID', models.AutoField(primary_key=True, serialize=False)),
                ('IDCardNumber', models.CharField(max_length=255, null=True)),
                ('EmpCode', models.CharField(max_length=255, null=True)),
                ('EmpTitle', models.CharField(max_length=255, null=True)),
                ('EmpName', models.CharField(max_length=255, null=True)),
                ('Position', models.CharField(max_length=255, null=True)),
                ('DeptID', models.CharField(max_length=255, null=True)),
                ('BeginWorkDate', models.CharField(max_length=255, null=True)),
                ('BirthDay', models.CharField(max_length=255, null=True)),
                ('EduID', models.CharField(max_length=255, null=True)),
                ('ReligionID', models.CharField(max_length=255, null=True)),
                ('Address', models.CharField(max_length=255, null=True)),
                ('SubDistID', models.CharField(max_length=255, null=True)),
                ('DistID', models.CharField(max_length=255, null=True)),
                ('ProvinceID', models.CharField(max_length=255, null=True)),
                ('ZipCode', models.CharField(max_length=255, null=True)),
            ],
            options={
                'db_table': 'Webapp_Emp',
            },
        ),
        migrations.CreateModel(
            name='Webapp_EmpTitle',
            fields=[
                ('EmpTitleID', models.CharField(max_length=255, primary_key=True, serialize=False)),
                ('EmpTitleName', models.CharField(max_length=255, null=True)),
                ('EmpTitleEmg', models.CharField(max_length=255, null=True)),
            ],
            options={
                'db_table': 'Webapp_EmpTitle',
            },
        ),
        migrations.CreateModel(
            name='Webapp_Religion',
            fields=[
                ('ReligionID', models.CharField(max_length=255, primary_key=True, serialize=False)),
                ('ReligionName', models.CharField(max_length=255, null=True)),
            ],
            options={
                'db_table': 'Webapp_Religion',
            },
        ),
    ]