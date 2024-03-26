from django.contrib import admin
from appCinema.models import *

class FilmsAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug':('title',)}

class accountAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug':('username',)}

class ZhanreAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug':('title',)}

admin.site.register(Films,FilmsAdmin)
admin.site.register(Like)
admin.site.register(Account,accountAdmin)
admin.site.register(Zhanre,ZhanreAdmin)
admin.site.register(VideoFile)
admin.site.register(Comment)


