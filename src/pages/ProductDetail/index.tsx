import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, CheckCircle, Tag, Package, Building2, Loader2, X } from 'lucide-react';
import { productsApi, type ApiProduct } from '@/services/publicApi';
import { products as staticProducts } from '@/data/products';
import { ErrorState } from '@/components/shared/StateComponents';
import PageBanner from '@/components/layout/PageBanner';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    productsApi.getBySlug(id)
      .then((res) => {
        setProduct(res.data.data);
        setActiveImg(0);
      })
      .catch(() => {
        // Try static data fallback
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const found = (staticProducts as any[]).find((p: any) => p.slug === id || p.id === id);
        if (found) setProduct(found as unknown as ApiProduct);
        else setNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <>
        <title>Product — MediSource Global</title>
        <div className="flex items-center justify-center py-40">
          <Loader2 size={40} className="animate-spin text-primary-600" />
        </div>
      </>
    );
  }

  if (notFound || !product) {
    return (
      <ErrorState
        title="Product Not Found"
        message="The product you are looking for does not exist."
        action={{ label: 'Browse Products', onClick: () => navigate('/products') }}
      />
    );
  }

  // Normalise fields from API or static data
  const brandName = typeof product.brand === 'object' && product.brand !== null
    ? (product.brand as { name: string }).name
    : (product.brand as string) ?? '';
  const categoryName = typeof product.category === 'object' && product.category !== null
    ? (product.category as { name: string }).name
    : (product.category as unknown as string) ?? '';
  const images = product.images ?? [];
  const primaryImg = images.find(i => i.isPrimary)?.url ?? images[0]?.url
    ?? `https://picsum.photos/seed/${product._id}/800/600`;
  const displayImg = images[activeImg]?.url ?? primaryImg;
  const specs = product.specifications ?? [];
  const tags = product.tags ?? [];

  return (
    <>
      <title>{product.name} — MediSource Global</title>
      <PageBanner
        title={product.name}
        subtitle={product.shortDescription ?? product.description?.slice(0, 120)}
        breadcrumbs={[
          { label: 'Products', href: '/products' },
          { label: product.name },
        ]}
      />

      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Images */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <div className="rounded-3xl overflow-hidden shadow-2xl mb-4">
                <img src={displayImg} alt={product.name} className="w-full h-96 object-cover" />
              </div>
              {images.length > 1 && (
                <div className="flex gap-3">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${i === activeImg ? 'border-primary-500 ring-2 ring-primary-200' : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'}`}
                    >
                      <img src={img.url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Details */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                {categoryName && (
                  <span className="badge bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400">
                    {categoryName}
                  </span>
                )}
                <span className={`badge ${product.inStock ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-50 text-red-600'}`}>
                  {product.inStock ? '✓ In Stock' : 'Out of Stock'}
                </span>
                {product.featured && (
                  <span className="badge bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">Featured</span>
                )}
              </div>

              <h1 className="font-heading font-bold text-2xl md:text-3xl text-gray-900 dark:text-white mb-2">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-5 text-sm text-gray-500 flex-wrap">
                {brandName && (
                  <span className="flex items-center gap-1.5">
                    <Building2 size={14} /> {brandName}
                  </span>
                )}
                {product.sku && (
                  <span className="flex items-center gap-1.5">
                    <Package size={14} /> <span className="font-mono text-xs">{product.sku}</span>
                  </span>
                )}
              </div>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {tags.map((tag) => (
                    <span key={tag} className="badge bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                      <Tag size={10} className="mr-1" />{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                <Link to="/contact" className="btn-primary">Request Quotation</Link>
                <Link to="/downloads" className="btn-secondary flex items-center gap-2">
                  <Download size={16} /> Product Literature
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Specifications Table */}
          {specs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="card p-8 mb-8"
            >
              <h2 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-6">Technical Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {specs.map((spec, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-4 py-3 px-4 ${i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900/50' : 'bg-white dark:bg-transparent'} rounded-lg`}
                  >
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 w-40 flex-shrink-0">
                      {spec.label}
                    </span>
                    <span className="text-sm text-gray-900 dark:text-white">{spec.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* CTA */}
          <div className="card p-8 bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 text-center mb-8">
            <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-2">Interested in This Product?</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-5 text-sm">Contact our team for pricing, availability, and regulatory documentation.</p>
            <div className="flex justify-center gap-3 flex-wrap">
              <Link to="/contact" className="btn-primary">Request a Quote</Link>
              <Link to="/products" className="btn-secondary">Browse More Products</Link>
            </div>
          </div>

          <button onClick={() => navigate(-1)} className="btn-ghost flex items-center gap-2">
            <ArrowLeft size={16} /> Back to Products
          </button>
        </div>
      </section>
    </>
  );
}
