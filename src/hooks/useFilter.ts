import { useState, useMemo } from 'react';

export function useFilter<T>(items: T[], filterFn: (item: T, activeFilters: string[]) => boolean) {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const clearFilters = () => setActiveFilters([]);

  const filtered = useMemo(() => {
    if (activeFilters.length === 0) return items;
    return items.filter((item) => filterFn(item, activeFilters));
  }, [items, activeFilters, filterFn]);

  return { activeFilters, toggleFilter, clearFilters, filtered };
}
