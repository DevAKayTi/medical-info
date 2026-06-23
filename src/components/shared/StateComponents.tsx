import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  fullPage?: boolean;
}

export function LoadingState({ message = 'Loading...', fullPage = false }: LoadingStateProps) {
  if (fullPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center">
            <Loader2 className="text-white animate-spin" size={24} />
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-24">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="text-primary-600 animate-spin" size={32} />
        <p className="text-gray-500 dark:text-gray-400 text-sm">{message}</p>
      </div>
    </div>
  );
}

interface ErrorStateProps {
  title?: string;
  message?: string;
  action?: { label: string; onClick: () => void };
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'We encountered an error. Please try again.',
  action,
}: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24 px-4 text-center"
    >
      <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
        <span className="text-red-500 text-2xl">⚠</span>
      </div>
      <h3 className="font-heading font-semibold text-gray-900 dark:text-white text-xl mb-2">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-6">{message}</p>
      {action && (
        <button onClick={action.onClick} className="btn-primary">
          {action.label}
        </button>
      )}
    </motion.div>
  );
}

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  action?: { label: string; onClick: () => void };
}

export function EmptyState({
  title = 'No results found',
  message = 'Try adjusting your search or filters.',
  icon,
  action,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 px-4 text-center"
    >
      <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-5">
        {icon || <span className="text-4xl">🔍</span>}
      </div>
      <h3 className="font-heading font-semibold text-gray-900 dark:text-white text-lg mb-2">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-6 text-sm">{message}</p>
      {action && (
        <button onClick={action.onClick} className="btn-secondary">
          {action.label}
        </button>
      )}
    </motion.div>
  );
}

export function SkeletonCard() {
  return (
    <div className="card p-5 animate-pulse">
      <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-3/4" />
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-1 w-full" />
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
    </div>
  );
}
