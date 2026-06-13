from django.contrib import admin

from .models import (
    ColdStreakAward,
    DailyData,
    HotStreakAward,
    HourlyData,
    LeastGoldStarAward,
    MostGoldStarAward,
    Station,
    Streak,
)

admin.site.register(Station)
admin.site.register(HourlyData)
admin.site.register(Streak)
admin.site.register(DailyData)
admin.site.register(HotStreakAward)
admin.site.register(ColdStreakAward)
admin.site.register(MostGoldStarAward)
admin.site.register(LeastGoldStarAward)
