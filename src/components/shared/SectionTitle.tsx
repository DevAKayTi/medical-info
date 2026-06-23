import { motion } from 'framer-motion';
import { cn } from '@/utils';

interface SectionTitleProps {
  tag?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  light?: boolean;
}

export default function SectionTitle({
  tag,
  title,
  subtitle,
  align = 'center',
  className,
  light = false,
}: SectionTitleProps) {
  const alignClass = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }[align];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className={cn('flex flex-col gap-3', alignClass, className)}
    >
      {tag && (
        <span className={cn(
          'inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest w-fit',
          light
            ? 'bg-primary-400/20 text-primary-200 border border-primary-400/30'
            : 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 border border-primary-100 dark:border-primary-800'
        )}>
          {tag}
        </span>
      )}
      <h2 className={cn(
        'font-heading font-bold text-3xl md:text-4xl leading-tight',
        light
          ? 'text-white'
          : 'text-gray-900 dark:text-white'
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          'text-base md:text-lg max-w-2xl leading-relaxed',
          align === 'center' ? 'mx-auto' : '',
          light
            ? 'text-primary-100'
            : 'text-gray-500 dark:text-gray-400'
        )}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
