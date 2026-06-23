import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Truck, Building2, Cross, Snowflake, Warehouse } from 'lucide-react';
import { services } from '@/data/services';
import SectionTitle from '@/components/shared/SectionTitle';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Truck, Building2, Cross, Snowflake, Warehouse,
};

const colorMap = [
  'from-blue-500 to-blue-700',
  'from-teal-500 to-teal-700',
  'from-indigo-500 to-indigo-700',
  'from-cyan-500 to-cyan-700',
  'from-violet-500 to-violet-700',
];

export default function ServicesOverview() {
  return (
    <section className="section-padding bg-white dark:bg-gray-950">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <SectionTitle
            tag="Our Services"
            title="End-to-End Healthcare Distribution Solutions"
            align="left"
          />
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
            From cold chain logistics to hospital supply management, MediSource offers a full suite 
            of healthcare distribution services designed to keep critical medical supplies flowing 
            reliably to healthcare facilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.slice(0, 5).map((svc, i) => {
            const Icon = iconMap[svc.icon] || Truck;
            const gradient = colorMap[i % colorMap.length];
            return (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={i === 4 ? 'md:col-span-2 lg:col-span-1' : ''}
              >
                <Link
                  to={`/services/${svc.slug}`}
                  className="group card p-6 flex flex-col h-full hover:-translate-y-1 transition-all duration-300 block"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={26} className="text-white" />
                  </div>
                  <h3 className="font-heading font-bold text-gray-900 dark:text-white text-xl mb-3">
                    {svc.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed flex-1 mb-4">
                    {svc.description}
                  </p>
                  {svc.stats && (
                    <div className="grid grid-cols-3 gap-2 py-4 border-t border-gray-100 dark:border-gray-800 mb-4">
                      {svc.stats.map((s) => (
                        <div key={s.label} className="text-center">
                          <div className="font-heading font-bold text-primary-600 dark:text-primary-400 text-sm">
                            {s.value}
                          </div>
                          <div className="text-xs text-gray-400 mt-0.5 leading-tight">{s.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 text-primary-600 dark:text-primary-400 text-sm font-semibold group-hover:gap-2.5 transition-all">
                    Learn More <ArrowRight size={14} />
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
          <Link to="/services" className="btn-secondary">
            View All Services <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
