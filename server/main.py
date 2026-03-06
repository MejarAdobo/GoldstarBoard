from parser import parse_station
from scraper import fetch_station

station_list = ["INANAI157", "INANAI140", "IGABRI5", "INANAI114", "INANAI143"]


def gather_station_data():
    station_report = []

    for station in station_list:
        url = f"https://www.wunderground.com/dashboard/pws/{station}"
        html = fetch_station(url)

        if html:
            station_data = parse_station(html)
            station_report.append(station_data)

    return station_report


def main():
    gather_station_data()


if __name__ == "__main__":
    main()
