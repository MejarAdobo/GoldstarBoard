import json

from bs4 import BeautifulSoup


def extract_summary(data: dict) -> dict | None:
    """Find and extract the daily summary from the JSON data"""
    for key, value in data.items():
        if not isinstance(value, dict):
            continue

        b = value.get("b")
        if not isinstance(b, dict):
            continue

        summaries = b.get("summaries")
        if summaries and isinstance(summaries, list) and len(summaries) > 0:
            summary = summaries[0]
            imperial = summary.get("imperial", {})

            return {
                "temp_avg": imperial.get("tempAvg"),
                "precip": imperial.get("precipTotal"),
            }

    return None


def parse_station(html: str) -> dict:
    """Parse weather station HTML"""
    soup = BeautifulSoup(html, "html.parser")

    gold_star_found = bool(soup.find("img", class_="goldstar-station"))

    station_name, station_id = soup.find("h1").get_text().split(" - ")

    script_tag = soup.find("script", id="app-root-state")
    summary = extract_summary(json.loads(script_tag.string)) if script_tag else None

    if summary:
        summary["gold_star"] = gold_star_found
        summary["station_name"] = station_name
        summary["station_id"] = station_id
        return summary

    return {
        "station_name": station_name,
        "station_id": station_id,
        "gold_star": gold_star_found,
        "temp_avg": None,
        "precip": None,
    }
