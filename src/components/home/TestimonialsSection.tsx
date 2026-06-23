import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { testimonials } from '@/data/company';
import SectionTitle from '@/components/shared/SectionTitle';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200 dark:text-gray-700'}
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-gray-50 dark:bg-gray-900/50 overflow-hidden">
      <div className="container-custom">
        <SectionTitle
          tag="Testimonials"
          title="What Our Partners Say"
          subtitle="Trusted by procurement teams and clinical leaders at the world's leading healthcare institutions."
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12"
        >
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-10"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="card p-6 h-full flex flex-col">
                  {/* Quote mark */}
                  <div className="text-5xl text-primary-200 dark:text-primary-800 font-serif leading-none mb-4">"</div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-1 mb-5 italic">
                    {testimonial.text}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-3">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-11 h-11 rounded-full object-cover ring-2 ring-primary-100 dark:ring-primary-900"
                      />
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white text-sm">
                          {testimonial.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {testimonial.role}
                        </div>
                        <div className="text-xs text-primary-600 dark:text-primary-400 font-medium">
                          {testimonial.company}
                        </div>
                      </div>
                    </div>
                    <StarRating rating={testimonial.rating} />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
