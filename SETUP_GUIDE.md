# PixelGenCreativity — Local Development Setup Guide

Welcome to the PixelGenCreativity setup guide. Follow these step-by-step instructions to configure, run, and develop the full-stack application on your local machine.

---

## 1. System Prerequisites

Verify that the following runtimes and tools are installed:

- **Node.js**: v20+ (tested with `v24.18.0`)
- **npm**: v10+ (tested with `11.16.0`)
- **Python**: v3.12+ (tested with `3.14.6`)
- **Git**: Latest version
- **MySQL Server**: Community Server v8.0+

---

## 2. Repository Structure

```
PixelGenCreativity_Graphic/
├── backend/                  # Django 6 + Django REST Framework API service
│   ├── apps/
│   │   ├── categories/       # Category & SubCategory domain
│   │   ├── products/         # Products, Images, Tags, Licenses, Collections
│   │   ├── reviews/          # Customer reviews and star ratings
│   │   ├── cart/             # Shopping cart with dual-identity support
│   │   ├── wishlist/         # Wishlist & Recently Viewed
│   │   ├── promotions/       # Banners & Coupon validation
│   │   ├── core/             # Health check & system diagnostics
│   │   ├── users/            # User domain (Phase 5)
│   │   └── creations/        # Pixel graphics domain
│   ├── config/               # Project settings, URLs, WSGI, PyMySQL shim
│   └── manage.py
├── frontend/                 # React 19 + Vite 8 + Tailwind CSS v4 SPA
│   ├── src/
│   │   ├── components/       # Common, Layout, and Marketplace components
│   │   ├── context/          # CartContext, WishlistContext, ToastContext
│   │   ├── pages/            # 8 Marketplace pages + Agency pages
│   │   ├── services/         # Axios API client & 6 domain service modules
│   │   └── routes/           # React Router DOM routes
│   └── package.json
└── documentation/            # Comprehensive markdown documentation suite
```

---

## 3. Backend Setup & MySQL Configuration

### 3.1 Initialize Virtual Environment
Navigate to the `backend/` directory:
```bash
cd backend

# On Windows:
python -m venv venv
venv\Scripts\activate

# On macOS/Linux:
python3 -m venv venv
source venv/bin/activate
```

### 3.2 Install Python Dependencies
```bash
python -m pip install -r requirements.txt
```

### 3.3 Configure Backend Environment Variables
Create or verify `backend/.env`:
```ini
# Core Configuration
DJANGO_SECRET_KEY=pixelgen-insecure-development-secret-key-change-in-production
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1,0.0.0.0

# CORS Whitelist
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173

# Database Engine Selection ('mysql' recommended for full marketplace)
DB_ENGINE=mysql
DB_NAME=pixelgencreativity_db
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_HOST=127.0.0.1
DB_PORT=3306
```

### 3.4 Create MySQL Database
Using the MySQL CLI or Workbench:
```sql
CREATE DATABASE IF NOT EXISTS pixelgencreativity_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3.5 Execute Database Migrations
Apply all 27 migrations across the 6 domain apps:
```bash
python manage.py migrate
```

### 3.6 Seed Database with Marketplace Content
Populate the 15 categories, 15 complete product packages, 32 gallery images, 67 tags, 2 licenses, 15 reviews, and coupons:
```bash
python manage.py init_categories
python manage.py seed_marketplace
```

### 3.7 Run Automated Tests
```bash
python manage.py test apps.products apps.cart
```

### 3.8 Run the Backend Development Server
```bash
python manage.py runserver 0.0.0.0:8000
```
Backend API will be accessible at:
- **API Root (v1)**: `http://localhost:8000/api/v1/products/`
- **Health Check Endpoint**: `http://localhost:8000/api/health/`
- **Django Admin**: `http://localhost:8000/admin/`

---

## 4. Frontend Setup

In a new terminal window:

### 4.1 Install Node Dependencies
```bash
cd frontend
npm install
```

### 4.2 Configure Frontend Environment Variables
Verify `frontend/.env`:
```ini
VITE_API_URL=http://localhost:8000/api
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

### 4.3 Verify Production Build
```bash
npm run build
```

### 4.4 Start Vite Development Server
```bash
npm run dev -- --port 5173 --host
```
The frontend UI will be running live at:
- **Application Dashboard**: `http://localhost:5173/`
- **Marketplace Hub**: `http://localhost:5173/marketplace`
- **Product Catalog**: `http://localhost:5173/marketplace/products`
- **Category Directory**: `http://localhost:5173/marketplace/categories`
- **Shopping Cart**: `http://localhost:5173/cart`
- **Wishlist**: `http://localhost:5173/wishlist`
- **Diagnostics & Health Page**: `http://localhost:5173/health`

---

## 5. One-Click Launch Scripts (Windows)

Launch both backend and frontend servers simultaneously using:

### Using PowerShell
```powershell
.\start-dev.ps1
```

### Using Command Prompt / Double-Click
```cmd
start-dev.bat
```

---

## 6. Troubleshooting & FAQs

### Q1: `MySQL 8.4 or later is required (found 8.0.46)`
- **Cause**: Django 6.1 enforces MySQL 8.4+ by default.
- **Solution**: Handled automatically in `backend/config/__init__.py` with dynamic compatibility property override.

### Q2: `ModuleNotFoundError: No module named 'PIL'`
- **Cause**: Pillow library missing for Django `ImageField`.
- **Solution**: Run `python -m pip install pillow` (included in `requirements.txt`).

### Q3: `CORS error in browser console`
- **Cause**: Frontend origin is not whitelisted in backend settings.
- **Solution**: Ensure `CORS_ALLOWED_ORIGINS` in `backend/.env` includes `http://localhost:5173`.
