from bs4 import BeautifulSoup


def parse_station(html: str) -> dict:
    soup = BeautifulSoup(html, "html.parser")

    def get_field(header_text):
        header = soup.find(
            "div", class_="weather__header", string=lambda s: s and header_text in s
        )
        if header:
            val = header.find_next("span", class_="wu-value")
            if val:
                return val.get_text(strip=True)
        return "N/A"

    # Temperature
    temp = "N/A"
    main_temp = soup.find("div", class_="main-temp")
    if main_temp:
        val = main_temp.find("span", class_="wu-value")
        if val:
            temp = val.get_text(strip=True)

    # Wind direction
    wind_dir = "N/A"
    wind_text = soup.find("div", class_="text-wrapper")
    if wind_text:
        bold = wind_text.find("span", class_="text-bold")
        if bold:
            wind_dir = bold.get_text(strip=True)

    # Wind & Gust as single combined string
    wind_and_gust = "N/A"
    gust_div = soup.find("div", class_="weather__wind-gust")
    if gust_div:
        values = gust_div.find_all("span", class_="wu-value")
        if len(values) >= 2:
            wind_and_gust = f"{values[0].get_text(strip=True)} / {values[1].get_text(strip=True)} km/h"

    gold_star_img = soup.find("img", class_="goldstar-station")
    gold_star = True if gold_star_img else "N/A"

    return {
        "temperature": temp,
        "dewpoint": get_field("DEWPOINT"),
        "humidity": get_field("HUMIDITY"),
        "rainfall": get_field("PRECIP ACCUM"),
        "wind_direction": wind_dir,
        "wind_and_gust": wind_and_gust,
        "has_gold_star": gold_star,
    }
