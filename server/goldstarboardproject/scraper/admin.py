from django.contrib import admin

from .models import HourlyData, Station, Streak

admin.site.register(Station)
admin.site.register(HourlyData)
admin.site.register(Streak)
