import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Tag, Share2, ExternalLink, Loader2 } from 'lucide-react';
import { newsApi, type ApiNews } from '@/services/publicApi';
import { newsArticles as staticNews } from '@/data/news';
import { ErrorState } from '@/components/shared/StateComponents';
import { formatDate } from '@/utils';
import PageBanner from '@/components/layout/PageBanner';

// Simple markdown → HTML for article content
function renderContent(md: string): string {
  return md
    .replace(/### (.+)/g, '<h3 class="text-lg font-bold mt-6 mb-2 text-gray-900 dark:text-white">$1</h3>')
    .replace(/## (.+)/g, '<h2 class="text-xl font-bold mt-8 mb-3 text-gray-900 dark:text-white">$1</h2>')
    .replace(/# (.+)/g, '<h1 class="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono">$1</code>')
    .replace(/\|(.+)\|/g, (row) => {
      const cells = row.split('|').filter(Boolean).map(c => c.trim());
      return '<tr>' + cells.map(c => `<td class="border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm">${c}</td>`).join('') + '</tr>';
    })
    .replace(/^- (.+)$/gm, '<li class="flex gap-2"><span class="text-primary-500 mt-1">•</span><span>$1</span></li>')
    .replace(/(<li[^>]*>.*<\/li>\n?)+/gs, (list) => `<ul class="space-y-1 mb-4">${list}</ul>`)
    .replace(/\n\n/g, '</p><p class="mb-4">')
    .replace(/^(?!<)(.+)/, '<p class="mb-4">$1')
    + '</p>';
}

export default function NewsDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [article, setArticle] = useState<ApiNews | null>(null);
  const [related, setRelated] = useState<ApiNews[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    Promise.all([
      newsApi.getBySlug(slug),
      newsApi.getAll({ limit: 4, status: 'published' }),
    ])
      .then(([articleRes, allRes]) => {
        setArticle(articleRes.data.data);
        setRelated(allRes.data.data.filter((a) => a.slug !== slug).slice(0, 3));
      })
      .catch(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const found = (staticNews as any[]).find((a: any) => a.slug === slug);
        if (found) {
          setArticle(found as unknown as ApiNews);
          setRelated((staticNews as unknown as ApiNews[]).filter((a) => a.slug !== slug).slice(0, 3));
        } else {
          setNotFound(true);
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <>
        <title>Loading… — MediSource Global</title>
        <div className="flex items-center justify-center py-40">
          <Loader2 size={40} className="animate-spin text-primary-600" />
        </div>
      </>
    );
  }

  if (notFound || !article) {
    return (
      <ErrorState
        title="Article Not Found"
        message="The article you're looking for doesn't exist."
        action={{ label: 'View All News', onClick: () => navigate('/news') }}
      />
    );
  }

  const coverImg = article.coverImage?.url
    ?? `https://picsum.photos/seed/${article.slug}/800/600`;
  const authorName = typeof article.author === 'object' && article.author !== null
    ? (article.author as { name: string }).name
    : 'MediSource Editorial';
  const authorAvatar = typeof article.author === 'object' && article.author !== null
    ? (article.author as { avatar?: { url: string } }).avatar?.url ?? ''
    : '';
  const publishedDate = article.publishedAt ?? article.createdAt;
  const readMins = article.readingTime ?? Math.max(1, Math.ceil((article.content?.length ?? 500) / 1000));

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
              {/* Meta badges */}
              <div className="flex items-center gap-4 mb-6 flex-wrap">
                <span className="badge bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400">
                  {article.category}
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-500">
                  <Calendar size={14} /> {formatDate(publishedDate)}
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock size={14} /> {readMins} min read
                </span>
                {(article.views ?? 0) > 0 && (
                  <span className="text-xs text-gray-400">{article.views} views</span>
                )}
              </div>

              {/* Hero Image */}
              <div className="rounded-2xl overflow-hidden mb-8 shadow-xl">
                <img src={coverImg} alt={article.title} className="w-full h-80 object-cover" />
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 mb-8 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                <img
                  src={authorAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=0ea5e9&color=fff`}
                  alt={authorName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{authorName}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">MediSource Editorial Team</p>
                </div>
              </div>

              {/* Content */}
              <div
                className="prose prose-blue dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: renderContent(article.content ?? '') }}
              />

              {/* Tags */}
              {(article.tags ?? []).length > 0 && (
                <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-gray-100 dark:border-gray-800">
                  {(article.tags ?? []).map((tag) => (
                    <span key={tag} className="badge bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                      <Tag size={10} className="mr-1" />{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Share */}
              <div className="flex items-center gap-3 mt-6">
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Share:</span>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                  target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn"
                  className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <ExternalLink size={16} />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank" rel="noopener noreferrer" aria-label="Share on X"
                  className="p-2 bg-sky-100 dark:bg-sky-900/30 text-sky-600 rounded-lg hover:bg-sky-200 transition-colors"
                >
                  <Share2 size={16} />
                </a>
                <button
                  onClick={() => navigator.clipboard?.writeText(window.location.href)}
                  aria-label="Copy link"
                  className="p-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-xs font-medium px-3"
                >
                  Copy Link
                </button>
              </div>

              <button onClick={() => navigate(-1)} className="btn-ghost mt-8 flex items-center gap-2">
                <ArrowLeft size={16} /> Back to News
              </button>
            </motion.div>

            {/* Sidebar */}
            <div className="space-y-6">
              {related.length > 0 && (
                <div className="card p-5">
                  <h3 className="font-heading font-semibold text-gray-900 dark:text-white text-base mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {related.map((r) => (
                      <Link key={r._id} to={`/news/${r.slug}`} className="flex gap-3 group">
                        <img
                          src={r.coverImage?.url ?? `https://picsum.photos/seed/${r.slug}/200/200`}
                          alt={r.title}
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2 leading-snug">
                            {r.title}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {formatDate(r.publishedAt ?? r.createdAt, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="card p-5 bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800">
                <h3 className="font-heading font-semibold text-gray-900 dark:text-white text-base mb-2">Need More Info?</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Contact our team for partnership enquiries, media requests, or product information.
                </p>
                <Link to="/contact" className="btn-primary w-full justify-center text-sm py-2.5">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
