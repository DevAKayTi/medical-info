import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Sun, Moon, Search, ChevronDown, Phone,
  Mail, MapPin, Package, Building2, Truck, Snowflake,
  Shield, FlaskConical, Activity, Scissors, Cross, Warehouse,
  Award, FileText, Image, Briefcase, Download, HeadphonesIcon
} from 'lucide-react';
import { navItems } from '@/data/misc';
import { useDarkMode } from '@/hooks/useDarkMode';

const iconMap: Record<string, React.ReactNode> = {
  Package: <Package size={16} />,
  Building2: <Building2 size={16} />,
  Truck: <Truck size={16} />,
  Snowflake: <Snowflake size={16} />,
  Shield: <Shield size={16} />,
  FlaskConical: <FlaskConical size={16} />,
  Activity: <Activity size={16} />,
  Scissors: <Scissors size={16} />,
  Cross: <Cross size={16} />,
  Warehouse: <Warehouse size={16} />,
  Award: <Award size={16} />,
  FileText: <FileText size={16} />,
  Image: <Image size={16} />,
  Briefcase: <Briefcase size={16} />,
  Download: <Download size={16} />,
  HeadphonesIcon: <HeadphonesIcon size={16} />,
};

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-start justify-center pt-24 px-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="relative w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                <Search className="text-gray-400" size={20} />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search products, services, news…"
                  className="flex-1 text-lg bg-transparent outline-none text-gray-800 dark:text-white placeholder-gray-400"
                />
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="px-5 py-4">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-3">Quick Links</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Browse Products', href: '/products' },
                    { label: 'Our Services', href: '/services' },
                    { label: 'Latest News', href: '/news' },
                    { label: 'Contact Us', href: '/contact' },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={onClose}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const { isDark, toggle } = useDarkMode();
  const location = useLocation();
  const megaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMega(null);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary-800 dark:bg-primary-950 text-white text-xs py-2 hidden md:block">
        <div className="container-custom flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="tel:+97143621900" className="flex items-center gap-1.5 hover:text-primary-200 transition-colors">
              <Phone size={12} /> +971 4 362 1900
            </a>
            <a href="mailto:info@medisource-global.com" className="flex items-center gap-1.5 hover:text-primary-200 transition-colors">
              <Mail size={12} /> info@medisource-global.com
            </a>
          </div>
          <div className="flex items-center gap-1.5 text-primary-200">
            <MapPin size={12} /> Dubai Healthcare City, UAE
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-gray-950/95 backdrop-blur-md shadow-lg'
            : 'bg-white dark:bg-gray-950 shadow-sm'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 flex-shrink-0">
              <div className="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg font-heading">M</span>
              </div>
              <div>
                <div className="font-heading font-bold text-gray-900 dark:text-white text-lg leading-none">
                  MediSource
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 leading-none mt-0.5">
                  Global Distribution
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" ref={megaRef}>
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && setOpenMega(item.label)}
                  onMouseLeave={() => setOpenMega(null)}
                >
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                        isActive
                          ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                          : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`
                    }
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${openMega === item.label ? 'rotate-180' : ''}`}
                      />
                    )}
                  </NavLink>

                  {/* Mega Menu Dropdown */}
                  {item.children && (
                    <AnimatePresence>
                      {openMega === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-1 w-72 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50"
                        >
                          <div className="p-2">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                to={child.href}
                                className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 group transition-colors"
                              >
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-medium text-gray-800 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                    {child.label}
                                  </div>
                                  {child.description && (
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                                      {child.description}
                                    </div>
                                  )}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                aria-label="Open search"
              >
                <Search size={20} />
              </button>

              <button
                onClick={toggle}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <Link
                to="/contact"
                className="hidden md:flex btn-primary py-2 px-4 text-sm"
              >
                Get In Touch
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                aria-label="Toggle mobile menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40 lg:hidden top-[105px]"
                onClick={() => setMobileOpen(false)}
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                className="fixed top-[105px] right-0 bottom-0 w-80 bg-white dark:bg-gray-900 shadow-2xl z-50 lg:hidden overflow-y-auto"
              >
                <nav className="p-4 space-y-1">
                  {navItems.map((item) => (
                    <div key={item.label}>
                      {item.children ? (
                        <button
                          onClick={() =>
                            setMobileExpanded(
                              mobileExpanded === item.label ? null : item.label
                            )
                          }
                          className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
                        >
                          {item.label}
                          <ChevronDown
                            size={16}
                            className={`transition-transform ${mobileExpanded === item.label ? 'rotate-180' : ''}`}
                          />
                        </button>
                      ) : (
                        <Link
                          to={item.href}
                          className="flex px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
                        >
                          {item.label}
                        </Link>
                      )}

                      <AnimatePresence>
                        {item.children && mobileExpanded === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 mt-1 space-y-1">
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  to={child.href}
                                  className="flex flex-col px-4 py-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-colors"
                                >
                                  <span className="text-sm font-medium">{child.label}</span>
                                  {child.description && (
                                    <span className="text-xs text-gray-400 mt-0.5">{child.description}</span>
                                  )}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </nav>

                <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                  <Link to="/contact" className="btn-primary w-full justify-center">
                    Get In Touch
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
