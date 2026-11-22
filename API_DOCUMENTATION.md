# PixelGenCreativity — REST API Documentation (v1)

## 1. API Architecture & Standards

- **Base URL (Development)**: `http://localhost:8000/api/v1/`
- **Protocol**: HTTP/1.1 & HTTP/2
- **Data Exchange Format**: JSON (`application/json`)
- **Status Codes**: Standard RFC 9110 HTTP status codes (`200 OK`, `201 Created`, `400 Bad Request`, `404 Not Found`, `500 Internal Server Error`)
- **CORS Support**: Dynamic origins handled via `django-cors-headers` (`http://localhost:5173`, `http://127.0.0.1:5173`)
- **Session Identification**: Guest interactions utilize the `X-Session-Key` HTTP header. Authenticated interactions utilize session / bearer tokens.

---

## 2. API Endpoint Directory

### 2.1 Categories (`/api/v1/categories/`)

#### `GET /api/v1/categories/`
Retrieve the full collection of 15 graphic design categories.

- **Query Parameters**: None (returns all active categories ordered by `display_order`).
- **Response `200 OK`**:
```json
[
  {
    "id": 1,
    "name": "Logo Design",
    "slug": "logo-design",
    "description": "Professional vector logos, minimalist brandmarks, modern emblems, and geometric logotypes for visionary companies.",
    "icon_name": "Sparkles",
    "image_url": "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80",
    "display_order": 1,
    "product_count": 1,
    "subcategories": []
  }
]
```

#### `GET /api/v1/categories/{slug}/`
Retrieve a single category with nested subcategories and asset statistics.

- **Parameters**: `slug` (e.g. `logo-design`).
- **Response `200 OK`**: Category detail payload.
- **Response `404 Not Found`**: `{"detail": "Category not found."}`.

#### `GET /api/v1/categories/{slug}/products/`
Retrieve all published products belonging to the specified category.

- **Parameters**: `slug` (category slug). Supports standard product filtering query parameters.

---

### 2.2 Products (`/api/v1/products/`)

#### `GET /api/v1/products/`
Paginated search and multi-criteria filtered catalog endpoint.

- **Query Parameters**:
  - `page`: Page index integer (default: `1`, page size: 12).
  - `category`: Filter by category slug (e.g. `logo-design`).
  - `search` / `q`: Case-insensitive text search matching product title, description, or tags.
  - `min_price`: Minimum standard price float (e.g. `20`).
  - `max_price`: Maximum standard price float (e.g. `100`).
  - `rating`: Minimum average rating float (e.g. `4.5`).
  - `featured`: Boolean (`true` or `1`) for editorial featured designs.
  - `trending`: Boolean (`true` or `1`) for trending assets.
  - `best_seller`: Boolean (`true` or `1`) for best sellers.
  - `new`: Boolean (`true` or `1`) for new arrivals.
  - `on_sale`: Boolean (`true` or `1`) for discount sale items.
  - `ordering` / `sort`: Sorting criteria:
    - `popularity`: Ordered by `sales_count` descending.
    - `rating`: Ordered by `rating` descending.
    - `newest`: Ordered by `created_at` descending.
    - `price_asc`: Ordered by `price` ascending.
    - `price_desc`: Ordered by `price` descending.

- **Response `200 OK`**:
```json
{
  "count": 15,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "title": "Lumina — Minimalist Geometric Logo System",
      "slug": "lumina-minimalist-geometric-logo-system",
      "short_description": "Comprehensive corporate identity pack with 24 geometric logo variations.",
      "category": {
        "id": 1,
        "name": "Logo Design",
        "slug": "logo-design"
      },
      "price": "49.00",
      "original_price": "79.00",
      "discount_percentage": 38,
      "rating": "4.95",
      "review_count": 86,
      "sales_count": 1420,
      "is_featured": true,
      "is_trending": true,
      "is_best_seller": true,
      "is_new": false,
      "is_on_sale": true,
      "primary_image": "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80",
      "file_formats": ["AI", "EPS", "SVG", "PDF", "PNG"],
      "created_at": "2026-11-12T07:46:17.382000Z"
    }
  ]
}
```

#### `GET /api/v1/products/{slug}/`
Retrieve comprehensive details, full image gallery, technical specs, and deliverables for a single product.

- **Response `200 OK`**:
```json
{
  "id": 1,
  "title": "Lumina — Minimalist Geometric Logo System",
  "slug": "lumina-minimalist-geometric-logo-system",
  "short_description": "Comprehensive corporate identity pack with 24 geometric logo variations.",
  "description": "Comprehensive corporate identity pack with 24 geometric logo variations...",
  "category": { "id": 1, "name": "Logo Design", "slug": "logo-design" },
  "price": "49.00",
  "original_price": "79.00",
  "discount_percentage": 38,
  "rating": "4.95",
  "review_count": 86,
  "sales_count": 1420,
  "view_count": 5210,
  "images": [
    {
      "id": 1,
      "image_url": "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80",
      "alt_text": "Lumina Logo Showcase",
      "display_order": 1,
      "is_primary": true
    }
  ],
  "tags": ["logo", "branding", "minimalist", "geometric", "vector"],
  "compatible_software": ["Adobe Illustrator CC", "Figma", "Affinity Designer"],
  "file_formats": ["AI", "EPS", "SVG", "PDF", "PNG"],
  "dimensions": "Vector (Infinitely Scalable)",
  "resolution": "300 DPI Ready",
  "color_space": "CMYK + RGB",
  "layered": true,
  "vector_based": true,
  "files": [
    {
      "id": 1,
      "file_format": "ZIP",
      "file_size": "48 MB",
      "version": "2.1"
    }
  ]
}
```

#### `GET /api/v1/products/featured/`
Quick endpoint returning curated featured products (`limit` param optional, default 6).

#### `GET /api/v1/products/trending/`
Quick endpoint returning trending products (`limit` param optional, default 6).

#### `GET /api/v1/products/new-arrivals/`
Quick endpoint returning newest product additions (`limit` param optional, default 6).

#### `GET /api/v1/products/licenses/`
Returns all available licensing tiers and their terms.

```json
[
  {
    "id": 1,
    "license_type": "standard",
    "name": "Standard Commercial License",
    "price_multiplier": "1.00",
    "description": "Single commercial or personal project. Up to 10,000 end products for sale.",
    "terms": [
      "1 commercial or personal project",
      "Up to 10,000 physical or digital end products for sale",
      "Lifetime usage rights",
      "Standard customer support"
    ],
    "is_default": true
  },
  {
    "id": 2,
    "license_type": "extended",
    "name": "Extended Enterprise License",
    "price_multiplier": "2.50",
    "description": "Unlimited commercial projects and unlimited end products for sale.",
    "terms": [
      "Unlimited commercial projects",
      "Unlimited physical or digital end products for sale",
      "SaaS / web application embedding rights",
      "Priority VIP customer support"
    ],
    "is_default": false
  }
]
```

#### `GET /api/v1/products/{slug}/related/`
Returns category-related products matching the target asset.

---

### 2.3 Product Reviews (`/api/v1/products/{slug}/reviews/`)

#### `GET /api/v1/products/{slug}/reviews/`
Returns approved customer reviews for the target product.

- **Response `200 OK`**:
```json
[
  {
    "id": 1,
    "guest_name": "Elena Rostova",
    "rating": 5,
    "title": "Extraordinary precision and grid alignment",
    "comment": "The vector curves in this logo system are surgically clean. Used it for a fintech brand launch and the client was thrilled.",
    "is_verified_purchase": true,
    "helpful_count": 14,
    "created_at": "2026-11-12T07:46:17.514000Z"
  }
]
```

#### `POST /api/v1/products/{slug}/reviews/`
Submit a customer review.

- **Request Body**:
```json
{
  "rating": 5,
  "title": "Outstanding quality",
  "comment": "Easy to customize in Illustrator. Saved me 3 days of work.",
  "guest_name": "Marcus Vance",
  "guest_email": "marcus@example.com"
}
```
- **Response `201 Created`**: Returns newly created review object.

---

### 2.4 Shopping Cart (`/api/v1/cart/`)

All cart endpoints operate with dual identity: authenticated user session or guest session identifier sent via the `X-Session-Key` HTTP header.

#### `GET /api/v1/cart/`
Fetch the current user/session cart items, subtotal, and total item count.

- **Headers**: `X-Session-Key: <UUID>`
- **Response `200 OK`**:
```json
{
  "items": [
    {
      "id": 4,
      "product": {
        "id": 1,
        "title": "Lumina — Minimalist Geometric Logo System",
        "slug": "lumina-minimalist-geometric-logo-system",
        "price": "49.00",
        "primary_image": "https://images.unsplash.com/..."
      },
      "license": {
        "id": 1,
        "license_type": "standard",
        "name": "Standard Commercial License",
        "price_multiplier": "1.00"
      },
      "quantity": 1,
      "unit_price": "49.00",
      "total_price": "49.00"
    }
  ],
  "subtotal": "49.00",
  "total_items": 1
}
```

#### `POST /api/v1/cart/add/`
Add a product to the cart with a specific license tier.

- **Headers**: `X-Session-Key: <UUID>`
- **Request Body**:
```json
{
  "product_id": 1,
  "license_id": 1,
  "quantity": 1
}
```
- **Response `201 Created`**: Returns updated cart payload.

#### `PATCH /api/v1/cart/{item_id}/`
Update item license or quantity.

- **Request Body**: `{"license_id": 2}` or `{"quantity": 2}`.

#### `DELETE /api/v1/cart/{item_id}/`
Remove an item from the cart.

- **Response `200 OK`**: Returns updated cart payload.

#### `DELETE /api/v1/cart/clear/`
Clear all items from the current cart.

---

### 2.5 Wishlist & History (`/api/v1/wishlist/`)

#### `GET /api/v1/wishlist/`
Fetch user/session saved wishlist items.

#### `POST /api/v1/wishlist/toggle/`
Atomically toggles a product in the wishlist (adds if absent, removes if present).

- **Request Body**: `{"product_id": 1}`
- **Response `200 OK`**: `{"status": "added", "in_wishlist": true, "product_id": 1}` or `{"status": "removed", "in_wishlist": false}`.

#### `DELETE /api/v1/wishlist/{item_id}/`
Remove single item by ID.

#### `POST /api/v1/wishlist/{item_id}/move-to-cart/`
Atomically adds the item to the user's cart and removes it from the wishlist.

#### `GET /api/v1/wishlist/recently-viewed/`
Retrieve the last 10 viewed designs for the current session.

#### `POST /api/v1/wishlist/recently-viewed/record/`
Records a product view impression. `{"product_id": 1}`.

---

### 2.6 Promotions & Coupons (`/api/v1/promotions/`)

#### `GET /api/v1/promotions/banners/`
Fetch active promotional banners filtered by slot placement.

- **Query Parameters**: `placement` (optional, default: `marketplace_hero`).
- **Response `200 OK`**:
```json
[
  {
    "id": 1,
    "title": "Spring Creator Festival — Up to 40% Off",
    "subtitle": "Level up your creative workflow with award-winning design kits.",
    "image_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
    "target_url": "/marketplace/products",
    "placement": "marketplace_hero"
  }
]
```

#### `POST /api/v1/promotions/validate-coupon/`
Validate a coupon code against an active cart subtotal.

- **Request Body**:
```json
{
  "code": "PIXEL20",
  "subtotal": 100.00
}
```
- **Response `200 OK`**:
```json
{
  "valid": true,
  "code": "PIXEL20",
  "discount_type": "percentage",
  "discount_value": "20.00",
  "discount_amount": 20.00,
  "message": "Coupon PIXEL20 applied successfully! (20% off)"
}
```
- **Response `400 Bad Request`**:
```json
{
  "valid": false,
  "message": "Invalid or expired coupon code."
}
```

---

### 2.7 System Health Telemetry (`/api/health/`)

#### `GET /api/health/`
Probes backend service health, measures round-trip database query latency on MySQL, and reports environment telemetry.

- **Response `200 OK`**:
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

---

## 3. Phase 5: Authentication, Orders, Razorpay & Administration APIs

### 3.1 Authentication & User Management (`/api/v1/auth/`)

#### `POST /api/v1/auth/register/`
Registers a new user, hashes the password with PBKDF2-SHA256, creates a linked `UserProfile`, and issues JWT access and refresh tokens.

- **Request Body**:
```json
{
  "username": "elena_creative",
  "email": "elena@example.com",
  "password": "SecurePassword123!",
  "full_name": "Elena Rostova",
  "phone": "+91 98765 43210",
  "company": "Rostova Design Studio"
}
```

- **Response `201 Created`**:
```json
{
  "message": "Registration successful. Welcome to PixelGenCreativity!",
  "tokens": {
    "refresh": "<JWT_REFRESH_TOKEN>",
    "access": "<JWT_ACCESS_TOKEN>"
  },
  "user": {
    "id": 2,
    "username": "elena_creative",
    "email": "elena@example.com",
    "full_name": "Elena Rostova",
    "is_staff": false,
    "profile": {
      "role": "customer",
      "company": "Rostova Design Studio"
    }
  }
}
```

#### `POST /api/v1/auth/login/`
Authenticates with username or email and password; returns JWT access/refresh token pair.

- **Request Body**:
```json
{
  "username_or_email": "demo_creator",
  "password": "Creator@12345"
}
```

- **Response `200 OK`**: Returns tokens and user profile object.

#### `GET /api/v1/auth/profile/`
Returns the authenticated user's profile. Requires `Authorization: Bearer <token>`.

#### `PATCH /api/v1/auth/profile/`
Updates user profile fields (first_name, last_name, phone, company, bio, address, city, country, postal_code).

#### `POST /api/v1/auth/change-password/`
Changes password for the authenticated user, invalidating old password and re-issuing tokens.

#### `POST /api/v1/auth/forgot-password/` & `POST /api/v1/auth/reset-password/`
Password recovery and reset endpoints.

---

## 3.2 Orders & Razorpay Payments (`/api/v1/orders/`)

#### `POST /api/v1/orders/checkout/`
Creates an `Order` in `pending` status, validates item prices and coupon codes, and initiates a Razorpay Order ID.

- **Request Body**:
```json
{
  "customer_name": "Alex Vance",
  "customer_email": "alex@vance.io",
  "customer_phone": "+91 98765 43210",
  "billing_address": "42 Innovation Parkway",
  "city": "Bengaluru",
  "country": "India",
  "postal_code": "560038",
  "items": [
    {
      "product_id": 1,
      "quantity": 1,
      "license_type": "standard"
    }
  ],
  "coupon_code": "PIXEL20"
}
```

- **Response `201 Created`**:
```json
{
  "message": "Order created successfully. Ready for payment.",
  "order": {
    "id": 1,
    "order_number": "ORD-20261119-A8F2",
    "total_amount": "39.20",
    "currency": "INR",
    "status": "pending",
    "payment_status": "unpaid"
  },
  "razorpay": {
    "key_id": "rzp_test_pixelgen_demo",
    "order_id": "order_a7b8c9d0e1f2g3",
    "amount": 3920,
    "currency": "INR"
  }
}
```

#### `POST /api/v1/orders/verify-payment/`
Cryptographically verifies Razorpay payment signature (`HMAC_SHA256(order_id + "|" + payment_id, secret)`).
Upon verification, marks the order as paid, records the `Payment` entity, and enables instant download access for each `OrderItem`.

- **Request Body**:
```json
{
  "order_number": "ORD-20261119-A8F2",
  "razorpay_order_id": "order_a7b8c9d0e1f2g3",
  "razorpay_payment_id": "pay_live_test_12345",
  "razorpay_signature": "<HMAC_SHA256_HEX>"
}
```

#### `GET /api/v1/orders/my-orders/`
Returns the authenticated customer's order history.

#### `GET /api/v1/orders/my-downloads/`
Returns all purchased items with active license keys for the authenticated customer.

#### `GET /api/v1/orders/downloads/{license_key}/`
Secure digital asset delivery endpoint.
Validates that the license key belongs to a paid order, increments the download counter, logs the client IP and User-Agent, and streams a custom `.ZIP` bundle containing:
- `LICENSE_CERTIFICATE_{KEY}.txt`
- `README_INSTRUCTIONS.txt`
- Vector source package (.SVG / .AI)

---

### 3.3 Custom Agency Briefs (`/api/v1/orders/custom-request/`)

#### `POST /api/v1/orders/custom-request/`
Allows clients to commission custom design projects and agency retainers.

- **Request Body**:
```json
{
  "name": "Sophia Chen",
  "email": "sophia@lumina.ai",
  "phone": "+1 415 890 1234",
  "company": "Lumina AI",
  "service_category": "UI/UX & Web Design",
  "budget_range": "$3,000 - $5,000",
  "timeline": "Urgent (1-2 Weeks)",
  "title": "SaaS Spatial Dashboard Redesign",
  "description": "Full spatial glass interface system with dark purple tones."
}
```

---

### 3.4 Blog & Editorial Content (`/api/v1/blog/`)

#### `GET /api/v1/blog/`
Returns published design insights, with optional `?category=` filtering.

#### `GET /api/v1/blog/{slug}/`
Returns full article details and automatically increments `views_count`.

---

### 3.5 Administrative Command Center (`/api/v1/orders/admin/` & `/api/v1/admin/`)

All administrative endpoints require `IsAdminUser` permission (`is_staff: true`).

- `GET /api/v1/orders/admin/analytics/`: Executive metrics (revenue, orders, users, products, recent transactions).
- `GET/PATCH /api/v1/orders/admin/orders/`: Full order inspection and status updates.
- `GET/PATCH /api/v1/orders/admin/custom-requests/`: Client brief management and quotation pricing.
- `GET/POST/DELETE /api/v1/admin/products/`: Complete product catalog CRUD.
- `GET/POST/PATCH/DELETE /api/v1/admin/categories/`: Category CRUD.
- `GET/PATCH /api/v1/auth/admin/users/`: Creator user management and role assignment.
- `GET /api/v1/admin/inquiries/`: Contact inquiry management.
- `GET /api/v1/admin/subscribers/`: Newsletter subscriber audit log.

