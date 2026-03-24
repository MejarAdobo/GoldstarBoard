If running this at another machine:

First create a .pg_service.conf in your home directory:

```zsh
[my_service] # the name for your service
host=localhost
user=USER
dbname=NAME
port=5432
password=PASS
```

Also the ip are hardcoded so ensure to check your ip before testing it

also run this when running the django server:
-> uv run manage.py runserver 0.0.0.0:8000

---

Weather Station Ids:
["Brandon"]="INANAI140"
["Darren"]="IGABRI5"
["David"]="INANAI114"
["Graham"]="INANAI143"