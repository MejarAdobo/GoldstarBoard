import requests


def fetch_station(url: str) -> str | None:
    """Fetch a weather station from weatherunderground"""

    print(50 * "=")
    print(f"Attempting to fetch : [{url}]")
    print(50 * "=")

    try:
        resp = requests.get(url, timeout=10)
        return resp.text
    except Exception as e:
        print(f"Failed to fetch : [{e}]")
        return None
