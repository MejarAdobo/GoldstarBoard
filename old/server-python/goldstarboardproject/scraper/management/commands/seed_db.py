from django.core.management.base import BaseCommand

from scraper.models import Station


class Command(BaseCommand):
    help = "Seed the database with 5 stations"

    def handle(self, *args, **options):
        stations = [
            {"name": "ITAS", "wu_id": "INANAI157"},
            {"name": "Darren", "wu_id": "IGABRI5"},
            {"name": "Brandon", "wu_id": "INANAI140"},
            {"name": "Graham", "wu_id": "INANAI143"},
            {"name": "David", "wu_id": "INANAI114"},
        ]

        for i, station_data in enumerate(stations, start=1):
            station, created = Station.objects.get_or_create(
                wu_id=station_data["wu_id"] or f"SEED_{i}",
                defaults={"name": station_data["name"]},
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f"Created station: {station}"))
            else:
                self.stdout.write(f"Station already exists: {station}")

        self.stdout.write(self.style.SUCCESS("Seeding complete."))
