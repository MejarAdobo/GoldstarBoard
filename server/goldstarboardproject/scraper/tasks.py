from datetime import timedelta

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
            gold_star, weather_data = parse_station(html)

            HourlyData.objects.update_or_create(
                station=station,
                defaults={
                    "recorded_at": timezone.now().strftime("%Y-%m-%d %H:00"),
                    "weather_data": weather_data,
                    "has_gold_star": gold_star,
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
            gold_star, weather_data = parse_station(html)

            # logic for granting the status
            previous_day = (timezone.now() - timedelta(days=1)).strftime("%Y-%m-%d")
            yday_data = DailyData.objects.filter(
                station=station, recorded_at=previous_day
            ).first()
            gold_star_status = None

            if yday_data:
                # if you have a gold star the prievous day, and no gold star after the daily data task happen, you are granted this status
                if yday_data.has_gold_star and not gold_star:
                    gold_star_status = "Streak Lost"
                    station.last_day_since_gold_star = timezone.now().strftime("%B %d")
                    station.save()

                # No gold star yesterday, and have gold star today
                if not yday_data.has_gold_star and gold_star:
                    gold_star_status = "Gained"

                # No gold star yesterday, and today
                if not yday_data.has_gold_star and not gold_star:
                    gold_star_status = f"Since {station.last_day_since_gold_star}"

            # add a gold star to total count and the streak
            if gold_star:
                add_star_day(station)
                update_hot_streak(station)
            else:
                update_cold_streak(station)

            # create a new DailyData for the current day
            DailyData.objects.create(
                station=station,
                recorded_at=timezone.now().strftime("%Y-%m-%d"),
                has_gold_star=gold_star,
                gold_star_status=gold_star_status,
            )


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
    hot_streak = Streak.objects.order_by("-longest_yearly_hot_streak").first()
    cold_streak = Streak.objects.order_by("-longest_yearly_cold_streak").first()
    top_gold_star = Station.objects.order_by("-total_yearly_gold_star").first()

    awards_dict = {}
    if hot_streak:
        awards_dict["Longest Hot Streak"] = hot_streak.station
    if cold_streak:
        awards_dict["Longest Cold Streak"] = cold_streak.station
    if top_gold_star:
        awards_dict["Most Gold Stars"] = top_gold_star

    for award, station in awards_dict.items():
        grant_yearly_award(
            station,
            award,
            timezone.now().year,
        )
