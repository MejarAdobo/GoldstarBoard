def get(d, key, default="N/A"):
    val = d.get(key)
    return val if val is not None else default


def f2c(f):
    if f is None or f == "N/A":
        return "N/A"
    return round((f - 32) * 5 / 9, 1)


def mph2kmh(m):
    if m is None or m == "N/A":
        return "N/A"
    return round(m * 1.60934, 1)


def inhg2hpa(i):
    if i is None or i == "N/A":
        return "N/A"
    return round(i * 33.8639, 2)


def in2mm(i):
    if i is None or i == "N/A":
        return "N/A"
    return round(i * 25.4, 2)
