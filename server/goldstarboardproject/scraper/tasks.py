from crontask import cron
from django.tasks import task
from django.utils import timezone

from .models import DailyData, HourlyData, Station, Streak
from .parser import parse_station
from .scraper import fetch_station
from .streaks import update_cold_streak, update_hot_streak

wu_link = "https://www.wunderground.com/dashboard/pws/"


@cron("0 * * * *")
@task
def gather_hourly_data():
    """Gather hourly data for all stations."""
    stations = Station.objects.all()
    for station in stations:
        url = f"{wu_link}{station.wu_id}"
        html = fetch_station(url)
        if html:
            data = parse_station(html)
            HourlyData.objects.create(
                station=station,
                defaults={
                    "recorded_at": timezone.now().strftime("%Y-%m-%d %H:00"),
                    "has_gold_star": data["has_gold_star"],
                },
            )


@cron("0 23 * * *")
@task
def gather_daily_data():
    """Gather daily data for all stations."""
    stations = Station.objects.all()
    for station in stations:
        url = f"{wu_link}{station.wu_id}"
        html = fetch_station(url)
        if html:
            data = parse_station(html)
            DailyData.objects.create(
                station=station,
                defaults={
                    "recorded_at": timezone.now(),
                    "gold_star_status": data["gold_star_status"],
                },
            )

            if data["has_gold_star"]:
                update_hot_streak(station)
            else:
                update_cold_streak(station)
