import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Building2, Package, Award, Book, Loader2, Search } from 'lucide-react';
import { downloadsApi, type ApiDownload } from '@/services/publicApi';
import { downloads as staticDownloads } from '@/data/misc';
import PageBanner from '@/components/layout/PageBanner';
import SectionTitle from '@/components/shared/SectionTitle';
import { formatDateShort } from '@/utils';

const categoryConfig: Record<string, { label: string; icon: React.ComponentType<{ size?: number; className?: string }>; color: string }> = {
  'Corporate':     { label: 'Corporate',    icon: Building2, color: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' },
  'Catalogue':     { label: 'Catalogue',    icon: Package,   color: 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400' },
  'Certificates':  { label: 'Certificate',  icon: Award,     color: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' },
  'Quality':       { label: 'Quality',      icon: FileText,  color: 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400' },
  'Guidelines':    { label: 'Guidelines',   icon: Book,      color: 'bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400' },
  // static data compat
  'company-profile': { label: 'Company Profile', icon: Building2, color: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' },
  'product-catalog':  { label: 'Product Catalog', icon: Package, color: 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400' },
  'certificate':   { label: 'Certificate',  icon: Award,     color: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' },
  'brochure':      { label: 'Brochure',     icon: FileText,  color: 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400' },
  'other':         { label: 'Other',        icon: Book,      color: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300' },
};

export default function DownloadsPage() {
  const [items, setItems] = useState<ApiDownload[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    downloadsApi.getAll({ limit: 100, status: 'active' })
      .then((res) => setItems(res.data.data))
      .catch(() => setItems(staticDownloads as unknown as ApiDownload[]))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', ...Array.from(new Set(items.map((d) => d.category)))];

  const filtered = items.filter((d) => {
    const matchesCat = activeFilter === 'All' || d.category === activeFilter;
    const matchesSearch = !search ||
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      (d.description ?? '').toLowerCase().includes(search.toLowerCase()) ||
      (d.tags ?? []).some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const formatSize = (bytes?: number) => {
    if (!bytes) return 'PDF';
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <>
      <title>Downloads & Resources — MediSource Global</title>
      <PageBanner
        title="Downloads & Resources"
        subtitle="Download company profiles, product catalogues, certificates, and guidelines."
        breadcrumbs={[{ label: 'Downloads' }]}
      />

      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-custom">
          <SectionTitle
            tag="Resource Center"
            title="Access Our Documents"
            subtitle="All documents are provided in PDF format and are freely available for download."
          />

          {/* Search + Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 mb-10">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search documents…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field pl-9"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    activeFilter === f
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary-50 hover:text-primary-600'
                  }`}
                >
                  {f === 'All' ? 'All Files' : categoryConfig[f]?.label ?? f}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><Loader2 size={36} className="animate-spin text-primary-600" /></div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-gray-400 py-20">No documents found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((item, i) => {
                const config = categoryConfig[item.category];
                const Icon = config?.icon ?? FileText;
                return (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="card p-5 hover:-translate-y-1 transition-all duration-300 flex flex-col"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${config?.color ?? 'bg-gray-100 text-gray-600'}`}>
                        <Icon size={22} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-heading font-semibold text-gray-900 dark:text-white text-sm leading-snug mb-1">{item.title}</h3>
                        <span className={`badge text-xs ${config?.color ?? 'bg-gray-100 text-gray-600'}`}>
                          {config?.label ?? item.category}
                        </span>
                      </div>
                    </div>

                    {item.description && (
                      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 flex-1">{item.description}</p>
                    )}

                    {(item.tags ?? []).length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {(item.tags ?? []).slice(0, 3).map((tag) => (
                          <span key={tag} className="badge bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 text-xs">{tag}</span>
                        ))}
                      </div>
                    )}

                    <div className="pt-4 border-t border-gray-100 dark:border-gray-800 mt-auto">
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                        <span className="flex items-center gap-1">
                          <FileText size={11} /> PDF · {formatSize(item.file?.size)}
                        </span>
                        {item.downloadCount && (
                          <span>{item.downloadCount.toLocaleString()} downloads</span>
                        )}
                      </div>
                      <a
                        href={item.file?.url ?? '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary w-full justify-center text-sm py-2.5 flex items-center gap-2"
                      >
                        <Download size={15} /> Download PDF
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
