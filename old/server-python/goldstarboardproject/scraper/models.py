from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


class Station(models.Model):
    name = models.CharField(max_length=50)
    wu_id = models.CharField(max_length=50, unique=True)
    total_gold_star = models.IntegerField(default=0)
    total_yearly_gold_star = models.IntegerField(default=0)
    last_day_since_gold_star = models.CharField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Streak(models.Model):
    station = models.OneToOneField(
        Station, on_delete=models.CASCADE, related_name="streak"
    )
    longest_hot_streak = models.IntegerField(default=0)
    longest_yearly_hot_streak = models.IntegerField(default=0)
    current_hot_streak = models.IntegerField(default=0)
    longest_cold_streak = models.IntegerField(default=0)
    longest_yearly_cold_streak = models.IntegerField(default=0)
    current_cold_streak = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.station.name


class HourlyData(models.Model):
    station = models.OneToOneField(
        Station, on_delete=models.CASCADE, related_name="hourly_data"
    )
    recorded_at = models.CharField()
    weather_data = models.JSONField()
    has_gold_star = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.station.name} - {self.recorded_at}"


class DailyData(models.Model):
    station = models.ForeignKey(
        Station, on_delete=models.CASCADE, related_name="daily_data"
    )
    recorded_at = models.CharField()
    has_gold_star = models.BooleanField(default=False)
    gold_star_status = models.CharField(null=True, blank=True)

    def __str__(self):
        return f"{self.station.name} - {self.recorded_at}"


# Awards
class HotStreakAward(models.Model):
    year = models.IntegerField()
    recipient = models.ForeignKey(
        Station, on_delete=models.CASCADE, related_name="hot_streak_awards"
    )
    place = models.IntegerField()
    streak_length = models.IntegerField()

    def __str__(self):
        return f"{self.year} - {self.recipient.name} - Place {self.place} - Streak {self.streak_length}"


class ColdStreakAward(models.Model):
    year = models.IntegerField()
    recipient = models.ForeignKey(
        Station, on_delete=models.CASCADE, related_name="cold_streak_awards"
    )
    place = models.IntegerField()
    streak_length = models.IntegerField()

    def __str__(self):
        return f"{self.year} - {self.recipient.name} - Place {self.place} - Streak {self.streak_length}"


class MostGoldStarAward(models.Model):
    year = models.IntegerField()
    recipient = models.ForeignKey(
        Station, on_delete=models.CASCADE, related_name="most_gold_star_awards"
    )
    place = models.IntegerField()
    total_gold_stars = models.IntegerField()

    def __str__(self):
        return f"{self.year} - {self.recipient.name} - Place {self.place} - Total Gold Stars {self.total_gold_stars}"


class LeastGoldStarAward(models.Model):
    year = models.IntegerField()
    recipient = models.ForeignKey(
        Station, on_delete=models.CASCADE, related_name="least_gold_star_awards"
    )
    place = models.IntegerField()
    total_gold_stars = models.IntegerField()

    def __str__(self):
        return f"{self.year} - {self.recipient.name} - Place {self.place} - Total Gold Stars {self.total_gold_stars}"


# functions


@receiver(post_save, sender=Station)
def create_streak(sender, instance, created, **kwargs):
    if created:
        Streak.objects.create(station=instance)
