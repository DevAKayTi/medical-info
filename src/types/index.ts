// =====================================================
// Product Types
// =====================================================
export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  brand: string;
  sku: string;
  description: string;
  longDescription: string;
  image: string;
  images: string[];
  specifications: ProductSpec[];
  features: string[];
  certifications: string[];
  inStock: boolean;
  tags: string[];
  brochureUrl?: string;
  createdAt: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  count: number;
  image: string;
  slug: string;
}

// =====================================================
// Service Types
// =====================================================
export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  features: string[];
  icon: string;
  image: string;
  stats?: ServiceStat[];
}

export interface ServiceStat {
  label: string;
  value: string;
}

// =====================================================
// News Types
// =====================================================
export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorRole: string;
  authorImage: string;
  image: string;
  publishedAt: string;
  readingTime: number;
  tags: string[];
  featured?: boolean;
}

// =====================================================
// Team Types
// =====================================================
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  bio: string;
  image: string;
  linkedin?: string;
  email?: string;
}

// =====================================================
// Certification Types
// =====================================================
export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  description: string;
  image: string;
  documentUrl?: string;
  type: 'certification' | 'award' | 'recognition';
}

// =====================================================
// Brand/Partner Types
// =====================================================
export interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
  website?: string;
  category: string;
  featured: boolean;
  country: string;
  since?: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  type: 'strategic' | 'distribution' | 'logistics' | 'technology';
  description: string;
  since?: string;
}

// =====================================================
// Gallery Types
// =====================================================
export interface GalleryImage {
  id: string;
  title: string;
  description?: string;
  src: string;
  thumbnail: string;
  category: 'facility' | 'event' | 'team' | 'product' | 'warehouse';
  date?: string;
}

// =====================================================
// Career/Job Types
// =====================================================
export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  experience: string;
  salary?: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  postedAt: string;
  deadline?: string;
  featured?: boolean;
}

export interface CareerBenefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}

// =====================================================
// Download Types
// =====================================================
export interface DownloadItem {
  id: string;
  title: string;
  description: string;
  category: 'company-profile' | 'product-catalog' | 'certificate' | 'brochure' | 'other';
  fileSize: string;
  fileType: string;
  fileUrl: string;
  thumbnail?: string;
  updatedAt: string;
  downloads?: number;
}

// =====================================================
// Testimonial Types
// =====================================================
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  rating: number;
  text: string;
  featured?: boolean;
}

// =====================================================
// Statistic Types
// =====================================================
export interface Stat {
  id: string;
  label: string;
  value: string;
  suffix?: string;
  icon: string;
  description?: string;
}

// =====================================================
// Timeline Event Types
// =====================================================
export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  icon?: string;
  milestone?: boolean;
}

// =====================================================
// Contact Types
// =====================================================
export interface ContactInfo {
  id: string;
  type: 'headquarters' | 'branch' | 'warehouse';
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  fax?: string;
  email: string;
  workingHours: string;
  mapUrl?: string;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  subject: string;
  message: string;
  department: string;
}

// =====================================================
// Navigation Types
// =====================================================
export interface NavItem {
  label: string;
  href: string;
  children?: NavSubItem[];
}

export interface NavSubItem {
  label: string;
  href: string;
  description?: string;
  icon?: string;
}
