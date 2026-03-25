#!/usr/bin/env bash

uv run manage.py migrate --noinput
uv run manage.py collectstatic --noinput
uv run -m gunicorn --bind 0.0.0.0:8000 --workers 5 goldstarboard.wsgi:application
