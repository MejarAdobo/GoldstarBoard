### 1. Base Configuration (Django Side)

- [ ] **Strip urls.py:** Delete all routes except `path('admin/', admin.site.urls)`.
- [ ] **Run inspectdb:** Run `python manage.py inspectdb > models.py` to auto-generate Python models matching your Drizzle tables.
- [ ] **Register Tables:** Add your tables to `admin.py` using `@admin.register(YourModel)` so they show up on the dashboard.
- [ ] **Set ALLOWED_HOSTS:** In `settings.py`, restrict this to only the specific domain or subdomain where the admin panel will live (e.g., `['admin.yourdomain.com']`).

### 2. Production Hardening & Security

- [ ] **Change the Admin URL Path:** Change the default path from `'admin/'` to something obscure, like `'system-dashboard-xyz/'`. This stops bots from scanning or brute-forcing your login page.
- [ ] **Turn Off Debug Mode:** Set `DEBUG = False` in your production `settings.py`. Leaving it `True` leaks your database schema and environment variables on any server error.
- [ ] **Enforce HTTPS:** Enable security settings in `settings.py` to protect your session tokens over the web:
  ```python
  SECURE_SSL_REDIRECT = True
  SESSION_COOKIE_SECURE = True
  CSRF_COOKIE_SECURE = True
  ```

### 3. Architecture & Schema Management

- [ ] **Pick Your Migration Master:** Decide who handles table structural changes. Keeping Drizzle as your migration master is recommended. If you need a new column, write it in TypeScript, apply it, and then re-run `python manage.py inspectdb` on the Django side to update the Python models.
- [ ] **Isolate Django's Meta-Tables:** Accept that Django will add its own system tables (like `django_session`, `auth_user`). Do not delete them; Django requires them to track your admin sessions and logins.
- [ ] **Ignore Meta-Tables in Node:** Ensure your Drizzle configuration ignores Django’s internal metadata tables so they do not clutter your API files.

### 4. Deployment & Monitoring

- [ ] **Environment Variables:** Do not hardcode your production database credentials. Use a `.env` file and read them via Python's `os.environ`.
- [ ] **Disable Public Registrations:** Double-check that there are no open registration endpoints available; only you (via the terminal command) should be able to create an admin user.
