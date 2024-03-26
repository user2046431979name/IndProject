from django.contrib import admin
from django.urls import path, include
from appCinema.views import *

urlpatterns = [
    path("",index,name="index"),
    path("Films/",films,name="films"),
    path("About/<slug:title>",aboutFilms,name="about_films"),
    path("Watch/<slug:title>", watchFilms, name="watch_films"),
    path("Profile",profile,name="profile"),
    path("About_us/",about_us,name="about"),

    path("changeAccount/",changeAccount),
    path("getZhanres/",getZhanres),
    path("getCommFilm/",getCommFilms),
    path("isLike/<slug:title>",isLike),
    path("isSave/<slug:title>",isSave),
    path("getLikeFilm/", getLikeFilms),
    path("getSaveFilm/",getSaveFilms),
    path("saveFilm/<slug:title>",saveFilm),
    path("deleteDataComment/<int:id>",deleteDataComment),
    path("isUser/",is_user),
    path("Like/<slug:title>",LikeFilm),
    path("getDataFilms/<int:n>",getDataFilms),
    path("getDataComments/<slug:title>", getDataComment),
    path("sendComment",saveDataComment),
]