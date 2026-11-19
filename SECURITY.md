# PixelGenCreativity — Security Policy & Technical Hardening

## 1. Security Overview

PixelGenCreativity is built following defense-in-depth security principles across both frontend and backend architectures. This document outlines the active security controls, cryptographic measures, credential isolation rules, and production deployment policies as of **Phase 4: Complete Backend, MySQL Database Architecture & REST API Integration**.

---

## 2. 12-Factor Credential Management & Secret Isolation

- **Zero Hardcoded Secrets**: Secrets such as `DJANGO_SECRET_KEY`, database credentials, and API tokens are never checked into version control.
- **Git Ignore Safeguards**: `.gitignore` explicitly prevents `.env`, `backend/.env`, and `frontend/.env` from being staged or committed.
- **Environment Isolation**: `python-dotenv` loads runtime environment variables from isolated `.env` files. In production, variables are sourced directly from the host container environment.
- **Example Templates**: Safe configuration templates (`.env.example`) provide documentation without exposing sensitive credentials.

---

## 3. Web Security & Django Middleware Stack

The following security middlewares are active in `backend/config/settings.py`:

```python
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
```

### 3.1 Cross-Origin Resource Sharing (CORS)
- Handled via `django-cors-headers`.
- `CORS_ALLOW_ALL_ORIGINS = False` (explicit whitelisting enforced).
- Configured dynamically via `CORS_ALLOWED_ORIGINS` environment variable (defaults to `http://localhost:5173,http://127.0.0.1:5173`).
- Prevents unauthorized third-party origins from sending unauthenticated cross-domain AJAX requests.

### 3.2 Cross-Site Request Forgery (CSRF)
- Enforced on all mutating HTTP methods (`POST`, `PUT`, `PATCH`, `DELETE`) via `CsrfViewMiddleware`.
- Single Page Application (SPA) CSRF cookies are set with `SameSite=Lax` or `SameSite=Strict`.

### 3.3 Clickjacking Protection
- Enforced globally via `XFrameOptionsMiddleware`.
- `X-Frame-Options` defaults to `DENY` to prevent embedding the application within malicious third-party `<frame>` or `<iframe>` tags.

---

## 4. Database Security & Financial Integrity

### 4.1 SQL Injection Protection
- All database operations utilize the Django Object-Relational Mapper (ORM), which uses parameterized queries.
- Raw SQL queries are avoided. The diagnostic query in `apps.core.views.HealthCheckView` uses static parameterized execution (`SELECT 1;`).

### 4.2 MySQL Hardening
- PyMySQL connection enforces `STRICT_TRANS_TABLES` SQL mode, preventing silent data truncation or invalid type coercion.
- Multi-byte encoding (`utf8mb4`) is enforced to prevent Unicode normalization and homoglyph collision attacks.

### 4.3 Server-Side Price & Financial Validation
- **Zero Client-Side Trust**: All cart unit prices, subtotal calculations, and discount percentages are calculated and enforced server-side via Django ORM.
- **Arbitrary Price Tampering Immunity**: In `apps/cart/views.py`, the price stored in `CartItem.unit_price` is fetched directly from the database `Product.price` model multiplied by `License.price_multiplier`. Clients cannot inject lower prices.
- **Exact Decimal Arithmetic**: All monetary values (`price`, `unit_price`, `subtotal`, `discount_amount`) use Python's `Decimal` type (`DECIMAL(10, 2)` in MySQL) to eliminate floating-point precision vulnerabilities.
- **Coupon Server-Side Verification**: Coupons are checked against expiration dates, minimum cart thresholds, and total usage limits directly on the backend before discount values are returned.

---

## 5. Session Identification & Input Sanitization

### 5.1 Guest Session Key Isolation (`X-Session-Key`)
- Unauthenticated guest carts and wishlists are isolated using client-generated UUID4 tokens passed via the `X-Session-Key` header.
- The session key is validated and constrained to 64 alphanumeric/hyphen characters (`VARCHAR(64)` indexed in MySQL) to prevent header injection or buffer attacks.
- A user cannot mutate another session's cart items without possessing their random 128-bit session identifier.

### 5.2 Review Sanitization & Moderation
- Guest review submissions (`POST /api/v1/products/<slug>/reviews/`) are checked:
  - Star ratings strictly constrained to integer range 1 to 5 (`validators.MinValueValidator(1)`, `validators.MaxValueValidator(5)`).
  - Review titles and comments are stripped of malicious script injection through Django serializer validation.
  - Moderation toggle (`is_approved`) enables editorial review before public display.

---

## 6. Real JWT Authentication & Role-Based Access Control (RBAC)

- SimpleJWT configured with standard Bearer authorization scheme:
  - Access token lifetime: 1 day (`ACCESS_TOKEN_LIFETIME = timedelta(days=1)`)
  - Refresh token lifetime: 14 days (`REFRESH_TOKEN_LIFETIME = timedelta(days=14)`)
  - Token rotation enabled (`ROTATE_REFRESH_TOKENS = True`)
- Password hashing uses PBKDF2-SHA256 with 720,000 iterations.
- Backend RBAC:
  - User endpoints (`/auth/profile/`, `/orders/my-orders/`, `/orders/my-downloads/`) enforce `permissions.IsAuthenticated`.
  - Administrative endpoints (`/orders/admin/`, `/admin/products/`, `/admin/categories/`) strictly enforce `permissions.IsAdminUser` (`is_staff: true`). Merely hiding admin links in the React UI is never relied upon as security.

---

## 7. Cryptographic Payment Verification (Zero Trust Policy)

- **Frontend payment callbacks are never trusted blindly**.
- The backend verifies every Razorpay transaction using HMAC-SHA256:
  ```python
  expected_sig = hmac.new(
      secret.encode('utf-8'),
      f"{razorpay_order_id}|{razorpay_payment_id}".encode('utf-8'),
      hashlib.sha256
  ).hexdigest()
  is_valid = hmac.compare_digest(expected_sig, razorpay_signature)
  ```
- Constant-time string comparison (`hmac.compare_digest`) prevents timing attacks.
- Duplicate payment attempts are blocked by enforcing unique indexes on `razorpay_payment_id`.

---

## 8. Protected Digital Asset Downloads & IP Security

- Direct download URLs to vector source packages are never exposed publicly.
- All downloads require a valid, verified commercial license key (`LIC-2026-XXXXXX`).
- Download authorization checks:
  1. The target license key exists in the database.
  2. The parent order status is verified as `paid`.
  3. The item has not exceeded its maximum allowed download quota (`max_downloads`).
- Every download event records a forensic audit log in `marketplace_download_logs` capturing client IP, user agent, and ISO timestamp.

---

## 9. Production Security Checklist

Prior to staging or production deployment, the following settings must be toggled:

- [ ] Set `DEBUG=False` in `backend/.env`.
- [ ] Generate a cryptographically strong, unique `DJANGO_SECRET_KEY` (minimum 50 characters).
- [ ] Set `ALLOWED_HOSTS` to exact production domain names.
- [ ] Replace test Razorpay credentials with live keys (`RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`).
- [ ] Enforce SSL/TLS:
  - `SECURE_SSL_REDIRECT = True`
  - `SESSION_COOKIE_SECURE = True`
  - `CSRF_COOKIE_SECURE = True`
- [ ] Enable HTTP Strict Transport Security (HSTS):
  - `SECURE_HSTS_SECONDS = 31536000`
  - `SECURE_HSTS_INCLUDE_SUBDOMAINS = True`
  - `SECURE_HSTS_PRELOAD = True`
- [ ] Configure secure Content Security Policy (CSP) headers.

---

## 10. Reporting a Vulnerability

To report security issues, contact the repository administrator directly at security@pixelgencreativity.com. Do not post active exploits or sensitive vulnerability details in public issues.
