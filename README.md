# GoldstarBoard

## About

This started as my final project for my mobile course in Information Technology and Applied System: Web and Mobile Development Program in Vancouver Island University.

This project was to create a leaderboard app for my instructors and technicians for their personal weather station.

The ranking was based on wheter the weather underground website have granted their weather station a gold star depending on the data that they send.

The project started with only an Expo React Native App, and a Django backend (REST API, and a Cron job). Then I decided to restart this project and make a monorepo that I plan to consist of a web app, mobile app, admin app, cron app, and api app.

I have currently finish these apps:

- cron app: which is running in a docker container on a Virtual Machine in VIU
- api app: currently deployed in render inside a docker container, will also moved to VM if nginx issue has been fixed, you can check out the api server [here](https://api-35if.onrender.com/api)
- admin app: same thing as api

To check out the old code, switch to the old branch
