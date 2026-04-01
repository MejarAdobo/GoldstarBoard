from datetime import timedelta

from django.utils import timezone
from models import DailyData, Station
from parser import parse_station

from scraper import fetch_station


def test():
    url = "https://www.wunderground.com/dashboard/pws/INANAI157"
    html = fetch_station(url)

    # print(html)

    if html:
        gold_star, weather_data = parse_station(html)
        print(gold_star, weather_data)


def gather_daily_data():
    """Gather daily data for all stations."""
    stations = Station.objects.all()
    for station in stations:
        url = f"https://www.wunderground.com/dashboard/pws/{station.wu_id}"
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
                if yday_data.has_gold_star and not gold_star:
                    gold_star_status = "Streak Lost"
                    station.last_day_since_gold_star = timezone.now().strftime("%B %d")
                    station.save()

                if not yday_data.has_gold_star and gold_star:
                    gold_star_status = "Gained"

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


if __name__ == "__main__":
    gather_daily_data()
