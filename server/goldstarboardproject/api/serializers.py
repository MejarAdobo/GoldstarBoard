from rest_framework import serializers
from scraper.models import HourlyData, Station, Streak


class StationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Station
        fields = "__all__"


class StreakSerializer(serializers.ModelSerializer):
    class Meta:
        model = Streak
        fields = "__all__"


class HourlyDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = HourlyData
        fields = "__all__"
