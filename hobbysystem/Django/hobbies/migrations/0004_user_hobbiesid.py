# Generated by Django 3.2 on 2021-12-12 05:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('hobbies', '0003_user_age'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='HobbiesID',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='hobbies.hobbies'),
        ),
    ]
