# Generated by Django 3.2 on 2021-12-12 06:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hobbies', '0006_auto_20211212_1331'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='hobby',
            field=models.ManyToManyField(to='hobbies.Hobbies'),
        ),
        migrations.DeleteModel(
            name='UH',
        ),
    ]
