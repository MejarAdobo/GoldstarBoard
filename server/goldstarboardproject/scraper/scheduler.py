from apscheduler.schedulers.background import BackgroundScheduler
from django_apscheduler.jobstores import DjangoJobStore

from .services import gather_station_data


def start():
    scheduler = BackgroundScheduler()
    scheduler.add_jobstore(DjangoJobStore(), "default")
    scheduler.add_job(
        gather_station_data,
        "interval",
        minutes=2,
        id="scraper_hourly",
        replace_existing=True,
    )
    scheduler.start()
    print("Scheduler started.")
