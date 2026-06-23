import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Building2, Package, Award, Book } from 'lucide-react';
import { downloads } from '@/data/misc';
import PageBanner from '@/components/layout/PageBanner';
import SectionTitle from '@/components/shared/SectionTitle';
import { formatDateShort } from '@/utils';

const categoryConfig: Record<string, { label: string; icon: React.ComponentType<{ size?: number; className?: string }>; color: string }> = {
  'company-profile': { label: 'Company Profile', icon: Building2, color: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' },
  'product-catalog': { label: 'Product Catalog', icon: Package, color: 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400' },
  'certificate': { label: 'Certificate', icon: Award, color: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' },
  'brochure': { label: 'Brochure', icon: FileText, color: 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400' },
  'other': { label: 'Other', icon: Book, color: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300' },
};

const filters = ['All', 'company-profile', 'product-catalog', 'certificate', 'brochure', 'other'];

export default function DownloadsPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = downloads.filter(
    (d) => activeFilter === 'All' || d.category === activeFilter
  );

  return (
    <>
      <title>Downloads — MediSource Global</title>
      <PageBanner
        title="Downloads & Resources"
        subtitle="Download company profiles, product catalogs, certificates, and brochures."
        breadcrumbs={[{ label: 'Downloads' }]}
      />

      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-custom">
          <SectionTitle
            tag="Resource Center"
            title="Access Our Documents"
            subtitle="All documents are provided in PDF format. Last updated dates are shown on each document card."
          />

          {/* Filter */}
          <div className="flex gap-2 justify-center flex-wrap mt-8 mb-10">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all capitalize ${
                  activeFilter === f
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary-50 hover:text-primary-600'
                }`}
              >
                {f === 'All' ? 'All Files' : categoryConfig[f]?.label || f}
              </button>
            ))}
          </div>

          {/* Downloads Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item, i) => {
              const config = categoryConfig[item.category];
              const Icon = config?.icon || FileText;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  className="card p-5 hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${config?.color || 'bg-gray-100 text-gray-600'}`}>
                      <Icon size={22} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-semibold text-gray-900 dark:text-white text-sm leading-snug mb-1">
                        {item.title}
                      </h3>
                      <span className={`badge text-xs ${config?.color}`}>
                        {config?.label}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 flex-1">
                    {item.description}
                  </p>

                  <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <FileText size={11} /> {item.fileType} · {item.fileSize}
                      </span>
                      <span>Updated: {formatDateShort(item.updatedAt)}</span>
                    </div>
                    {item.downloads && (
                      <p className="text-xs text-gray-400 mb-3">
                        {item.downloads.toLocaleString()} downloads
                      </p>
                    )}
                    <a
                      href={item.fileUrl}
                      className="btn-primary w-full justify-center text-sm py-2.5"
                    >
                      <Download size={15} /> Download {item.fileType}
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
