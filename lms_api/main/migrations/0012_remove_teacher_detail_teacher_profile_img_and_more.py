# Generated by Django 5.0.4 on 2024-11-29 19:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0011_alter_chapter_description_alter_chapter_remarks_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='teacher',
            name='detail',
        ),
        migrations.AddField(
            model_name='teacher',
            name='profile_img',
            field=models.ImageField(null=True, upload_to='teacher_imgs/'),
        ),
        migrations.AlterField(
            model_name='course',
            name='techs',
            field=models.TextField(blank=True),
        ),
    ]
