import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm">
      <Link
        to="/"
        className="flex items-center gap-1 text-primary-300 hover:text-white transition-colors"
      >
        <Home size={14} />
        <span className="hidden sm:inline">Home</span>
      </Link>

      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1.5">
          <ChevronRight size={14} className="text-primary-400 flex-shrink-0" />
          {item.href && index < items.length - 1 ? (
            <Link
              to={item.href}
              className="text-primary-300 hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-white font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
