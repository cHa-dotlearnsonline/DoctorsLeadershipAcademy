from django.contrib import admin

# Register your models here.

from .models import mentorshipArticle
@admin.register(mentorshipArticle)
class mentorshipArticleAdmin(admin.ModelAdmin):
    pass