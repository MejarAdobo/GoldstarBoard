from django.db import models


class Station(models.Model):
    name = models.CharField(max_length=50)
    wu_id = models.CharField(max_length=50, unique=True)
    wu_link = models.CharField(max_length=200)
    total_gold_star = models.IntegerField(default=0)
    total_yearly_gold_star = models.IntegerField(default=0)
    last_day_since_gold_star = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.name


class Streak(models.Model):
    station = models.OneToOneField(
        Station, on_delete=models.CASCADE, related_name="streak"
    )
    longest_gold_star_streak = models.IntegerField(default=0)
    longest_yearly_gold_star_streak = models.IntegerField(default=0)
    current_gold_star_streak = models.IntegerField(default=0)
    longest_cold_streak = models.IntegerField(default=0)
    longest_yearly_cold_streak = models.IntegerField(default=0)
    current_cold_streak = models.IntegerField(default=0)

    def __str__(self):
        return self.station.name


class HourlyData(models.Model):
    station = models.OneToOneField(
        Station, on_delete=models.CASCADE, related_name="hourly_data"
    )
    recorded_at = models.DateTimeField()
    has_gold_star = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.station.name} - {self.recorded_at}"
