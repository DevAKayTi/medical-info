import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { galleryApi, type ApiGallery } from '@/services/publicApi';
import { galleryImages as staticGallery } from '@/data/misc';
import PageBanner from '@/components/layout/PageBanner';

const CATEGORIES = ['All', 'facility', 'warehouse', 'event', 'team', 'product'];

export default function GalleryPage() {
  const [images, setImages] = useState<ApiGallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    galleryApi.getAll({ limit: 100 })
      .then((res) => setImages(res.data.data))
      .catch(() => setImages(staticGallery as unknown as ApiGallery[]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = images.filter(
    (img) => activeFilter === 'All' || img.category === activeFilter
  );

  const closeLightbox = () => setLightboxIndex(null);
  const prevImg = () => setLightboxIndex((i) => (i !== null ? (i > 0 ? i - 1 : filtered.length - 1) : null));
  const nextImg = () => setLightboxIndex((i) => (i !== null ? (i < filtered.length - 1 ? i + 1 : 0) : null));

  const getImgUrl = (img: ApiGallery, thumb = false) => {
    if (thumb && img.image?.thumbnail) return img.image.thumbnail;
    return img.image?.url ?? `https://picsum.photos/seed/${img._id}/800/600`;
  };

  return (
    <>
      <title>Gallery — MediSource Global</title>
      <PageBanner
        title="Photo Gallery"
        subtitle="A visual journey through MediSource's facilities, events, team, and operations."
        breadcrumbs={[{ label: 'Gallery' }]}
      />

      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-custom">
          {/* Category Filter */}
          <div className="flex gap-2 justify-center mb-10 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 capitalize ${
                  activeFilter === cat
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary-50 hover:text-primary-600'
                }`}
              >
                {cat === 'All' ? 'All Photos' : cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><Loader2 size={36} className="animate-spin text-primary-600" /></div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((img, i) => (
                <motion.div
                  key={img._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  className={`relative overflow-hidden rounded-2xl cursor-pointer group ${
                    i % 7 === 0 ? 'col-span-2 md:col-span-1' : ''
                  }`}
                  style={{ minHeight: i % 7 === 0 ? '300px' : '200px' }}
                  onClick={() => setLightboxIndex(i)}
                >
                  <img
                    src={getImgUrl(img, true)}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    style={{ minHeight: 'inherit' }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <ZoomIn size={28} className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-xs font-semibold truncate">{img.title}</p>
                    <p className="text-gray-300 text-xs capitalize">{img.category}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <X size={22} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prevImg(); }}
              className="absolute left-4 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <ChevronLeft size={24} />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="max-w-5xl max-h-[85vh] mx-16 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={getImgUrl(filtered[lightboxIndex])}
                alt={filtered[lightboxIndex].title}
                className="max-w-full max-h-[75vh] rounded-2xl object-contain shadow-2xl"
              />
              <div className="mt-4 text-center">
                <p className="text-white font-semibold text-lg">{filtered[lightboxIndex].title}</p>
                {filtered[lightboxIndex].description && (
                  <p className="text-gray-400 text-sm mt-1">{filtered[lightboxIndex].description}</p>
                )}
                <p className="text-gray-500 text-xs mt-1">{lightboxIndex + 1} / {filtered.length}</p>
              </div>
            </motion.div>

            <button
              onClick={(e) => { e.stopPropagation(); nextImg(); }}
              className="absolute right-4 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
