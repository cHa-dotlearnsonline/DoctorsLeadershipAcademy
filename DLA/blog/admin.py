from django.contrib import admin

# Register your models here.

from .models import Article, Category, Tags, Photo, Photo_tag
admin.site.register(Article)
admin.site.register(Category)
admin.site.register(Tags)
admin.site.register(Photo)
admin.site.register(Photo_tag)

# this part allowed me to change the name of the site in the administration panel
# from Django administration to Doctor's leadership Academy
admin.site.site_header = "Doctor's Leadership Academy"
admin.site.site_title = "DLA administration"
