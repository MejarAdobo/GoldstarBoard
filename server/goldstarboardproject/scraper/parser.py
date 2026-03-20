import json

from bs4 import BeautifulSoup


def extract_summary(data: dict) -> tuple[float | None, float | None]:
    for value in data.values():
        if not isinstance(value, dict):
            continue
        summaries = value.get("b", {}).get("summaries", [])
        if summaries:
            imperial = summaries[0].get("imperial", {})
            return imperial.get("tempAvg"), imperial.get("precipTotal")
    return None, None


def parse_station(html: str) -> dict:
    soup = BeautifulSoup(html, "html.parser")
    gold_star = bool(soup.find("img", class_="goldstar-station"))
    script = soup.find("script", id="app-root-state")
    temp_avg, precip = (
        extract_summary(json.loads(script.string)) if script else (None, None)
    )
    return {"has_gold_star": gold_star, "temp_avg": temp_avg, "precip": precip}
