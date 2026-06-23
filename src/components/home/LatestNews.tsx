import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { newsArticles } from '@/data/news';
import SectionTitle from '@/components/shared/SectionTitle';
import { formatDateShort, truncateText } from '@/utils';

export default function LatestNews() {
  const featured = newsArticles.slice(0, 3);

  return (
    <section className="section-padding bg-white dark:bg-gray-950">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <SectionTitle
            tag="News & Updates"
            title="Latest From MediSource"
            align="left"
          />
          <Link to="/news" className="btn-secondary flex-shrink-0">
            View All News <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((article, i) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="card group hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="badge bg-primary-600 text-white text-xs">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {formatDateShort(article.publishedAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {article.readingTime} min read
                  </span>
                </div>

                <h3 className="font-heading font-semibold text-gray-900 dark:text-white text-base leading-snug mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                  <Link to={`/news/${article.slug}`}>{article.title}</Link>
                </h3>

                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <img
                      src={article.authorImage}
                      alt={article.author}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      {article.author}
                    </span>
                  </div>
                  <Link
                    to={`/news/${article.slug}`}
                    className="text-primary-600 dark:text-primary-400 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Read <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
