import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Tag, Share2, ExternalLink } from 'lucide-react';
import { newsArticles } from '@/data/news';
import { ErrorState } from '@/components/shared/StateComponents';
import { formatDate } from '@/utils';
import PageBanner from '@/components/layout/PageBanner';

export default function NewsDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const article = newsArticles.find((a) => a.slug === slug);
  const related = newsArticles.filter((a) => a.slug !== slug).slice(0, 3);

  if (!article) {
    return (
      <ErrorState
        title="Article Not Found"
        message="The article you're looking for doesn't exist."
        action={{ label: 'View All News', onClick: () => navigate('/news') }}
      />
    );
  }

  return (
    <>
      <title>{article.title} — MediSource Global</title>
      <PageBanner
        title={article.title}
        subtitle={article.excerpt}
        breadcrumbs={[
          { label: 'News', href: '/news' },
          { label: article.category, href: '/news' },
          { label: article.title.slice(0, 40) + '…' },
        ]}
      />

      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Article Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              {/* Meta */}
              <div className="flex items-center gap-4 mb-6 flex-wrap">
                <span className="badge bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400">
                  {article.category}
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-500">
                  <Calendar size={14} /> {formatDate(article.publishedAt)}
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock size={14} /> {article.readingTime} min read
                </span>
              </div>

              {/* Hero Image */}
              <div className="rounded-2xl overflow-hidden mb-8 shadow-xl">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-80 object-cover"
                />
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 mb-8 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                <img src={article.authorImage} alt={article.author} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{article.author}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{article.authorRole}</p>
                </div>
              </div>

              {/* Content */}
              <div
                className="prose prose-blue dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 leading-relaxed prose-headings:font-heading prose-headings:text-gray-900 dark:prose-headings:text-white prose-h2:text-xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-3"
                dangerouslySetInnerHTML={{
                  __html: article.content
                    .replace(/## (.+)/g, '<h2>$1</h2>')
                    .replace(/\n\n/g, '</p><p>')
                    .replace(/^(.+)/, '<p>$1')
                    + '</p>',
                }}
              />

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-gray-100 dark:border-gray-800">
                {article.tags.map((tag) => (
                  <span key={tag} className="badge bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                    <Tag size={10} className="mr-1" />{tag}
                  </span>
                ))}
              </div>

              {/* Share */}
              <div className="flex items-center gap-3 mt-6">
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Share:</span>
                <a href="#" aria-label="Share on LinkedIn" className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                  <ExternalLink size={16} />
                </a>
                <a href="#" aria-label="Share on X / Twitter" className="p-2 bg-sky-100 dark:bg-sky-900/30 text-sky-600 rounded-lg hover:bg-sky-200 transition-colors">
                  <Share2 size={16} />
                </a>
                <button aria-label="Copy link" className="p-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <Share2 size={16} />
                </button>
              </div>

              <button onClick={() => navigate(-1)} className="btn-ghost mt-8">
                <ArrowLeft size={16} /> Back to News
              </button>
            </motion.div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="card p-5">
                <h3 className="font-heading font-semibold text-gray-900 dark:text-white text-base mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {related.map((r) => (
                    <Link key={r.id} to={`/news/${r.slug}`} className="flex gap-3 group">
                      <img src={r.image} alt={r.title} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2 leading-snug">
                          {r.title}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">{formatDate(r.publishedAt, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="card p-5 bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800">
                <h3 className="font-heading font-semibold text-gray-900 dark:text-white text-base mb-2">Stay Updated</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Subscribe to our newsletter for the latest MediSource news.</p>
                <input type="email" placeholder="Your email" className="input-field mb-3 text-sm" />
                <button className="btn-primary w-full justify-center text-sm py-2.5">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
