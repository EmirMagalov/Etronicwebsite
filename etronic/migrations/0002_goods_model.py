# Generated by Django 4.2.3 on 2023-07-13 18:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('etronic', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='goods',
            name='model',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='etronic.model'),
        ),
    ]
