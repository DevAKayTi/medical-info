import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, CheckCircle, Tag, Package, Building2, ChevronRight } from 'lucide-react';
import { products } from '@/data/products';
import { ErrorState } from '@/components/shared/StateComponents';
import PageBanner from '@/components/layout/PageBanner';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <ErrorState
        title="Product Not Found"
        message="The product you are looking for does not exist."
        action={{ label: 'Browse Products', onClick: () => navigate('/products') }}
      />
    );
  }

  return (
    <>
      <title>{product.name} — MediSource Global</title>
      <PageBanner
        title={product.name}
        subtitle={product.description}
        breadcrumbs={[
          { label: 'Products', href: '/products' },
          { label: product.name },
        ]}
      />

      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Images */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-96 object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, i) => (
                    <div key={i} className="w-20 h-20 rounded-xl overflow-hidden border-2 border-primary-200 dark:border-primary-800 cursor-pointer">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className="badge bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400">
                  {product.category}
                </span>
                {product.subcategory && (
                  <span className="badge bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                    {product.subcategory}
                  </span>
                )}
                <span className={`badge ${product.inStock ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-50 text-red-600'}`}>
                  {product.inStock ? '✓ In Stock' : 'Out of Stock'}
                </span>
              </div>

              <h1 className="font-heading font-bold text-2xl md:text-3xl text-gray-900 dark:text-white mb-2">
                {product.name}
              </h1>

              <div className="flex items-center gap-2 mb-5 text-sm text-gray-500">
                <Building2 size={14} /> <span>{product.brand}</span>
                <span className="text-gray-300 dark:text-gray-700">|</span>
                <Package size={14} /> <span className="font-mono text-xs">{product.sku}</span>
              </div>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                {product.longDescription}
              </p>

              {/* Key Features */}
              <div className="mb-6">
                <h3 className="font-heading font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wider mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle size={15} className="text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Certifications */}
              <div className="mb-6">
                <h3 className="font-heading font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wider mb-3">Certifications</h3>
                <div className="flex flex-wrap gap-2">
                  {product.certifications.map((cert) => (
                    <span key={cert} className="badge bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {product.tags.map((tag) => (
                  <span key={tag} className="badge bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                    <Tag size={10} className="mr-1" />{tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                <Link to="/contact" className="btn-primary">
                  Request Quotation
                </Link>
                {product.brochureUrl && (
                  <a href={product.brochureUrl} className="btn-secondary flex items-center gap-2">
                    <Download size={16} /> Download Brochure
                  </a>
                )}
              </div>
            </motion.div>
          </div>

          {/* Specifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card p-8"
          >
            <h2 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-6">
              Technical Specifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {product.specifications.map((spec, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-4 py-3 px-4 ${
                    i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900/50' : 'bg-white dark:bg-transparent'
                  } rounded-lg`}
                >
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 w-40 flex-shrink-0">{spec.label}</span>
                  <span className="text-sm text-gray-900 dark:text-white">{spec.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Back button */}
          <div className="mt-8">
            <button
              onClick={() => navigate(-1)}
              className="btn-ghost flex items-center gap-2"
            >
              <ArrowLeft size={16} /> Back to Products
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
