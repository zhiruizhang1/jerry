# Generated by Django 3.2 on 2021-12-10 14:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hobbies', '0002_auto_20211210_2125'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='age',
            field=models.IntegerField(null=True),
        ),
    ]
