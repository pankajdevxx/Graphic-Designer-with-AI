import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  Star,
  Shield,
  Check,
  ShoppingCart,
  Heart,
  Share2,
  FileText,
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import productService from '../services/productService';
import reviewService from '../services/reviewService';
import wishlistService from '../services/wishlistService';
import Container from '../components/ui/Container';
import ProductGallery from '../components/marketplace/ProductGallery';
import ProductReviews from '../components/marketplace/ProductReviews';
import RelatedProducts from '../components/marketplace/RelatedProducts';
import CheckoutModal from '../components/marketplace/CheckoutModal';
import ApiErrorCard from '../components/common/ApiErrorCard';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

export const ProductDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const [product, setProduct] = useState(null);
  const [reviewsData, setReviewsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [selectedLicense, setSelectedLicense] = useState('Standard');
  const [activeTab, setActiveTab] = useState('description');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const fetchProductDetails = useCallback(async () => {
    setIsLoading(true);
    setApiError(null);
    try {
      const [prod, revs] = await Promise.all([
        productService.getProductBySlug(slug),
        reviewService.getProductReviews(slug).catch(() => null),
      ]);
      setProduct(prod);
      setReviewsData(revs);

      // Record view in background
      wishlistService.recordView(slug).catch(() => {});
    } catch (err) {
      console.error('Failed to load product details from API:', err);
      setApiError(err.message || 'Unable to retrieve product from MySQL database.');
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#05020c] text-white pt-32 pb-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 animate-pulse">
            <div className="lg:col-span-7 h-96 bg-[#12092b]/40 rounded-3xl border border-purple-500/20" />
            <div className="lg:col-span-5 space-y-4">
              <div className="h-6 w-32 bg-purple-900/40 rounded-lg" />
              <div className="h-10 w-3/4 bg-purple-900/40 rounded-lg" />
              <div className="h-8 w-1/3 bg-purple-900/40 rounded-lg" />
              <div className="h-40 bg-[#12092b]/40 rounded-2xl border border-purple-500/20" />
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (apiError || !product) {
    return (
      <div className="min-h-screen bg-[#05020c] text-white pt-32 pb-20 flex items-center justify-center">
        <Container>
          <ApiErrorCard
            title="Design Template Not Found"
            message={apiError || 'The requested template could not be loaded from MySQL database.'}
            onRetry={fetchProductDetails}
          />
        </Container>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const inCart = isInCart(product.id);

  const priceMultiplier = selectedLicense === 'Extended' ? 2.5 : 1;
  const currentPrice = Math.round(Number(product.price) * priceMultiplier);
  const currentOriginalPrice = product.original_price
    ? Math.round(Number(product.original_price) * priceMultiplier)
    : null;

  const handleAddToCart = () => {
    addToCart(product, selectedLicense);
    showToast(`Added "${product.title}" to cart (${selectedLicense} License)`, 'success');
  };

  const handleBuyNow = () => {
    addToCart(product, selectedLicense);
    setIsCheckoutOpen(true);
  };

  const handleToggleWishlist = () => {
    const added = toggleWishlist(product);
    showToast(
      added ? `Added "${product.title}" to wishlist` : `Removed from wishlist`,
      'info'
    );
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!', 'info');
    }
  };

  const categoryName = product.category?.name || product.category_name || 'Design Template';
  const categorySlug = product.category?.slug || product.category_slug || '';

  return (
    <div className="min-h-screen bg-[#05020c] text-white pt-24 pb-20">
      <Container>
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-purple-400/80 mb-6 flex-wrap">
          <Link to="/" className="hover:text-purple-300 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-purple-600" />
          <Link to="/marketplace" className="hover:text-purple-300 transition-colors">
            Marketplace
          </Link>
          <ChevronRight className="w-3 h-3 text-purple-600" />
          <Link
            to={`/marketplace/category/${categorySlug}`}
            className="hover:text-purple-300 transition-colors"
          >
            {categoryName}
          </Link>
          <ChevronRight className="w-3 h-3 text-purple-600" />
          <span className="text-white font-medium truncate max-w-[200px] sm:max-w-xs">
            {product.title}
          </span>
        </div>

        {/* Top Product Showcase (Gallery & Purchase Box) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          {/* Left Column: Multi-Image Zoom Gallery */}
          <div className="lg:col-span-7">
            <ProductGallery
              images={product.preview_images || []}
              title={product.title}
            />

            {/* Quick Specs Strip */}
            <div className="mt-6 p-4 rounded-2xl bg-[#12092b]/50 border border-purple-500/20 backdrop-blur-md grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-xs text-purple-400/80">File Formats</div>
                <div className="text-xs font-bold text-white mt-0.5 truncate">
                  {product.file_formats?.slice(0, 3).join(', ') || 'AI, PSD, SVG'}
                </div>
              </div>
              <div>
                <div className="text-xs text-purple-400/80">Software</div>
                <div className="text-xs font-bold text-white mt-0.5 truncate">
                  {product.software_compatibility?.slice(0, 2).join(', ') || 'Illustrator, Figma'}
                </div>
              </div>
              <div>
                <div className="text-xs text-purple-400/80">Dimensions</div>
                <div className="text-xs font-bold text-white mt-0.5 truncate">
                  {product.dimensions || 'Vector Scalable'}
                </div>
              </div>
              <div>
                <div className="text-xs text-purple-400/80">Total Downloads</div>
                <div className="text-xs font-bold text-white mt-0.5">
                  {product.sales_label || '1.2k+'}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing, License Selector & Buy Box */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Category, Badges & Share */}
              <div className="flex items-center justify-between gap-3 mb-3">
                <Link
                  to={`/marketplace/category/${categorySlug}`}
                  className="text-xs font-bold uppercase tracking-wider text-purple-400 hover:text-purple-300 transition-colors"
                >
                  {categoryName}
                </Link>

                <div className="flex items-center gap-2">
                  {product.is_featured && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      Featured
                    </span>
                  )}
                  {product.is_trending && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-violet-500/20 text-violet-300 border border-violet-500/30">
                      Trending
                    </span>
                  )}
                  <button
                    onClick={handleShare}
                    className="p-1.5 rounded-lg text-purple-400 hover:text-white hover:bg-purple-900/30 transition-colors"
                    title="Share Template"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-3">
                {product.title}
              </h1>

              {/* Ratings & Sales */}
              <div className="flex items-center gap-4 text-xs sm:text-sm mb-6 pb-6 border-b border-purple-500/10">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-white">{product.average_rating}</span>
                  <span className="text-purple-400/80">({product.review_count} customer reviews)</span>
                </div>
                <span className="text-purple-600">&bull;</span>
                <span className="text-purple-300/80">{product.sales_label || `${product.sales_count} sales`}</span>
              </div>

              {/* Price Display */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl sm:text-4xl font-extrabold text-white">
                  ${currentPrice}
                </span>
                {currentOriginalPrice && currentOriginalPrice > currentPrice && (
                  <>
                    <span className="text-lg text-purple-400/60 line-through">
                      ${currentOriginalPrice}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Save {product.discount}%
                    </span>
                  </>
                )}
              </div>

              {/* License Selection Box */}
              <div className="mb-6 space-y-2">
                <div className="text-xs font-semibold text-purple-300 uppercase tracking-wider flex items-center justify-between">
                  <span>Select License Rights</span>
                  <span className="text-purple-400/80 normal-case">Instant digital download</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Standard License */}
                  <button
                    type="button"
                    onClick={() => setSelectedLicense('Standard')}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      selectedLicense === 'Standard'
                        ? 'bg-purple-600/20 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.25)]'
                        : 'bg-[#12092b]/60 border-purple-500/20 hover:border-purple-500/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white">Standard</span>
                      <span className="text-xs font-semibold text-purple-300">${Number(product.price)}</span>
                    </div>
                    <p className="text-[11px] text-purple-300/70 leading-snug">
                      1 commercial project or personal creative usage
                    </p>
                  </button>

                  {/* Extended Commercial License */}
                  <button
                    type="button"
                    onClick={() => setSelectedLicense('Extended')}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      selectedLicense === 'Extended'
                        ? 'bg-purple-600/20 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.25)]'
                        : 'bg-[#12092b]/60 border-purple-500/20 hover:border-purple-500/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white">Extended (2.5x)</span>
                      <span className="text-xs font-semibold text-purple-300">
                        ${Math.round(Number(product.price) * 2.5)}
                      </span>
                    </div>
                    <p className="text-[11px] text-purple-300/70 leading-snug">
                      Unlimited commercial clients & end-product resale
                    </p>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-[0_0_25px_rgba(168,85,247,0.35)] flex items-center justify-center gap-2 transition-all"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>{inCart ? 'Add Another License' : 'Add to Cart'}</span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 py-3 px-4 rounded-2xl font-bold text-sm bg-[#1b0d3a] hover:bg-[#251352] border border-purple-500/40 hover:border-purple-400 text-white transition-all text-center"
                  >
                    Instant Buy Now
                  </button>

                  <button
                    onClick={handleToggleWishlist}
                    aria-label="Toggle Wishlist"
                    className={`p-3 rounded-2xl border transition-all ${
                      isFavorited
                        ? 'bg-pink-500/20 border-pink-500/50 text-pink-400'
                        : 'bg-[#12092b]/60 border-purple-500/30 text-purple-400 hover:text-white hover:border-purple-400'
                    }`}
                    title={isFavorited ? 'In Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart className={`w-5 h-5 ${isFavorited ? 'fill-pink-500' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Trust Guarantees */}
              <div className="p-3.5 rounded-2xl bg-[#0f0723]/60 border border-purple-500/15 space-y-2 text-xs text-purple-300/80">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Instant digital download directly after checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span>Verified 100% royalty-free vector & bitmap assets</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span>Free future updates and version releases included</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed In-Depth Sections (Description, Specs, Reviews) */}
        <div className="mb-20">
          <div className="flex items-center gap-2 border-b border-purple-500/20 pb-2 mb-8">
            {[
              { id: 'description', label: 'Overview & Included Files' },
              { id: 'specs', label: 'Technical Specifications' },
              { id: 'reviews', label: `Customer Reviews (${product.review_count || 0})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-purple-600/30 text-white border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                    : 'text-purple-400/80 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: DESCRIPTION */}
          {activeTab === 'description' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">About This Design Asset</h3>
                <p className="text-sm sm:text-base text-purple-200/80 leading-relaxed">
                  {product.description}
                </p>
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400">
                    Key Highlights
                  </h4>
                  <ul className="space-y-2">
                    {product.features?.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-purple-300/90">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#12092b]/60 border border-purple-500/20 backdrop-blur-md">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-purple-400" />
                  <span>What's Inside the Download Package</span>
                </h3>
                <ul className="space-y-3">
                  {product.what_included?.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-purple-200">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: TECHNICAL SPECIFICATIONS */}
          {activeTab === 'specs' && (
            <div className="max-w-3xl">
              <div className="rounded-2xl bg-[#12092b]/60 border border-purple-500/20 overflow-hidden">
                <table className="w-full text-xs sm:text-sm text-left">
                  <tbody>
                    <tr className="border-b border-purple-500/15">
                      <td className="p-4 font-semibold text-purple-300 w-1/3">File Formats</td>
                      <td className="p-4 text-white">{product.file_formats?.join(', ') || 'AI, PSD, SVG, PNG'}</td>
                    </tr>
                    <tr className="border-b border-purple-500/15 bg-purple-950/20">
                      <td className="p-4 font-semibold text-purple-300">Software Compatibility</td>
                      <td className="p-4 text-white">{product.software_compatibility?.join(', ') || 'Adobe Illustrator, Photoshop, Figma'}</td>
                    </tr>
                    <tr className="border-b border-purple-500/15">
                      <td className="p-4 font-semibold text-purple-300">Dimensions / Resolution</td>
                      <td className="p-4 text-white">{product.dimensions || 'Scalable Vector (Infinite)'}</td>
                    </tr>
                    <tr className="border-b border-purple-500/15 bg-purple-950/20">
                      <td className="p-4 font-semibold text-purple-300">License Terms</td>
                      <td className="p-4 text-white">{product.license_type || 'Commercial Usage Rights Included'}</td>
                    </tr>
                    <tr className="bg-purple-950/20">
                      <td className="p-4 font-semibold text-purple-300">Free Updates</td>
                      <td className="p-4 text-white">Lifetime access to future design iterations</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: CUSTOMER REVIEWS */}
          {activeTab === 'reviews' && (
            <div>
              <ProductReviews
                reviews={reviewsData?.reviews || []}
                averageRating={Number(reviewsData?.average_rating || product.average_rating)}
                totalReviews={reviewsData?.total_reviews || product.review_count}
              />
            </div>
          )}
        </div>

        {/* Related Products from this Category */}
        <div className="pt-12 border-t border-purple-500/15">
          <RelatedProducts
            currentProductId={product.id}
            categorySlug={categorySlug}
          />
        </div>
      </Container>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
};

export default ProductDetailPage;