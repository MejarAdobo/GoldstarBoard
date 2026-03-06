from parser import parse_station
from scraper import fetch_station


def main():
    url = "https://www.wunderground.com/dashboard/pws/IGABRI5"
    html = fetch_station(url)

    if html:
        print(parse_station(html))


if __name__ == "__main__":
    main()
