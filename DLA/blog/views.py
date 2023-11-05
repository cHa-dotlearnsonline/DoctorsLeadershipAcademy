from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request, "blog/index.html")

def category(request, category):
    #the part that will render all the articles under a particular category
    pass 


def read(request, id):
    # this part will render articles to read
    pass