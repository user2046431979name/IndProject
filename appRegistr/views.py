from django.shortcuts import render,redirect
from appCinema.models import *
import json
from django.http import JsonResponse
from django.contrib.auth import logout,login,authenticate
from django.contrib.auth.models import User

def login_view(request):

    return render(request,"login.html")




def signup(request):
    return render(request,"signup.html")

def signup_func(request):
    if request.method == "POST":
        email = request.POST.get("email")
        username = request.POST.get("username")
        login_name = request.POST.get("login")
        password = request.POST.get("password")
        if User.objects.filter(username=username).exists():
            return JsonResponse({"success":False})
        else:
            user = User.objects.create_user(username=username,email=email,password=password)
            Account.objects.create(user=user,username=login_name)
            login(request,user)
            return JsonResponse({"success":True})


def login_func(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'success': True})
        elif user == None:
            return JsonResponse({'success':False})


def logout_view(request):
    logout(request)
    return redirect("index")

