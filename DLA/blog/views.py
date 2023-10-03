from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request, "blog/index.html")

def mentorship(request):
    #the part that will render articles about mentorhsip
    pass 
# TODO: Complete the Landing Page i.e index page. 
# TODO: Complete the menthorship view
# 

def health(request):
    # this part will render health articles
    # this will make it so easy for me to add quill as it will
    # only need for me to add quill to the admin module
    pass
