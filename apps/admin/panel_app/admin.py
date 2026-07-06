from django.contrib import admin

from .models import Awards, DailyData, HistoricalStats, HourlyData, Stations, Stats


@admin.register(Stations)
class StationsAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "wu_id", "created_at")
    search_fields = ("name", "wu_id")
    readonly_fields = ("created_at", "updated_at")

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)

        if not change:
            Stats.objects.create(station=obj, star=0, hot_streak=0, cold_streak=0)
            HourlyData.objects.create(station=obj, metric_data={}, imperial_data={})


@admin.register(Stats)
class StatsAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "get_station_wu_id",
        "star",
        "hot_streak",
        "cold_streak",
        "last_day_since_star",
    )
    list_filter = ("star",)
    search_fields = ("station__wu_id", "station__name")
    readonly_fields = ("created_at", "updated_at")

    @admin.display(ordering="station__wu_id", description="Station WU ID")
    def get_station_wu_id(self, obj):
        return obj.station_id


@admin.register(Awards)
class AwardsAdmin(admin.ModelAdmin):
    list_display = ("id", "station_id", "year", "title", "type", "rank", "score")
    list_filter = ("year", "type")
    search_fields = ("station__wu_id", "title")
    readonly_fields = ("created_at", "updated_at")


@admin.register(DailyData)
class DailyDataAdmin(admin.ModelAdmin):
    list_display = ("id", "station_id", "star_status", "created_at")
    list_filter = ("star_status",)
    search_fields = ("station__wu_id",)
    readonly_fields = ("created_at", "updated_at")


@admin.register(HistoricalStats)
class HistoricalStatsAdmin(admin.ModelAdmin):
    list_display = ("id", "station_id", "year", "star", "hot_streak", "cold_streak")
    list_filter = ("year",)
    search_fields = ("station__wu_id",)
    readonly_fields = ("created_at", "updated_at")


@admin.register(HourlyData)
class HourlyDataAdmin(admin.ModelAdmin):
    list_display = ("id", "station_id", "created_at")
    search_fields = ("station__wu_id",)
    readonly_fields = ("created_at", "updated_at")
