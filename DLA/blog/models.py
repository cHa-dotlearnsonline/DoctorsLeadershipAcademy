from django.db import models
from django_quill.fields import QuillField
from django.utils.html import format_html 

# Create your models here.

class mentorshipArticle(models.Model):
    title = models.CharField(max_length = 200, blank=True)
    content = QuillField()
    def __str__(self):
        return self.title