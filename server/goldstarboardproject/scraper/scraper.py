import logging

import requests


def fetch_station(url: str) -> str | None:
    """Fetch a weather station from weatherunderground"""

    logging.info(f"{'=' * 100}\nAttempting to fetch : [{url}]\n{'=' * 100}")

    try:
        resp = requests.get(url, timeout=10)
        return resp.text
    except Exception as e:
        logging.error(f"Failed to fetch : [{e}]")
        return None
