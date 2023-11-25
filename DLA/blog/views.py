from django.shortcuts import render
import json
from django.http import JsonResponse
from django.http import HttpResponse
from .models import Category, Tags, Article, Photo, Photo_tag
# Create your views here.

def index(request):
    return render(request, "blog/index.html")

def category(request, category):
    #the part that will render all the articles under a particular category
    # if the word is category the it will show everything in the category
    # otherwise it will look up all the categories and show that instead
    if request.method == "POST":
        data = json.loads(request.body)
        number = data.get("number")
        category1 = data.get("category")
        category_tag= Category.objects.get(category=str(category1))
        the_articles = Article.objects.filter(categories=category_tag).order_by("-created")[:number]
        articles_to_display = [article.serialize() for article in the_articles]
        return JsonResponse(articles_to_display, safe=False)
    else:
        if str(category) == "category":
            # get all the categories
            my_categories = []
            listed_categories = []
            all_categories = Category.objects.all()
            for cate in all_categories:
                all_these = Article.objects.filter(categories = cate)
                new_cate = [cate, all_these]
                my_categories.append(new_cate)
                listed_categories.append(cate)
            return render(request, 'blog/category.html', {"categories": my_categories, "listed": listed_categories})
        elif str(category) != 'category':
            #get the name of the category that has been passed and then just render that specific category
            try:
                interested_cat = Category.objects.get(category= str(category))
                #interested_id = interested_cat.id
                all_articles = Article.objects.filter(categories = interested_cat)
                return render(request, 'blog/category.html', {"articles": all_articles, "category": category})
            except Category.DoesNotExist:
                return render (request, 'blog/category.html', {"error": f"Sorry the category: {category} DOES NOT EXIST"})



def read(request, id):
    # this part will render articles to read
    try:
        article = Article.objects.get(pk=id)
        return render(request, 'blog/read.html', {"article": article})
    except article.DoesNotExist:
        return render(request, 'blog/read.html', {"error": "Sorry We don't have that Article"})  

def gallery(request):
    # will display the photos
    if request.method == "POST":
        data = json.loads(request.body)
        if data.get("photos") == "all":
            all_photos = Photo.objects.all()
            all_photos = all_photos.order_by("-date_uploaded")
            photos = [photo.serialize() for photo in all_photos]

            return JsonResponse(photos, safe=False)
    else:
        return render(request, 'blog/photo.html')