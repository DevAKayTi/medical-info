import { motion } from 'framer-motion';
import { Target, Eye, Heart, Globe, Shield, Award, Lightbulb, Users } from 'lucide-react';
import PageBanner from '@/components/layout/PageBanner';
import SectionTitle from '@/components/shared/SectionTitle';
import { teamMembers, timelineEvents } from '@/data/company';

const coreValues = [
  { icon: Shield, title: 'Integrity', description: 'We operate with transparency and ethical standards in every decision we make.', color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20' },
  { icon: Award, title: 'Quality', description: 'We are committed to the highest product and service standards without compromise.', color: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20' },
  { icon: Lightbulb, title: 'Innovation', description: 'We continuously invest in technology and processes that improve healthcare delivery.', color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20' },
  { icon: Users, title: 'Partnership', description: 'We build long-term relationships built on trust, respect, and shared goals.', color: 'bg-green-50 text-green-600 dark:bg-green-900/20' },
  { icon: Heart, title: 'Patient-First', description: 'Every decision we make ultimately serves the patient at the end of the supply chain.', color: 'bg-rose-50 text-rose-600 dark:bg-rose-900/20' },
  { icon: Globe, title: 'Global Thinking', description: 'We operate with a global mindset while serving local healthcare communities.', color: 'bg-teal-50 text-teal-600 dark:bg-teal-900/20' },
];

export default function AboutPage() {
  return (
    <>
      <title>About Us — MediSource Global</title>
      <PageBanner
        title="About MediSource Global"
        subtitle="25 years of delivering quality healthcare supplies to institutions that save lives."
        breadcrumbs={[{ label: 'About Us' }]}
        badge="Est. 1999"
      />

      {/* Company Profile */}
      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&auto=format&fit=crop"
                  alt="MediSource Headquarters"
                  className="rounded-3xl w-full h-[440px] object-cover shadow-2xl"
                />
                {/* Floating badges */}
                <div className="absolute -bottom-6 -right-6 bg-primary-600 text-white rounded-2xl px-6 py-4 shadow-xl">
                  <div className="font-heading font-bold text-3xl">25+</div>
                  <div className="text-primary-200 text-sm">Years of Excellence</div>
                </div>
                <div className="absolute top-6 -left-6 bg-white dark:bg-gray-900 rounded-xl px-4 py-3 shadow-xl border border-gray-100 dark:border-gray-800">
                  <div className="font-heading font-bold text-xl text-gray-900 dark:text-white">18</div>
                  <div className="text-xs text-gray-500">Countries</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionTitle
                tag="Company Profile"
                title="Who We Are"
                align="left"
              />
              <div className="space-y-4 mt-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  MediSource Global Distribution LLC is a leading pharmaceutical and medical supply distributor 
                  with over 25 years of operational excellence. Founded in 1999 in Dubai, United Arab Emirates, 
                  we have grown from a regional distributor to a globally recognized healthcare supply partner 
                  operating across 18 countries.
                </p>
                <p>
                  Our comprehensive product portfolio spans 15,000+ pharmaceutical SKUs, medical devices, 
                  surgical supplies, diagnostics, and personal protective equipment — all sourced from 
                  world-leading manufacturers and distributed through our GDP-certified supply chain.
                </p>
                <p>
                  We serve over 3,200 healthcare facilities including tertiary hospitals, specialist clinics, 
                  pharmacy chains, and government health ministries, supported by a team of 2,400+ professionals 
                  dedicated to healthcare supply excellence.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { label: 'Healthcare Partners', value: '3,200+' },
                  { label: 'Product SKUs', value: '15,000+' },
                  { label: 'Countries Served', value: '18' },
                  { label: 'Employees', value: '2,400+' },
                ].map((item) => (
                  <div key={item.label} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
                    <div className="font-heading font-bold text-2xl text-primary-600 dark:text-primary-400">
                      {item.value}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{item.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900/50" id="mission">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="card p-8 border-l-4 border-primary-600"
            >
              <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mb-5">
                <Target size={26} className="text-primary-600" />
              </div>
              <h3 className="font-heading font-bold text-gray-900 dark:text-white text-2xl mb-4">Our Mission</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                To ensure uninterrupted access to quality pharmaceutical and medical products for healthcare 
                institutions worldwide through a reliable, compliant, and technology-driven distribution network 
                that upholds the highest standards of service excellence.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card p-8 border-l-4 border-teal-500"
            >
              <div className="w-14 h-14 bg-teal-50 dark:bg-teal-900/30 rounded-2xl flex items-center justify-center mb-5">
                <Eye size={26} className="text-teal-600" />
              </div>
              <h3 className="font-heading font-bold text-gray-900 dark:text-white text-2xl mb-4">Our Vision</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                To be the most trusted and innovative healthcare distribution company in the world — a partner 
                that healthcare institutions rely on unconditionally, and that ultimately contributes to better 
                patient outcomes in every community we serve.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-white dark:bg-gray-950" id="values">
        <div className="container-custom">
          <SectionTitle
            tag="Core Values"
            title="The Principles That Guide Us"
            subtitle="Our six core values are embedded in every aspect of how we operate."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {coreValues.map((val, i) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="card p-6 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${val.color}`}>
                    <Icon size={22} />
                  </div>
                  <h3 className="font-heading font-semibold text-gray-900 dark:text-white text-lg mb-2">{val.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{val.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Company History Timeline */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900/50" id="history">
        <div className="container-custom">
          <SectionTitle
            tag="Our Journey"
            title="Company History Timeline"
            subtitle="25 years of growth, innovation, and commitment to healthcare excellence."
          />
          <div className="relative mt-12 max-w-4xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary-100 dark:bg-primary-900 -translate-x-1/2" />

            {timelineEvents.map((event, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className={`relative flex items-start gap-4 mb-8 md:mb-12 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  } pl-10 md:pl-0`}
                >
                  {/* Dot */}
                  <div className="absolute left-0 md:left-1/2 top-2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center z-10 border-4 border-white dark:border-gray-900 shadow-md">
                    <div className={`w-full h-full rounded-full ${event.milestone ? 'bg-primary-600' : 'bg-primary-300 dark:bg-primary-700'}`} />
                  </div>

                  {/* Year badge — desktop */}
                  <div className={`hidden md:flex items-center ${isLeft ? 'justify-end w-1/2 pr-8' : 'justify-start w-1/2 pl-8'}`}>
                    <span className={`font-heading font-bold text-lg ${event.milestone ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400'}`}>
                      {event.year}
                    </span>
                  </div>

                  {/* Content */}
                  <div className={`md:w-1/2 ${isLeft ? 'md:pl-8' : 'md:pr-8'}`}>
                    <div className={`card p-5 ${event.milestone ? 'border-l-4 border-primary-600' : ''}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-primary-600 dark:text-primary-400 md:hidden">{event.year}</span>
                        {event.milestone && (
                          <span className="badge bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400">Milestone</span>
                        )}
                      </div>
                      <h4 className="font-heading font-semibold text-gray-900 dark:text-white text-base mb-1">{event.title}</h4>
                      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{event.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="section-padding bg-white dark:bg-gray-950" id="leadership">
        <div className="container-custom">
          <SectionTitle
            tag="Leadership"
            title="Our Executive Team"
            subtitle="Experienced leaders with decades of pharmaceutical and healthcare industry expertise."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="card group hover:-translate-y-2 transition-all duration-300"
              >
                <div className="relative overflow-hidden h-64">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-bold text-gray-900 dark:text-white text-lg">{member.name}</h3>
                  <p className="text-primary-600 dark:text-primary-400 font-medium text-sm mb-3">{member.role}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">{member.bio}</p>
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="mt-4 flex items-center gap-1.5 text-xs text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      {member.email}
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
