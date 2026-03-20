from crontask import cron
from django.tasks import task
from django.utils import timezone

from .models import HourlyData, Station
from .parser import parse_station
from .scraper import fetch_station


# @cron("0 * * * *")  # every hour (for actual production)
@cron("* * * * *")  # every minute (for testing)
@task
def gather_station_data():
    stations = Station.objects.all()
    for station in stations:
        url = f"https://www.wunderground.com/dashboard/pws/{station.wu_id}"
        html = fetch_station(url)
        if html:
            data = parse_station(html)
            HourlyData.objects.update_or_create(
                station=station,
                defaults={
                    "recorded_at": timezone.now(),
                    "has_gold_star": data["has_gold_star"],
                    "temp_avg": data["temp_avg"],
                    "precip": data["precip"],
                },
            )
