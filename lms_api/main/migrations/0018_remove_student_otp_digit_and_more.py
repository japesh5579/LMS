# Generated by Django 5.0.4 on 2024-11-30 18:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0017_student_otp_digit_student_verify_status_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='student',
            name='otp_digit',
        ),
        migrations.RemoveField(
            model_name='student',
            name='verify_status',
        ),
        migrations.RemoveField(
            model_name='teacher',
            name='otp_digit',
        ),
        migrations.RemoveField(
            model_name='teacher',
            name='verify_status',
        ),
    ]
