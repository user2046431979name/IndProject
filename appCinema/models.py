from django.db import models
from django.conf import settings










class Zhanre(models.Model):
    title = models.TextField()
    slug = models.SlugField(unique=True)

class Films(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    date = models.DateField()
    poster = models.ImageField()
    watch = models.PositiveIntegerField(default=0)
    zhanre = models.ForeignKey(Zhanre,on_delete=models.CASCADE)
    zhanre_title = models.CharField(max_length=255,default="",blank=True)
    description = models.TextField()
    likes = models.PositiveIntegerField(default=0)
    comments = models.PositiveIntegerField(default=0)

    def like_count(self):
        return self.like_set.count()

    def comment_count(self):
        return self.comment_set.count()

class Account(models.Model):
    ava = models.ImageField(blank=True)
    user = models.OneToOneField(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    username = models.CharField(max_length=255)
    date = models.DateTimeField(auto_now_add=True,blank=True)
    slug = models.SlugField(unique=True)
    saves_film = models.ManyToManyField(Films,blank=True)

class Comment(models.Model):
    user_acc = models.ForeignKey(Account,on_delete=models.CASCADE)
    user_ava = models.CharField(max_length=25251,default="media/default_user.png")
    username = models.CharField(max_length=255,default="")
    film = models.ForeignKey(Films,on_delete=models.CASCADE)
    film_title = models.CharField(max_length=255,default="")
    date = models.DateTimeField(auto_now_add=True)
    text_comment = models.TextField()

class Like(models.Model):
    user_acc = models.ForeignKey(Account,on_delete=models.CASCADE)
    film = models.ForeignKey(Films,on_delete=models.CASCADE)


class VideoFile(models.Model):
    film = models.ForeignKey(Films,on_delete=models.CASCADE)
    video = models.FileField()


