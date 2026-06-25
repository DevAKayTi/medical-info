import { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, X, CheckCircle, Tag, ArrowRight, Loader2 } from 'lucide-react';
import PageBanner from '@/components/layout/PageBanner';
import SectionTitle from '@/components/shared/SectionTitle';
import { EmptyState } from '@/components/shared/StateComponents';
import { productsApi, type ApiProduct, type ApiCategory } from '@/services/publicApi';

// Fallback static data in case API is unreachable
import { products as staticProducts, productCategories as staticCategories } from '@/data/products';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [inStockOnly, setInStockOnly] = useState(false);

  // API state
  const [apiProducts, setApiProducts] = useState<ApiProduct[]>([]);
  const [apiCategories, setApiCategories] = useState<ApiCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingStaticData, setUsingStaticData] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          productsApi.getAll({ limit: 200, status: 'active' }),
          productsApi.getCategories(),
        ]);
        setApiProducts(prodRes.data.data);
        // categories endpoint returns { data: [...] } (array directly)
        const cats = catRes.data.data ?? catRes.data as unknown as ApiCategory[];
        setApiCategories(Array.isArray(cats) ? cats : []);
      } catch {
        setUsingStaticData(true);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Unified data: real API or static fallback
  const products = usingStaticData
    ? staticProducts
    : apiProducts.map((p) => {
        // brand may be a populated object or a string ID
        const brandName = typeof p.brand === 'object' && p.brand !== null
          ? (p.brand as { name: string }).name
          : '';
        return {
          id: p._id,
          name: p.name,
          slug: p.slug,
          sku: p.sku ?? '',
          category: p.category?.name ?? '',
          categorySlug: p.category?.slug ?? '',
          brand: brandName,
          description: p.shortDescription ?? p.description,
          image: p.images?.find(i => i.isPrimary)?.url ?? p.images?.[0]?.url ?? '',
          inStock: p.inStock,
          featured: p.featured,
          tags: p.tags ?? [],
        };
      });

  const categories = usingStaticData
    ? staticCategories
    : apiCategories.map((c) => ({ id: c._id, name: c.name, slug: c.slug, count: c.productCount ?? 0 }));

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase()) ||
        (p.tags ?? []).some((t) => t.toLowerCase().includes(search.toLowerCase()));

      const slug = (p as { categorySlug?: string }).categorySlug ?? p.category.toLowerCase().replace(/\s+/g, '-');
      const matchesCategory = !selectedCategory || slug === selectedCategory || p.category.toLowerCase() === selectedCategory;

      const matchesStock = !inStockOnly || p.inStock;
      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [search, selectedCategory, inStockOnly, products]);

  const clearFilters = () => {
    setSearch(''); setSelectedCategory(''); setInStockOnly(false); setSearchParams({});
  };
  const hasFilters = search || selectedCategory || inStockOnly;

  if (loading) {
    return (
      <>
        <title>Products — MediSource Global</title>
        <PageBanner title="Our Product Portfolio" subtitle="Browse 15,000+ pharmaceutical and medical products." breadcrumbs={[{ label: 'Products' }]} />
        <div className="flex items-center justify-center py-32">
          <Loader2 size={36} className="animate-spin text-primary-600" />
        </div>
      </>
    );
  }

  return (
    <>
      <title>Products — MediSource Global</title>
      <PageBanner
        title="Our Product Portfolio"
        subtitle="Browse 15,000+ pharmaceutical and medical products from world-leading manufacturers."
        breadcrumbs={[{ label: 'Products' }]}
      />

      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-custom">
          {/* Search & Filter Bar */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-5 mb-10 flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search products, brands, categories…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field pl-10"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field md:w-52"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.slug}>{cat.name}</option>
              ))}
            </select>

            <label className="flex items-center gap-2 cursor-pointer flex-shrink-0">
              <div
                onClick={() => setInStockOnly(!inStockOnly)}
                className={`w-10 h-6 rounded-full transition-colors relative cursor-pointer ${inStockOnly ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${inStockOnly ? 'translate-x-5' : 'translate-x-1'}`} />
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-300 font-medium whitespace-nowrap">In Stock</span>
            </label>

            {hasFilters && (
              <button onClick={clearFilters} className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 font-medium flex-shrink-0">
                <X size={14} /> Clear Filters
              </button>
            )}
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Showing <span className="font-semibold text-gray-900 dark:text-white">{filtered.length}</span> of{' '}
              <span className="font-semibold">{products.length}</span> products
              {usingStaticData && <span className="ml-2 text-xs text-amber-500">(demo data)</span>}
            </p>
            {hasFilters && selectedCategory && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="badge bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400 flex items-center gap-1">
                  <Tag size={11} /> {categories.find(c => c.slug === selectedCategory)?.name || selectedCategory}
                  <button onClick={() => setSelectedCategory('')} className="ml-1"><X size={11} /></button>
                </span>
              </div>
            )}
          </div>

          {/* Product Grid */}
          {filtered.length === 0 ? (
            <EmptyState
              title="No products found"
              message="Try adjusting your search terms or removing filters."
              action={{ label: 'Clear Filters', onClick: clearFilters }}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.05, 0.4), duration: 0.4 }}
                >
                  <Link
                    to={`/products/${(product as { slug?: string }).slug ?? product.id}`}
                    className="card group flex flex-col h-full hover:-translate-y-1 transition-all duration-300 block"
                  >
                    <div className="relative overflow-hidden h-48">
                      <img
                        src={product.image || `https://picsum.photos/seed/${product.id}/400/300`}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 flex gap-1.5">
                        <span className="badge bg-primary-600 text-white text-xs">{product.category}</span>
                        {!product.inStock && (
                          <span className="badge bg-red-100 text-red-700 text-xs">Out of Stock</span>
                        )}
                      </div>
                    </div>

                    <div className="p-4 flex flex-col flex-1">
                      <p className="text-xs text-gray-400 dark:text-gray-500 mb-1 font-medium">{product.brand}</p>
                      <h3 className="font-heading font-semibold text-gray-900 dark:text-white text-sm leading-snug mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors flex-1">
                        {product.name}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed mb-3 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-1 text-xs">
                          {product.inStock ? (
                            <><CheckCircle size={12} className="text-green-500" /><span className="text-green-600 font-medium">In Stock</span></>
                          ) : (
                            <span className="text-red-500 font-medium">Out of Stock</span>
                          )}
                        </div>
                        <span className="text-primary-600 dark:text-primary-400 text-xs font-semibold flex items-center gap-0.5 group-hover:gap-1.5 transition-all">
                          Details <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
