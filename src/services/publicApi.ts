// ============================================================
// Client Public API Services — calls /api/v1/**/public
// ============================================================
import api from './api';

// ── Types aligned with client's existing types ────────────────
export interface ApiProduct {
  _id: string;
  name: string;
  slug: string;
  sku?: string;
  description: string;
  shortDescription?: string;
  category?: { _id: string; name: string; slug: string };
  brand?: { _id: string; name: string; slug?: string; logo?: { url: string } } | string;
  images?: { url: string; publicId?: string; isPrimary?: boolean }[];
  inStock: boolean;
  featured: boolean;
  status: string;
  tags?: string[];
  specifications?: { label: string; value: string }[];
  createdAt: string;
}

export interface ApiCategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: { url: string };
  productCount?: number;
}

export interface ApiNews {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author?: { name: string; avatar?: { url: string } };
  coverImage?: { url: string };
  tags?: string[];
  featured: boolean;
  publishedAt?: string;
  readingTime?: number;
  views?: number;
  createdAt: string;
}

export interface ApiJob {
  _id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  type: string;
  experience?: string;
  experienceLevel?: string;  // alias — API returns 'experience'
  salaryRange?: { min: number; max: number; currency: string; period?: string };
  description: string;
  responsibilities?: string[];
  requirements?: string[];
  benefits?: string[];
  status: string;
  featured?: boolean;
  applicationDeadline?: string;
  deadline?: string;
  postedAt?: string;
  createdAt: string;
}

export interface ApiGallery {
  _id: string;
  title: string;
  description?: string;
  image: { url: string; thumbnail?: string };
  category?: string;
  createdAt: string;
}

export interface ApiBrand {
  _id: string;
  name: string;
  logo?: { url: string };
  description?: string;
  country?: string;
  website?: string;
  featured: boolean;
  category?: string;
}

export interface ApiPartner {
  _id: string;
  name: string;
  logo?: { url: string };
  website?: string;
  description?: string;
}

export interface ApiCertification {
  _id: string;
  name: string;
  issuer: string;
  type: string;
  description?: string;
  image?: { url: string };
  document?: { url: string };
  issueDate: string;
  expiryDate?: string;
  status: string;
}

export interface ApiTestimonial {
  _id: string;
  name: string;
  position?: string;
  company?: string;
  avatar?: { url: string };
  content: string;
  rating?: number;
  featured: boolean;
}

export interface ApiService {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  icon?: string;
  image?: { url: string };
  features?: string[];
  featured: boolean;
  order: number;
}

export interface ApiDownload {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  category: string;
  file: { url: string; filename?: string; size?: number };
  downloadCount?: number;
  tags?: string[];
  createdAt: string;
}

export interface ApiPaginatedMeta {
  total: number;
  page: number;
  limit: number;
  pages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ApiPaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: ApiPaginatedMeta;
}

export interface ApiSingleResponse<T> {
  success: boolean;
  data: T;
}

// ── Products ──────────────────────────────────────────────────
export const productsApi = {
  getAll: (params?: Record<string, unknown>) =>
    api.get<ApiPaginatedResponse<ApiProduct>>('/products/public', { params }),
  getBySlug: (slug: string) =>
    api.get<ApiSingleResponse<ApiProduct>>(`/products/public/${slug}`),
  getCategories: () =>
    api.get<ApiSingleResponse<ApiCategory[]>>('/categories/public'),
};

// ── News ──────────────────────────────────────────────────────
export const newsApi = {
  getAll: (params?: Record<string, unknown>) =>
    api.get<ApiPaginatedResponse<ApiNews>>('/news/public', { params }),
  getBySlug: (slug: string) =>
    api.get<ApiSingleResponse<ApiNews>>(`/news/public/${slug}`),
};

// ── Careers ───────────────────────────────────────────────────
export const careersApi = {
  getAll: (params?: Record<string, unknown>) =>
    api.get<ApiPaginatedResponse<ApiJob>>('/careers/public', { params }),
  getBySlug: (slug: string) =>
    api.get<ApiSingleResponse<ApiJob>>(`/careers/public/${slug}`),
  apply: (jobId: string, formData: FormData) =>
    api.post(`/careers/${jobId}/apply`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
};

// ── Gallery ───────────────────────────────────────────────────
export const galleryApi = {
  getAll: (params?: Record<string, unknown>) =>
    api.get<ApiPaginatedResponse<ApiGallery>>('/gallery/public', { params }),
};

// ── Brands ───────────────────────────────────────────────────
export const brandsApi = {
  getAll: (params?: Record<string, unknown>) =>
    api.get<ApiPaginatedResponse<ApiBrand>>('/brands/public', { params }),
};

// ── Partners ──────────────────────────────────────────────────
export const partnersApi = {
  getAll: (params?: Record<string, unknown>) =>
    api.get<ApiPaginatedResponse<ApiPartner>>('/partners/public', { params }),
};

// ── Certifications ────────────────────────────────────────────
export const certificationsApi = {
  getAll: (params?: Record<string, unknown>) =>
    api.get<ApiPaginatedResponse<ApiCertification>>('/certifications/public', { params }),
};

// ── Testimonials ──────────────────────────────────────────────
export const testimonialsApi = {
  getAll: (params?: Record<string, unknown>) =>
    api.get<ApiPaginatedResponse<ApiTestimonial>>('/testimonials/public', { params }),
};

// ── Services ──────────────────────────────────────────────────
export const servicesApi = {
  getAll: (params?: Record<string, unknown>) =>
    api.get<ApiPaginatedResponse<ApiService>>('/services/public', { params }),
  getBySlug: (slug: string) =>
    api.get<ApiSingleResponse<ApiService>>(`/services/public/${slug}`),
};

// ── Downloads ─────────────────────────────────────────────────
export const downloadsApi = {
  getAll: (params?: Record<string, unknown>) =>
    api.get<ApiPaginatedResponse<ApiDownload>>('/downloads/public', { params }),
  download: (id: string) => `/api/v1/downloads/public/${id}/download`,
};

// ── Contact / Inquiry ─────────────────────────────────────────
export const contactApi = {
  submit: (form: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    company?: string;
    subject: string;
    message: string;
  }) => api.post('/inquiries/submit', form),
};
