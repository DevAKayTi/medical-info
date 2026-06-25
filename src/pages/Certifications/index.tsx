import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Shield, Award, Star, FileCheck, Globe, Loader2 } from 'lucide-react';
import { certificationsApi, type ApiCertification } from '@/services/publicApi';
import { certifications as staticCerts } from '@/data/certifications';
import PageBanner from '@/components/layout/PageBanner';
import SectionTitle from '@/components/shared/SectionTitle';
import { formatDateShort } from '@/utils';

const typeColors: Record<string, string> = {
  WHO:   'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
  ISO:   'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400',
  GMP:   'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400',
  CE:    'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400',
  Other: 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400',
  certification: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
  award: 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400',
  recognition: 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400',
};

const typeIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  WHO: Shield, ISO: FileCheck, GMP: Award, CE: Globe, Other: Star,
  certification: Shield, award: Award, recognition: Star,
};

export default function CertificationsPage() {
  const [certs, setCerts] = useState<ApiCertification[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCert, setSelectedCert] = useState<ApiCertification | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    certificationsApi.getAll({ limit: 100, status: 'valid' })
      .then((res) => setCerts(res.data.data))
      .catch(() => setCerts(staticCerts as unknown as ApiCertification[]))
      .finally(() => setLoading(false));
  }, []);

  const types = ['all', ...Array.from(new Set(certs.map((c) => c.type)))];
  const filtered = certs.filter((c) => activeFilter === 'all' || c.type === activeFilter);

  return (
    <>
      <title>Certifications & Awards — MediSource Global</title>
      <PageBanner
        title="Certifications & Awards"
        subtitle="Our compliance credentials and industry recognition reflecting our commitment to quality."
        breadcrumbs={[{ label: 'Certifications' }]}
      />

      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-custom">
          <SectionTitle
            tag="Our Credentials"
            title="Recognized for Excellence"
            subtitle="MediSource holds multiple international certifications confirming our commitment to pharmaceutical distribution quality and patient safety."
          />

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={36} className="animate-spin text-primary-600" />
            </div>
          ) : (
            <>
              {/* Filter Tabs */}
              <div className="flex gap-2 justify-center mt-8 mb-10 flex-wrap">
                {types.map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                      activeFilter === f
                        ? 'bg-primary-600 text-white shadow-md'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary-50 hover:text-primary-600'
                    }`}
                  >
                    {f === 'all' ? 'All' : f}
                  </button>
                ))}
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((cert, i) => {
                  const Icon = typeIcons[cert.type] ?? Shield;
                  const colorClass = typeColors[cert.type] ?? 'bg-gray-100 text-gray-600';
                  const imgUrl = cert.image?.url || `https://picsum.photos/seed/cert-${i}/800/600`;
                  return (
                    <motion.div
                      key={cert._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.4 }}
                      className="card group hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                      onClick={() => setSelectedCert(cert)}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img src={imgUrl} alt={cert.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                        <div className="absolute top-3 left-3">
                          <span className={`badge text-xs ${colorClass}`}>
                            <Icon size={10} className="mr-1" />{cert.type}
                          </span>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3">
                          <span className={`badge text-xs ${cert.status === 'valid' ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'}`}>
                            {cert.status === 'valid' ? '✓ Valid' : cert.status}
                          </span>
                        </div>
                      </div>

                      <div className="p-5">
                        <h3 className="font-heading font-semibold text-gray-900 dark:text-white text-base mb-1 leading-snug">{cert.name}</h3>
                        <p className="text-primary-600 dark:text-primary-400 text-xs font-medium mb-2">{cert.issuer}</p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-3">{cert.description}</p>
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span>Issued: {formatDateShort(cert.issueDate)}</span>
                          {cert.expiryDate && <span>Expires: {formatDateShort(cert.expiryDate)}</span>}
                        </div>
                        <button className="mt-3 text-xs font-semibold text-primary-600 dark:text-primary-400 hover:underline">
                          View Certificate →
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Certificate Detail Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            onClick={() => setSelectedCert(null)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors"
              >
                <X size={18} />
              </button>

              <img
                src={selectedCert.image?.url || `https://picsum.photos/seed/cert-modal/800/400`}
                alt={selectedCert.name}
                className="w-full h-64 object-cover rounded-t-3xl"
              />

              <div className="p-7">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`badge ${typeColors[selectedCert.type] ?? 'bg-gray-100'}`}>{selectedCert.type}</span>
                  <span className={`badge ${selectedCert.status === 'valid' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                    {selectedCert.status}
                  </span>
                </div>
                <h2 className="font-heading font-bold text-2xl text-gray-900 dark:text-white mb-2">{selectedCert.name}</h2>
                <p className="text-primary-600 dark:text-primary-400 font-semibold text-sm mb-4">{selectedCert.issuer}</p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-5">{selectedCert.description}</p>
                <div className="flex gap-6 text-sm mb-6">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Issue Date</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{formatDateShort(selectedCert.issueDate)}</p>
                  </div>
                  {selectedCert.expiryDate && (
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Expiry Date</p>
                      <p className="font-semibold text-green-600">{formatDateShort(selectedCert.expiryDate)}</p>
                    </div>
                  )}
                </div>
                <div className="flex gap-3">
                  {selectedCert.document?.url && (
                    <a href={selectedCert.document.url} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm flex items-center gap-2">
                      <Download size={15} /> Download Certificate
                    </a>
                  )}
                  <button onClick={() => setSelectedCert(null)} className="btn-secondary text-sm">Close</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
