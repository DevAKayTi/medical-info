import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Award, Building2, Package, Globe, CheckCircle, Users } from 'lucide-react';
import { stats } from '@/data/company';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Award, Building2, Package, Globe, CheckCircle, Users,
};

function CountUp({ end, duration = 2000 }: { end: string; duration?: number }) {
  const numeric = parseFloat(end.replace(/[^0-9.]/g, ''));
  const suffix = end.replace(/[0-9.,]/g, '');
  const [count, setCount] = useState(0);
  const ref = useRef(false);

  useEffect(() => {
    if (ref.current) return;
    ref.current = true;
    const steps = 60;
    const increment = numeric / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= numeric) {
        setCount(numeric);
        clearInterval(interval);
      } else {
        setCount(current);
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [numeric, duration]);

  const display = Number.isInteger(numeric)
    ? Math.round(count).toLocaleString()
    : count.toFixed(1);

  return <>{display}{suffix}</>;
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="py-16 bg-primary-700 dark:bg-primary-900 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary-600/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary-800/50 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container-custom relative z-10" ref={ref}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((stat, i) => {
            const Icon = iconMap[stat.icon] || Award;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-primary-600/40 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Icon size={22} className="text-primary-200" />
                </div>
                <div className="font-heading font-bold text-3xl text-white mb-1">
                  {inView ? (
                    <CountUp end={stat.value + (stat.suffix || '')} />
                  ) : (
                    '0'
                  )}
                </div>
                <div className="text-sm font-medium text-primary-200">{stat.label}</div>
                {stat.description && (
                  <div className="text-xs text-primary-300/70 mt-0.5">{stat.description}</div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
