# Generated by Django 4.2.7 on 2023-11-04 19:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0003_mentorshiparticle_created_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='mentorshiparticle',
            name='hero_image',
        ),
        migrations.AddField(
            model_name='mentorshiparticle',
            name='cover',
            field=models.ImageField(blank=True, upload_to='images/'),
        ),
    ]
