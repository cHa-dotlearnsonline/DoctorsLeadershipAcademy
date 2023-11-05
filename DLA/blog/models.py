from django.db import models
from django_quill.fields import QuillField
from django.utils.html import format_html 

# Create your models here.
class Category(models.Model):
    category = models.CharField(max_length=255)

    def __str__(self):
        return self.category

class Tags(models.Model):
    tag = models.CharField(max_length=255)
    def __str__(self):
        return self.tag
    
class Article(models.Model):
    title = models.CharField(max_length = 200, blank=True)
    content = QuillField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    cover = models.ImageField(upload_to="images/", blank=True)
    categories = models.ManyToManyField('Category', related_name="articles")
    tags = models.ManyToManyField('Tags', related_name="articles")

    def __str__(self):
        return self.title