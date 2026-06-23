import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Calendar, Clock, Tag, ArrowRight } from 'lucide-react';
import { newsArticles } from '@/data/news';
import PageBanner from '@/components/layout/PageBanner';
import { EmptyState } from '@/components/shared/StateComponents';
import { formatDateShort } from '@/utils';

const categories = ['All', 'Company News', 'Compliance', 'Business', 'Events', 'Technology', 'Sustainability'];

export default function NewsPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = newsArticles.filter((a) => {
    const matchesSearch =
      !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || a.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featured = newsArticles.find((a) => a.featured);

  return (
    <>
      <title>News & Events — MediSource Global</title>
      <PageBanner
        title="News & Events"
        subtitle="Latest updates, announcements, and industry insights from MediSource Global."
        breadcrumbs={[{ label: 'News' }]}
      />

      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-custom">
          {/* Featured Article */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <Link
                to={`/news/${featured.slug}`}
                className="group grid grid-cols-1 lg:grid-cols-2 gap-0 card overflow-hidden hover:-translate-y-1 transition-all duration-300 block"
              >
                <div className="relative h-64 lg:h-auto overflow-hidden">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="badge bg-primary-600 text-white">Featured</span>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <span className="badge bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400 w-fit mb-4">
                    {featured.category}
                  </span>
                  <h2 className="font-heading font-bold text-2xl text-gray-900 dark:text-white leading-snug mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-4 text-sm">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {formatDateShort(featured.publishedAt)}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {featured.readingTime} min read</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src={featured.authorImage} alt={featured.author} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{featured.author}</p>
                      <p className="text-xs text-gray-400">{featured.authorRole}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Search + Categories */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search articles…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary-50 hover:text-primary-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          {filtered.length === 0 ? (
            <EmptyState title="No articles found" message="Try a different search or category." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((article, i) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.06, 0.4), duration: 0.4 }}
                  className="card group hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="badge bg-primary-600 text-white text-xs">{article.category}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                      <span className="flex items-center gap-1"><Calendar size={11} /> {formatDateShort(article.publishedAt)}</span>
                      <span className="flex items-center gap-1"><Clock size={11} /> {article.readingTime} min</span>
                    </div>
                    <h3 className="font-heading font-semibold text-gray-900 dark:text-white text-base leading-snug mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                      <Link to={`/news/${article.slug}`}>{article.title}</Link>
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">{article.excerpt}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                      <div className="flex items-center gap-2">
                        <img src={article.authorImage} alt={article.author} className="w-6 h-6 rounded-full object-cover" />
                        <span className="text-xs text-gray-500 font-medium">{article.author}</span>
                      </div>
                      <Link to={`/news/${article.slug}`} className="text-primary-600 dark:text-primary-400 text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                        Read <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
