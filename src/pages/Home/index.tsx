import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import ProductCategories from '@/components/home/ProductCategories';
import ServicesOverview from '@/components/home/ServicesOverview';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import PartnersSection from '@/components/home/PartnersSection';
import LatestNews from '@/components/home/LatestNews';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';

export default function HomePage() {
  return (
    <>
      <title>MediSource Global — Premier Medical Distribution Company</title>
      <meta name="description" content="MediSource Global is your premier pharmaceutical and medical distribution partner across 18 countries." />
      <HeroSection />
      <StatsSection />
      <ProductCategories />
      <ServicesOverview />
      <WhyChooseUs />
      <PartnersSection />
      <LatestNews />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
