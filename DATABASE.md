## DATABASE SCHEMA

probably have a group so their could be seperate ranking incase a stranger just downloaded my app and then add their station 


## TABLES

- station - info for the station
- award - exsisting awards
- gold_star - track the gold star status througout the day
- station_group - a group of station
- group * do it if their is time


- **station:**
  - id: int # primary key
  - name: string # weather station id for weatherunderground
  - wu_link: string # link to tweatherunderground profile
  - total_gold_star: int # total accumulated gold star

- **group:**
  - id: int # primary key
  - name: string # weather station id for weatherunderground
  - password
  - email
  - group_leader
