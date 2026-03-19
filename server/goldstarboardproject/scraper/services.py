from .parser import parse_station
from .scraper import fetch_station

station_list = ["INANAI157", "INANAI140", "IGABRI5", "INANAI114", "INANAI143"]


def gather_station_data():
    station_report = []

    for station in station_list:
        url = f"https://www.wunderground.com/dashboard/pws/{station}"
        html = fetch_station(url)

        if html:
            station_data = parse_station(html)
            station_report.append(station_data)

    print(station_report)
    # return station_report
