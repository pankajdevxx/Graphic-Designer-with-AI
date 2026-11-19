import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
  Globe,
  Activity,
  Heart,
} from 'lucide-react';
import GradientText from '../ui/GradientText';

/**
 * Premium Glassmorphism Footer
 * Multi-column agency footer with brand manifesto, categorized site maps, social links,
 * legal disclaimers, and system diagnostics telemetry hook.
 */
export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { name: 'Home', path: '/' },
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'Products Catalog', path: '/marketplace/products' },
    { name: '15 Categories', path: '/marketplace/categories' },
    { name: 'Creative Services', path: '/services' },
    { name: 'Custom Design Request', path: '/custom-request' },
    { name: 'Portfolio Showcase', path: '/portfolio' },
    { name: 'Design Insights / Blog', path: '/blog' },
    { name: 'Customer Dashboard', path: '/dashboard' },
    { name: 'Download Center', path: '/download-center' },
    { name: 'About Agency', path: '/about' },
    { name: 'Contact Studio', path: '/contact' },
    { name: 'Admin Command Center', path: '/admin-dashboard' },
    { name: 'System Telemetry', path: '/health' },
  ];

  const categoryLinks = [
    { name: 'Logo Design', path: '/marketplace/category/logo-design' },
    { name: 'Brand Identity', path: '/marketplace/category/brand-identity' },
    { name: 'Website UI Kits', path: '/marketplace/category/website-ui-kits' },
    { name: 'Mobile App UI', path: '/marketplace/category/mobile-app-ui' },
    { name: 'Instagram Posts', path: '/marketplace/category/instagram-posts' },
    { name: 'YouTube Thumbnails', path: '/marketplace/category/youtube-thumbnails' },
    { name: 'Presentation Designs', path: '/marketplace/category/presentation-designs' },
  ];

  const serviceLinks = [
    { name: 'Custom Logo & Branding', path: '/services#branding' },
    { name: 'Social Media Strategy & Design', path: '/services#social' },
    { name: 'UI/UX & Web Prototyping', path: '/services#uiux' },
    { name: 'Complete Brand Guidelines', path: '/services' },
    { name: 'Design System Architecture', path: '/services' },
    { name: 'Enterprise Retainers', path: '/contact' },
  ];

  const socialLinks = [
    { name: 'Dribbble', href: 'https://dribbble.com', label: 'dr' },
    { name: 'Behance', href: 'https://behance.net', label: 'be' },
    { name: 'Twitter / X', href: 'https://twitter.com', label: 'x' },
    { name: 'Instagram', href: 'https://instagram.com', label: 'ig' },
    { name: 'LinkedIn', href: 'https://linkedin.com', label: 'in' },
    { name: 'GitHub', href: 'https://github.com', label: 'gh' },
  ];

  return (
    <footer className="relative bg-[#05020c] border-t border-white/[0.08] pt-16 pb-12 overflow-hidden mt-auto">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-t from-purple-900/15 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          {/* Column 1: Brand & Tagline (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-purple-600 to-fuchsia-600 flex items-center justify-center text-white border border-white/20 shadow-lg shadow-purple-950/50">
                <Sparkles size={20} className="text-white" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-extrabold tracking-tight text-white">
                    PixelGen
                  </span>
                  <GradientText variant="purple-fuchsia" className="text-xl">
                    Creativity
                  </GradientText>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                  Design Your Vision. Create Your Identity.
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-300/80 leading-relaxed max-w-sm">
              PixelGenCreativity is a premier international creative agency and digital asset marketplace. We engineer high-converting visual identities, scalable design systems, and viral social assets for forward-thinking brands.
            </p>

            {/* Studio Contact Snippets */}
            <div className="space-y-2 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-2.5">
                <Mail size={14} className="text-purple-400" />
                <a href="mailto:hello@pixelgencreativity.com" className="hover:text-white transition-colors">
                  hello@pixelgencreativity.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin size={14} className="text-purple-400" />
                <span>San Francisco, CA & London, UK</span>
              </div>
            </div>

            {/* Social Pill Links */}
            <div className="flex flex-wrap gap-2 pt-2">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-purple-600/20 border border-white/8 hover:border-purple-500/40 text-xs font-semibold text-slate-300 hover:text-white transition-all"
                  title={s.name}
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <h4 className="text-xs uppercase font-extrabold tracking-wider text-white mb-4">
              Explore Studio
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {navigationLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="hover:text-purple-300 transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Marketplace Categories */}
          <div>
            <h4 className="text-xs uppercase font-extrabold tracking-wider text-white mb-4">
              Top Categories
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {categoryLinks.map((cat, i) => (
                <li key={i}>
                  <Link
                    to={cat.path}
                    className="hover:text-purple-300 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Creative Services */}
          <div>
            <h4 className="text-xs uppercase font-extrabold tracking-wider text-white mb-4">
              Agency Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {serviceLinks.map((srv, i) => (
                <li key={i}>
                  <Link
                    to={srv.path}
                    className="hover:text-purple-300 transition-colors"
                  >
                    {srv.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} PixelGenCreativity. All rights reserved. Commercial & Personal Licensing Enforced.</p>

          <div className="flex flex-wrap items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="hover:text-slate-300 transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/refund-policy" className="hover:text-slate-300 transition-colors">
              Refund Policy
            </Link>
            <Link
              to="/health"
              className="inline-flex items-center gap-1 text-emerald-400/90 hover:text-emerald-300 transition-colors"
            >
              <Activity size={12} />
              <span>System Telemetry Live</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
