import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RootLayout from '@/layouts/RootLayout';
import HomePage from '@/pages/Home';
import AboutPage from '@/pages/About';
import ProductsPage from '@/pages/Products';
import ProductDetailPage from '@/pages/ProductDetail';
import ServicesPage from '@/pages/Services';
import ServiceDetailPage from '@/pages/Services/ServiceDetail';
import CertificationsPage from '@/pages/Certifications';
import BrandsPage from '@/pages/Brands';
import NewsPage from '@/pages/News';
import NewsDetailPage from '@/pages/NewsDetail';
import GalleryPage from '@/pages/Gallery';
import CareersPage from '@/pages/Careers';
import JobDetailPage from '@/pages/JobDetail';
import DownloadsPage from '@/pages/Downloads';
import ContactPage from '@/pages/Contact';
import { ErrorState } from '@/components/shared/StateComponents';

function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <ErrorState
        title="404 — Page Not Found"
        message="The page you're looking for doesn't exist. It may have been moved or deleted."
        action={{ label: 'Go Home', onClick: () => window.location.href = '/' }}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:id" element={<ProductDetailPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="services/:slug" element={<ServiceDetailPage />} />
          <Route path="certifications" element={<CertificationsPage />} />
          <Route path="brands" element={<BrandsPage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="news/:slug" element={<NewsDetailPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="careers" element={<CareersPage />} />
          <Route path="careers/:id" element={<JobDetailPage />} />
          <Route path="downloads" element={<DownloadsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
