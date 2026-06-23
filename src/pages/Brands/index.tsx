import { motion } from 'framer-motion';
import { ExternalLink, Globe } from 'lucide-react';
import { brands, partners } from '@/data/certifications';
import PageBanner from '@/components/layout/PageBanner';
import SectionTitle from '@/components/shared/SectionTitle';

export default function BrandsPage() {
  return (
    <>
      <title>Brands & Partners — MediSource Global</title>
      <PageBanner
        title="Brands & Partners"
        subtitle="Authorized distributor for the world's most trusted pharmaceutical and medical device manufacturers."
        breadcrumbs={[{ label: 'Brands & Partners' }]}
      />

      {/* Featured Brands */}
      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-custom">
          <SectionTitle
            tag="Brand Portfolio"
            title="Our Manufacturing Partners"
            subtitle="We are an authorized distributor for 80+ global healthcare brands across pharmaceuticals, medical devices, diagnostics, and surgical supplies."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {brands.map((brand, i) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="card p-6 hover:-translate-y-1 transition-all duration-300 group"
              >
                {/* Logo area */}
                <div className="h-20 flex items-center justify-start mb-5">
                  <div className="w-32 h-12 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center px-4">
                    <span className="font-heading font-bold text-primary-600 dark:text-primary-400 text-xl tracking-tight">
                      {brand.name.split(' ').map(w => w[0]).join('').slice(0, 4)}
                    </span>
                  </div>
                  {brand.featured && (
                    <span className="ml-3 badge bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 text-xs">
                      Featured
                    </span>
                  )}
                </div>

                <h3 className="font-heading font-bold text-gray-900 dark:text-white text-xl mb-1">{brand.name}</h3>
                <p className="text-xs text-primary-600 dark:text-primary-400 font-medium mb-2">{brand.category}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">{brand.description}</p>

                <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <Globe size={12} />
                    <span>{brand.country}</span>
                    {brand.since && <span className="text-gray-300 dark:text-gray-600">·</span>}
                    {brand.since && <span>Partner since {brand.since}</span>}
                  </div>
                  {brand.website && (
                    <a href={brand.website} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1 text-primary-600 dark:text-primary-400 hover:underline font-medium"
                    >
                      Website <ExternalLink size={10} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Logo Grid */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="container-custom">
          <SectionTitle tag="Full Portfolio" title="80+ Brand Partners" />
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mt-10">
            {[
              'Pfizer','Abbott','J&J','Roche','Siemens','BD','Medtronic','Baxter',
              'Novartis','AstraZeneca','Sanofi','GlaxoSmithKline','Merck','Bayer',
              'Stryker','Boston Scientific','3M Medical','Olympus','Philips','Braun',
              'Fresenius','Hospira','Cipla','Sun Pharma','Lupin','Dr. Reddy\'s',
            ].map((name, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03, duration: 0.3 }}
                className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-3 flex items-center justify-center text-center hover:border-primary-200 dark:hover:border-primary-800 transition-colors group"
              >
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-tight">
                  {name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Partners */}
      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-custom">
          <SectionTitle
            tag="Strategic Alliances"
            title="Our Strategic Partners"
            subtitle="Key partnerships that strengthen our logistics, technology, and quality assurance capabilities."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {partners.map((partner, i) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="card p-6 text-center hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="font-heading font-bold text-primary-600 dark:text-primary-400 text-xl">
                    {partner.name.split(' ').map(w => w[0]).join('').slice(0, 3)}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-gray-900 dark:text-white text-base mb-1">{partner.name}</h3>
                <span className="badge bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 text-xs mb-3 capitalize">
                  {partner.type}
                </span>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{partner.description}</p>
                {partner.since && (
                  <p className="text-xs text-gray-400 mt-3">Partner since {partner.since}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
