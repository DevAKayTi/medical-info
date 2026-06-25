import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Globe, Loader2 } from 'lucide-react';
import { brandsApi, partnersApi, type ApiBrand, type ApiPartner } from '@/services/publicApi';
import { brands as staticBrands, partners as staticPartners } from '@/data/certifications';
import PageBanner from '@/components/layout/PageBanner';
import SectionTitle from '@/components/shared/SectionTitle';

export default function BrandsPage() {
  const [brands, setBrands] = useState<ApiBrand[]>([]);
  const [partners, setPartners] = useState<ApiPartner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      brandsApi.getAll({ limit: 100, status: 'active' }),
      partnersApi.getAll({ limit: 100, status: 'active' }),
    ])
      .then(([brandRes, partnerRes]) => {
        setBrands(brandRes.data.data);
        setPartners(partnerRes.data.data);
      })
      .catch(() => {
        setBrands(staticBrands as unknown as ApiBrand[]);
        setPartners(staticPartners as unknown as ApiPartner[]);
      })
      .finally(() => setLoading(false));
  }, []);

  const featured = brands.filter((b) => b.featured);
  const all = brands;

  if (loading) {
    return (
      <>
        <title>Brands & Partners — MediSource Global</title>
        <PageBanner title="Brands & Partners" subtitle="Authorized distributor for the world's most trusted healthcare manufacturers." breadcrumbs={[{ label: 'Brands & Partners' }]} />
        <div className="flex items-center justify-center py-32"><Loader2 size={36} className="animate-spin text-primary-600" /></div>
      </>
    );
  }

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
            subtitle={`We are an authorized distributor for ${all.length}+ global healthcare brands across pharmaceuticals, medical devices, diagnostics, and surgical supplies.`}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {(featured.length > 0 ? featured : all).map((brand, i) => (
              <motion.div
                key={brand._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="card p-6 hover:-translate-y-1 transition-all duration-300 group"
              >
                {/* Logo */}
                <div className="h-20 flex items-center justify-start mb-5 gap-3">
                  {brand.logo?.url ? (
                    <div className="w-32 h-14 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center px-4 border border-gray-100 dark:border-gray-700 shadow-sm">
                      <img
                        src={brand.logo.url}
                        alt={brand.name}
                        className="max-w-full max-h-10 object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-32 h-12 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center px-4">
                      <span className="font-heading font-bold text-primary-600 dark:text-primary-400 text-xl tracking-tight">
                        {brand.name.split(' ').map(w => w[0]).join('').slice(0, 4)}
                      </span>
                    </div>
                  )}
                  {brand.featured && (
                    <span className="badge bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 text-xs">Featured</span>
                  )}
                </div>

                <h3 className="font-heading font-bold text-gray-900 dark:text-white text-xl mb-1">{brand.name}</h3>
                {brand.category && <p className="text-xs text-primary-600 dark:text-primary-400 font-medium mb-2">{brand.category}</p>}
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">{brand.description}</p>

                <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <Globe size={12} />
                    <span>{brand.country}</span>
                  </div>
                  {brand.website && (
                    <a
                      href={brand.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
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

      {/* Full Brand Name Grid */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="container-custom">
          <SectionTitle tag="Full Portfolio" title={`${all.length}+ Brand Partners`} />
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mt-10">
            {all.map((brand, i) => (
              <motion.div
                key={brand._id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03, duration: 0.3 }}
                className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-3 flex items-center justify-center text-center hover:border-primary-200 dark:hover:border-primary-800 transition-colors group"
              >
                {brand.logo?.url ? (
                  <img
                    src={brand.logo.url}
                    alt={brand.name}
                    className="max-h-8 max-w-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).parentElement!.innerHTML =
                        `<span class="text-xs font-semibold text-gray-500">${brand.name}</span>`;
                    }}
                  />
                ) : (
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-tight">
                    {brand.name}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      {partners.length > 0 && (
        <section className="section-padding bg-white dark:bg-gray-950">
          <div className="container-custom">
            <SectionTitle
              tag="Strategic Alliances"
              title="Our Strategic Partners"
              subtitle="Key partnerships that strengthen our logistics, technology, and quality assurance capabilities."
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-10">
              {partners.map((partner, i) => (
                <motion.a
                  key={partner._id}
                  href={partner.website ?? '#'}
                  target={partner.website ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className="card p-4 flex flex-col items-center text-center hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                >
                  {partner.logo?.url ? (
                    <div className="h-12 flex items-center justify-center mb-3">
                      <img
                        src={partner.logo.url}
                        alt={partner.name}
                        className="max-h-10 max-w-full object-contain"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <span className="font-heading font-bold text-primary-600 dark:text-primary-400 text-sm">
                        {partner.name.split(' ').map(w => w[0]).join('').slice(0, 3)}
                      </span>
                    </div>
                  )}
                  <h3 className="font-heading font-semibold text-gray-900 dark:text-white text-xs leading-snug group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {partner.name}
                  </h3>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
