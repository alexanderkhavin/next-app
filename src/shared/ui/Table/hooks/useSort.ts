'use client';

import { useState, useMemo } from 'react';
import { SortConfig } from '../types/table';

export const useSort = <T,>(
  data: T[],
  initialConfig: SortConfig<T> = { key: null, direction: 'asc' }
) => {
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>(initialConfig);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key!];
      const bValue = b[sortConfig.key!];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  const handleSort = (key: keyof T) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  return {
    sortedData,
    sortConfig,
    handleSort,
  };
};