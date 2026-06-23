import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Briefcase, Clock, DollarSign, Calendar, CheckCircle, Star } from 'lucide-react';
import { jobs } from '@/data/misc';
import { ErrorState } from '@/components/shared/StateComponents';
import PageBanner from '@/components/layout/PageBanner';
import { formatDateShort } from '@/utils';

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const job = jobs.find((j) => j.id === id);

  if (!job) {
    return (
      <ErrorState
        title="Job Not Found"
        message="This position may have been filled or expired."
        action={{ label: 'View All Jobs', onClick: () => navigate('/careers') }}
      />
    );
  }

  return (
    <>
      <title>{job.title} — MediSource Careers</title>
      <PageBanner
        title={job.title}
        subtitle={`${job.department} · ${job.location} · ${job.type.replace('-', ' ')}`}
        breadcrumbs={[
          { label: 'Careers', href: '/careers' },
          { label: job.title },
        ]}
      />

      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Description */}
              <div className="card p-7">
                <h2 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-4">Job Description</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{job.description}</p>
              </div>

              {/* Responsibilities */}
              <div className="card p-7">
                <h2 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-4">Key Responsibilities</h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-400 text-sm">
                      <CheckCircle size={16} className="text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="card p-7">
                <h2 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-4">Requirements</h2>
                <ul className="space-y-3">
                  {job.requirements.map((r, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-400 text-sm">
                      <Star size={15} className="text-amber-500 flex-shrink-0 mt-0.5" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="card p-7">
                <h2 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-4">What We Offer</h2>
                <ul className="space-y-3">
                  {job.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-400 text-sm">
                      <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <button onClick={() => navigate(-1)} className="btn-ghost">
                <ArrowLeft size={16} /> Back to Careers
              </button>
            </motion.div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Job Summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="card p-6 sticky top-24"
              >
                <h3 className="font-heading font-semibold text-gray-900 dark:text-white text-lg mb-5">Job Summary</h3>
                <div className="space-y-4">
                  {[
                    { icon: MapPin, label: 'Location', value: job.location },
                    { icon: Briefcase, label: 'Department', value: job.department },
                    { icon: Clock, label: 'Type', value: job.type.replace('-', ' ') },
                    { icon: Star, label: 'Experience', value: job.experience },
                    ...(job.salary ? [{ icon: DollarSign, label: 'Salary', value: job.salary }] : []),
                    { icon: Calendar, label: 'Posted', value: formatDateShort(job.postedAt) },
                    ...(job.deadline ? [{ icon: Calendar, label: 'Deadline', value: formatDateShort(job.deadline) }] : []),
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon size={15} className="text-primary-600 dark:text-primary-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-medium">{label}</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white capitalize">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-5 border-t border-gray-100 dark:border-gray-800 space-y-3">
                  <button className="btn-primary w-full justify-center">Apply Now</button>
                  <button className="btn-secondary w-full justify-center text-sm py-2.5">Save Job</button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
