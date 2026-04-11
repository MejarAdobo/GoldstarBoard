from datetime import timedelta

from crontask import cron
from django.tasks import task
from django.utils import timezone

from .models import DailyData, HourlyData, Station, Streak
from .parser import parse_station
from .scraper import fetch_station
from .stats import (
    add_star_day,
    get_award_winners,
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
                    "recorded_at": timezone.localtime().strftime("%Y-%m-%d %H:00"),
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
            previous_day = (timezone.localtime() - timedelta(days=1)).strftime(
                "%Y-%m-%d"
            )
            yday_data = DailyData.objects.filter(
                station=station, recorded_at=previous_day
            ).first()
            gold_star_status = None

            if yday_data:
                # if you have a gold star the prievous day, and no gold star after the daily data task happen, you are granted this status
                if yday_data.has_gold_star and not gold_star:
                    gold_star_status = "Streak Lost"
                    station.last_day_since_gold_star = timezone.localtime().strftime(
                        "%B %d"
                    )
                    station.save()

                # No gold star yesterday, and have gold star today
                elif not yday_data.has_gold_star and gold_star:
                    gold_star_status = "Gained"

                # No gold star yesterday, and today
                elif not yday_data.has_gold_star and not gold_star:
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
                recorded_at=timezone.localtime().strftime("%Y-%m-%d"),
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


@cron("30 23 31 12 *")
@task
def grant_yearly_awards():
    """Grant yearly awards to stations."""
    award_winners = get_award_winners()

    for key, data in award_winners.items():
        grant_yearly_award(
            data["award_type"],
            timezone.localtime().year,
            data["station"],
            data["place"],
            data["count"],
        )
