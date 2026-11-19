# PixelGenCreativity — Development Log

## [Phase 1] Foundation and Technical Setup

### Timestamp: 2026-11-11

---

### Step 1: Environment & Runtime Discovery
- **Host OS**: Windows 11
- **Python Runtime**: Python 3.14.6 (`C:\Users\ppatw\AppData\Local\Programs\Python\Python314\python.exe`)
- **Node.js**: v24.18.0
- **npm**: 11.16.0
- **MySQL Server**: MySQL Server 8.0 detected at `C:\Program Files\MySQL\MySQL Server 8.0\bin` listening on `127.0.0.1:3306`.
- **Finding**: Direct socket connections inside sandbox require BypassSandbox mode for loopback network access due to Windows AppContainer policy.

---

### Step 2: Frontend Implementation
- Initialized React application with Vite using template `react`.
- Installed dependencies:
  - `react`: ^19.3.1
  - `react-dom`: ^19.3.1
  - `react-router-dom`: ^7.x
  - `axios`: ^1.x
  - `lucide-react`: ^1.x
  - `tailwindcss`: ^4.x
  - `@tailwindcss/vite`: ^4.x
- Configured `frontend/vite.config.js` with `@tailwindcss/vite` plugin and dev server options.
- Configured `frontend/src/index.css` with `@import "tailwindcss";`.
- Implemented modular frontend architecture:
  - `src/api/client.js`: Axios client with interceptors for error logging and future token injection.
  - `src/api/health.js`: Health check consumer calling `/health/`.
  - `src/components/common/Navbar.jsx`: Branded navigation bar with phase indicator.
  - `src/components/common/Footer.jsx`: Architecture stack tags and footer info.
  - `src/components/common/StatusBadge.jsx`: Dynamic status pill component.
  - `src/components/common/LoadingSpinner.jsx`: Lucide spinner.
  - `src/components/layout/MainLayout.jsx`: Responsive layout container.
  - `src/pages/HomePage.jsx`: Full architecture dashboard with live API connection probe.
  - `src/pages/HealthPage.jsx`: Interactive health check & diagnostics inspector.
  - `src/pages/NotFoundPage.jsx`: 404 page with return to home navigation.
  - `src/routes/AppRoutes.jsx`: Client-side route declarations.
  - `src/App.jsx`: Main entry component with React Router provider.
- Created `frontend/.env` and `frontend/.env.example` (`VITE_API_URL=http://localhost:8000/api`).
- **Build Verification**: Executed `npm run build` in `frontend/`. 2152 modules transformed, built in 6.37s with zero errors.
- **Server Verification**: Tested Vite dev server on port 5173, verified HTTP 200 OK.

---

### Step 3: Backend Implementation
- Created Python virtual environment in `backend/venv`.
- Installed backend dependencies:
  - `Django==6.1.3`
  - `djangorestframework==3.18.3`
  - `django-cors-headers==4.9.0`
  - `PyMySQL==1.2.4`
  - `cryptography==50.0.2`
  - `python-dotenv==1.2.4`
- Generated `backend/requirements.txt`.
- Initialized Django project named `config` via `django-admin startproject config .`.
- Configured PyMySQL as default MySQLdb driver in `backend/config/__init__.py`.
- Created modular Django applications:
  - `apps.core`: Cross-cutting concerns and health check API.
  - `apps.users`: User and authentication domain.
  - `apps.creations`: Creative graphics and pixel domain.
- Configured `backend/config/settings.py`:
  - 12-factor environment variable loading via `python-dotenv`.
  - `CORS_ALLOWED_ORIGINS` with `corsheaders.middleware.CorsMiddleware`.
  - Django REST Framework default renderer and permission configurations.
  - MySQL database settings (`django.db.backends.mysql`) referencing environment variables.
- Implemented `/api/health/` in `apps.core.views.HealthCheckView`:
  - Executes live `SELECT 1;` against database connection.
  - Returns `200 OK` (healthy) or `503 Service Unavailable` (degraded).
  - Emits telemetry: service name, version, ISO timestamp, database connection status, latency in ms, error details, and environment mode.
- Routed `/api/` in `config.urls` to `apps.core.urls`, `apps.users.urls`, and `apps.creations.urls`.

---

### Step 4: Verification & Diagnostic Results
- **Frontend Build**: Passed (`dist/` generated, 0 warnings/errors).
- **Frontend Dev Server**: Tested and returned HTTP 200 on port 5173.
- **Backend Import Verification**: All core packages (`pymysql`, `django`, `rest_framework`, `corsheaders`, `dotenv`) loaded successfully.
- **Django Health Endpoint Probe**:
  - Tested via Django test client: Endpoint responded with structured JSON payload (`503 Degraded` due to pending database authentication).
  - Telemetry format confirmed: `service`, `version`, `timestamp`, `database` block, `environment`.
- **MySQL Connection Testing**:
  - MySQL Server 8.0 confirmed active on `127.0.0.1:3306`.
  - Connection attempted with default and blank credentials; returned standard MySQL error `1045 (28000): Access denied for user 'root'@'localhost' (using password: NO)`.
  - Zero fake connections used. Live connection verification awaiting user MySQL credentials.


---

### Step 5: Socket Restriction Diagnostics, Dual Database Engine & Full Documentation Suite
**Timestamp**: 2026-11-12

- **Sandbox Network Diagnosis**:
  - Diagnosed `WinError 10013: An attempt was made to access a socket in a way forbidden by its access permissions` when running commands inside standard Windows sandbox mode.
  - Confirmed that Windows AppContainer sandbox policy isolates loopback socket access.
  - Verified outside sandbox mode (`BypassSandbox: true`): MySQL server on `127.0.0.1:3306` responded immediately with authentication handshake. Tested blank credentials and common passwords; confirmed MySQL error `1045 Access denied for user 'root'@'localhost'` (real MySQL daemon active; waiting for user root password).
- **Dual-Engine Database Architecture**:
  - Enhanced `backend/config/settings.py` with `DB_ENGINE = os.getenv('DB_ENGINE', 'mysql').lower()`.
  - Configured conditional engine loading:
    - `DB_ENGINE=mysql`: Targets MySQL 8.0 on `127.0.0.1:3306` using PyMySQL with `STRICT_TRANS_TABLES` and `utf8mb4`.
    - `DB_ENGINE=sqlite`: Targets `backend/db.sqlite3` for standalone local developer testing and offline work without needing a running database daemon.
  - Updated `backend/.env` and `.env.example` to document `DB_ENGINE`.
- **Database Migrations**:
  - Executed `python manage.py migrate` in `backend/`.
  - 18 core migrations successfully applied across `contenttypes`, `auth`, `admin`, and `sessions`.
- **System Checks & Health Probe**:
  - Executed `python manage.py check`: Passed with 0 issues identified.
  - Probed `/api/health/` using Django test client: Returned `HTTP 200 OK`, latency `2.15ms`, `database.connected: true`, `database.engine: "sqlite"`.
- **One-Click Launch Scripts**:
  - Created `start-dev.bat` for Windows Command Prompt/double-click execution.
  - Created `start-dev.ps1` for Windows PowerShell execution.
  - Scripts automatically launch Django on port 8000, Vite on port 5173, and trigger the default web browser to open `http://localhost:5173/`.
- **Mandatory Documentation Management Rules Applied**:
  - Created `DATABASE_SCHEMA.md`: ER diagrams, active baseline tables, and Phase 2/3 domain models.
  - Created `API_DOCUMENTATION.md`: REST API specifications, `/api/health/` contract, and endpoint roadmaps.
  - Created `TESTING_REPORT.md`: Empirical test logs, build benchmarks, and MySQL socket discovery results.
  - Created `SECURITY.md`: Defense-in-depth policy, CORS, CSRF, clickjacking, and production checklist.
  - Created `SETUP_GUIDE.md`: Developer setup instructions, environment config, and troubleshooting.
  - Created `DEPLOYMENT_GUIDE.md`: Production Nginx, Gunicorn, systemd, and Let's Encrypt runbook.
  - Updated `README.md`: Master documentation index, dual-engine setup, and browser links.
  - Updated `IMPLEMENTATION_PLAN.md`: Synchronized phase statuses and pending tasks.


---

### Step 6: Phase 2 — Premium UI/UX Design & Glassmorphism Website Development
**Timestamp**: 2026-11-12

- **Dependencies Installed**:
  - `framer-motion`: `^14.12.0` (for micro-interactions, word-by-word staggered hero animation, and modal transitions)
  - `gsap`: `^3.15.1` (with ScrollTrigger plugin registered for scroll-driven animations)
- **Centralized Design System**:
  - Authored `frontend/src/data/designSystemTokens.js`: Centralized color tokens (`#05020c`, `#090317`, `#12092b`, `#8b5cf6`, `#d946ef`), typography scale, and glass presets.
  - Enhanced `frontend/src/index.css`: Added `@theme` variables, glassmorphism surface classes, glowing border effects (`glow-purple`, `glow-violet`), mesh gradients, and keyframe animations (`floatSlow`, `floatReverse`, `pulseGlow`).
- **Decoupled Demonstration Data Architecture**:
  - Created `frontend/src/data/categories.js`: All 15 required categories with titles, descriptions, item counts, badges, and icon mappings.
  - Created `frontend/src/data/featuredDesigns.js`: 8 curated design assets with preview images, demo pricing, ratings, tags, and badges (`FEATURED`, `TRENDING`, `HOT DEAL`, `BESTSELLER`).
  - Created `frontend/src/data/services.js`: 3 creative agency divisions (Custom Logo & Branding, Social Media Design, UI/UX & Web Design) with deliverables and timelines.
  - Created `frontend/src/data/portfolio.js`: 6 agency case studies with client names, year tags, tags, and imagery.
  - Created `frontend/src/data/testimonials.js`: Demonstration client reviews with ratings, avatars, and verified badges.
  - Created `frontend/src/data/faqs.js`: Accordion FAQ entries for licensing, custom commissions, revisions, delivery, payments, and support.
- **Reusable Design System Components**:
  - `GlassCard.jsx`: Frosted glassmorphism card with glow variants and top shimmer border line.
  - `PrimaryButton.jsx`: Violet/fuchsia gradient interactive button with loading state.
  - `SecondaryButton.jsx`: Frosted translucent button with purple border hover.
  - `GradientText.jsx`: Multi-variant typographic gradient text wrapper.
  - `SectionHeading.jsx`: Standardized section header with badge, title, and subtitle.
  - `Container.jsx`: Responsive layout container with gutter enforcement.
  - `LoadingScreen.jsx`: Branded full-viewport transition overlay.
  - `ScrollReveal.jsx`: Motion wrapper with `prefers-reduced-motion` compliance.
  - `AnimatedCounter.jsx`: Cubic-eased numerical counter.
  - `useGsapScroll.js`: Custom hook encapsulating GSAP tweens and ScrollTriggers inside `gsap.context()` with automatic cleanup on unmount.
- **Interactive Modals**:
  - `AuthModal.jsx`: Login / Register modal with tabs, input validation, and Phase 2 disclaimer.
  - `CustomOrderModal.jsx`: Custom design quotation brief builder with division selector, budget, timeline, and description.
- **Navigation & Footer**:
  - `Navbar.jsx`: Glassmorphic sticky header with active route pills, mobile drawer, and modal triggers.
  - `Footer.jsx`: Multi-column agency footer with brand manifesto, sitemaps, social pills, and system telemetry link.
- **Homepage Sections**:
  - `HeroSection.jsx`: Word-by-word headline animation ("Design Beyond Limits. Create Without Boundaries."), floating 3D metric cards, ambient flares.
  - `FeaturedDesignsSection.jsx`: Filterable design preview cards with quick view modal.
  - `CategoriesSection.jsx`: 15-category grid with hover scaling.
  - `ServicesSection.jsx`: 3 agency divisions with deliverables checklist and quotation CTA.
  - `PortfolioSection.jsx`: Filterable agency case studies with zoom effects.
  - `HowItWorksSection.jsx`: 4-step animated customer journey.
  - `TestimonialsSection.jsx`: Customer review cards with demonstration disclaimer.
  - `FaqSection.jsx`: Interactive accordion with smooth height transition.
  - `NewsletterSection.jsx`: Subscription form with regex validation and loading states.
- **Full Route Pages**:
  - `HomePage.jsx`: Composed flagship landing page.
  - `MarketplacePage.jsx`: Template search, category filters, and sorting.
  - `CategoriesPage.jsx`: 15-category directory with search.
  - `ServicesPage.jsx`: In-depth agency service packages and commission triggers.
  - `PortfolioPage.jsx`: Full agency portfolio showcase.
  - `AboutPage.jsx`: Manifesto, 4 core design principles, and animated stats.
  - `ContactPage.jsx`: Direct client inquiry form, studio locations, and 24h guarantee.
  - `NotFoundPage.jsx`: Custom 404 with glassmorphism aesthetics.
  - `HealthPage.jsx`: Preserved Phase 1 live system telemetry & database health probe.
- **Build & Server Verification**:
  - Resolved relative import paths in `src/pages/` and swapped non-exported `Instagram` icon to `Camera` in `lucide-react`.
  - Executed `npm run build`: 2,609 modules transformed, 0 errors, built in 1.42s (`dist/` generated).
  - Started Vite server on port `5173` and Django server on port `8000`. Probed both via `curl.exe`: HTTP 200 OK.
- **Documentation Updates**:
  - Created `UI_DESIGN_SYSTEM.md`: Full token specification, glass guidelines, typography scale, and animation rules.
  - Updated `TESTING_REPORT.md`: Appended Test Suites 7 through 10 with empirical verification data.
  - Updated `README.md` and `IMPLEMENTATION_PLAN.md`.


---

### Step 7: Phase 3 — Complete Graphic Design Marketplace Frontend Development

#### 1. Objectives & Architectural Guardrails
- Build a complete, responsive digital graphic design marketplace frontend using decoupled demonstration product data and client-side state.
- Implement all 15 required design categories with category-specific filtering, detailed product pages, multi-image preview lightbox galleries, persistent shopping cart, wishlist, and simulated checkout.
- Strictly adhere to Phase 3 scope: No premature Django product endpoints or MySQL modifications; retain all Phase 1 and Phase 2 configurations without deleting working code.

#### 2. Components, Contexts & Data Modules Created
- **Decoupled Demonstration Dataset (`src/data/marketplaceProducts.js`)**:
  - Implemented 16 comprehensive product objects across all 15 categories (Logo Design, Brand Identity, Posters & Banners, Instagram Posts, Instagram Stories, Social Media Carousels, YouTube Thumbnails, YouTube Channel Banners, Business Cards, Resume Templates, Presentation Designs, Website UI Kits, Mobile App UI, Landing Page Templates, Marketing Creatives).
  - Rich metadata: ID, slug, title, category, categorySlug, pricing ($39 - $89), originalPrice, discount, rating (4.8 - 5.0), reviewCount, salesCount, boolean flags (`featured`, `trending`, `bestSeller`, `isNew`, `onSale`), description, multi-image preview arrays (3-4 images per asset), file formats (AI, PSD, Figma, SVG, PNG, EPS), software compatibility, dimensions, license terms, package contents, features, verified reviews with helpful counters, and tags.
  - Exported utility query helpers: `getProductBySlug`, `getProductsByCategory`, `getFeaturedProducts`, `getTrendingProducts`, `getBestSellers`, `getNewArrivals`, `getSpecialOffers`, `getRelatedProducts`.
- **Global Context Providers (`src/context/`)**:
  - `CartContext.jsx`: Persistent shopping cart via `localStorage`, license selector (Standard 1.0x vs. Extended 2.5x), quantity controls, promo code engine (`PIXEL20` 20% off, `CREATOR10` 10% off), subtotal, discount, and total calculations.
  - `WishlistContext.jsx`: Persistent wishlist via `localStorage`, duplicate prevention, toggle favorite, single "Move to Cart", and batch "Move All to Cart" actions.
  - `ToastContext.jsx`: Non-intrusive floating glassmorphic notification alerts for cart/wishlist feedback.
- **Marketplace Components (`src/components/marketplace/`)**:
  - `ProductCard.jsx`: Glassmorphic card with preview image zoom, category badges, rating, wishlist toggle, Add to Cart action, and product link.
  - `ProductGrid.jsx`: Responsive 2/3/4-column grid with loading skeleton states and empty search results fallback.
  - `LoadingSkeleton.jsx`: Shimmer card skeletons for smooth filtering transitions.
  - `ProductSearch.jsx`: Debounced live search with dropdown auto-suggestions for products and categories.
  - `ProductFilter.jsx`: Multi-faceted filter sidebar and mobile drawer supporting 15 categories, dual price range slider ($0 - $200), minimum star rating, and collection flags.
  - `SortDropdown.jsx`: 5-option sorting selector (Popularity, Rating, Newest, Price Low/High).
  - `ProductGallery.jsx`: High-res image gallery with thumbnail navigation and fullscreen lightbox modal.
  - `ProductReviews.jsx`: Rating breakdown bars (5★ to 1★), verified licensee reviews, and helpful voting.
  - `RelatedProducts.jsx`: Category-specific product recommendations.
  - `MarketplaceHero.jsx`: Visual hero with search input, quick category pills, and trust statistics.
  - `PromoBanner.jsx`: Glassmorphic promotional banner for seasonal discount campaigns.
  - `CartItem.jsx`: Cart row displaying thumbnail, title, category, license dropdown (Standard / Extended), price calculation, and delete action.
  - `WishlistItem.jsx`: Wishlist card with rating, price, "Move to Cart", and delete action.
  - `EmptyCart.jsx`: Glassmorphic empty cart state with browsing CTA.
  - `EmptyWishlist.jsx`: Glassmorphic empty wishlist state with browsing CTA.
  - `CheckoutModal.jsx`: Simulated checkout dialog displaying order breakdown, license agreement checkbox, payment tabs (Card, Razorpay Demo, Instant Download), license key generator (`LIC-2026-XXXXXX`), and simulated `.ZIP` downloads.
- **SPA Pages Created / Enhanced (`src/pages/`)**:
  - `MarketplacePage.jsx`: Curated marketplace landing hub.
  - `MarketplaceProductsPage.jsx`: Catalog browser with sidebar filters and active pills.
  - `MarketplaceCategoriesPage.jsx`: 15 Categories directory with asset counts and search.
  - `CategoryDetailPage.jsx`: Dynamic category landing (`/marketplace/category/:slug`).
  - `ProductDetailPage.jsx`: Product detail page with gallery, specs, reviews, and license options (`/marketplace/product/:slug`).
  - `MarketplaceSearchPage.jsx`: Dedicated search page with query parameter parser (`/marketplace/search`).
  - `CartPage.jsx`: Shopping cart view with promo code engine and checkout modal trigger (`/cart`).
  - `WishlistPage.jsx`: Saved designs collection view (`/wishlist`).
- **Routing & Navigation Synchronized**:
  - Updated `src/routes/AppRoutes.jsx` to register all 8 marketplace routes.
  - Updated `src/components/common/Navbar.jsx` with real-time Wishlist and Cart badge counters and links to Products and Categories.
  - Updated `src/components/common/Footer.jsx` with deep links to `/marketplace/category/:slug` and `/marketplace/categories`.

#### 3. Verification & Build
- Executed `npm --prefix frontend run build`:
  - 2,636 modules transformed.
  - 0 compilation errors or unresolved imports.
  - Production build completed in 1.09s.
- Health Probes:
  - Frontend Vite server on `http://localhost:5173/` returned HTTP 200 OK.
  - Backend Django server on `http://localhost:8000/api/health/` returned HTTP 200 OK (`{"status":"healthy"}`).
- Documentation Created/Updated:
  - Created `MARKETPLACE_DOCUMENTATION.md` and `COMPONENT_DOCUMENTATION.md`.
  - Updated `README.md`, `IMPLEMENTATION_PLAN.md`, `DEVELOPMENT_LOG.md`, and `TESTING_REPORT.md`.

---

### Step 8: Phase 4 — Complete Django Backend, MySQL Database Architecture & Frontend API Integration

**Timestamp**: 2026-11-12

#### 1. Objectives & Scope
- Transform PixelGenCreativity from a client-side demonstration marketplace into a full-stack, normalized relational database marketplace.
- Implement MySQL 8.0 connection (`pixelgencreativity_db`) with secure `.env` credentials.
- Build 6 modular Django apps (`apps.categories`, `apps.products`, `apps.reviews`, `apps.cart`, `apps.wishlist`, `apps.promotions`) with complete models, migrations, serializers, and ViewSets.
- Implement idempotent data population commands (`init_categories`, `seed_marketplace`).
- Create a centralized frontend API client and service layer in `frontend/src/services/` to replace mock data with live REST API responses.
- Implement graceful degradation with loading skeletons and `ApiErrorCard` fallback.
- Strictly adhere to Phase 4 scope: No user registration/login or Razorpay payment processing (strictly reserved for Phase 5).

#### 2. Technical Challenges Diagnosed & Resolved
1. **Django 6.1 MySQL 8.0 LTS Compatibility**:
   - *Problem*: Django 6.1 raised minimum required MySQL version to 8.4 LTS, throwing `django.db.utils.NotSupportedError: MySQL 8.4 or later is required (found 8.0.46)`.
   - *Resolution*: In `backend/config/__init__.py`, dynamically patched `DatabaseFeatures.minimum_database_version` property so Django seamlessly supports MySQL 8.0 LTS.
2. **Missing Pillow Dependency on Python 3.14**:
   - *Problem*: Django `models.ImageField` failed import with `ModuleNotFoundError: No module named 'PIL'`.
   - *Resolution*: Executed `python.exe -m pip install pillow` (installed Pillow 13.0.0) and recorded in `requirements.txt`.
3. **MySQL Unique Key Index Length Limitation**:
   - *Problem*: `Product.slug` with `max_length=280` produced Django warning `products.Product.slug: (mysql.W003) MySQL may not allow unique CharFields to have a max_length > 255`.
   - *Resolution*: Standardized `Product.slug` to `max_length=255`.
4. **Decimal vs. Float Arithmetic in Wishlist Move-to-Cart**:
   - *Problem*: Multiplying Decimal unit price by float `2.5` caused `TypeError: unsupported operand type(s) for *: 'decimal.Decimal' and 'float'`.
   - *Resolution*: Cast license multiplier to `Decimal('2.5')` in `apps/wishlist/views.py`.
5. **DRF Category List Pagination Handling**:
   - *Problem*: DRF global pagination wrapped category responses in `{'count': 15, 'results': [...]}`, whereas frontend categories component expects an array.
   - *Resolution*: Added `pagination_class = None` to `CategoryViewSet` in `apps/categories/views.py`.

#### 3. Frontend Architecture Transformation
- Created `frontend/src/services/apiClient.js`: Centralized Axios instance with `X-Session-Key` header injection and standardized error normalization.
- Created service files: `categoryService.js`, `productService.js`, `reviewService.js`, `cartService.js`, `wishlistService.js`, `promotionsService.js`.
- Implemented `frontend/src/components/common/ApiErrorCard.jsx` for graceful glassmorphic error recovery.
- Integrated live REST services across 8 marketplace pages:
  - `MarketplacePage.jsx`: Fetches hero categories, featured, trending, and new arrival design kits from DRF.
  - `MarketplaceProductsPage.jsx`: Fetches filtered, searched, and sorted products with active pagination.
  - `MarketplaceCategoriesPage.jsx`: Fetches all 15 categories from DRF with product counts.
  - `CategoryDetailPage.jsx`: Fetches category metadata and products by category slug.
  - `ProductDetailPage.jsx`: Fetches full product specs, image galleries, customer reviews, and related designs.
  - `MarketplaceSearchPage.jsx`: Searches live products by keyword.
  - `CartPage.jsx`: Connected to backend cart API for persistent item, quantity, and license management.
  - `WishlistPage.jsx`: Connected to backend wishlist API for persistent saved designs and atomic move-to-cart.

#### 4. Verification & Testing
- Automated DRF Tests: 9 tests passed in 0.555s (`backend/manage.py test apps.products apps.cart`).
- Frontend Production Build: Passed in 3.93s (`dist/` generated with 2,644 modules transformed).
- Live Service Probes: Probed `http://127.0.0.1:8000/api/v1/products/` and `http://127.0.0.1:5173/`, both returning HTTP 200 OK.

---

### Step 9: Phase 5 — User Authentication, Order Lifecycle, Razorpay Payments, Digital Downloads & Complete 24-Page Suite
**Timestamp**: 2026-11-19

#### 1. Architectural Scope & Implementation Highlights
- **Real JWT Authentication**:
  - Implemented `rest_framework_simplejwt` in `backend/config/settings.py` with 1-day access token and 14-day rotating refresh tokens.
  - Built `apps.users` with `UserProfile` model connected 1-to-1 with Django `auth_user`, role assignment (`customer`, `designer`, `admin`), phone, company, bio, and postal fields.
  - Endpoints: `POST /api/v1/auth/register/`, `POST /api/v1/auth/login/`, `POST /api/v1/auth/token/refresh/`, `GET/PATCH /api/v1/auth/profile/`, `POST /api/v1/auth/change-password/`, `POST /api/v1/auth/forgot-password/`, `POST /api/v1/auth/reset-password/`.
  - Admin user management: `GET /api/v1/auth/admin/users/`, `PATCH /api/v1/auth/admin/users/<id>/`.
- **Order Lifecycle & Razorpay Payments**:
  - Implemented `apps.orders` domain app with normalized relational models: `Order`, `OrderItem`, `Payment`, `DownloadLog`, `CustomDesignRequest`.
  - Created `apps/orders/razorpay_client.py` executing cryptographic HMAC-SHA256 signature verification (`hmac.new(secret, order_id|payment_id, sha256)`).
  - Secure order checkout endpoint (`POST /api/v1/orders/checkout/`) and signature verification endpoint (`POST /api/v1/orders/verify-payment/`).
  - Idempotent generation of unique cryptographic license keys (`LIC-2026-XXXXXX`) upon payment capture.
- **Secure Digital Downloads**:
  - Implemented `/api/v1/orders/downloads/<license_key>/` endpoint verifying valid paid order status and download quota before streaming in-memory ZIP package containing vector files, commercial license certificate, and README instructions.
  - Download quota tracking and audit logging (`DownloadLog`).
- **Editorial Content & Communications**:
  - Implemented `apps.content` domain app with models for `BlogPost`, `ContactInquiry`, `NewsletterSubscriber`, `Notification`.
  - Endpoints: `GET /api/v1/blog/`, `GET /api/v1/blog/<slug>/`, `POST /api/v1/contact/`, `POST /api/v1/newsletter/`, `GET /api/v1/notifications/`.
  - Admin management endpoints for products, categories, blog, inquiries, and subscribers.
- **Reference UI Design Alignment**:
  - Recreated all visual elements from reference design:
    - Interactive glowing mosaic pixel matrix banner (`InteractivePixelGrid.jsx`) with `+PixelGen v2.0-PRO` and `SCROLL FOR MORE ↓`.
    - Infinite animated ticker tape marquee with clean dividers.
    - Swiss typographic headline with animated bracket switcher: `A Next-Gen Powerful [ Creative Suite ] for Smarter Workflows.`
    - Floating trust and automation metric pill card: `Trusted by 10K+ Creators | ★ 4.9/5`.
    - Partner format grid strip (`TechLogosStrip.jsx`) with clean divider lines.
    - Technical section markers: `[N.01/11] > KEY VALUE / Less manual work. More intelligent execution. /`.
    - 3D wireframe / isometric voxel cards (`TechValueSection.jsx`): `// 001 Smart Processing`, `// 002 Adaptive Workflows`, `// 003 Better Results`.
- **Complete 24-Page Frontend Ecosystem**:
  - Built and wired all 24 required pages with glassmorphism, Framer Motion, and React Router DOM:
    1. Home (`HomePage.jsx`)
    2. About Us (`AboutPage.jsx`)
    3. Marketplace (`MarketplacePage.jsx`)
    4. Design Categories (`MarketplaceCategoriesPage.jsx`)
    5. Product Details (`ProductDetailPage.jsx`)
    6. Creative Portfolio (`PortfolioPage.jsx`)
    7. Services (`ServicesPage.jsx`)
    8. Custom Design Request (`CustomDesignRequestPage.jsx`)
    9. Contact Us (`ContactPage.jsx`)
    10. Blog / Creative Insights (`BlogPage.jsx` & `BlogDetailPage.jsx`)
    11. Login (`LoginPage.jsx`)
    12. Register (`RegisterPage.jsx`)
    13. Forgot Password (`ForgotPasswordPage.jsx`)
    14. User Dashboard (`UserDashboardPage.jsx` with 9 complete tabs: Overview, Profile, Orders, Purchased, Downloads, Wishlist, Payments, Notifications, Settings)
    15. Shopping Cart (`CartPage.jsx`)
    16. Wishlist (`WishlistPage.jsx`)
    17. Checkout (`CheckoutPage.jsx` with Razorpay SDK integration)
    18. Order History (`OrderHistoryPage.jsx`)
    19. Purchased Designs (`PurchasedDesignsPage.jsx`)
    20. Download Center (`DownloadCenterPage.jsx`)
    21. Privacy Policy (`PrivacyPolicyPage.jsx`)
    22. Terms & Conditions (`TermsPage.jsx`)
    23. Refund Policy (`RefundPolicyPage.jsx`)
    24. Admin Dashboard (`AdminDashboardPage.jsx` with Analytics, Product CRUD, Category CRUD, Orders, Users, Briefs, Inquiries, Blog, Subscribers)

#### 2. Empirical Verification
- **Automated Backend Tests**:
  - `python backend/manage.py test apps.products apps.cart`: 9 tests passed.
  - `python backend/manage.py test apps.users apps.orders`: 2 tests passed (JWT auth + checkout + cryptographic signature verification + ZIP download).
- **Frontend Production Build**:
  - `npm --prefix frontend run build`: 2,668 modules transformed, 0 errors, completed in 1.56s.
- **Live System Probes**:
  - Probed `/api/health/`: `HTTP 200 OK`, `database.engine: mysql`, `latency_ms: 29.89ms`.
  - Probed `/api/v1/auth/login/`: Valid JWT access & refresh tokens issued for `demo_creator`.
  - Probed `/api/v1/orders/my-downloads/`: Authenticated user downloads returned 2 verified items with license keys.

