import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play, ChevronRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center hero-gradient overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-blue-300/10 rounded-full blur-3xl" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container-custom relative z-10 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 bg-primary-400/20 border border-primary-400/30 text-primary-200 text-xs font-semibold px-4 py-2 rounded-full mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Trusted by 3,200+ Healthcare Institutions
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading font-bold text-4xl md:text-5xl xl:text-6xl text-white leading-tight mb-6"
            >
              Delivering Quality{' '}
              <span className="relative">
                <span className="text-primary-300">Healthcare</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 8"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 6 Q50 2 100 6 Q150 10 200 6"
                    stroke="#93c5fd"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.7"
                  />
                </svg>
              </span>{' '}
              Supplies Worldwide
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-primary-100 leading-relaxed mb-8 max-w-lg"
            >
              MediSource Global is your premier pharmaceutical and medical distribution partner — 
              connecting leading manufacturers to healthcare institutions across 18 countries 
              with uncompromising quality and GDP-certified logistics.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Link to="/products" className="btn-primary bg-white text-primary-700 hover:bg-primary-50 shadow-xl">
                Browse Products <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="btn-secondary border-white/50 text-white hover:bg-white hover:text-primary-700">
                Get In Touch
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-6"
            >
              {[
                { value: '25+', label: 'Years' },
                { value: '18', label: 'Countries' },
                { value: '99.8%', label: 'Accuracy' },
                { value: '15K+', label: 'Products' },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="font-heading font-bold text-2xl text-white">{item.value}</div>
                  <div className="text-xs text-primary-300 font-medium">{item.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - Visual Panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&auto=format&fit=crop"
                  alt="Medical distribution warehouse"
                  className="w-full h-[480px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent" />

                {/* Floating video play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-16 h-16 bg-white/20 backdrop-blur-sm border border-white/40 rounded-full flex items-center justify-center hover:bg-white/30 transition-all group">
                    <Play size={22} className="text-white ml-1 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Floating stat card 1 */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -left-8 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-4 border border-gray-100 dark:border-gray-800"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <span className="text-green-600 text-lg">✓</span>
                  </div>
                  <div>
                    <div className="font-heading font-bold text-gray-900 dark:text-white text-lg leading-none">WHO GDP</div>
                    <div className="text-xs text-gray-500 mt-0.5">Certified Distributor</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating stat card 2 */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-6 -right-8 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-4 border border-gray-100 dark:border-gray-800"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                    <span className="text-primary-600 text-lg">🌍</span>
                  </div>
                  <div>
                    <div className="font-heading font-bold text-gray-900 dark:text-white text-lg leading-none">18 Countries</div>
                    <div className="text-xs text-gray-500 mt-0.5">Global network</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" className="w-full" preserveAspectRatio="none">
          <path d="M0 60L1440 60L1440 20C1200 55 960 0 720 30C480 60 240 10 0 40Z" className="fill-white dark:fill-gray-950" />
        </svg>
      </div>
    </section>
  );
}
