import { useState, useMemo } from 'react';
import { debounce } from '@/utils';

export function useSearch<T extends Record<string, unknown>>(
  items: T[],
  searchKeys: (keyof T)[]
) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter((item) =>
      searchKeys.some((key) => {
        const val = item[key];
        if (typeof val === 'string') return val.toLowerCase().includes(q);
        if (Array.isArray(val)) return val.some((v) => typeof v === 'string' && v.toLowerCase().includes(q));
        return false;
      })
    );
  }, [items, query, searchKeys]);

  return { query, setQuery, filtered };
}
