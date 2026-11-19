import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import AdminRoute from '../components/auth/AdminRoute';

// Core Pages
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import ServicesPage from '../pages/ServicesPage';
import PortfolioPage from '../pages/PortfolioPage';
import ContactPage from '../pages/ContactPage';
import HealthPage from '../pages/HealthPage';
import NotFoundPage from '../pages/NotFoundPage';

// Marketplace Pages
import MarketplacePage from '../pages/MarketplacePage';
import MarketplaceProductsPage from '../pages/MarketplaceProductsPage';
import MarketplaceCategoriesPage from '../pages/MarketplaceCategoriesPage';
import CategoryDetailPage from '../pages/CategoryDetailPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import MarketplaceSearchPage from '../pages/MarketplaceSearchPage';
import CategoriesPage from '../pages/CategoriesPage';

// E-Commerce & Checkout Pages
import CartPage from '../pages/CartPage';
import WishlistPage from '../pages/WishlistPage';
import CheckoutPage from '../pages/CheckoutPage';
import OrderHistoryPage from '../pages/OrderHistoryPage';
import PurchasedDesignsPage from '../pages/PurchasedDesignsPage';
import DownloadCenterPage from '../pages/DownloadCenterPage';

// User Auth & Dashboard Pages
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import UserDashboardPage from '../pages/UserDashboardPage';

// Agency Commissions & Editorial
import CustomDesignRequestPage from '../pages/CustomDesignRequestPage';
import BlogPage from '../pages/BlogPage';
import BlogDetailPage from '../pages/BlogDetailPage';

// Legal Policies
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage';
import TermsPage from '../pages/TermsPage';
import RefundPolicyPage from '../pages/RefundPolicyPage';

// Administrative Command Center
import AdminDashboardPage from '../pages/AdminDashboardPage';

/**
 * AppRoutes Component
 * Central declarative routing table for PixelGenCreativity platform.
 * Complete 24+ production pages connected through React Router DOM.
 */
export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Flagship Home & Agency Pages */}
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="portfolio" element={<PortfolioPage />} />
        <Route path="contact" element={<ContactPage />} />

        {/* Custom Agency Design Briefs */}
        <Route path="custom-request" element={<CustomDesignRequestPage />} />

        {/* Marketplace Ecosystem */}
        <Route path="marketplace" element={<MarketplacePage />} />
        <Route path="marketplace/products" element={<MarketplaceProductsPage />} />
        <Route path="marketplace/categories" element={<MarketplaceCategoriesPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="marketplace/category/:slug" element={<CategoryDetailPage />} />
        <Route path="marketplace/product/:slug" element={<ProductDetailPage />} />
        <Route path="marketplace/search" element={<MarketplaceSearchPage />} />

        {/* Editorial Insights & Blog */}
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:slug" element={<BlogDetailPage />} />

        {/* E-Commerce Operations */}
        <Route path="cart" element={<CartPage />} />
        <Route path="wishlist" element={<WishlistPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="orders" element={<OrderHistoryPage />} />
        <Route path="orders/:orderNumber" element={<OrderHistoryPage />} />
        <Route path="purchased-designs" element={<PurchasedDesignsPage />} />
        <Route path="download-center" element={<DownloadCenterPage />} />
        <Route path="downloads" element={<DownloadCenterPage />} />

        {/* Authentication */}
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />

        {/* Protected Customer Dashboard */}
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <UserDashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Protected Admin Command Center */}
        <Route
          path="admin-dashboard"
          element={
            <AdminRoute>
              <AdminDashboardPage />
            </AdminRoute>
          }
        />

        {/* Legal Policies */}
        <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="terms-and-conditions" element={<TermsPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="refund-policy" element={<RefundPolicyPage />} />

        {/* Live System Health & Telemetry */}
        <Route path="health" element={<HealthPage />} />

        {/* 404 Not Found Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
