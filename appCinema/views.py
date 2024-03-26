import json
from django.db.models import Count
from django.shortcuts import render
from appCinema.models import *
from django.core.serializers import serialize
from django.http import JsonResponse
from django.conf import settings
from django.core.files.storage import default_storage
from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password


def about_us(request):
    return render(request,"About_us.html")

def index(request):
    return render(request,"Index.html")

def films(request):
    return render(request,"Films.html")

def aboutFilms(request,title):
    FilmObj = Films.objects.get(slug=title)
    if request.user.is_authenticated:
        accData = Account.objects.get(user = request.user)
    else:
        accData = "000"
    return render(request,"About_films.html",{"info":FilmObj,"accData":accData})

def watchFilms(request,title):
    FilmObj = Films.objects.get(slug=title)
    try:
        FilmVideo = VideoFile.objects.get(film=FilmObj)
        FilmObj.watch = FilmObj.watch + 1
        FilmObj.save()
    except:
        FilmVideo = "000"
    return render(request,"Watch_films.html",{"info":FilmVideo})

def profile(request):
    if Account.objects.get(user=request.user).ava:
        ava = f"media/{Account.objects.get(user=request.user).ava}"
    else:
        ava = "media/default_user.png"
    return render(request,"Profile.html",{"info":Account.objects.get(user=request.user),"ava":ava})




def saveFilm(request,title):
    if request.user.is_authenticated:
        acc = Account.objects.get(user=request.user)
        film = Films.objects.get(slug=title)

        if film in acc.saves_film.all():
            acc.saves_film.remove(film)
            return JsonResponse({"success":-1},safe=False)
        else:
            acc.saves_film.add(film)
            return JsonResponse({"success":1},safe=False)

def isSave(request,title):
    if request.user.is_authenticated:
        acc = Account.objects.get(user=request.user)
        film = Films.objects.get(slug=title)

        if film in acc.saves_film.all():
            return JsonResponse({"success": 1}, safe=False)
        else:
            return JsonResponse({"success": -1}, safe=False)
    else:
        return JsonResponse({"success": False}, safe=False)


def isLike(request,title):
    if request.user.is_authenticated:
        acc = Account.objects.get(user=request.user)
        film = Films.objects.get(slug=title)
        lObj = Like.objects.filter(user_acc = acc,film = film)

        if lObj:
            return JsonResponse({"success": 1}, safe=False)
        else:
            return JsonResponse({"success": -1}, safe=False)
    else:
        return JsonResponse({"success": False}, safe=False)

def getSaveFilms(request):
    if request.user.is_authenticated:
        acc = Account.objects.get(user = request.user)
        s_data = serialize("json",acc.saves_film.all())
        return JsonResponse(s_data,safe=False)

def getLikeFilms(request):
    if request.user.is_authenticated:
        acc = Account.objects.get(user = request.user)
        l_obj = Like.objects.filter(user_acc = acc)
        f_obj = []
        for i in l_obj:
            f_obj.append(i.film)
        return JsonResponse(serialize("json",f_obj),safe=False)

def getCommFilms(request):
    if request.user.is_authenticated:
        acc = Account.objects.get(user = request.user)
        c_obj = Comment.objects.filter(user_acc = acc)
        f_obj = []
        for i in c_obj:
            i.film_title = i.film.slug
            i.user_ava = i.film.poster
            i.username = i.film.title
            f_obj.append(i)
        return JsonResponse(serialize("json",f_obj),safe=False)
def getDataFilms(request,n):
    if request.method == "POST":
        if request.POST.get("type") == "search_title":
           title = request.POST.get("title")
           if title:
               films = Films.objects.filter(title__icontains=title)
               for i in films:
                   i.likes = i.like_count()
                   i.comments = i.comment_count()
                   i.zhanre_title = i.zhanre.title
               s_data = serialize("json",films)
           elif len(title) == 0:
               s_data = 0
           return JsonResponse(s_data,safe=False)
        elif request.POST.get("type") == "search_filter":
            if request.POST.get("filter") == "likes":
                films_with_likes = Films.objects.annotate(like_count=Count('like'))
                if request.POST.get("zhanre"):
                    films = films_with_likes.filter(zhanre = Zhanre.objects.get(slug = request.POST.get("zhanre"))).order_by("like_count")[:25]
                else:
                    films = films_with_likes.order_by("like_count")[:25]
                for i in films:
                    i.likes = i.like_count
                    i.comments = i.comment_count
                    i.zhanre_title = i.zhanre.title
                data = serialize("json",films)
                return JsonResponse(data,safe=False)
            elif request.POST.get("filter") == "watches":
                if request.POST.get("zhanre"):
                    films = Films.objects.filter(zhanre = Zhanre.objects.get(slug = request.POST.get("zhanre"))).order_by("watch")[:25]
                else:
                    films = Films.objects.all().order_by("watch")[:25]
                for i in films:
                    i.likes = i.like_count()
                    i.comments = i.comment_count()
                    i.zhanre_title = i.zhanre.title
                data = serialize("json",films)
                return JsonResponse(data,safe=False)
            elif request.POST.get("filter") == "dates":
                if request.POST.get("zhanre"):
                    films = Films.objects.filter(zhanre = Zhanre.objects.get(slug = request.POST.get("zhanre"))).order_by("date")[:25]
                else:
                    films = Films.objects.all().order_by("date")[:25]
                for i in films:
                    i.likes = i.like_count()
                    i.comments = i.comment_count()
                    i.zhanre_title = i.zhanre.title
                data = serialize("json",films)
                return JsonResponse(data,safe=False)
            else:
                if request.POST.get("zhanre"):
                    films = Films.objects.filter(zhanre=Zhanre.objects.get(slug=request.POST.get("zhanre")))
                    for i in films:
                         i.likes = i.like_count()
                         i.comments = i.comment_count()
                         i.zhanre_title = i.zhanre.title
                    data = serialize("json",films)
                    return JsonResponse(data,safe=False)
                else:
                    return JsonResponse(serialize("json",Films.objects.all()[:25]),safe=False)
    elif request.method == "GET":
        films = Films.objects.all().order_by("?")[:n]
    for i in films:
        i.likes = i.like_count()
        i.comments = i.comment_count()
        i.zhanre_title = i.zhanre.title
    serialized_data = serialize('json',films)
    return JsonResponse(serialized_data, safe=False)




def LikeFilm(request,title):
    if request.user.is_authenticated:
            film = Films.objects.get(slug = title)
            user = Account.objects.get(user = request.user)
            obj = Like.objects.filter(user_acc = user,film = film)
            if obj:
                obj.delete()
                return JsonResponse({"success":-1},safe=True)
            else:
                Like.objects.create(user_acc=user, film=film)
                return JsonResponse({"success":True},safe=False)
    else:
        return JsonResponse({"success": False}, safe=False)


def is_user(request):
    if request.user.is_authenticated:
        return JsonResponse({"is_user":True},safe=True)
    else:
        return JsonResponse({"is_user":False},safe=True)

def getDataComment(request,title):
    FilmObj = Films.objects.get(slug = title)
    comments = Comment.objects.filter(film = FilmObj)
    for i in comments:
        i.username = i.user_acc.username
        i.film_title = i.film.title
        i.user_ava = i.user_acc.ava
    s_data = serialize("json",comments)
    return JsonResponse(s_data,safe=False)

def saveDataComment(request):
    if request.method == 'POST':
        username = User.objects.get(username = request.POST.get("username"))
        film = Films.objects.get(slug = request.POST.get("film_slug"))
        user_acc = Account.objects.get(user = username)
        text = request.POST.get("text")
        try:
          Comment.objects.create(user_acc = user_acc,film = film,text_comment = text)
          return JsonResponse({"success":True},safe=False)
        except:
            return JsonResponse({"success": False}, safe=False)


def deleteDataComment(request,id):
    if request.user.is_authenticated:
        try:
           commObj = Comment.objects.get(id = id)
           commObj.delete()
           return JsonResponse({"success":1},safe=False)
        except:
            return JsonResponse({"success":-1},safe=False)



def getZhanres(request):
    zhanres = Zhanre.objects.all()
    data = serialize("json",zhanres)
    return JsonResponse(data,safe=False)



def changeAccount(request):
    if request.method == "POST":
        new_ava = request.FILES.get("new_ava")
        data = request.POST
        password = data.get("password")
        user = request.user
        if check_password(password, user.password):
            if data.get("new_username"):
               user = User.objects.get(username=request.user.username)
               user.username = data.get("new_username")
               user.save()
               return JsonResponse({"success":True},safe=False)
            if data.get("new_login"):
                acc = Account.objects.get(user = request.user)
                acc.username = data.get("new_login")
                acc.save()
                return JsonResponse({"success":True},safe=False)
            if new_ava:
                file_path = default_storage.save(f"{new_ava.name}", new_ava)

                acc = Account.objects.get(user=request.user)

                acc.ava = file_path

                acc.save()
                return JsonResponse({"success":True},safe=False)
            else:
                return JsonResponse({"success":False})
        else:
            return JsonResponse({"success":False},safe=False)


