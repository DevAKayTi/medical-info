import { Link } from 'react-router-dom';
import {
  Phone, Mail, MapPin, Globe, ArrowRight, Shield, Award, Package,
  ExternalLink, Share2, Users, Play
} from 'lucide-react';

const footerLinks = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Leadership Team', href: '/about#leadership' },
    { label: 'Company History', href: '/about#history' },
    { label: 'Certifications', href: '/certifications' },
    { label: 'Careers', href: '/careers' },
    { label: 'News & Events', href: '/news' },
  ],
  services: [
    { label: 'Primary Distribution', href: '/services/primary-distribution' },
    { label: 'Hospital Supply', href: '/services/hospital-supply' },
    { label: 'Pharmacy Supply', href: '/services/pharmacy-supply' },
    { label: 'Cold Chain Logistics', href: '/services/cold-chain-logistics' },
    { label: 'Warehousing', href: '/services/warehousing' },
  ],
  products: [
    { label: 'Pharmaceuticals', href: '/products?category=pharmaceuticals' },
    { label: 'Medical Devices', href: '/products?category=medical-devices' },
    { label: 'Surgical Supplies', href: '/products?category=surgical-supplies' },
    { label: 'Diagnostics', href: '/products?category=diagnostics' },
    { label: 'PPE', href: '/products?category=ppe' },
    { label: 'Product Downloads', href: '/downloads' },
  ],
  support: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'Brand Partners', href: '/brands' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Downloads', href: '/downloads' },
  ],
};

const socialLinks = [
  { icon: ExternalLink, href: '#', label: 'LinkedIn' },
  { icon: Share2,       href: '#', label: 'Twitter / X' },
  { icon: Users,        href: '#', label: 'Facebook' },
  { icon: Play,         href: '#', label: 'YouTube' },
];

const certBadges = [
  { label: 'WHO GDP', icon: Shield },
  { label: 'ISO 9001', icon: Award },
  { label: 'ISO 13485', icon: Package },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xl font-heading">M</span>
              </div>
              <div>
                <div className="font-heading font-bold text-white text-xl leading-none">MediSource</div>
                <div className="text-xs text-gray-400 mt-0.5">Global Distribution</div>
              </div>
            </Link>

            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-xs">
              Your trusted partner in pharmaceutical and medical supply distribution across 18 countries. 
              Delivering quality healthcare products with integrity since 1999.
            </p>

            {/* Contact Info */}
            <div className="space-y-2.5 text-sm mb-6">
              <a href="tel:+97143621900" className="flex items-center gap-2.5 hover:text-primary-400 transition-colors">
                <Phone size={15} className="text-primary-500 flex-shrink-0" />
                +971 4 362 1900
              </a>
              <a href="mailto:info@medisource-global.com" className="flex items-center gap-2.5 hover:text-primary-400 transition-colors">
                <Mail size={15} className="text-primary-500 flex-shrink-0" />
                info@medisource-global.com
              </a>
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-primary-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">Dubai Healthcare City, Phase 2, UAE</span>
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-primary-600 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -ml-1 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-4 uppercase tracking-wider">Services</h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -ml-1 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Links */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-4 uppercase tracking-wider">Products</h4>
            <ul className="space-y-2.5">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -ml-1 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support + Newsletter */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-4 uppercase tracking-wider">Support</h4>
            <ul className="space-y-2.5 mb-6">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -ml-1 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Newsletter</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 min-w-0 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                />
                <button className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-2 rounded-lg transition-colors flex-shrink-0">
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Certification Badges */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs text-gray-500 font-medium">Certifications:</span>
              {certBadges.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 bg-gray-800 border border-gray-700 rounded-full px-3 py-1"
                >
                  <Icon size={12} className="text-primary-400" />
                  <span className="text-xs text-gray-300 font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Globe size={12} />
              <span>Operating across 18 countries</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-black/40">
        <div className="container-custom py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} MediSource Global Distribution LLC. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gray-300 transition-colors">Terms of Use</Link>
            <Link to="/sitemap" className="hover:text-gray-300 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
