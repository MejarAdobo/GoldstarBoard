from parser import parse_station

from scraper import fetch_station


def test():
    url = "https://www.wunderground.com/dashboard/pws/INANAI157"
    html = fetch_station(url)

    # print(html)

    if html:
        gold_star, weather_data = parse_station(html)
        print(gold_star, weather_data)


if __name__ == "__main__":
    test()
