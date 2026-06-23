import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Pill, Activity, Scissors, FlaskConical, Shield, Building2 } from 'lucide-react';
import { productCategories } from '@/data/products';
import SectionTitle from '@/components/shared/SectionTitle';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Pill, Activity, Scissors, FlaskConical, Shield, Building2,
};

export default function ProductCategories() {
  return (
    <section className="section-padding bg-gray-50 dark:bg-gray-900/50">
      <div className="container-custom">
        <SectionTitle
          tag="Product Categories"
          title="Our Comprehensive Product Range"
          subtitle="From essential pharmaceuticals to advanced medical devices, we source and distribute 15,000+ products from world-leading manufacturers."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {productCategories.map((cat, i) => {
            const Icon = iconMap[cat.icon] || Pill;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link
                  to={`/products?category=${cat.slug}`}
                  className="group block relative overflow-hidden rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent" />

                    {/* Icon Badge */}
                    <div className="absolute top-4 left-4 w-10 h-10 bg-white/90 dark:bg-gray-900/90 rounded-xl flex items-center justify-center shadow-md">
                      <Icon size={20} className="text-primary-600" />
                    </div>

                    {/* Count */}
                    <div className="absolute top-4 right-4 bg-primary-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      {cat.count.toLocaleString()}+ SKUs
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-heading font-bold text-white text-xl mb-1">{cat.name}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">{cat.description}</p>
                    <div className="mt-3 flex items-center gap-1 text-primary-300 text-sm font-medium group-hover:gap-2 transition-all">
                      Browse Category <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link to="/products" className="btn-primary">
            View All Products <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
