from .models import Station, Streak


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


def reset_yearly_streal(station):
    """Reset yearly streak to 0"""
    streak = station.streak
    streak.longest_yearly_cold_streak = 0
    streak.longest_yearly_hot_streak = 0
    streak.save()
