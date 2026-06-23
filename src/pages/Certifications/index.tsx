import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink, Shield, Award, Star } from 'lucide-react';
import { certifications } from '@/data/certifications';
import PageBanner from '@/components/layout/PageBanner';
import SectionTitle from '@/components/shared/SectionTitle';
import { formatDateShort } from '@/utils';

const typeColors: Record<string, string> = {
  certification: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
  award: 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400',
  recognition: 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400',
};

const typeIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  certification: Shield,
  award: Award,
  recognition: Star,
};

export default function CertificationsPage() {
  const [selectedCert, setSelectedCert] = useState<typeof certifications[0] | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filters = ['all', 'certification', 'award', 'recognition'];

  const filtered = certifications.filter(
    (c) => activeFilter === 'all' || c.type === activeFilter
  );

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
            subtitle="MediSource holds multiple international certifications and has been recognized by industry bodies for outstanding performance in pharmaceutical distribution."
          />

          {/* Filter Tabs */}
          <div className="flex gap-2 justify-center mt-8 mb-10 flex-wrap">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 capitalize ${
                  activeFilter === f
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1) + 's'}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((cert, i) => {
              const Icon = typeIcons[cert.type] || Shield;
              return (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="card group hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedCert(cert)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={cert.image}
                      alt={cert.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className={`badge text-xs ${typeColors[cert.type]}`}>
                        <Icon size={10} className="mr-1" />
                        {cert.type.charAt(0).toUpperCase() + cert.type.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-heading font-semibold text-gray-900 dark:text-white text-base mb-1 leading-snug">
                      {cert.name}
                    </h3>
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
        </div>
      </section>

      {/* Certificate Preview Modal */}
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
                src={selectedCert.image}
                alt={selectedCert.name}
                className="w-full h-64 object-cover rounded-t-3xl"
              />

              <div className="p-7">
                <span className={`badge mb-3 ${typeColors[selectedCert.type]}`}>
                  {selectedCert.type.charAt(0).toUpperCase() + selectedCert.type.slice(1)}
                </span>
                <h2 className="font-heading font-bold text-2xl text-gray-900 dark:text-white mb-2">
                  {selectedCert.name}
                </h2>
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
                  {selectedCert.documentUrl && (
                    <a href={selectedCert.documentUrl} className="btn-primary text-sm">
                      <Download size={15} /> Download Certificate
                    </a>
                  )}
                  <button onClick={() => setSelectedCert(null)} className="btn-secondary text-sm">
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
