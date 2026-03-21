from rest_framework import serializers
from scraper.models import HourlyData, Station, Streak


class StationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Station
        fields = [
            "id",
            "name",
            "wu_id",
            "wu_link",
            "total_gold_star",
            "total_yearly_gold_star",
            "last_day_since_gold_star",
        ]
        read_only_fields = [
            "total_gold_star",
            "total_yearly_gold_star",
            "last_day_since_gold_star",
        ]


class StreakSerializer(serializers.ModelSerializer):
    class Meta:
        model = Streak
        fields = "__all__"
        read_only_fields = fields


class HourlyDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = HourlyData
        fields = "__all__"
        read_only_fields = fields
