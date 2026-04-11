from .models import (
    ColdStreakAward,
    HotStreakAward,
    LeastGoldStarAward,
    MostGoldStarAward,
    Station,
    Streak,
)

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
def get_award_winners():
    hot_streak = Streak.objects.order_by("-longest_yearly_hot_streak")
    cold_streak = Streak.objects.order_by("-longest_yearly_cold_streak")
    top_gold_star = Station.objects.order_by("-total_yearly_gold_star")
    least_gold_star = Station.objects.order_by("total_yearly_gold_star")

    return {
        "hot_streak_winner": {
            "award_type": "hot_streak",
            "station": hot_streak.first().station,
            "place": 1,
            "count": hot_streak.first().longest_yearly_hot_streak,
        },
        "hot_streak_second": {
            "award_type": "hot_streak",
            "station": hot_streak[1].station,
            "place": 2,
            "count": hot_streak[1].longest_yearly_hot_streak,
        },
        "hot_streak_third": {
            "award_type": "hot_streak",
            "station": hot_streak[2].station,
            "place": 3,
            "count": hot_streak[2].longest_yearly_hot_streak,
        },
        "cold_streak_winner": {
            "award_type": "cold_streak",
            "station": cold_streak.first().station,
            "place": 1,
            "count": cold_streak.first().longest_yearly_cold_streak,
        },
        "cold_streak_second": {
            "award_type": "cold_streak",
            "station": cold_streak[1].station,
            "place": 2,
            "count": cold_streak[1].longest_yearly_cold_streak,
        },
        "cold_streak_third": {
            "award_type": "cold_streak",
            "station": cold_streak[2].station,
            "place": 3,
            "count": cold_streak[2].longest_yearly_cold_streak,
        },
        "top_gold_star_winner": {
            "award_type": "most_gold_star",
            "station": top_gold_star.first(),
            "place": 1,
            "count": top_gold_star.first().total_yearly_gold_star,
        },
        "top_gold_star_second": {
            "award_type": "most_gold_star",
            "station": top_gold_star[1],
            "place": 2,
            "count": top_gold_star[1].total_yearly_gold_star,
        },
        "top_gold_star_third": {
            "award_type": "most_gold_star",
            "station": top_gold_star[2],
            "place": 3,
            "count": top_gold_star[2].total_yearly_gold_star,
        },
        "least_gold_star_winner": {
            "award_type": "least_gold_star",
            "station": least_gold_star.first(),
            "place": 1,
            "count": least_gold_star.first().total_yearly_gold_star,
        },
        "least_gold_star_second": {
            "award_type": "least_gold_star",
            "station": least_gold_star[1],
            "place": 2,
            "count": least_gold_star[1].total_yearly_gold_star,
        },
        "least_gold_star_third": {
            "award_type": "least_gold_star",
            "station": least_gold_star[2],
            "place": 3,
            "count": least_gold_star[2].total_yearly_gold_star,
        },
    }


def grant_yearly_award(award_type, year, station, place, count):
    """
    Grants a yearly award for a given station.
    """
    match award_type:
        case "hot_streak":
            HotStreakAward.objects.create(
                year=year,
                recipient=station,
                place=place,
                streak_length=count,
            )
        case "cold_streak":
            ColdStreakAward.objects.create(
                year=year,
                recipient=station,
                place=place,
                streak_length=count,
            )
        case "most_gold_star":
            MostGoldStarAward.objects.create(
                year=year,
                recipient=station,
                place=place,
                total_gold_stars=count,
            )
        case "least_gold_star":
            LeastGoldStarAward.objects.create(
                year=year,
                recipient=station,
                place=place,
                total_gold_stars=count,
            )
        case _:
            raise ValueError(f"Unknown award type: {award_type}")
