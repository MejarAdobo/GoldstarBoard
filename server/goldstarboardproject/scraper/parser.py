from bs4 import BeautifulSoup


def parse_station(html: str) -> dict:
    soup = BeautifulSoup(html, "html.parser")
    gold_star = bool(soup.find("img", class_="goldstar-station"))
    return {"has_gold_star": gold_star}
