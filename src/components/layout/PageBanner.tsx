import { motion } from 'framer-motion';
import Breadcrumb from './Breadcrumb';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBannerProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  backgroundImage?: string;
  badge?: string;
}

export default function PageBanner({
  title,
  subtitle,
  breadcrumbs = [],
  backgroundImage,
  badge,
}: PageBannerProps) {
  return (
    <section
      className="relative py-16 md:py-24 hero-gradient overflow-hidden"
      role="banner"
    >
      {/* Background image overlay */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-300/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container-custom relative z-10">
        {breadcrumbs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <Breadcrumb items={breadcrumbs} />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {badge && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary-400/20 text-primary-200 border border-primary-400/30 mb-4">
              {badge}
            </span>
          )}
          <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-4 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg text-primary-100 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
