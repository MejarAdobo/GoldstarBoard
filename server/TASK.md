
This is for scraping each weather station in weatherunderground using python scraping hosted in Digital Ocean

When a user add a Weather Station ID (IGABRI5)
It then sent it to the python script
then scrape this url: https://www.wunderground.com/dashboard/pws/<Weather Station ID>

After scraping the needed information it will then sent the data into the postreSQL Database

This script happen once a day(6:00 A.M)
