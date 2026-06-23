import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { contactInfo } from '@/data/misc';
import PageBanner from '@/components/layout/PageBanner';
import SectionTitle from '@/components/shared/SectionTitle';
import { isValidEmail, isValidPhone } from '@/utils';
import type { ContactFormData } from '@/types';

const initialForm: ContactFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  subject: '',
  message: '',
  department: 'General Enquiry',
};

type FieldErrors = Partial<Record<keyof ContactFormData, string>>;

function validate(data: ContactFormData): FieldErrors {
  const errors: FieldErrors = {};
  if (!data.firstName.trim()) errors.firstName = 'First name is required';
  if (!data.lastName.trim()) errors.lastName = 'Last name is required';
  if (!data.email.trim()) errors.email = 'Email is required';
  else if (!isValidEmail(data.email)) errors.email = 'Please enter a valid email';
  if (data.phone && !isValidPhone(data.phone)) errors.phone = 'Please enter a valid phone number';
  if (!data.subject.trim()) errors.subject = 'Subject is required';
  if (!data.message.trim()) errors.message = 'Message is required';
  else if (data.message.trim().length < 20) errors.message = 'Message must be at least 20 characters';
  return errors;
}

const typeColors: Record<string, string> = {
  headquarters: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400',
  branch: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
  warehouse: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
};

export default function ContactPage() {
  const [form, setForm] = useState<ContactFormData>(initialForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      <title>Contact Us — MediSource Global</title>
      <PageBanner
        title="Contact Us"
        subtitle="Get in touch with our team — we respond within 4 business hours."
        breadcrumbs={[{ label: 'Contact' }]}
      />

      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact Info */}
            <div className="space-y-5">
              <SectionTitle tag="Get In Touch" title="Our Offices" align="left" />

              {contactInfo.map((info, i) => (
                <motion.div
                  key={info.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="card p-5"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold ${typeColors[info.type]}`}>
                      {info.type === 'headquarters' ? 'HQ' : info.type === 'branch' ? 'BR' : 'WH'}
                    </div>
                    <h3 className="font-heading font-semibold text-gray-900 dark:text-white text-sm">{info.name}</h3>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-start gap-2">
                      <MapPin size={14} className="text-primary-500 flex-shrink-0 mt-0.5" />
                      <span>{info.address}, {info.city}, {info.country}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-primary-500 flex-shrink-0" />
                      <a href={`tel:${info.phone}`} className="hover:text-primary-600 transition-colors">{info.phone}</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={14} className="text-primary-500 flex-shrink-0" />
                      <a href={`mailto:${info.email}`} className="hover:text-primary-600 transition-colors">{info.email}</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-primary-500 flex-shrink-0" />
                      <span>{info.workingHours}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="card p-8"
              >
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center py-12"
                  >
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-5">
                      <CheckCircle size={40} className="text-green-600" />
                    </div>
                    <h2 className="font-heading font-bold text-2xl text-gray-900 dark:text-white mb-3">
                      Message Sent!
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">
                      Thank you for contacting MediSource. Our team will review your enquiry and respond within 4 business hours.
                    </p>
                    <button onClick={() => { setSubmitted(false); setForm(initialForm); }} className="btn-primary">
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-6">
                      Send Us a Message
                    </h2>

                    <form onSubmit={handleSubmit} noValidate className="space-y-5">
                      {/* Name Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                            First Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            placeholder="Ahmed"
                            className={`input-field ${errors.firstName ? 'border-red-400 focus:ring-red-500' : ''}`}
                          />
                          {errors.firstName && (
                            <p className="flex items-center gap-1 text-xs text-red-500 mt-1">
                              <AlertCircle size={11} /> {errors.firstName}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                            Last Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            placeholder="Hassan"
                            className={`input-field ${errors.lastName ? 'border-red-400 focus:ring-red-500' : ''}`}
                          />
                          {errors.lastName && (
                            <p className="flex items-center gap-1 text-xs text-red-500 mt-1">
                              <AlertCircle size={11} /> {errors.lastName}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Email & Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="you@hospital.com"
                            className={`input-field ${errors.email ? 'border-red-400 focus:ring-red-500' : ''}`}
                          />
                          {errors.email && (
                            <p className="flex items-center gap-1 text-xs text-red-500 mt-1">
                              <AlertCircle size={11} /> {errors.email}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="+971 50 123 4567"
                            className={`input-field ${errors.phone ? 'border-red-400 focus:ring-red-500' : ''}`}
                          />
                          {errors.phone && (
                            <p className="flex items-center gap-1 text-xs text-red-500 mt-1">
                              <AlertCircle size={11} /> {errors.phone}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Company & Department */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                            Company / Institution
                          </label>
                          <input
                            type="text"
                            name="company"
                            value={form.company}
                            onChange={handleChange}
                            placeholder="King Fahad Medical City"
                            className="input-field"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                            Department
                          </label>
                          <select name="department" value={form.department} onChange={handleChange} className="input-field">
                            {['General Enquiry', 'Sales & Distribution', 'Customer Support', 'Partnership', 'Quality Assurance', 'Careers', 'Media & Press'].map((d) => (
                              <option key={d} value={d}>{d}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Subject */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                          Subject <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          placeholder="Request for product quotation"
                          className={`input-field ${errors.subject ? 'border-red-400 focus:ring-red-500' : ''}`}
                        />
                        {errors.subject && (
                          <p className="flex items-center gap-1 text-xs text-red-500 mt-1">
                            <AlertCircle size={11} /> {errors.subject}
                          </p>
                        )}
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          rows={5}
                          placeholder="Please describe your enquiry in detail…"
                          className={`input-field resize-none ${errors.message ? 'border-red-400 focus:ring-red-500' : ''}`}
                        />
                        {errors.message && (
                          <p className="flex items-center gap-1 text-xs text-red-500 mt-1">
                            <AlertCircle size={11} /> {errors.message}
                          </p>
                        )}
                        <p className="text-xs text-gray-400 mt-1">{form.message.length} / 500 characters</p>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full justify-center py-3.5 text-base disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                            </svg>
                            Sending…
                          </span>
                        ) : (
                          <><Send size={18} /> Send Message</>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </motion.div>

              {/* Map Placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-8 rounded-3xl overflow-hidden h-72 bg-gray-100 dark:bg-gray-900 relative shadow-xl"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mb-4">
                    <MapPin size={28} className="text-primary-600" />
                  </div>
                  <h3 className="font-heading font-semibold text-gray-700 dark:text-gray-300 text-lg mb-2">
                    Dubai Healthcare City, Phase 2
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Building 64, Dubai, UAE</p>
                  <a
                    href="https://maps.google.com/?q=Dubai+Healthcare+City"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-sm py-2.5 px-5"
                  >
                    Open in Google Maps
                  </a>
                </div>
                {/* Grid texture */}
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)',
                    backgroundSize: '30px 30px',
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
