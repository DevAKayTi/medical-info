import { motion } from 'framer-motion';
import SectionTitle from '@/components/shared/SectionTitle';
import { brands } from '@/data/certifications';

const partnerLogos = [
  { name: 'Pfizer', abbr: 'PFZ' },
  { name: 'Abbott', abbr: 'ABT' },
  { name: 'J&J', abbr: 'JNJ' },
  { name: 'Roche', abbr: 'ROC' },
  { name: 'Siemens', abbr: 'SIE' },
  { name: 'Becton Dickinson', abbr: 'BDX' },
  { name: 'Medtronic', abbr: 'MDT' },
  { name: 'Baxter', abbr: 'BAX' },
  { name: 'Novartis', abbr: 'NVS' },
  { name: 'AstraZeneca', abbr: 'AZN' },
];

export default function PartnersSection() {
  return (
    <section className="py-14 bg-white dark:bg-gray-950 border-y border-gray-100 dark:border-gray-800">
      <div className="container-custom">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8"
        >
          Trusted Distribution Partner for Global Healthcare Leaders
        </motion.p>

        {/* Scrolling logo strip */}
        <div className="relative overflow-hidden">
          <div className="flex gap-8 items-center animate-[scroll_30s_linear_infinite] w-max">
            {[...partnerLogos, ...partnerLogos].map((p, i) => (
              <div
                key={`${p.name}-${i}`}
                className="flex-shrink-0 px-8 py-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800 transition-colors min-w-[160px] text-center"
              >
                <div className="font-heading font-bold text-primary-600 dark:text-primary-400 text-lg">{p.abbr}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{p.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
