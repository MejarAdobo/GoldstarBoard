import json

from bs4 import BeautifulSoup


def parse_station(html):
    soup = BeautifulSoup(html, "html.parser")
    script = soup.find("script", id="app-root-state")
    if not script:
        return False, {}

    gold_star = False
    gold_star_img = soup.find("img", class_="goldstar-station")
    if gold_star_img:
        gold_star = True

    data = json.loads(script.string)
    na = dict.fromkeys(["temp", "dewpoint", "humidity", "rainfall"], "N/A")

    for val in data.values():
        b = val.get("b") if isinstance(val, dict) else None
        if not isinstance(b, dict) or "observations" not in b or not b["observations"]:
            continue
        latest = b["observations"][-1]
        imp = latest.get("imperial", {})
        return gold_star, {
            "temp": imp.get("tempAvg", "N/A"),
            "dewpoint": imp.get("dewptAvg", "N/A"),
            "humidity": latest.get("humidityAvg", "N/A"),
            "rainfall": imp.get("precipTotal", "N/A"),
        }

    return gold_star, na
