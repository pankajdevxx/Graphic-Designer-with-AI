# PixelGenCreativity — Production Deployment Runbook

## 1. Hosting Architecture Overview

PixelGenCreativity is engineered for modern cloud infrastructure:

- **Frontend (SPA)**: Vercel / Cloudflare Pages (Global CDN Edge)
- **Backend (Django REST Framework)**: Render / Railway / AWS ECS (WSGI/Gunicorn container)
- **Database**: Production Managed MySQL 8.0 (AWS RDS, PlanetScale, or Aiven)
- **Payments**: Razorpay Payment Gateway (Webhook integration)

---

## 2. Frontend Deployment: Vercel

### Step 1: Project Setup in Vercel
1. Import repository into Vercel.
2. Set Root Directory to `frontend`.
3. Framework Preset: **Vite**.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.

### Step 2: Environment Variables (Vercel Project Settings)
```ini
VITE_API_BASE_URL=https://pixelgencreativity-backend.onrender.com/api/v1
```

### Step 3: Single-Page Application (SPA) Rewrites
Ensure `vercel.json` exists in `frontend/`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 3. Backend Deployment: Render (Web Service)

### Step 1: Create Web Service on Render
1. Select repository and set Root Directory to `backend`.
2. Environment: **Python 3**.
3. Build Command:
```bash
pip install -r requirements.txt && python manage.py migrate && python manage.py collectstatic --noinput
```
4. Start Command:
```bash
gunicorn config.wsgi:application --bind 0.0.0.0:$PORT --workers 3
```

### Step 2: Environment Variables (Render Dashboard)
```ini
DJANGO_SECRET_KEY=generate-a-strong-random-50-character-string
DEBUG=False
ALLOWED_HOSTS=pixelgencreativity-backend.onrender.com,localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=https://pixelgencreativity.vercel.app,http://localhost:5173

# Managed MySQL Connection
DB_ENGINE=mysql
DB_NAME=pixelgencreativity_db
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=your-mysql-host.aivencloud.com
DB_PORT=3306

# Razorpay Credentials
RAZORPAY_KEY_ID=rzp_live_your_key_id
RAZORPAY_KEY_SECRET=your_live_key_secret
RAZORPAY_WEBHOOK_SECRET=your_live_webhook_secret
```

---

## 4. Database Setup: Managed MySQL 8.0

1. Provision MySQL 8.0 instance (utf8mb4 encoding, strict SQL mode).
2. Create schema:
```sql
CREATE DATABASE pixelgencreativity_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
3. Run initial migrations and seeders:
```bash
python manage.py migrate
python manage.py init_categories
python manage.py seed_marketplace
python manage.py seed_phase5
```

---

## 5. Razorpay Webhook Configuration

1. In Razorpay Dashboard -> Settings -> Webhooks -> Add New Webhook.
2. Webhook URL: `https://pixelgencreativity-backend.onrender.com/api/v1/orders/webhook/` (or verification endpoint).
3. Secret: Value of `RAZORPAY_WEBHOOK_SECRET`.
4. Active Events:
   - `order.paid`
   - `payment.captured`
   - `payment.failed`
