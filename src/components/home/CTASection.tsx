import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="section-padding hero-gradient relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-300/10 rounded-full blur-3xl" />

      <div className="container-custom relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-primary-400/20 border border-primary-400/30 text-primary-200 mb-6">
            Let's Work Together
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-white mb-5 max-w-3xl mx-auto leading-tight">
            Ready to Partner with a World-Class Medical Distributor?
          </h2>
          <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Whether you are a hospital procurement team, a pharmacy chain, or a pharmaceutical manufacturer 
            looking for a reliable distribution partner — MediSource is here to help.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="btn-primary bg-white text-primary-700 hover:bg-primary-50 shadow-xl px-8 py-4 text-base"
            >
              Request a Partnership <ArrowRight size={18} />
            </Link>
            <a
              href="tel:+97143621900"
              className="flex items-center gap-2 text-white border border-white/30 hover:bg-white/10 font-semibold px-8 py-4 rounded-lg transition-all duration-200"
            >
              <Phone size={18} /> Call Us Now
            </a>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[
              { label: 'Response Time', value: '< 4 hours' },
              { label: 'Setup Time', value: '< 2 weeks' },
              { label: 'Satisfaction', value: '98.5%' },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="font-heading font-bold text-2xl text-white">{item.value}</div>
                <div className="text-xs text-primary-300 font-medium mt-0.5">{item.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
