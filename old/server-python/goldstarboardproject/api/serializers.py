from rest_framework import serializers
from scraper.models import (
    ColdStreakAward,
    DailyData,
    HotStreakAward,
    HourlyData,
    LeastGoldStarAward,
    MostGoldStarAward,
    Station,
    Streak,
)


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
        read_only_fields = (
            "station",
            "recorded_at",
            "weather_data",
            "has_gold_star",
        )


class DailyDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyData
        fields = "__all__"
        read_only_fields = (
            "station",
            "recorded_at",
            "has_gold_star",
            "gold_star_status",
        )


class StationSerializer(serializers.ModelSerializer):
    streak = StreakSerializer(read_only=True)
    hourly_data = HourlyDataSerializer(read_only=True)
    latest_daily = serializers.SerializerMethodField()

    class Meta:
        model = Station
        fields = "__all__"
        read_only_fields = [
            "name",
            "wu_id",
            "total_gold_star",
            "total_yearly_gold_star",
            "last_day_since_gold_star",
            "created_at",
            "updated_at",
        ]

    def get_latest_daily(self, obj):
        daily = obj.daily_data.order_by("-recorded_at").first()
        if daily:
            return DailyDataSerializer(daily).data
        return None


class HotStreakAwardSerializer(serializers.ModelSerializer):
    class Meta:
        model = HotStreakAward
        fields = "__all__"
        read_only_fields = ["year", "recipient", "place", "streak_length"]


class ColdStreakAwardSerializer(serializers.ModelSerializer):
    class Meta:
        model = ColdStreakAward
        fields = "__all__"
        read_only_fields = ["year", "recipient", "place", "streak_length"]


class MostGoldStarAwardSerializer(serializers.ModelSerializer):
    class Meta:
        model = MostGoldStarAward
        fields = "__all__"
        read_only_fields = ["year", "recipient", "place", "total_gold_stars"]


class LeastGoldStarAwardSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeastGoldStarAward
        fields = "__all__"
        read_only_fields = ["year", "recipient", "place", "total_gold_stars"]
