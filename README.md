# PixelGenCreativity — Full-Stack Architecture

PixelGenCreativity is a modern full-stack web application and international digital design marketplace designed for graphic design templates, brand identity kits, UI kits, social media creatives, and bespoke design agency services.

---

## Technical Stack

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Frontend** | React | 19.x | Component UI Library |
| **Build Tool** | Vite | 8.x | Frontend build system & HMR dev server |
| **Styling** | Tailwind CSS | 4.x | Utility-first CSS framework |
| **Animations** | Framer Motion | 14.x | Component entrances, gestures, and modal transitions |
| **Scroll Animation** | GSAP + ScrollTrigger | 3.x | Scroll-driven timeline animations and parallax |
| **Routing** | React Router DOM | 7.x | Declarative client-side routing & URL params |
| **HTTP Client** | Axios | 1.x | Centralized API client with interceptors & services |
| **Icons** | Lucide React | Latest | Modern SVG icon kit |
| **Backend** | Python Django | 5.0 / 6.1 | Core Web Framework |
| **API Layer** | Django REST Framework | 3.17.x | RESTful API serialization, ViewSets, and routers |
| **Authentication** | SimpleJWT | 5.5.x | JWT Bearer access & refresh tokens |
| **Payments** | Razorpay SDK | Latest | Order generation, HMAC-SHA256 signature verification |
| **Primary Database** | MySQL Community Server | 8.0.x | Relational Database Engine (`pixelgencreativity_db`) |
| **DB Driver** | PyMySQL / Cryptography | Latest | Pure-Python MySQL client adapter with 8.0 LTS compatibility |

---

## Complete 24-Page Ecosystem

| # | Route | Page Component | Description & Integration |
|---|---|---|---|
| 1 | `/` | `HomePage.jsx` | Flagship landing page with interactive pixel grid matrix, marquee ticker, Swiss headline, and isometric voxel cards |
| 2 | `/about` | `AboutPage.jsx` | Agency manifesto, core design principles, and animated metrics |
| 3 | `/marketplace` | `MarketplacePage.jsx` | Curated marketplace hub with hero categories, featured, and trending kits |
| 4 | `/marketplace/categories` | `MarketplaceCategoriesPage.jsx` | 15 Creative Disciplines Category Directory |
| 5 | `/marketplace/product/:slug` | `ProductDetailPage.jsx` | In-depth product showcase, multi-image lightbox gallery, reviews, and license tiers |
| 6 | `/portfolio` | `PortfolioPage.jsx` | Agency creative case studies and client showcase |
| 7 | `/services` | `ServicesPage.jsx` | Agency design divisions (Branding, Social Media, UI/UX) |
| 8 | `/custom-request` | `CustomDesignRequestPage.jsx` | Custom design commission brief builder and quotation portal |
| 9 | `/contact` | `ContactPage.jsx` | Client inquiry form, studio offices, and 24-hour response guarantee |
| 10 | `/blog` | `BlogPage.jsx` | Editorial design insights, trends, and spatial UI research |
| 11 | `/login` | `LoginPage.jsx` | JWT authentication sign-in with email or username |
| 12 | `/register` | `RegisterPage.jsx` | New creator account registration with automated profile creation |
| 13 | `/forgot-password` | `ForgotPasswordPage.jsx` | Secure password recovery with verification code |
| 14 | `/dashboard` | `UserDashboardPage.jsx` | 9-tab glassmorphic user portal (Overview, Profile, Orders, Purchased, Downloads, Wishlist, Payments, Notifications, Settings) |
| 15 | `/cart` | `CartPage.jsx` | Persistent shopping cart with license multiplier and promo coupon engine |
| 16 | `/wishlist` | `WishlistPage.jsx` | Saved designs collection with instant move-to-cart actions |
| 17 | `/checkout` | `CheckoutPage.jsx` | Real Razorpay checkout flow with cryptographic signature verification |
| 18 | `/orders` | `OrderHistoryPage.jsx` | Transaction logs and purchase history |
| 19 | `/purchased-designs` | `PurchasedDesignsPage.jsx` | Active purchased designs with assigned commercial license keys |
| 20 | `/download-center` | `DownloadCenterPage.jsx` | Authenticated vector asset archive downloads (`.ZIP`) |
| 21 | `/privacy-policy` | `PrivacyPolicyPage.jsx` | Complete GDPR/international data protection policy |
| 22 | `/terms-and-conditions`| `TermsPage.jsx` | Commercial licensing agreement and marketplace terms |
| 23 | `/refund-policy` | `RefundPolicyPage.jsx` | Digital goods refund rules and dispute resolution |
| 24 | `/admin-dashboard` | `AdminDashboardPage.jsx` | Executive command center (Analytics, Product CRUD, Category CRUD, Orders, Users, Briefs, Inquiries, Blog, Subscribers) |

---

## Demo & Administrative Credentials

| Role | Username / Identifier | Password | Access Rights |
|---|---|---|---|
| **Platform Administrator** | `admin` (or `admin@pixelgencreativity.com`) | `Admin@12345` | Full administrative control, `/admin-dashboard`, Product CRUD, Order Status |
| **Verified Customer** | `demo_creator` (or `alex@pixelgencreativity.com`) | `Creator@12345` | Customer dashboard, purchased licenses, verified download history |

---

## Project Documentation Index

In accordance with our strict engineering and documentation rules, all architectural components, APIs, test results, and operational runbooks are formally documented:

- 📋 [**IMPLEMENTATION_PLAN.md**](file:///c:/Users/ppatw/Documents/PixelGenCreativity_Graphic/IMPLEMENTATION_PLAN.md): Phase status, architectural objectives, and roadmap.
- 📜 [**DEVELOPMENT_LOG.md**](file:///c:/Users/ppatw/Documents/PixelGenCreativity_Graphic/DEVELOPMENT_LOG.md): Comprehensive audit log of commands, fixes, and discoveries.
- 🗄️ [**DATABASE_SCHEMA.md**](file:///c:/Users/ppatw/Documents/PixelGenCreativity_Graphic/DATABASE_SCHEMA.md): Complete database schema, 29 tables, data types, indexes, and constraints.
- 🗺️ [**ER_DIAGRAM.md**](file:///c:/Users/ppatw/Documents/PixelGenCreativity_Graphic/ER_DIAGRAM.md): Comprehensive Mermaid Entity-Relationship diagram across all 6 domain applications.
- 📡 [**API_DOCUMENTATION.md**](file:///c:/Users/ppatw/Documents/PixelGenCreativity_Graphic/API_DOCUMENTATION.md): REST API endpoints under `/api/v1/`, request/response payloads, and status codes.
- 🛒 [**MARKETPLACE_DOCUMENTATION.md**](file:///c:/Users/ppatw/Documents/PixelGenCreativity_Graphic/MARKETPLACE_DOCUMENTATION.md): Complete marketplace architecture, 15 categories, search/filter algorithms, and cart state.
- 🧩 [**COMPONENT_DOCUMENTATION.md**](file:///c:/Users/ppatw/Documents/PixelGenCreativity_Graphic/COMPONENT_DOCUMENTATION.md): Component inventory, API props, state hooks, and responsibilities.
- 🎨 [**UI_DESIGN_SYSTEM.md**](file:///c:/Users/ppatw/Documents/PixelGenCreativity_Graphic/UI_DESIGN_SYSTEM.md): Complete design tokens, glassmorphism guidelines, typography, and animation specs.
- 🧪 [**TESTING_REPORT.md**](file:///c:/Users/ppatw/Documents/PixelGenCreativity_Graphic/TESTING_REPORT.md): Empirical test results, benchmarks, automated DRF test runs, and validation logs.
- 🛡️ [**SECURITY.md**](file:///c:/Users/ppatw/Documents/PixelGenCreativity_Graphic/SECURITY.md): Security hardening, CORS, CSRF, session validation, and credential protection.
- ⚙️ [**SETUP_GUIDE.md**](file:///c:/Users/ppatw/Documents/PixelGenCreativity_Graphic/SETUP_GUIDE.md): Detailed local developer setup, MySQL migration, and seeding runbooks.
- 🚀 [**DEPLOYMENT_GUIDE.md**](file:///c:/Users/ppatw/Documents/PixelGenCreativity_Graphic/DEPLOYMENT_GUIDE.md): Production Nginx, Gunicorn, systemd, and SSL guide.

---

## Phase 4 Backend & Database Highlights

1. **MySQL 8.0 Relational Architecture**:
   - Normalized database architecture across 6 modular applications (`categories`, `products`, `reviews`, `cart`, `wishlist`, `promotions`).
   - 29 active database tables in `pixelgencreativity_db`.
   - Django 6.1 dynamic MySQL 8.0 LTS compatibility override.

2. **Database Seeding & Management Commands**:
   - `python manage.py init_categories`: Idempotent seeder populating all 15 core design categories.
   - `python manage.py seed_marketplace`: Comprehensive seeder populating 15 products, 32 gallery images, 67 tags, 2 licenses, 15 reviews, 2 coupons, and promotional banners.

3. **Django REST Framework `/api/v1/` Endpoints**:
   - `/api/v1/categories/`: Full category taxonomy and nested subcategories.
   - `/api/v1/products/`: Catalog filtering (category, price range, rating, badges), search, sorting, and pagination.
   - `/api/v1/products/{slug}/`: Full product specification, high-res galleries, deliverables, and licenses.
   - `/api/v1/products/{slug}/reviews/`: Verified reviews with ratings and helpful counters.
   - `/api/v1/cart/`: Dual-identity shopping cart (session key or authenticated user) with license calculation.
   - `/api/v1/wishlist/`: Dual-identity saved items, atomic toggle, and move-to-cart.
   - `/api/v1/promotions/`: Promotional banners and active coupon validation (`PIXEL20`, `CREATOR10`).

4. **Frontend Service Layer Integration**:
   - Centralized Axios client (`frontend/src/services/apiClient.js`) with `X-Session-Key` header injection and error normalization.
   - 6 domain services (`categoryService`, `productService`, `reviewService`, `cartService`, `wishlistService`, `promotionsService`).
   - Graceful degradation: Loading shimmer skeletons and `ApiErrorCard` with retry actions.

---

## Live Route Map

| Route | Description |
| :--- | :--- |
| `/` | Agency & Marketplace Homepage |
| `/marketplace` | Marketplace Landing Hub (Connected to DRF APIs) |
| `/marketplace/products` | Full Catalog Browser with Sidebar Filters & Sorting |
| `/marketplace/categories` | 15 Creative Disciplines Category Directory |
| `/marketplace/category/:slug` | Dynamic Category Landing Page |
| `/marketplace/product/:slug` | In-Depth Product Showcase & Lightbox Gallery |
| `/marketplace/search` | Dedicated Marketplace Search Page |
| `/cart` | Digital Shopping Cart with Coupon Engine & Checkout |
| `/wishlist` | Saved Items & Wishlist Management |
| `/services` | Agency Design Services (Branding, Social Media, UI/UX) |
| `/portfolio` | Client Case Studies & Portfolio Showcase |
| `/about` | Agency Manifesto & Creative Team |
| `/contact` | Contact Studio & Project Consultation |
| `/health` | System Diagnostics & Telemetry Dashboard |
| `*` | Custom 404 Glassmorphism Fallback |

---

## Quickstart & Local Setup

### 1. Prerequisites
- **Node.js**: v20+ (tested on v24.18.0) & npm
- **Python**: 3.12+ (tested on 3.14.6)
- **MySQL Server**: 8.0+

### 2. Configure Environment Variables
Verify `backend/.env` and `frontend/.env`:
```ini
# Backend (.env located in backend/)
DJANGO_SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1,0.0.0.0
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173

# Database Selection: 'mysql'
DB_ENGINE=mysql
DB_NAME=pixelgencreativity_db
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=127.0.0.1
DB_PORT=3306

# Frontend (.env located in frontend/)
VITE_API_URL=http://localhost:8000/api
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

### 3. Database Migration & Seeding
```bash
cd backend
venv\Scripts\activate
python manage.py migrate
python manage.py init_categories
python manage.py seed_marketplace
```

### 4. Running the Development Servers
**Backend** (port 8000):
```bash
cd backend
venv\Scripts\activate
python manage.py runserver 0.0.0.0:8000
```

**Frontend** (port 5173):
```bash
cd frontend
npm run dev -- --port 5173 --host
```

### 5. Access Live in Browser
- **Frontend Web UI**: [http://localhost:5173/](http://localhost:5173/)
- **Marketplace Hub**: [http://localhost:5173/marketplace](http://localhost:5173/marketplace)
- **Product Catalog**: [http://localhost:5173/marketplace/products](http://localhost:5173/marketplace/products)
- **15 Categories**: [http://localhost:5173/marketplace/categories](http://localhost:5173/marketplace/categories)
- **Shopping Cart**: [http://localhost:5173/cart](http://localhost:5173/cart)
- **Wishlist**: [http://localhost:5173/wishlist](http://localhost:5173/wishlist)
- **Backend DRF API Root**: [http://localhost:8000/api/v1/products/](http://localhost:8000/api/v1/products/)
- **Backend Health Probe**: [http://localhost:8000/api/health/](http://localhost:8000/api/health/)
