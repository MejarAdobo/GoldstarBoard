import json

from bs4 import BeautifulSoup
from converters import f2c, get, in2mm, inhg2hpa, mph2kmh


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

    na = {
        "temperature": {"f": "N/A", "c": "N/A"},
        "wind": {
            "speed": {"mph": 0.0, "kmh": 0.0},
            "gust": {"mph": 0.0, "kmh": 0.0},
        },
        "dewpoint": {"f": "N/A", "c": "N/A"},
        "pressure": {"inhg": "N/A", "hpa": "N/A"},
        "humidity": {"value": "N/A", "unit": "%"},
        "precip_rate": {"in": 0.0, "mm": 0.0},
        "precip_accum": {"in": "N/A", "mm": "N/A"},
        "uv": 0,
    }

    for val in data.values():
        b = val.get("b") if isinstance(val, dict) else None
        if not isinstance(b, dict) or "observations" not in b or not b["observations"]:
            continue

        latest = b["observations"][-1]
        imp = latest.get("imperial", {})

        wind_speed = get(imp, "windspeedAvg", 0.0)
        wind_gust = get(imp, "windgustAvg", 0.0)
        precip_rate = get(imp, "precipRate", 0.0)
        uv = get(latest, "uvHigh", 0)

        return gold_star, {
            "temperature": {
                "f": get(imp, "tempAvg"),
                "c": f2c(get(imp, "tempAvg")),
            },
            "wind": {
                "speed": {
                    "mph": wind_speed,
                    "kmh": mph2kmh(wind_speed),
                },
                "gust": {
                    "mph": wind_gust,
                    "kmh": mph2kmh(wind_gust),
                },
            },
            "dewpoint": {
                "f": get(imp, "dewptAvg"),
                "c": f2c(get(imp, "dewptAvg")),
            },
            "pressure": {
                "inhg": get(imp, "pressureMax"),
                "hpa": inhg2hpa(get(imp, "pressureMax")),
            },
            "humidity": {
                "value": get(latest, "humidityAvg"),
                "unit": "%",
            },
            "precip_rate": {
                "in": precip_rate,
                "mm": in2mm(precip_rate),
            },
            "precip_accum": {
                "in": get(imp, "precipTotal"),
                "mm": in2mm(get(imp, "precipTotal")),
            },
            "uv": uv,
        }

    return gold_star, na
