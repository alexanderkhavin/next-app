// shared/ui/Table/index.ts
export { default as Table } from './ui/Table/Table';
export { default as TableWithControls } from './ui/TableWithControls/TableWithControls';
export { default as TablePagination } from './ui/TablePagination/TablePagination';
export { default as TableSearch } from './ui/TableSearch/TableSearch';
export { useSort } from './hooks/useSort';
export type { TableProps, Column, SortConfig, TableControlsProps } from './types/table';