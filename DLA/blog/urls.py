from django.urls import path
from . import views 
from django.conf.urls.static import static
from django.conf import settings
urlpatterns = [
    path("", views.index, name="index"),
    path("category/<str:category>", views.category, name="category"),
    path("read/<int:id>", views.read, name="read"),
    path("gallery", views.gallery, name="gallery" )
]


urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)