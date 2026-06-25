import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Truck, Building2, Cross, Snowflake, Warehouse, Scissors, Shield, Activity, Loader2 } from 'lucide-react';
import { servicesApi, type ApiService } from '@/services/publicApi';
import { services as staticServices } from '@/data/services';
import PageBanner from '@/components/layout/PageBanner';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Truck, Building2, Cross, Snowflake, Warehouse, Scissors, Shield, Activity,
  // alias variants from seeded data
  Package: Truck, Thermometer: Snowflake, Building2, Scissors,
};

const gradients = [
  'from-blue-500 to-blue-700',
  'from-teal-500 to-teal-700',
  'from-indigo-500 to-indigo-700',
  'from-cyan-500 to-cyan-700',
  'from-violet-500 to-violet-700',
  'from-emerald-500 to-emerald-700',
];

export default function ServicesPage() {
  const [services, setServices] = useState<ApiService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    servicesApi.getAll({ limit: 50, status: 'active' })
      .then((res) => {
        const data = res.data.data;
        setServices([...data].sort((a, b) => (a.order ?? 99) - (b.order ?? 99)));
      })
      .catch(() => setServices(staticServices as unknown as ApiService[]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <title>Services — MediSource Global</title>
      <PageBanner
        title="Healthcare Distribution Services"
        subtitle="End-to-end solutions from primary distribution to specialized cold chain logistics."
        breadcrumbs={[{ label: 'Services' }]}
      />

      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-custom">
          {loading ? (
            <div className="flex justify-center py-20"><Loader2 size={36} className="animate-spin text-primary-600" /></div>
          ) : (
            <div className="space-y-12">
              {services.map((service, i) => {
                const Icon = iconMap[service.icon ?? ''] ?? Truck;
                const isReversed = i % 2 !== 0;
                const imgUrl = service.image?.url ?? `https://picsum.photos/seed/service-${i}/800/500`;

                return (
                  <motion.div
                    key={service._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5 }}
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-10 ${i > 0 ? 'border-t border-gray-100 dark:border-gray-800' : ''}`}
                  >
                    <div className={isReversed ? 'lg:order-2' : ''}>
                      <img src={imgUrl} alt={service.title} className="rounded-2xl w-full h-72 object-cover shadow-xl" />
                    </div>

                    <div className={isReversed ? 'lg:order-1' : ''}>
                      <div className={`w-14 h-14 bg-gradient-to-br ${gradients[i % gradients.length]} rounded-2xl flex items-center justify-center mb-5 shadow-lg`}>
                        <Icon size={26} className="text-white" />
                      </div>
                      <h2 className="font-heading font-bold text-2xl text-gray-900 dark:text-white mb-3">{service.title}</h2>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                        {service.excerpt ?? service.description?.slice(0, 200)}
                      </p>
                      {(service.features ?? []).length > 0 && (
                        <ul className="space-y-2 mb-6">
                          {(service.features ?? []).slice(0, 5).map((f, fi) => (
                            <li key={fi} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <span className="w-1.5 h-1.5 bg-primary-600 rounded-full flex-shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      )}
                      <Link to="/contact" className="btn-primary">
                        Enquire Now <ArrowRight size={16} />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 hero-gradient">
        <div className="container-custom text-center">
          <h2 className="font-heading font-bold text-3xl text-white mb-4">Ready to Optimize Your Supply Chain?</h2>
          <p className="text-primary-100 mb-8 max-w-xl mx-auto">
            Speak with our supply chain specialists to design the right distribution solution for your needs.
          </p>
          <Link to="/contact" className="btn-primary bg-white text-primary-700 hover:bg-primary-50">
            Schedule a Consultation <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
