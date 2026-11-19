import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturedDesignsSection from '../components/home/FeaturedDesignsSection';
import CategoriesSection from '../components/home/CategoriesSection';
import ServicesSection from '../components/home/ServicesSection';
import PortfolioSection from '../components/home/PortfolioSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FaqSection from '../components/home/FaqSection';
import NewsletterSection from '../components/home/NewsletterSection';

/**
 * HomePage Component — Phase 2 Flagship Landing Page
 * Orchestrates the full international creative agency and digital asset marketplace experience.
 */
export const HomePage = () => {
  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Featured Designs Marketplace Showcase */}
      <FeaturedDesignsSection />

      {/* 3. 15 Popular Categories Grid */}
      <CategoriesSection />

      {/* 4. Creative Services Divisions (Branding, Social Media, UI/UX) */}
      <ServicesSection />

      {/* 5. Client Portfolio Showcase */}
      <PortfolioSection />

      {/* 6. How It Works (4-Step Customer Journey) */}
      <HowItWorksSection />

      {/* 7. Client Testimonials & Endorsements */}
      <TestimonialsSection />

      {/* 8. Interactive FAQs Accordion */}
      <FaqSection />

      {/* 9. VIP Newsletter Subscription */}
      <NewsletterSection />
    </div>
  );
};

export default HomePage;
