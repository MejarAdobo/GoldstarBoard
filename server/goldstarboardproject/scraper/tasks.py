from crontask import cron
from django.tasks import task
from django.utils import timezone

from .models import DailyData, HourlyData, Station, Streak
from .parser import parse_station
from .scraper import fetch_station
from .stats import (
    add_star_day,
    grant_yearly_award,
    reset_yearly_streak,
    reset_yearly_total_days,
    update_cold_streak,
    update_hot_streak,
)

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


@cron("50 23 * * *")
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

            # add a gold star to total count and the streak
            if data["has_gold_star"]:
                add_star_day(station)
                update_hot_streak(station)
            else:
                update_cold_streak(station)


@cron("50 23 31 12 *")
@task
def yearly_reset():
    """Reset yearly streak to 0 and yearly total days to 0."""
    stations = Station.objects.all()
    for station in stations:
        reset_yearly_streak(station)
        reset_yearly_total_days(station)


@cron("0 0 25 12 *")
@task
def grant_yearly_awards():
    """Grant yearly awards to stations."""
    hot_streaks = Streak.objects.all().order_by("longest_yearly_hot_streak")
    cold_streaks = Streak.objects.all().order_by("longest_yearly_cold_streak")
    total_gold_stars = Station.objects.all().order_by("total_yearly_gold_star")

    awards_dict = {
        "Longest Hot Streak": hot_streaks[0].station,
        "Longest Cold Streak": cold_streaks[0].station,
        "Most Gold Stars": total_gold_stars[0].station,
    }

    for award, station in awards_dict.items():
        grant_yearly_award(
            station,
            award,
            timezone.now().year,
        )
