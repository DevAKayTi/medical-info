import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, TrendingUp, ArrowRight } from 'lucide-react';
import { Truck, Building2, Cross, Snowflake, Warehouse } from 'lucide-react';
import { services } from '@/data/services';
import PageBanner from '@/components/layout/PageBanner';
import SectionTitle from '@/components/shared/SectionTitle';
import { ErrorState } from '@/components/shared/StateComponents';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Truck, Building2, Cross, Snowflake, Warehouse,
};

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <ErrorState
        title="Service Not Found"
        message="The service you're looking for doesn't exist."
        action={{ label: 'View All Services', onClick: () => navigate('/services') }}
      />
    );
  }

  const Icon = iconMap[service.icon] || Truck;

  return (
    <>
      <title>{service.title} — MediSource Global</title>
      <PageBanner
        title={service.title}
        subtitle={service.description}
        breadcrumbs={[
          { label: 'Services', href: '/services' },
          { label: service.title },
        ]}
      />

      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-16">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <img
                src={service.image}
                alt={service.title}
                className="rounded-3xl w-full h-[420px] object-cover shadow-2xl"
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mb-6">
                <Icon size={30} className="text-primary-600" />
              </div>

              <h2 className="font-heading font-bold text-2xl md:text-3xl text-gray-900 dark:text-white mb-4">
                {service.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                {service.longDescription}
              </p>

              {service.stats && (
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {service.stats.map((stat) => (
                    <div key={stat.label} className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-4 text-center">
                      <div className="font-heading font-bold text-xl text-primary-600 dark:text-primary-400">{stat.value}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-tight">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}

              <Link to="/contact" className="btn-primary">
                Enquire About This Service <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card p-8"
          >
            <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-6">
              Service Features & Capabilities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {service.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <CheckCircle size={18} className="text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Other services */}
          <div className="mt-14">
            <SectionTitle tag="Other Services" title="Explore More Services" align="left" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              {services
                .filter((s) => s.slug !== slug)
                .slice(0, 4)
                .map((s) => {
                  const OtherIcon = iconMap[s.icon] || Truck;
                  return (
                    <Link
                      key={s.id}
                      to={`/services/${s.slug}`}
                      className="card p-4 flex items-start gap-3 hover:-translate-y-1 transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                        <OtherIcon size={18} className="text-primary-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{s.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{s.description}</p>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>

          <button onClick={() => navigate(-1)} className="btn-ghost mt-8">
            <ArrowLeft size={16} /> Back to Services
          </button>
        </div>
      </section>
    </>
  );
}
