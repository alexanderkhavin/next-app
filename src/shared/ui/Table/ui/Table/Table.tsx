// components/Table/Table.tsx
'use client';

import React from 'react';
import { TableProps, useSort } from '@/shared/ui/Table';
import { ChevronsUpDown, ChevronUp, ChevronDown } from 'lucide-react';

const Table = <T,>({
  data,
  columns,
  keyField,
  className = '',
  loading = false,
  emptyMessage = 'No data available',
  onRowClick,
  sortConfig: externalSortConfig, // переименовываем для ясности
  onSort: externalOnSort, // переименовываем для ясности
}: TableProps<T>) => {
  // Используем внутреннюю сортировку, если не переданы внешние обработчики
  const { sortedData, sortConfig, handleSort } = useSort<T>(
    data,
    externalSortConfig || { key: null, direction: 'asc' }
  );

  const isControlled = externalOnSort && externalSortConfig;

  const handleHeaderClick = (key: keyof T) => {
    if (isControlled) {
      externalOnSort(key);
    } else {
      handleSort(key);
    }
  };

  const getSortIcon = (key: keyof T) => {
    const currentSortConfig = isControlled ? externalSortConfig : sortConfig;
    
    if (!currentSortConfig || currentSortConfig.key !== key) {
      return <ChevronsUpDown className="w-4 h-4" />;
    }
    
    return currentSortConfig.direction === 'asc' 
      ? <ChevronUp className="w-4 h-4" />
      : <ChevronDown className="w-4 h-4" />;
  };

  // Используем отсортированные данные или оригинальные, если сортировка контролируется извне
  const displayData = isControlled ? data : sortedData;

  if (loading) {
    return (
      <div className={`overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow ${className}`}>
        <div className="min-w-full">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-t-lg"></div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                <div className="h-4 bg-gray-100 dark:bg-gray-600 rounded mx-4 my-4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow ${className}`}>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700" style={{ tableLayout: 'fixed' }}>
        <colgroup>
          {columns.map((column) => (
            <col 
              key={column.key as string} 
              style={{ 
                width: column.width ? 
                  (typeof column.width === 'number' ? `${column.width}px` : column.width) 
                  : 'auto' 
              }} 
            />
          ))}
        </colgroup>
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key as string}
                scope="col"
                className={`
                  px-6 py-3 text-xs font-medium uppercase tracking-wider
                  ${column.sortable ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600' : ''}
                  ${column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : 'text-left'}
                  break-words
                  text-gray-500 dark:text-gray-300
                `}
                onClick={() => column.sortable && handleHeaderClick(column.key as keyof T)}
                style={{ 
                  width: column.width ? 
                    (typeof column.width === 'number' ? `${column.width}px` : column.width) 
                    : 'auto' 
                }}
              >
                <div className={`flex items-center ${column.align === 'center' ? 'justify-center' : column.align === 'right' ? 'justify-end' : 'justify-start'}`}>
                  <span className="break-words whitespace-normal">{column.header}</span>
                  {column.sortable && (
                    <span className="ml-1 flex-shrink-0">
                      {getSortIcon(column.key as keyof T)}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {displayData.length === 0 ? (
            <tr>
              <td 
                colSpan={columns.length} 
                className="px-6 py-24 text-center text-gray-500 dark:text-gray-400"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            displayData.map((row) => (
              <tr
                key={String(row[keyField])}
                className={`
                  transition-colors duration-150
                  ${onRowClick ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700' : ''}
                `}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns.map((column) => (
                  <td
                    key={column.key as string}
                    className={`
                      px-6 py-4 text-sm
                      ${column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : 'text-left'}
                      break-words whitespace-normal
                      text-gray-900 dark:text-gray-100
                    `}
                    style={{ 
                      width: column.width ? 
                        (typeof column.width === 'number' ? `${column.width}px` : column.width) 
                        : 'auto',
                      maxWidth: column.width ? 
                        (typeof column.width === 'number' ? `${column.width}px` : column.width) 
                        : 'none'
                    }}
                  >
                    <div className="whitespace-normal break-words">
                      {column.render
                        ? column.render(row[column.key as keyof T], row)
                        : String(row[column.key as keyof T] || '')}
                    </div>
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;