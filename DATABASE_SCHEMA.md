# PixelGenCreativity — Database Schema Specification

## 1. Overview & Architectural Philosophy

PixelGenCreativity operates on a fully normalized, high-performance relational database architecture powered by **MySQL Server 8.0+** (`utf8mb4` character set, `utf8mb4_unicode_ci` collation, `STRICT_TRANS_TABLES` SQL mode).

The schema is divided into 6 modular domain applications alongside core authentication and session registries:
- **`apps.categories`**: Hierarchical category and subcategory taxomomy.
- **`apps.products`**: Digital design assets, gallery images, deliverables, tags, licenses, and curated collections.
- **`apps.reviews`**: Verified customer ratings, text feedback, and helpful counters.
- **`apps.cart`**: Dual-identity guest and user shopping cart with license calculation.
- **`apps.wishlist`**: Dual-identity wishlist and recently viewed tracking.
- **`apps.promotions`**: Promotional banners and coupon discount engines.

---

## 2. Active Implemented Tables (Phase 4 Database State)

The MySQL database `pixelgencreativity_db` contains **29 tables** migrated via Django ORM.

### Summary Table Directory

| Table Name | Django Model | Domain Application | Record Count (Seeded) |
| :--- | :--- | :--- | :--- |
| `categories_category` | `Category` | `apps.categories` | 15 |
| `categories_subcategory` | `SubCategory` | `apps.categories` | 0 (extensible) |
| `products_product` | `Product` | `apps.products` | 15 |
| `products_productimage` | `ProductImage` | `apps.products` | 32 |
| `products_productfile` | `ProductFile` | `apps.products` | 15 |
| `products_tag` | `Tag` | `apps.products` | 67 |
| `products_producttag` | `ProductTag` | `apps.products` | 67 |
| `products_license` | `License` | `apps.products` | 2 |
| `products_productvariant` | `ProductVariant` | `apps.products` | 0 (extensible) |
| `products_productattribute` | `ProductAttribute` | `apps.products` | 0 (extensible) |
| `products_productattributevalue` | `ProductAttributeValue` | `apps.products` | 0 (extensible) |
| `products_collection` | `Collection` | `apps.products` | 0 (extensible) |
| `products_collectionproduct` | `CollectionProduct` | `apps.products` | 0 (extensible) |
| `reviews_productreview` | `ProductReview` | `apps.reviews` | 15 |
| `cart_cartitem` | `CartItem` | `apps.cart` | 0 (live user/session) |
| `wishlist_wishlistitem` | `WishlistItem` | `apps.wishlist` | 0 (live user/session) |
| `wishlist_recentlyviewed` | `RecentlyViewed` | `apps.wishlist` | 0 (live user/session) |
| `promotions_banner` | `Banner` | `apps.promotions` | 1 |
| `promotions_coupon` | `Coupon` | `apps.promotions` | 2 |
| `auth_user` | `User` | `django.contrib.auth` | System baseline |
| `auth_group` | `Group` | `django.contrib.auth` | System baseline |
| `auth_permission` | `Permission` | `django.contrib.auth` | System baseline |
| `auth_group_permissions` | — | `django.contrib.auth` | System baseline |
| `auth_user_groups` | — | `django.contrib.auth` | System baseline |
| `auth_user_user_permissions`| — | `django.contrib.auth` | System baseline |
| `django_admin_log` | `LogEntry` | `django.contrib.admin` | System baseline |
| `django_content_type` | `ContentType` | `django.contrib.contenttypes` | System baseline |
| `django_migrations` | — | `django.db.migrations` | 27 migrations applied |
| `django_session` | `Session` | `django.contrib.sessions` | System baseline |

---

## 3. Detailed Table Specifications

### 3.1 Category Subsystem

#### `categories_category`
Stores top-level graphic design categories.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `BIGINT` | PRIMARY KEY, AUTO_INCREMENT | Unique category identifier |
| `name` | `VARCHAR(100)` | NOT NULL, UNIQUE | Category display name |
| `slug` | `VARCHAR(120)` | NOT NULL, UNIQUE, INDEX | URL-safe slug |
| `description` | `LONGTEXT` | NULLABLE | Detailed category narrative |
| `icon_name` | `VARCHAR(100)` | NOT NULL, DEFAULT '' | Lucide icon identifier |
| `image_url` | `VARCHAR(255)` | NOT NULL, DEFAULT '' | Category cover artwork URL |
| `display_order` | `INT` | NOT NULL, DEFAULT 0 | Layout sorting order |
| `is_active` | `TINYINT(1)` | NOT NULL, DEFAULT 1 | Active state flag |
| `created_at` | `DATETIME(6)` | NOT NULL | Creation timestamp |
| `updated_at` | `DATETIME(6)` | NOT NULL | Modification timestamp |

#### `categories_subcategory`
Stores nested categories for fine-grained filtering.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `BIGINT` | PRIMARY KEY, AUTO_INCREMENT | Unique subcategory identifier |
| `category_id` | `BIGINT` | FOREIGN KEY (`categories_category.id`), `ON DELETE CASCADE` | Parent category reference |
| `name` | `VARCHAR(100)` | NOT NULL | Subcategory display name |
| `slug` | `VARCHAR(120)` | NOT NULL, UNIQUE, INDEX | URL-safe slug |
| `description` | `LONGTEXT` | NULLABLE | Description |
| `is_active` | `TINYINT(1)` | NOT NULL, DEFAULT 1 | Visibility flag |
| `created_at` | `DATETIME(6)` | NOT NULL | Creation timestamp |
| `updated_at` | `DATETIME(6)` | NOT NULL | Modification timestamp |

---

### 3.2 Product Catalog Subsystem

#### `products_product`
The central catalog entity storing digital graphic assets.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `BIGINT` | PRIMARY KEY, AUTO_INCREMENT | Unique asset ID |
| `title` | `VARCHAR(200)` | NOT NULL | Full design title |
| `slug` | `VARCHAR(255)` | NOT NULL, UNIQUE, INDEX | URL-safe product slug |
| `short_description` | `LONGTEXT` | NULLABLE | One-line teaser description |
| `description` | `LONGTEXT` | NOT NULL | Comprehensive overview |
| `category_id` | `BIGINT` | FOREIGN KEY (`categories_category.id`), `ON DELETE PROTECT` | Required category link |
| `subcategory_id` | `BIGINT` | NULLABLE, FOREIGN KEY (`categories_subcategory.id`), `ON DELETE SET NULL` | Optional subcategory |
| `price` | `DECIMAL(10,2)` | NOT NULL, INDEX | Standard license price in USD |
| `original_price` | `DECIMAL(10,2)` | NULLABLE | Strikethrough pre-discount price |
| `discount_percentage` | `INT` | NOT NULL, DEFAULT 0 | Calculated or stated discount percentage |
| `rating` | `DECIMAL(3,2)` | NOT NULL, DEFAULT 5.00, INDEX | Current average rating (1.00 - 5.00) |
| `review_count` | `INT` | NOT NULL, DEFAULT 0 | Total number of approved reviews |
| `sales_count` | `INT` | NOT NULL, DEFAULT 0, INDEX | Total verified downloads/sales |
| `view_count` | `INT` | NOT NULL, DEFAULT 0 | Total view impressions |
| `status` | `VARCHAR(50)` | NOT NULL, DEFAULT 'published' | Workflow status (`draft`, `published`, `archived`) |
| `is_featured` | `TINYINT(1)` | NOT NULL, DEFAULT 0, INDEX | Editorial featured highlight |
| `is_trending` | `TINYINT(1)` | NOT NULL, DEFAULT 0, INDEX | Trending popularity flag |
| `is_best_seller` | `TINYINT(1)` | NOT NULL, DEFAULT 0, INDEX | Best seller badge flag |
| `is_new` | `TINYINT(1)` | NOT NULL, DEFAULT 0, INDEX | New arrival flag |
| `is_on_sale` | `TINYINT(1)` | NOT NULL, DEFAULT 0 | Active sale badge flag |
| `compatible_software` | `JSON` | NOT NULL, DEFAULT '[]' | JSON list (e.g. `["Illustrator", "Photoshop", "Figma"]`) |
| `file_formats` | `JSON` | NOT NULL, DEFAULT '[]' | JSON list (e.g. `["AI", "EPS", "SVG", "PNG"]`) |
| `dimensions` | `VARCHAR(100)` | NOT NULL, DEFAULT '' | Resolution or canvas size (e.g. `1920x1080 px`) |
| `resolution` | `VARCHAR(50)` | NOT NULL, DEFAULT '' | DPI specification (e.g. `300 DPI`) |
| `color_space` | `VARCHAR(50)` | NOT NULL, DEFAULT 'RGB' | Color profile (`RGB`, `CMYK`) |
| `layered` | `TINYINT(1)` | NOT NULL, DEFAULT 1 | Whether asset includes organized layers |
| `vector_based` | `TINYINT(1)` | NOT NULL, DEFAULT 0 | Whether asset is 100% scalable vector |
| `default_license_id` | `BIGINT` | NULLABLE, FOREIGN KEY (`products_license.id`), `ON DELETE SET NULL` | Default standard license |
| `created_at` | `DATETIME(6)` | NOT NULL, INDEX | Publishing timestamp |
| `updated_at` | `DATETIME(6)` | NOT NULL | Last update timestamp |

#### `products_productimage`
High-resolution preview galleries.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `BIGINT` | PRIMARY KEY, AUTO_INCREMENT | Unique image ID |
| `product_id` | `BIGINT` | FOREIGN KEY (`products_product.id`), `ON DELETE CASCADE` | Associated product |
| `image_url` | `VARCHAR(500)` | NOT NULL | Static/CDN asset URL |
| `alt_text` | `VARCHAR(200)` | NOT NULL, DEFAULT '' | Accessibility description |
| `display_order` | `INT` | NOT NULL, DEFAULT 0 | Gallery thumbnail sorting order |
| `is_primary` | `TINYINT(1)` | NOT NULL, DEFAULT 0 | Primary card thumbnail flag |
| `created_at` | `DATETIME(6)` | NOT NULL | Upload timestamp |

#### `products_productfile`
Digital package files provided post-checkout.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `BIGINT` | PRIMARY KEY, AUTO_INCREMENT | File record ID |
| `product_id` | `BIGINT` | FOREIGN KEY (`products_product.id`), `ON DELETE CASCADE` | Target product |
| `file_format` | `VARCHAR(50)` | NOT NULL | Format extension (e.g. `ZIP`, `FIG`, `AI`) |
| `file_size` | `VARCHAR(100)` | NOT NULL | Human-readable size string (e.g. `45 MB`) |
| `download_url` | `VARCHAR(500)` | NOT NULL | Secure asset download URL |
| `version` | `VARCHAR(20)` | NOT NULL, DEFAULT '1.0' | File package version |
| `updated_at` | `DATETIME(6)` | NOT NULL | Timestamp |

#### `products_tag` & `products_producttag`
Normalized tagging system.

| Table | Column | Type | Constraints |
| :--- | :--- | :--- | :--- |
| `products_tag` | `id` | `BIGINT` | PRIMARY KEY, AUTO_INCREMENT |
| `products_tag` | `name` | `VARCHAR(60)` | UNIQUE, NOT NULL |
| `products_tag` | `slug` | `VARCHAR(80)` | UNIQUE, NOT NULL, INDEX |
| `products_producttag` | `id` | `BIGINT` | PRIMARY KEY, AUTO_INCREMENT |
| `products_producttag` | `product_id` | `BIGINT` | FK (`products_product.id`), `ON DELETE CASCADE` |
| `products_producttag` | `tag_id` | `BIGINT` | FK (`products_tag.id`), `ON DELETE CASCADE` |
| **Index** | `(product_id, tag_id)` | UNIQUE | Composite uniqueness constraint |

#### `products_license`
Legal usage licensing tiers.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `BIGINT` | PRIMARY KEY, AUTO_INCREMENT | Unique license ID |
| `license_type` | `VARCHAR(60)` | UNIQUE, NOT NULL | Machine key (`standard`, `extended`) |
| `name` | `VARCHAR(100)` | NOT NULL | Human title (e.g. Standard License) |
| `price_multiplier` | `DECIMAL(4,2)` | NOT NULL, DEFAULT 1.00 | Price scale multiplier (1.0x vs 2.5x) |
| `description` | `LONGTEXT` | NOT NULL | License description |
| `terms` | `JSON` | NOT NULL, DEFAULT '[]' | Bullet points of granted rights |
| `is_default` | `TINYINT(1)` | NOT NULL, DEFAULT 0 | Default license flag |

---

### 3.3 Reviews Subsystem

#### `reviews_productreview`
Customer reviews and star ratings.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `BIGINT` | PRIMARY KEY, AUTO_INCREMENT | Unique review ID |
| `product_id` | `BIGINT` | FOREIGN KEY (`products_product.id`), `ON DELETE CASCADE` | Target product |
| `user_id` | `BIGINT` | NULLABLE, FOREIGN KEY (`auth_user.id`), `ON DELETE SET NULL` | Authenticated author |
| `guest_name` | `VARCHAR(150)` | NOT NULL, DEFAULT '' | Name for unauthenticated reviewers |
| `guest_email` | `VARCHAR(254)` | NOT NULL, DEFAULT '' | Optional reviewer email |
| `rating` | `INT` | NOT NULL, CHECK (1 <= rating <= 5) | Integer star rating |
| `title` | `VARCHAR(200)` | NOT NULL, DEFAULT '' | Review heading |
| `comment` | `LONGTEXT` | NOT NULL | Body of review |
| `is_verified_purchase` | `TINYINT(1)` | NOT NULL, DEFAULT 0 | Verified purchase badge |
| `helpful_count` | `INT` | NOT NULL, DEFAULT 0 | Upvotes for helpfulness |
| `is_approved` | `TINYINT(1)` | NOT NULL, DEFAULT 1, INDEX | Moderation approval status |
| `created_at` | `DATETIME(6)` | NOT NULL | Review submission date |
| `updated_at` | `DATETIME(6)` | NOT NULL | Last edit date |

---

### 3.4 Shopping Cart & Wishlist Subsystems

#### `cart_cartitem`
Items stored in shopping cart, identifying customers via session or user identity.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `BIGINT` | PRIMARY KEY, AUTO_INCREMENT | Cart item identifier |
| `user_id` | `BIGINT` | NULLABLE, FOREIGN KEY (`auth_user.id`), `ON DELETE CASCADE` | Authenticated user ID |
| `session_key` | `VARCHAR(64)` | NOT NULL, DEFAULT '', INDEX | Guest identifier (`X-Session-Key`) |
| `product_id` | `BIGINT` | FOREIGN KEY (`products_product.id`), `ON DELETE CASCADE` | Product in cart |
| `license_id` | `BIGINT` | NULLABLE, FOREIGN KEY (`products_license.id`), `ON DELETE PROTECT` | Selected license tier |
| `quantity` | `INT` | NOT NULL, DEFAULT 1 | Item quantity (default 1 for digital) |
| `unit_price` | `DECIMAL(10,2)` | NOT NULL | Stored price per unit at addition time |
| `created_at` | `DATETIME(6)` | NOT NULL | Creation timestamp |
| `updated_at` | `DATETIME(6)` | NOT NULL | Modification timestamp |

#### `wishlist_wishlistitem`
Saved favorites with dual-identity support.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `BIGINT` | PRIMARY KEY, AUTO_INCREMENT | Wishlist entry ID |
| `user_id` | `BIGINT` | NULLABLE, FOREIGN KEY (`auth_user.id`), `ON DELETE CASCADE` | Authenticated user |
| `session_key` | `VARCHAR(64)` | NOT NULL, DEFAULT '', INDEX | Guest session key |
| `product_id` | `BIGINT` | FOREIGN KEY (`products_product.id`), `ON DELETE CASCADE` | Saved product |
| `created_at` | `DATETIME(6)` | NOT NULL | Timestamp |

#### `wishlist_recentlyviewed`
Tracks viewed designs for recent history shelves.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `BIGINT` | PRIMARY KEY, AUTO_INCREMENT | View entry ID |
| `user_id` | `BIGINT` | NULLABLE, FOREIGN KEY (`auth_user.id`), `ON DELETE CASCADE` | User ID |
| `session_key` | `VARCHAR(64)` | NOT NULL, DEFAULT '', INDEX | Session key |
| `product_id` | `BIGINT` | FOREIGN KEY (`products_product.id`), `ON DELETE CASCADE` | Product viewed |
| `viewed_at` | `DATETIME(6)` | NOT NULL, INDEX | View timestamp |

---

### 3.5 Promotions Subsystem

#### `promotions_banner`
Visual hero and promotional banners.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `BIGINT` | PRIMARY KEY, AUTO_INCREMENT | Unique banner ID |
| `title` | `VARCHAR(150)` | NOT NULL | Banner headline |
| `subtitle` | `VARCHAR(255)` | NOT NULL, DEFAULT '' | Sub-headline |
| `image_url` | `VARCHAR(500)` | NOT NULL | Banner background/artwork URL |
| `target_url` | `VARCHAR(255)` | NOT NULL, DEFAULT '' | CTA click target link |
| `category_id` | `BIGINT` | NULLABLE, FK (`categories_category.id`), `ON DELETE SET NULL` | Target category |
| `product_id` | `BIGINT` | NULLABLE, FK (`products_product.id`), `ON DELETE SET NULL` | Target product |
| `placement` | `VARCHAR(50)` | NOT NULL, DEFAULT 'marketplace_hero' | Slot placement name |
| `display_order` | `INT` | NOT NULL, DEFAULT 0 | Carousel sorting order |
| `is_active` | `TINYINT(1)` | NOT NULL, DEFAULT 1 | Active display toggle |
| `start_date` | `DATETIME(6)` | NULLABLE | Campaign start date |
| `end_date` | `DATETIME(6)` | NULLABLE | Campaign end date |
| `created_at` | `DATETIME(6)` | NOT NULL | Creation date |

#### `promotions_coupon`
Promotional discount codes with validation constraints.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `BIGINT` | PRIMARY KEY, AUTO_INCREMENT | Coupon record ID |
| `code` | `VARCHAR(50)` | UNIQUE, NOT NULL, INDEX | Uppercase coupon code |
| `discount_type` | `VARCHAR(20)` | NOT NULL, DEFAULT 'percentage' | Type (`percentage`, `fixed`) |
| `discount_value` | `DECIMAL(10,2)` | NOT NULL | Percentage (e.g. 20.00) or USD amount |
| `min_order_value`| `DECIMAL(10,2)` | NOT NULL, DEFAULT 0.00 | Minimum order threshold |
| `max_discount_amount` | `DECIMAL(10,2)` | NULLABLE | Cap on percentage discounts |
| `valid_from` | `DATETIME(6)` | NOT NULL | Validity start date |
| `valid_until` | `DATETIME(6)` | NOT NULL | Expiration date |
| `usage_limit` | `INT` | NULLABLE | Global total usage cap |
| `usage_count` | `INT` | NOT NULL, DEFAULT 0 | Current redemption count |
| `is_active` | `TINYINT(1)` | NOT NULL, DEFAULT 1 | Active coupon flag |
| `created_at` | `DATETIME(6)` | NOT NULL | Timestamp |

---

## 4. Database Connection & Environment Setup

All database credentials are load dynamically from `backend/.env` without hardcoding:

```ini
DB_ENGINE=mysql
DB_NAME=pixelgencreativity_db
DB_USER=root
DB_PASSWORD=pankaj@12
DB_HOST=127.0.0.1
DB_PORT=3306
```

### PyMySQL MySQL 8.0 Compatibility Override
In `backend/config/__init__.py`:
```python
import pymysql
pymysql.install_as_MySQLdb()

# Django 6.1 dynamic MySQL version compatibility check
from django.db.backends.mysql.features import DatabaseFeatures
DatabaseFeatures.minimum_database_version = property(
    lambda self: (10, 11) if self.connection.mysql_is_mariadb else (8, 0)
)
```

---

## 5. Phase 5: Authentication, Orders, Razorpay & Editorial Relational Tables

### 5.1 `user_profiles`
Connected 1-to-1 with Django's core `auth_user` table.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `BIGINT` | PRIMARY KEY, AUTO_INCREMENT | Profile record identifier |
| `user_id` | `INT` | UNIQUE, FK -> `auth_user.id` | Associated Django user |
| `role` | `VARCHAR(20)` | NOT NULL, DEFAULT 'customer' | Role: 'customer', 'designer', 'admin' |
| `phone` | `VARCHAR(30)` | NULLABLE | Contact telephone |
| `company` | `VARCHAR(120)` | NULLABLE | Agency or company name |
| `bio` | `LONGTEXT` | NULLABLE | Creator statement |
| `avatar_url` | `VARCHAR(500)` | NULLABLE | Profile avatar image |
| `address` | `VARCHAR(255)` | NULLABLE | Street billing address |
| `city` | `VARCHAR(100)` | NULLABLE | Billing city |
| `country` | `VARCHAR(100)` | NOT NULL, DEFAULT 'India' | Billing country |
| `postal_code` | `VARCHAR(30)` | NULLABLE | Postal ZIP code |
| `is_verified` | `TINYINT(1)` | NOT NULL, DEFAULT 0 | Verification badge |
| `created_at` | `DATETIME(6)` | NOT NULL | Creation timestamp |
| `updated_at` | `DATETIME(6)` | NOT NULL | Update timestamp |

---

### 5.2 `marketplace_orders`
Tracks customer orders, billing addresses, status workflows, and gateway references.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `BIGINT` | PRIMARY KEY, AUTO_INCREMENT | Order record identifier |
| `order_number` | `VARCHAR(50)` | UNIQUE, NOT NULL, INDEX | Human-readable identifier (`ORD-XXXXXXXX`) |
| `user_id` | `INT` | NULLABLE, FK -> `auth_user.id` | Customer account (null for guest checkout) |
| `customer_name` | `VARCHAR(150)` | NOT NULL | Customer full name |
| `customer_email` | `VARCHAR(254)` | NOT NULL | Notification and license recipient email |
| `customer_phone` | `VARCHAR(30)` | NULLABLE | Contact phone |
| `billing_address` | `VARCHAR(255)` | NULLABLE | Street billing address |
| `city` | `VARCHAR(100)` | NULLABLE | City |
| `country` | `VARCHAR(100)` | NOT NULL, DEFAULT 'India' | Country |
| `postal_code` | `VARCHAR(30)` | NULLABLE | Postal ZIP code |
| `status` | `VARCHAR(20)` | NOT NULL, DEFAULT 'pending' | 'pending', 'paid', 'completed', 'cancelled' |
| `payment_status` | `VARCHAR(20)` | NOT NULL, DEFAULT 'unpaid' | 'unpaid', 'paid', 'failed', 'refunded' |
| `payment_method` | `VARCHAR(50)` | NOT NULL, DEFAULT 'razorpay' | Payment gateway |
| `subtotal` | `DECIMAL(12,2)` | NOT NULL | Order subtotal |
| `discount_amount` | `DECIMAL(12,2)` | NOT NULL, DEFAULT 0.00 | Applied coupon discount |
| `tax_amount` | `DECIMAL(12,2)` | NOT NULL, DEFAULT 0.00 | Tax amount |
| `total_amount` | `DECIMAL(12,2)` | NOT NULL | Final charged amount |
| `currency` | `VARCHAR(10)` | NOT NULL, DEFAULT 'INR' | Currency code |
| `razorpay_order_id` | `VARCHAR(100)` | NULLABLE, INDEX | Razorpay order ID |
| `razorpay_payment_id` | `VARCHAR(100)` | NULLABLE | Razorpay payment ID |
| `notes` | `LONGTEXT` | NULLABLE | Customer order notes |
| `created_at` | `DATETIME(6)` | NOT NULL, INDEX | Creation timestamp |
| `updated_at` | `DATETIME(6)` | NOT NULL | Update timestamp |

---

### 5.3 `marketplace_order_items`
Individual design asset items purchased within an order, containing assigned license keys.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `BIGINT` | PRIMARY KEY, AUTO_INCREMENT | Order item identifier |
| `order_id` | `BIGINT` | NOT NULL, FK -> `marketplace_orders.id` | Parent order |
| `product_id` | `BIGINT` | NULLABLE, FK -> `marketplace_products.id` | Target design asset |
| `product_title` | `VARCHAR(255)` | NOT NULL | Product title snapshot |
| `license_type` | `VARCHAR(20)` | NOT NULL, DEFAULT 'standard' | 'standard' (1.0x) or 'extended' (2.5x) |
| `unit_price` | `DECIMAL(10,2)` | NOT NULL | Charged unit price |
| `quantity` | `INT UNSIGNED` | NOT NULL, DEFAULT 1 | Item quantity |
| `total_price` | `DECIMAL(10,2)` | NOT NULL | Line item total |
| `license_key` | `VARCHAR(60)` | UNIQUE, NOT NULL, INDEX | Commercial license key (`LIC-2026-XXXXXX`) |
| `download_count` | `INT UNSIGNED` | NOT NULL, DEFAULT 0 | Consumed downloads |
| `max_downloads` | `INT UNSIGNED` | NOT NULL, DEFAULT 25 | Maximum allowed download attempts |
| `created_at` | `DATETIME(6)` | NOT NULL | Item creation timestamp |

---

### 5.4 `marketplace_payments`
Auditable record of successful gateway transactions.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `BIGINT` | PRIMARY KEY, AUTO_INCREMENT | Payment transaction identifier |
| `order_id` | `BIGINT` | NOT NULL, FK -> `marketplace_orders.id` | Associated order |
| `razorpay_order_id` | `VARCHAR(100)` | NOT NULL, INDEX | Razorpay order reference |
| `razorpay_payment_id` | `VARCHAR(100)` | UNIQUE, NOT NULL, INDEX | Razorpay payment token |
| `razorpay_signature` | `VARCHAR(255)` | NOT NULL | Cryptographic HMAC signature |
| `amount` | `DECIMAL(12,2)` | NOT NULL | Verified amount |
| `currency` | `VARCHAR(10)` | NOT NULL, DEFAULT 'INR' | Currency |
| `status` | `VARCHAR(30)` | NOT NULL, DEFAULT 'captured' | Payment state |
| `method` | `VARCHAR(50)` | NULLABLE | Payment instrument (card, upi, netbanking) |
| `verified_at` | `DATETIME(6)` | NOT NULL | Cryptographic verification timestamp |
| `raw_payload` | `JSON` | NOT NULL | Full gateway verification payload |

---

### 5.5 `marketplace_download_logs`
Security audit trail recording every digital asset file download.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `BIGINT` | PRIMARY KEY, AUTO_INCREMENT | Audit log record identifier |
| `order_item_id` | `BIGINT` | NOT NULL, FK -> `marketplace_order_items.id` | Target licensed item |
| `user_id` | `INT` | NULLABLE, FK -> `auth_user.id` | Downloading user |
| `ip_address` | `CHAR(39)` | NULLABLE | Client remote IP address |
| `user_agent` | `VARCHAR(500)` | NULLABLE | Client browser user agent |
| `downloaded_at` | `DATETIME(6)` | NOT NULL, INDEX | Download execution timestamp |

---

### 5.6 `marketplace_custom_design_requests`
Client design commissions and agency retainer briefs.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `BIGINT` | PRIMARY KEY, AUTO_INCREMENT | Request identifier |
| `name` | `VARCHAR(150)` | NOT NULL | Client full name |
| `email` | `VARCHAR(254)` | NOT NULL | Client email |
| `phone` | `VARCHAR(30)` | NULLABLE | Client phone number |
| `company` | `VARCHAR(150)` | NULLABLE | Brand or agency name |
| `service_category` | `VARCHAR(100)` | NOT NULL | Creative discipline requested |
| `budget_range` | `VARCHAR(100)` | NOT NULL | Budget bracket |
| `timeline` | `VARCHAR(100)` | NOT NULL | Target delivery timeline |
| `title` | `VARCHAR(255)` | NOT NULL | Brief summary title |
| `description` | `LONGTEXT` | NOT NULL | Full creative requirements |
| `reference_links` | `LONGTEXT` | NULLABLE | Moodboard / Figma links |
| `attachment_url` | `VARCHAR(500)` | NULLABLE | Uploaded attachment URL |
| `status` | `VARCHAR(30)` | NOT NULL, DEFAULT 'new' | 'new', 'reviewing', 'quoted', 'in_progress', 'completed' |
| `quoted_amount` | `DECIMAL(10,2)` | NULLABLE | Formal quotation price |
| `admin_notes` | `LONGTEXT` | NULLABLE | Internal art director notes |
| `created_at` | `DATETIME(6)` | NOT NULL, INDEX | Submission timestamp |
| `updated_at` | `DATETIME(6)` | NOT NULL | Last update timestamp |

---

### 5.7 `content_blog_posts`
Editorial articles, design system essays, and spatial UI research.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `BIGINT` | PRIMARY KEY, AUTO_INCREMENT | Article identifier |
| `title` | `VARCHAR(255)` | NOT NULL | Article title |
| `slug` | `VARCHAR(255)` | UNIQUE, NOT NULL, INDEX | SEO URL slug |
| `excerpt` | `LONGTEXT` | NULLABLE | Short preview summary |
| `content` | `LONGTEXT` | NOT NULL | Markdown / rich text article content |
| `author_name` | `VARCHAR(100)` | NOT NULL | Author credit |
| `featured_image_url` | `VARCHAR(500)` | NULLABLE | High-resolution cover photo |
| `category` | `VARCHAR(100)` | NOT NULL | Editorial topic |
| `read_time_minutes` | `INT UNSIGNED` | NOT NULL, DEFAULT 5 | Estimated reading duration |
| `views_count` | `INT UNSIGNED` | NOT NULL, DEFAULT 0 | Reader view counter |
| `is_published` | `TINYINT(1)` | NOT NULL, DEFAULT 1 | Publication visibility flag |
| `created_at` | `DATETIME(6)` | NOT NULL, INDEX | Publish timestamp |
| `updated_at` | `DATETIME(6)` | NOT NULL | Update timestamp |

---

### 5.8 `content_contact_inquiries`
Visitor contact submissions and agency inquiries.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `BIGINT` | PRIMARY KEY, AUTO_INCREMENT | Inquiry identifier |
| `name` | `VARCHAR(150)` | NOT NULL | Sender name |
| `email` | `VARCHAR(254)` | NOT NULL | Sender email |
| `phone` | `VARCHAR(30)` | NULLABLE | Contact telephone |
| `subject` | `VARCHAR(200)` | NOT NULL | Inquiry subject |
| `message` | `LONGTEXT` | NOT NULL | Detailed message text |
| `status` | `VARCHAR(20)` | NOT NULL, DEFAULT 'new' | 'new', 'replied', 'resolved' |
| `created_at` | `DATETIME(6)` | NOT NULL, INDEX | Received timestamp |

---

### 5.9 `content_newsletter_subscribers`
Audience subscription registry for design drops.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `BIGINT` | PRIMARY KEY, AUTO_INCREMENT | Subscriber identifier |
| `email` | `VARCHAR(254)` | UNIQUE, NOT NULL, INDEX | Subscriber email |
| `is_active` | `TINYINT(1)` | NOT NULL, DEFAULT 1 | Subscription status |
| `subscribed_at` | `DATETIME(6)` | NOT NULL | Registration timestamp |

---

### 5.10 `content_notifications`
In-app notification messages delivered to user dashboards.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `BIGINT` | PRIMARY KEY, AUTO_INCREMENT | Notification identifier |
| `user_id` | `INT` | NULLABLE, FK -> `auth_user.id` | Target customer |
| `title` | `VARCHAR(200)` | NOT NULL | Notification title |
| `message` | `LONGTEXT` | NOT NULL | Notification body |
| `notification_type` | `VARCHAR(20)` | NOT NULL, DEFAULT 'system' | 'order', 'payment', 'system', 'promo' |
| `is_read` | `TINYINT(1)` | NOT NULL, DEFAULT 0 | Read flag |
| `link_url` | `VARCHAR(255)` | NULLABLE | Action redirect link |
| `created_at` | `DATETIME(6)` | NOT NULL, INDEX | Creation timestamp |

