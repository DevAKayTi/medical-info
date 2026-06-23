import { motion } from 'framer-motion';
import { Shield, Award, Globe, Clock, Users, Zap, CheckCircle, HeartPulse } from 'lucide-react';
import SectionTitle from '@/components/shared/SectionTitle';

const reasons = [
  {
    icon: Shield,
    title: 'WHO GDP Certified',
    description: 'All distribution centers are WHO Good Distribution Practice certified, ensuring product integrity from manufacturer to patient.',
    color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Operating across 18 countries with a network of 250+ delivery vehicles and 12 strategically located distribution centers.',
    color: 'text-teal-600 bg-teal-50 dark:bg-teal-900/20',
  },
  {
    icon: Clock,
    title: '24/7 Operations',
    description: 'Round-the-clock operations with dedicated emergency order processing to support critical healthcare needs.',
    color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20',
  },
  {
    icon: Award,
    title: 'Award Winning',
    description: 'Recognized as Best Pharmaceutical Distributor in the Middle East for 3 consecutive years by the MENA Healthcare Awards.',
    color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/20',
  },
  {
    icon: Zap,
    title: 'Digital Innovation',
    description: 'Proprietary HealthConnect™ and ColdTrack™ platforms provide real-time ordering, tracking, and temperature monitoring.',
    color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20',
  },
  {
    icon: HeartPulse,
    title: '99.8% Fulfillment',
    description: 'Industry-leading 99.8% order fulfillment accuracy powered by AI-driven inventory management and quality systems.',
    color: 'text-rose-600 bg-rose-50 dark:bg-rose-900/20',
  },
  {
    icon: Users,
    title: 'Dedicated Support',
    description: 'Dedicated account managers, clinical liaison officers, and 24/7 customer support for all healthcare partners.',
    color: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-900/20',
  },
  {
    icon: CheckCircle,
    title: 'Quality First',
    description: 'ISO 9001, ISO 13485, IATA DGR certified with robust CAPA and deviation management systems in place.',
    color: 'text-green-600 bg-green-50 dark:bg-green-900/20',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-gray-50 dark:bg-gray-900/50">
      <div className="container-custom">
        <SectionTitle
          tag="Why MediSource"
          title="Why Leading Healthcare Institutions Choose Us"
          subtitle="For over 25 years, we have built our reputation on reliability, quality, and innovation in pharmaceutical distribution."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="card p-5 hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${reason.color}`}>
                  <Icon size={22} />
                </div>
                <h3 className="font-heading font-semibold text-gray-900 dark:text-white text-base mb-2">
                  {reason.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
