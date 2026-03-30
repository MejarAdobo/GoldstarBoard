from django.db import models


class Station(models.Model):
    name = models.CharField(max_length=50)
    wu_id = models.CharField(max_length=50, unique=True)
    wu_link = models.CharField(max_length=200)
    total_gold_star = models.IntegerField(default=0)
    total_yearly_gold_star = models.IntegerField(default=0)
    last_day_since_gold_star = models.DateField(null=True, blank=True)
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
    station = models.ForeignKey(
        Station, on_delete=models.CASCADE, related_name="hourly_data"
    )
    recorded_at = models.DateTimeField()
    temperature = models.CharField()
    dew_point = models.CharField()
    humidity = models.CharField()
    rainfall = models.CharField()
    wind_direction = models.CharField()
    wind_and_gust = models.CharField()
    has_gold_star = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.station.name} - {self.recorded_at}"


class DailyData(models.Model):
    station = models.ForeignKey(
        Station, on_delete=models.CASCADE, related_name="daily_data"
    )
    recorded_at = models.DateField()
    has_gold_star = models.BooleanField(default=False)
    gold_star_status = models.CharField()

    def __str__(self):
        return f"{self.station.name} - {self.recorded_at}"


class Award(models.Model):
    station = models.ForeignKey(Station, on_delete=models.CASCADE, related_name="award")
    award_name = models.CharField(max_length=255)
    year = models.IntegerField()

    def __str__(self):
        return f"{self.station.name} - {self.year} - {self.award_name}"
