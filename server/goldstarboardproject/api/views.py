from rest_framework import viewsets
from scraper.models import HourlyData, Station, Streak

from .serializers import HourlyDataSerializer, StationSerializer, StreakSerializer


class HourlyDataViewSet(viewsets.ModelViewSet):
    queryset = HourlyData.objects.all()
    serializer_class = HourlyDataSerializer


class StationViewSet(viewsets.ModelViewSet):
    queryset = Station.objects.all()
    serializer_class = StationSerializer
    lookup_field = "wu_id"


class StreakViewSet(viewsets.ModelViewSet):
    queryset = Streak.objects.all()
    serializer_class = StreakSerializer
