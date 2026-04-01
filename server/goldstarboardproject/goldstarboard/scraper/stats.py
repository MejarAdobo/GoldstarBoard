from .models import Award

# This function handle the total stars


def add_star_day(station):
    """Add a star day to the total star days for a given station."""
    station.total_gold_star += 1
    station.total_yearly_gold_star += 1
    station.save()


def reset_yearly_total_days(station):
    """Reset the yearly total star days for a given station."""
    station.total_yearly_gold_star = 0
    station.save()


# This functions handle the streak


def update_hot_streak(station):
    """Update the streak for a given station."""
    streak = station.streak
    streak.current_hot_streak += 1

    # if current streak is longer than longest, update longest
    if streak.current_hot_streak > streak.longest_hot_streak:
        streak.longest_hot_streak = streak.current_hot_streak
    if streak.current_hot_streak > streak.longest_yearly_hot_streak:
        streak.longest_yearly_hot_streak = streak.current_hot_streak

    # set cold streak to 0
    streak.current_cold_streak = 0

    streak.save()


def update_cold_streak(station):
    """Update the streak for a given station."""
    streak = station.streak
    streak.current_cold_streak += 1

    # if current streak is longer than longest, update longest
    if streak.current_cold_streak > streak.longest_cold_streak:
        streak.longest_cold_streak = streak.current_cold_streak
    if streak.current_cold_streak > streak.longest_yearly_cold_streak:
        streak.longest_yearly_cold_streak = streak.current_cold_streak

    # set hot streak to 0
    streak.current_hot_streak = 0

    streak.save()


def reset_yearly_streak(station):
    """Reset yearly streak to 0"""
    streak = station.streak
    streak.longest_yearly_cold_streak = 0
    streak.longest_yearly_hot_streak = 0
    streak.save()


# Handle the Awards


def grant_yearly_award(station, award_name, year):
    """
    Grants a yearly award for a given station.
    """
    Award.objects.create(
        station=station,
        award_name=award_name,
        year=year,
    )
