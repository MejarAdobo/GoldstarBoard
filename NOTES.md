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

---

Weather Station Ids:
  ["Brandon"]="INANAI140"
  ["Darren"]="IGABRI5"
  ["David"]="INANAI114"
  ["Graham"]="INANAI143"


---

# Security Audit: API Directory

## Context
The API exposes full CRUD on all models (Station, Streak, HourlyData) with **zero authentication, no permissions, and no input validation**. Internal statistics fields (gold star counts, streaks) are writable by anyone. Settings still use Django's default insecure development configuration.

---

## Critical Issues Found

### 1. No Authentication or Permissions (CRITICAL)
- **File:** `api/views.py`
- All 3 ViewSets use `ModelViewSet` with no `permission_classes` or `authentication_classes`
- Anyone can CREATE, UPDATE, DELETE all data
- **Fix:** Add `DEFAULT_PERMISSION_CLASSES` and `DEFAULT_AUTHENTICATION_CLASSES` to `REST_FRAMEWORK` in settings. For a read-only public API, use `IsAuthenticatedOrReadOnly`. For write endpoints used by the scraper, use token auth.

### 2. Mass Assignment — `fields = "__all__"` (HIGH)
- **File:** `api/serializers.py`
- All serializers expose every field as writable
- Internal fields like `total_gold_star`, `total_yearly_gold_star`, `current_gold_star_streak`, etc. should NOT be writable via API
- **Fix:** Explicitly list fields and mark computed/internal fields as `read_only_fields`

### 3. Hardcoded SECRET_KEY (CRITICAL)
- **File:** `goldstarboard/settings.py:23`
- `SECRET_KEY = "django-insecure-h+kfj=..."` committed to git
- **Fix:** Load from environment variable: `os.environ.get("DJANGO_SECRET_KEY")`

### 4. DEBUG = True (HIGH)
- **File:** `goldstarboard/settings.py:26`
- Exposes stack traces, SQL queries, and settings on errors
- **Fix:** `DEBUG = os.environ.get("DJANGO_DEBUG", "False") == "True"`

### 5. Empty ALLOWED_HOSTS (HIGH)
- **File:** `goldstarboard/settings.py:28`
- Allows Host header injection when DEBUG=False
- **Fix:** Set to actual domain(s) or load from env

### 6. No Rate Limiting (MEDIUM)
- No `DEFAULT_THROTTLE_CLASSES` or `DEFAULT_THROTTLE_RATES` in REST_FRAMEWORK config
- **Fix:** Add DRF throttling (e.g., `AnonRateThrottle` / `UserRateThrottle`)

### 7. Missing Security Headers (MEDIUM)
- No `SECURE_SSL_REDIRECT`, `SESSION_COOKIE_SECURE`, `CSRF_COOKIE_SECURE`, `SECURE_HSTS_SECONDS`
- **Fix:** Add production security settings

### 8. Full CRUD Exposed When Only Read Needed (HIGH)
- **File:** `api/views.py`
- Weather leaderboard is read-only for users — ViewSets should be `ReadOnlyModelViewSet` for public access
- Write operations (if needed for scraper) should be on separate, authenticated endpoints
- **Fix:** Change `ModelViewSet` to `ReadOnlyModelViewSet` for public endpoints

---

## Recommended Changes

### A. `api/views.py` — Switch to ReadOnlyModelViewSet
```python
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

class HourlyDataViewSet(viewsets.ReadOnlyModelViewSet):
    ...

class StationViewSet(viewsets.ReadOnlyModelViewSet):
    ...

class StreakViewSet(viewsets.ReadOnlyModelViewSet):
    ...
```

### B. `api/serializers.py` — Explicit fields + read_only_fields
```python
class StationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Station
        fields = ["id", "name", "wu_id", "wu_link", "total_gold_star",
                  "total_yearly_gold_star", "last_day_since_gold_star"]
        read_only_fields = ["total_gold_star", "total_yearly_gold_star",
                            "last_day_since_gold_star"]

class StreakSerializer(serializers.ModelSerializer):
    class Meta:
        model = Streak
        fields = ["id", "station", "longest_gold_star_streak", ...]
        read_only_fields = fields  # all read-only for public API
```

### C. `goldstarboard/settings.py` — Security hardening
- Load SECRET_KEY from env
- Set DEBUG from env (default False)
- Set ALLOWED_HOSTS from env
- Add to REST_FRAMEWORK:
  - `DEFAULT_THROTTLE_CLASSES`
  - `DEFAULT_THROTTLE_RATES`
- Add production security settings (HSTS, secure cookies, etc.)

---

## Files to Modify
1. `api/views.py` — ReadOnlyModelViewSet + permissions
2. `api/serializers.py` — explicit fields + read_only_fields
3. `goldstarboard/settings.py` — secrets from env, DEBUG, ALLOWED_HOSTS, throttling, security headers

## Verification
1. Run `python manage.py check --deploy` to see Django's deployment checklist warnings
2. Confirm API endpoints return data on GET but reject POST/PUT/DELETE (405)
3. Verify throttle headers appear in responses
