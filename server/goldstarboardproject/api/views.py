from rest_framework import viewsets
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

from .serializers import (
    ColdStreakAwardSerializer,
    DailyDataSerializer,
    HotStreakAwardSerializer,
    HourlyDataSerializer,
    LeastGoldStarAwardSerializer,
    MostGoldStarAwardSerializer,
    StationSerializer,
    StreakSerializer,
)


class HourlyDataViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HourlyData.objects.all()
    serializer_class = HourlyDataSerializer


class StationViewSet(viewsets.ModelViewSet):
    queryset = Station.objects.prefetch_related("streak", "hourly_data").all()
    serializer_class = StationSerializer
    lookup_field = "wu_id"


class StreakViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Streak.objects.all()
    serializer_class = StreakSerializer


class DailyDataViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = DailyData.objects.all()
    serializer_class = DailyDataSerializer


class ColdStreakAwardViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ColdStreakAward.objects.all()
    serializer_class = ColdStreakAwardSerializer


class HotStreakAwardViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HotStreakAward.objects.all()
    serializer_class = HotStreakAwardSerializer


class LeastGoldStarAwardViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = LeastGoldStarAward.objects.all()
    serializer_class = LeastGoldStarAwardSerializer


class MostGoldStarAwardViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MostGoldStarAward.objects.all()
    serializer_class = MostGoldStarAwardSerializer
