import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search, MapPin, Briefcase, Clock, Star, ArrowRight,
  DollarSign, Heart, GraduationCap, Globe, TrendingUp, Loader2
} from 'lucide-react';
import { careerBenefits, jobs as staticJobs } from '@/data/misc';
import { careersApi, type ApiJob } from '@/services/publicApi';
import PageBanner from '@/components/layout/PageBanner';
import SectionTitle from '@/components/shared/SectionTitle';
import { EmptyState } from '@/components/shared/StateComponents';
import { formatDateShort } from '@/utils';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  DollarSign, Heart, GraduationCap, Clock, TrendingUp, Globe,
};

const typeColors: Record<string, string> = {
  'full-time': 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400',
  'part-time': 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
  'contract': 'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400',
  'internship': 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400',
};

const departments = ['All', 'Commercial', 'Operations', 'Technology', 'Quality Assurance', 'Finance'];

export default function CareersPage() {
  const [search, setSearch] = useState('');
  const [activeDept, setActiveDept] = useState('All');
  const [apiJobs, setApiJobs] = useState<ApiJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingStatic, setUsingStatic] = useState(false);

  useEffect(() => {
    careersApi.getAll({ limit: 100, status: 'active' })
      .then((res) => setApiJobs(res.data.data))
      .catch(() => setUsingStatic(true))
      .finally(() => setLoading(false));
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const jobs: any[] = usingStatic
    ? staticJobs
    : apiJobs.map((j) => ({
        id: j._id,
        slug: j.slug,
        title: j.title,
        department: j.department,
        location: j.location,
        type: j.type,
        experience: j.experience ?? j.experienceLevel ?? '',
        featured: j.featured ?? false,
        postedAt: j.postedAt ?? j.createdAt,
        deadline: j.deadline ?? j.applicationDeadline,
      }));

  const filtered = useMemo(() => jobs.filter((j) => {
    const matchSearch =
      !search ||
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.department.toLowerCase().includes(search.toLowerCase()) ||
      j.location.toLowerCase().includes(search.toLowerCase());
    const matchDept = activeDept === 'All' || j.department === activeDept;
    return matchSearch && matchDept;
  }), [search, activeDept, jobs]);

  return (
    <>
      <title>Careers — MediSource Global</title>
      <PageBanner
        title="Join Our Team"
        subtitle="Build a meaningful career in global healthcare distribution with MediSource."
        breadcrumbs={[{ label: 'Careers' }]}
      />

      {loading ? (
        <div className="flex items-center justify-center py-32">
          <Loader2 size={36} className="animate-spin text-primary-600" />
        </div>
      ) : (
        <>
          {/* Benefits */}
          <section className="py-14 bg-white dark:bg-gray-950">
            <div className="container-custom">
              <SectionTitle
                tag="Why Work With Us"
                title="Career Benefits"
                subtitle="We invest in our people because they are the foundation of our success."
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
                {careerBenefits.map((benefit, i) => {
                  const Icon = iconMap[benefit.icon] || Heart;
                  return (
                    <motion.div
                      key={benefit.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.4 }}
                      className="card p-5 flex gap-4 hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Icon size={22} className="text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-gray-900 dark:text-white text-base mb-1">{benefit.title}</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Jobs */}
          <section className="section-padding bg-gray-50 dark:bg-gray-900/50">
            <div className="container-custom">
              <SectionTitle tag="Open Positions" title="Current Opportunities" align="left" />

              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4 my-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search by title, department, location…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input-field pl-10"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {departments.map((dept) => (
                    <button
                      key={dept}
                      onClick={() => setActiveDept(dept)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                        activeDept === dept
                          ? 'bg-primary-600 text-white'
                          : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-primary-300 hover:text-primary-600'
                      }`}
                    >
                      {dept}
                    </button>
                  ))}
                </div>
              </div>

              {filtered.length === 0 ? (
                <EmptyState title="No open positions" message="No roles match your search. Try different filters." />
              ) : (
                <div className="space-y-4">
                  {filtered.map((job, i) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.4 }}
                    >
                      <Link
                        to={`/careers/${job.slug ?? job.id}`}
                        className="card p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center hover:-translate-y-0.5 transition-all duration-300 group block"
                      >
                        <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Briefcase size={20} className="text-primary-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="font-heading font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                              {job.title}
                            </h3>
                            {job.featured && <Star size={14} className="text-amber-500 fill-amber-500" />}
                          </div>
                          <div className="flex items-center gap-3 flex-wrap text-sm text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1"><MapPin size={13} /> {job.location}</span>
                            <span className="flex items-center gap-1"><Briefcase size={13} /> {job.department}</span>
                            <span className="flex items-center gap-1"><Clock size={13} /> {job.experience}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0 flex-wrap">
                          <span className={`badge text-xs ${typeColors[job.type] ?? ''}`}>
                            {job.type?.replace('-', ' ')}
                          </span>
                          <span className="text-xs text-gray-400">Posted {formatDateShort(job.postedAt)}</span>
                          <span className="text-primary-600 dark:text-primary-400 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                            Apply <ArrowRight size={14} />
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Culture Banner */}
          <section className="py-16 hero-gradient">
            <div className="container-custom text-center">
              <h2 className="font-heading font-bold text-3xl text-white mb-4">Don't See the Right Role?</h2>
              <p className="text-primary-100 mb-8 max-w-lg mx-auto">
                Send us your CV and we'll keep it on file for future opportunities that match your profile.
              </p>
              <Link to="/contact" className="btn-primary bg-white text-primary-700 hover:bg-primary-50">
                Send Speculative Application <ArrowRight size={18} />
              </Link>
            </div>
          </section>
        </>
      )}
    </>
  );
}
