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
    caption = models.CharField(max_length=500, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    cover = models.ImageField(upload_to="articleImages", blank=True)
    categories = models.ManyToManyField('Category', related_name="articles")
    tags = models.ManyToManyField('Tags', related_name="articles")

    def __str__(self):
        return self.title
    def serialize(self):
        return {
            "id": self.id,
            "caption": self.caption,
            "title": self.title,
            "photo": self.cover.url  
        }
class Photo_tag(models.Model):
    tag = models.CharField(max_length=255)
    def __str__(self):
        return self.tag

class Photo(models.Model):
    """This is meant to be a store for photos for the organisation to upload"""
    caption = models.CharField(max_length=500, blank=True)
    photo = models.ImageField(upload_to="dla_pictures")
    tag = models.ForeignKey("Photo_tag", blank=True, on_delete=models.DO_NOTHING)
    date_uploaded = models.DateTimeField(auto_now_add=True)
    date_changed = models.DateTimeField(auto_now=True)
    
    def serialize(self):
        return {
            "id": self.id,
            "caption": self.caption,
            "photo": self.photo.url,
            "tag": self.tag.tag,
            "date-uploaded": self.date_uploaded.strftime("%d/%m/%Y"),
            "date-changed": self.date_changed.strftime("%d/%m/%Y, %H:%M:%S")
        }

