from django.contrib import admin

from .models import Award, DailyData, HourlyData, Station, Streak

admin.site.register(Station)
admin.site.register(HourlyData)
admin.site.register(Streak)
admin.site.register(DailyData)
admin.site.register(Award)
