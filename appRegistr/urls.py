from django.contrib import admin
from django.urls import path, include
from appRegistr.views import *

urlpatterns = [
     path("login/",login_view,name="login"),
     path("login_func/", login_func),

     path("signup/", signup,name="signup"),
     path("signup_func/", signup_func),
     path("logout/",logout_view,name="logout")
]