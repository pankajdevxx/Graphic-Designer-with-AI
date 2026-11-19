# PixelGenCreativity — Empirical Testing Report & Quality Assurance

## 1. Test Execution Summary

| Test Domain | Target Suite | Status | Execution Time | Assertions / Modules |
|---|---|---|---|---|
| **Marketplace & Products** | `apps.products` & `apps.cart` | **PASSED** | 0.303s | 9 tests passed |
| **Authentication & Accounts** | `apps.users` | **PASSED** | 0.412s | User reg, JWT token verification, profile |
| **Orders & Razorpay** | `apps.orders` | **PASSED** | 0.383s | Order checkout, HMAC-SHA256 signature, ZIP streaming |
| **Frontend Production Build** | Vite 8 + React 19 + Tailwind v4 | **PASSED** | 1.56s | 2,668 modules transformed, 0 errors |
| **Live API & MySQL Socket** | Django REST Framework on port 8000 | **PASSED** | < 30ms latency | 15 categories, 4 blog posts, live JWT login |

---

## 2. Automated Test Suite Logs

### Test Suite 1: Product Catalog & Persistent Cart (`apps.products`, `apps.cart`)
```text
Creating test database for alias 'default'...
Found 9 test(s).
System check identified no issues (0 silenced).
.........
----------------------------------------------------------------------
Ran 9 tests in 0.303s

OK
Destroying test database for alias 'default'...
```

### Test Suite 2: JWT Authentication & Order Verification (`apps.users`, `apps.orders`)
```text
Creating test database for alias 'default'...
Found 2 test(s).
System check identified no issues (0 silenced).
..
----------------------------------------------------------------------
Ran 2 tests in 0.795s

OK
Destroying test database for alias 'default'...
```

**Verification Details**:
1. `test_user_registration_and_login`: Verified registration issues valid JWT access & refresh tokens, and authenticated requests with `Authorization: Bearer <token>` successfully access `/api/v1/auth/profile/`.
2. `test_checkout_and_payment_verification`: Verified checkout initiates an order, calculates license multipliers, verifies HMAC-SHA256 signature, updates payment status to `paid`, issues unique license key (`LIC-2026-XXXXXX`), and streams an authenticated ZIP package.

---

## 3. Frontend Production Build Benchmark
```text
vite v8.3.7 building client environment for production...
transforming...
✓ 2668 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   0.45 kB │ gzip:   0.29 kB
dist/assets/index-DWHwaxwQ.css  153.43 kB │ gzip:  18.77 kB
dist/assets/index-CwC1X724.js   895.30 kB │ gzip: 244.05 kB
✓ built in 1.56s
```

---

## 4. Live API & Database Connectivity Probe

### Endpoint: `GET /api/health/`
```json
{
  "status": "healthy",
  "service": "PixelGenCreativity Backend API",
  "version": "1.0.0",
  "timestamp": "2026-11-19T14:56:55.709203+00:00",
  "database": {
    "connected": true,
    "engine": "mysql",
    "latency_ms": 29.89,
    "error": null
  },
  "environment": "development"
}
```

### Live JWT Authentication & Download Audit Probe
```powershell
$loginRes = Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/v1/auth/login/" -Method Post -ContentType "application/json" -Body '{"username_or_email":"demo_creator","password":"Creator@12345"}'
# Output: Login succeeded for: demo_creator

$dlRes = Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/v1/orders/my-downloads/" -Method Get -Headers @{ Authorization = "Bearer $($loginRes.tokens.access)" }
# Output: Active downloads for user: 2 (First license key: LIC-2026-00D6DB-1760)
```
