from rest_framework import serializers
from scraper.models import DailyData, HourlyData, Station, Streak


class StationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Station
        fields = "__all__"
        read_only_fields = [
            "name",
            "wu_id",
            "wu_link",
            "total_gold_star",
            "total_yearly_gold_star",
            "last_day_since_gold_star",
            "created_at",
            "updated_at",
        ]


class StreakSerializer(serializers.ModelSerializer):
    class Meta:
        model = Streak
        fields = "__all__"
        read_only_fields = (
            "station",
            "longest_hot_streak",
            "longest_yearly_hot_streak",
            "current_hot_streak",
            "longest_cold_streak",
            "longest_yearly_cold_streak",
            "current_cold_streak",
            "created_at",
            "updated_at",
        )


class HourlyDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = HourlyData
        fields = "__all__"
        read_only_fields = ("id", "station", "recorded_at", "has_gold_star")


class DailyDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyData
        fields = "__all__"
        read_only_fields = ("id", "station", "recorded_at", "gold_star_status")
