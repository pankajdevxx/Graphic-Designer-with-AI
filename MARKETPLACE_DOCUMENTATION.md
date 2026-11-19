# PixelGenCreativity — Marketplace Documentation (Phase 3)

## 1. Executive Architecture Overview

PixelGenCreativity Phase 3 introduces a complete, client-side digital graphic design marketplace engineered on **React 19**, **Vite 8**, **Tailwind CSS v4**, and **Framer Motion**.

The marketplace enables creators, agency founders, and digital marketing teams to discover, search, filter, preview, and purchase design assets across **15 distinct creative disciplines**.

```
[User Browser]
       │
       ▼
[Navbar (Cart & Wishlist Badges)]
       │
       ├─► [/marketplace] (Marketplace Landing Hub)
       │      ├─ MarketplaceHero (Live search, quick category pills, statistics)
       │      ├─ Value Proposition Strip (Instant downloads, royalty-free, multi-format)
       │      ├─ Curated Collections Tabs (Featured, Trending, Best Sellers, New Arrivals, Special Offers)
       │      ├─ 15 Disciplines Category Matrix
       │      └─ PromoBanner (PIXEL20 20% discount offer)
       │
       ├─► [/marketplace/products] (Full Catalog Browser)
       │      ├─ ProductSearch (Debounced query input & auto-suggestions)
       │      ├─ ProductFilter (Sidebar & mobile drawer: 15 categories, price range, rating, badges)
       │      ├─ SortDropdown (5 sorting algorithms: popularity, rating, newest, price low/high)
       │      ├─ Active Filter Pills (Dynamic removals & reset all)
       │      └─ ProductGrid (Glassmorphism cards with loading skeletons)
       │
       ├─► [/marketplace/categories] (15 Category Directory)
       │      └─ Category search, asset counters, and deep-link routing
       │
       ├─► [/marketplace/category/:slug] (Dynamic Category Landing)
       │      └─ Category hero, targeted products grid, related category recommendations
       │
       ├─► [/marketplace/product/:slug] (Detailed Product Showcase)
       │      ├─ ProductGallery (Multi-image zoom lightbox modal)
       │      ├─ Licensing Matrix (Standard 1x vs. Extended 2.5x commercial rights)
       │      ├─ Technical Specification Matrix (AI, PSD, Figma, SVG, DPI, dimensions)
       │      ├─ ProductReviews (Rating breakdown bars, verified badges, helpful voting)
       │      └─ RelatedProducts (Category-specific recommendations)
       │
       ├─► [/marketplace/search?q=...] (Dedicated Search Page)
       │
       ├─► [/cart] (Digital Asset Shopping Cart)
       │      ├─ CartItem (Thumbnail, title, category, license dropdown, qty, remove)
       │      ├─ Coupon Engine (PIXEL20: 20% off, CREATOR10: 10% off)
       │      └─ CheckoutModal (Customer info, license terms, instant payment simulation, ZIP download)
       │
       └─► [/wishlist] (Saved Items Directory)
              ├─ WishlistItem (Save for later, preview, delete)
              └─ Move to Cart / Move All to Cart actions
```

---

## 2. All 15 Design Categories

| ID | Category Name | Slug | Demonstration Assets | Primary Formats | Primary Software |
|---|---|---|---|---|---|
| 1 | Logo Design | `logo-design` | Geometric logo systems, modern minimalist marks | AI, EPS, SVG, PNG | Adobe Illustrator, Figma |
| 2 | Brand Identity | `brand-identity` | Corporate brand manuals, stationery kits | AI, EPS, PDF, INDD | Illustrator, InDesign |
| 3 | Posters & Banners | `posters-banners` | Swiss typography posters, festival banners | PSD, AI, TIFF | Photoshop, Illustrator |
| 4 | Instagram Posts | `instagram-posts` | Dark luxury square feed posts (1080x1080) | Figma, PSD, Canva | Figma, Photoshop |
| 5 | Instagram Stories | `instagram-stories` | Animated vertical stories (1080x1920) | Figma, PSD, MP4 | Figma, After Effects |
| 6 | Social Media Carousels | `social-media-carousels` | Seamless multi-slide storytelling carousels | Figma, PSD | Figma, Photoshop |
| 7 | YouTube Thumbnails | `youtube-thumbnails` | High-CTR gaming & tech thumbnails (1280x720) | PSD, AI, PNG | Photoshop |
| 8 | YouTube Channel Banners | `youtube-channel-banners` | Responsive multi-device banners (2560x1440) | PSD, AI, PNG | Photoshop, Illustrator |
| 9 | Business Cards | `business-cards` | Minimalist luxury foil cards (3.5x2 inch) | AI, PSD, EPS | Illustrator, Photoshop |
| 10 | Resume Templates | `resume-templates` | Executive ATS-friendly CV & cover letters | AI, DOCX, Figma | Figma, Illustrator, Word |
| 11 | Presentation Designs | `presentation-designs` | 16:9 investor pitch decks & keynote slides | PPTX, KEY, Figma | PowerPoint, Keynote, Figma |
| 12 | Website UI Kits | `website-ui-kits` | SaaS & Web3 responsive responsive UI kits | Figma, Sketch | Figma |
| 13 | Mobile App UI | `mobile-app-ui` | iOS & Android design systems (300+ screens) | Figma | Figma |
| 14 | Landing Page Templates | `landing-page-templates` | High-converting landing pages (desktop & mobile) | Figma, HTML/CSS | Figma |
| 15 | Marketing Creatives | `marketing-creatives` | Cross-platform digital ad bundles (Google, Meta) | PSD, Figma, HTML5 | Photoshop, Figma |

---

## 3. Product Data Schema (`src/data/marketplaceProducts.js`)

Each product adheres to the following decoupled data schema:

```typescript
interface MarketplaceProduct {
  id: string;               // Unique ID (e.g. 'prod-01')
  slug: string;             // URL-friendly slug (e.g. 'lumina-minimalist-geometric-logo-system')
  title: string;            // Product title
  category: string;         // Human-readable category (e.g. 'Logo Design')
  categorySlug: string;     // Normalized category slug (e.g. 'logo-design')
  price: number;            // Standard License base price in USD
  originalPrice?: number;   // Strike-through original price (if on sale)
  discount?: number;        // Percentage discount
  rating: number;           // Aggregate rating (0.0 - 5.0)
  reviewCount: number;      // Total review count
  salesCount: string;       // Formatted sales indicator (e.g. '1.4k')
  featured: boolean;        // Highlights on featured feeds
  trending: boolean;        // High-velocity purchase indicator
  bestSeller: boolean;      // Top-rated bestseller
  isNew: boolean;           // Recently published
  onSale: boolean;          // Active promotion
  description: string;      // Comprehensive product overview
  previewImages: string[];  // Multi-image preview array (for ProductGallery)
  fileFormats: string[];    // Format compatibility list (AI, PSD, Figma, SVG)
  software: string[];       // Supported tools (Adobe Illustrator, Figma)
  dimensions: string;       // Resolution or vector classification
  license: string;          // Default license statement
  whatIncluded: string[];   // Package inventory breakdown
  features: string[];       // Highlighted bullet points
  reviews: ReviewItem[];    // Customer feedback objects
  tags: string[];           // Search keywords
  createdAt: string;        // ISO 8601 creation date
}
```

---

## 4. Digital Asset Cart & Licensing Engine

In a digital design marketplace, physical inventory is replaced with intellectual property license rights:

### Licensing Rules:
1. **Standard License ($ base price, multiplier 1.0x)**:
   - For 1 personal or commercial client project.
   - Non-exclusive, non-transferable.
   - Source files cannot be resold directly.
2. **Extended Commercial License ($ base price * 2.5x)**:
   - Unlimited client projects and commercial campaigns.
   - Incorporation into end products for sale.
   - Priority customer support and commercial indemnity.

### Cart State Methods (`CartContext.jsx`):
- `addToCart(product, licenseType = 'Standard')`: Adds item or switches license type.
- `removeFromCart(productId)`: Removes item from cart.
- `updateQuantity(productId, delta)`: Digital quantity control.
- `clearCart()`: Empties cart and resets coupons.
- `applyCoupon(code)`: Validates promo codes (`PIXEL20` = 20% off, `CREATOR10` = 10% off).
- `removeCoupon()`: Clears active discount.
- `localStorage` persistence under key `pixelgen_marketplace_cart`.

---

## 5. Wishlist Management (`WishlistContext.jsx`)

- `wishlist`: Array of saved product objects.
- `toggleWishlist(product)`: Reversible favorite toggle.
- `moveToCart(product, licenseType)`: Atomically adds to cart and removes from wishlist.
- `moveAllToCart()`: Batch adds entire wishlist into the cart with Standard licenses.
- `localStorage` persistence under key `pixelgen_marketplace_wishlist`.

---

## 6. Simulated Checkout & Asset Vault (`CheckoutModal.jsx`)

The checkout simulation models an enterprise digital asset checkout:
1. Customer enters Name and Delivery Email.
2. Customer selects a payment method (Credit Card, Razorpay Sandbox, or Instant Download).
3. Agrees to Digital Licensing Terms.
4. Generates cryptographic Order Reference ID (`PXG-XXXXXX`) and Commercial License Key (`LIC-2026-XXXXXX`).
5. Grants instant access to simulated `.ZIP` package downloads for each purchased asset.
6. Clears the cart and logs completed transaction.
