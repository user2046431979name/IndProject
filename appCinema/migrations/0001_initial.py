# Generated by Django 4.2.10 on 2024-03-13 10:02

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Account',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ava', models.ImageField(upload_to='')),
                ('username', models.CharField(max_length=255)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('slug', models.SlugField(unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Films',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('slug', models.SlugField(unique=True)),
                ('date', models.DateField()),
                ('poster', models.ImageField(upload_to='')),
                ('watch', models.PositiveIntegerField(default=0)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Zhanre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.TextField()),
                ('slug', models.SlugField(unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='VideoFile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('video', models.FileField(upload_to='')),
                ('film', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='appCinema.films')),
            ],
        ),
        migrations.CreateModel(
            name='Like',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('film', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='appCinema.films')),
                ('user_acc', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='appCinema.account')),
            ],
        ),
        migrations.AddField(
            model_name='films',
            name='zhanre',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='appCinema.zhanre'),
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('text_comment', models.TextField()),
                ('film', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='appCinema.films')),
                ('user_acc', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='appCinema.account')),
            ],
        ),
        migrations.AddField(
            model_name='account',
            name='saves_film',
            field=models.ManyToManyField(to='appCinema.films'),
        ),
        migrations.AddField(
            model_name='account',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
