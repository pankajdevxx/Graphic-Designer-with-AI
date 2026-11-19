# PixelGenCreativity — Component Documentation (Phase 3)

## 1. Directory Structure

```
frontend/src/
├── components/
│   ├── common/
│   │   ├── Navbar.jsx               # Sticky navigation with cart/wishlist counters
│   │   └── Footer.jsx               # Multi-column footer with 15 category deep-links
│   ├── layout/
│   │   └── MainLayout.jsx           # Root layout shell with ScrollToTop
│   ├── marketplace/
│   │   ├── CartItem.jsx             # Cart row with license selector & price calculations
│   │   ├── CheckoutModal.jsx        # Simulated digital asset checkout with instant downloads
│   │   ├── EmptyCart.jsx            # Glassmorphic empty cart state with CTA
│   │   ├── EmptyWishlist.jsx        # Glassmorphic empty wishlist state with CTA
│   │   ├── LoadingSkeleton.jsx      # Shimmer skeleton loader for product cards
│   │   ├── MarketplaceHero.jsx      # Marketplace landing hero with search & stats
│   │   ├── ProductCard.jsx          # Glassmorphic product card with badges & actions
│   │   ├── ProductFilter.jsx        # Responsive multi-faceted filter sidebar & mobile drawer
│   │   ├── ProductGallery.jsx       # Multi-image gallery with zoom lightbox modal
│   │   ├── ProductGrid.jsx          # Configurable column grid with empty state & loading
│   │   ├── ProductReviews.jsx       # Rating breakdown bars, customer reviews & helpful voting
│   │   ├── ProductSearch.jsx        # Live debounced search input with auto-suggestions
│   │   ├── PromoBanner.jsx          # Promotional banner with coupon code showcase
│   │   ├── RelatedProducts.jsx      # Recommendations from the same category
│   │   ├── SortDropdown.jsx         # 5-way sorting selector
│   │   └── WishlistItem.jsx         # Saved product card with move-to-cart action
│   ├── modals/
│   │   ├── AuthModal.jsx            # Login/Register glass modal
│   │   └── CustomOrderModal.jsx     # Bespoke design project request form
│   └── ui/
│       ├── AnimatedCounter.jsx      # Smooth numeric counter
│       ├── Container.jsx            # Max-width layout container
│       ├── GlassCard.jsx            # Frosted glass card with glow effects
│       ├── GradientText.jsx         # Violet-purple gradient text token
│       ├── LoadingScreen.jsx        # App startup loading screen
│       ├── PrimaryButton.jsx        # Brand primary CTA button
│       ├── ScrollReveal.jsx         # ScrollTrigger entry animation wrapper
│       ├── SectionHeading.jsx       # Standardized section title & badge
│       └── SecondaryButton.jsx      # Secondary glass button
├── context/
│   ├── CartContext.jsx              # Central cart state with localStorage persistence
│   ├── WishlistContext.jsx          # Central wishlist state with localStorage persistence
│   └── ToastContext.jsx             # Floating glassmorphic toast notification alerts
├── data/
│   ├── categories.js                # 15 design categories metadata & icon mappings
│   ├── featuredDesigns.js           # Phase 2 featured showcase items
│   ├── marketplaceProducts.js       # Phase 3 comprehensive marketplace product dataset
│   ├── portfolio.js                 # Portfolio case studies
│   ├── reviews.js                   # Client testimonials
│   └── services.js                  # Agency creative service offerings
├── pages/
│   ├── AboutPage.jsx                # Agency manifesto, team, values
│   ├── CartPage.jsx                 # Shopping cart with coupon engine & checkout
│   ├── CategoriesPage.jsx           # Legacy categories showcase
│   ├── CategoryDetailPage.jsx       # Category-specific product directory
│   ├── ContactPage.jsx              # Contact form & studio coordinates
│   ├── HealthPage.jsx               # System telemetry health diagnostics probe
│   ├── HomePage.jsx                 # Agency landing page
│   ├── MarketplaceCategoriesPage.jsx # 15 Categories directory with product counts
│   ├── MarketplacePage.jsx          # Marketplace hub with curated tabs
│   ├── MarketplaceProductsPage.jsx  # Full catalog browser with sidebar filters
│   ├── MarketplaceSearchPage.jsx    # Dedicated search page with query parser
│   ├── NotFoundPage.jsx             # 404 error page
│   ├── PortfolioPage.jsx            # Client portfolio showcase
│   ├── ProductDetailPage.jsx        # Full product showcase with gallery & reviews
│   ├── ServicesPage.jsx             # Agency design services catalog
│   └── WishlistPage.jsx             # Saved designs collection
└── routes/
    └── AppRoutes.jsx                # Declarative React Router DOM v7 table
```

---

## 2. Component API & Props Inventory

### `ProductCard.jsx`
- **Props**:
  - `product` *(Object, Required)*: Product entity conforming to `MarketplaceProduct`.
- **Hooks Used**: `useCart()`, `useWishlist()`, `useToast()`.
- **Features**: Image zoom on hover, Category badge, Featured/Trending/Sale pills, aggregate star rating, Wishlist heart toggle, Quick Add to Cart button, link to `/marketplace/product/:slug`.

### `ProductFilter.jsx`
- **Props**:
  - `filters` *(Object, Required)*: Current filter state (`category`, `priceRange`, `minRating`, `featuredOnly`, `trendingOnly`, `onSaleOnly`).
  - `onFilterChange` *(Function, Required)*: Callback dispatched on change.
  - `onReset` *(Function, Required)*: Resets all filters to defaults.
  - `totalCount` *(Number, Optional)*: Matching items count.
- **Features**: Category dropdown with all 15 disciplines, interactive dual price range slider ($0 - $200), minimum star rating selector (Any, 4.0+, 4.5+, 4.8+), toggle checkboxes for special collections.

### `ProductGallery.jsx`
- **Props**:
  - `images` *(Array of Strings, Required)*: Array of image URLs.
  - `title` *(String, Required)*: Product name for accessible `alt` tags.
- **Features**: Active image preview, thumbnail carousel, zoom button, full-screen lightbox modal with escape-key and backdrop-click dismiss.

### `ProductReviews.jsx`
- **Props**:
  - `reviews` *(Array of Objects, Required)*: Customer review items.
  - `averageRating` *(Number, Required)*: Aggregate rating (e.g. 4.9).
  - `totalReviews` *(Number, Required)*: Total count of reviews.
- **Features**: Star breakdown percentage bars (5★ down to 1★), verified licensee badges, date of purchase, helpful vote counter with toggle state.

### `CheckoutModal.jsx`
- **Props**:
  - `isOpen` *(Boolean, Required)*: Visibility control.
  - `onClose` *(Function, Required)*: Close handler.
- **Hooks Used**: `useCart()`, `useToast()`.
- **Features**: Multi-step modal (Review -> Processing Animation -> Success), customer email & name collection, license agreement checkbox, payment tab simulation, license key generator (`LIC-2026-XXXXXX`), simulated `.ZIP` asset package downloader.

### `CartItem.jsx`
- **Props**:
  - `item` *(Object, Required)*: Contains `{ product, licenseType, quantity }`.
- **Hooks Used**: `useCart()`, `useToast()`.
- **Features**: License selector dropdown (Standard vs. Extended), unit price recalculation, digital quantity increment/decrement, remove action.

### `WishlistItem.jsx`
- **Props**:
  - `product` *(Object, Required)*: Product entity.
  - `onMoveToCart` *(Function, Optional)*.
- **Hooks Used**: `useWishlist()`, `useToast()`.
- **Features**: Thumbnail preview, rating, price, quick Move to Cart button (removes from wishlist and adds to cart), remove button.
