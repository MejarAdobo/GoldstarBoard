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

    gold_star_img = soup.find("img", class_="goldstar-station")
    gold_star = True if gold_star_img else "N/A"

    return {
        "temperature": temp,
        "dewpoint": get_field("DEWPOINT"),
        "humidity": get_field("HUMIDITY"),
        "rainfall": get_field("PRECIP ACCUM"),
        "has_gold_star": gold_star,
    }
