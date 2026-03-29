from rest_framework import viewsets
from scraper.models import Award, DailyData, HourlyData, Station, Streak

from .serializers import (
    AwardSerializer,
    DailyDataSerializer,
    HourlyDataSerializer,
    StationSerializer,
    StreakSerializer,
)


class HourlyDataViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HourlyData.objects.all()
    serializer_class = HourlyDataSerializer


class StationViewSet(
    viewsets.ModelViewSet
):  # plan to make this need to be authenticated but not for now
    queryset = Station.objects.all()
    serializer_class = StationSerializer
    lookup_field = "wu_id"


class StreakViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Streak.objects.all()
    serializer_class = StreakSerializer


class DailyDataViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = DailyData.objects.all()
    serializer_class = DailyDataSerializer


class AwardViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Award.objects.all()
    serializer_class = AwardSerializer
