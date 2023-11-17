from django.contrib import admin

# Register your models here.

from .models import Article, Category, Tags, Photo, Photo_tag
admin.site.register(Article)
admin.site.register(Category)
admin.site.register(Tags)
admin.site.register(Photo)
admin.site.register(Photo_tag)
