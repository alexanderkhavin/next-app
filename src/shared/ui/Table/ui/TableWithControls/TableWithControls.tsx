// components/Table/TableWithControls.tsx
'use client';

import React, { useMemo, useState } from 'react';
import TableSearch from '../TableSearch/TableSearch';
import Table from '../Table/Table';
import TablePagination from '../TablePagination/TablePagination';
import { useSort } from '../../hooks/useSort';
import { Plus } from 'lucide-react';
import {Modal} from '@/shared/ui/Modal';

interface TableWithControlsProps<T extends Record<string, any>> {
    data: T[];
    columns: any[];
    keyField: keyof T;
    className?: string;
    loading?: boolean;
    emptyMessage?: string;
    onRowClick?: (row: T) => void;

    // Контролы
    showSearch?: boolean;
    showPagination?: boolean;
    defaultPageSize?: number;
    searchFields?: (keyof T)[];
    initialSort?: {
        key: keyof T;
        direction: 'asc' | 'desc';
    };
}

const TableWithControls = <T extends Record<string, any>>({
    data,
    columns,
    keyField,
    className = '',
    loading = false,
    emptyMessage = 'No data available',
    onRowClick,

    // Контролы
    showSearch = true,
    showPagination = true,
    defaultPageSize = 10,
    searchFields,
    initialSort,
}: TableWithControlsProps<T>) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(defaultPageSize);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 1. Сначала фильтруем данные по поиску
    const filteredData = useMemo(() => {
        if (!searchTerm) return data;

        return data.filter(item => {
            if (searchFields) {
                return searchFields.some(field =>
                    String(item[field]).toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            return Object.values(item).some(value =>
                typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
    }, [data, searchTerm, searchFields]);

    // 2. Затем применяем сортировку ко всем отфильтрованным данным
    const { sortedData, sortConfig, handleSort } = useSort<T>(
        filteredData,
        initialSort || { key: null, direction: 'asc' }
    );

    // 3. И только потом применяем пагинацию к отсортированным данным
    const paginatedData = useMemo(() => {
        if (!showPagination) return sortedData;

        const startIndex = (currentPage - 1) * pageSize;
        return sortedData.slice(startIndex, startIndex + pageSize);
    }, [sortedData, currentPage, pageSize, showPagination]);

    const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));

    // Сброс страницы при изменении поиска
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    // Корректируем текущую страницу, если она стала невалидной
    React.useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [totalPages, currentPage]);

    const handlePageSizeChange = (newPageSize: number) => {
        setPageSize(newPageSize);

        // Пересчитываем текущую страницу
        const newTotalPages = Math.ceil(sortedData.length / newPageSize);
        if (currentPage > newTotalPages && newTotalPages > 0) {
            setCurrentPage(newTotalPages);
        }
    };

    return (
        <div className={className}>
            {/* Панель управления */}
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-start gap-4 flex-1'>
                    {showSearch && (
                        <div className="w-full sm:w-64">
                            <TableSearch
                                value={searchTerm}
                                onChange={setSearchTerm}
                                placeholder="Поиск по таблице..."
                            />
                        </div>
                    )}

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-700 rounded-lg text-white text-sm text-center px-3 py-2 my-2 mx-2 flex-shrink-0 min-w-[145px] h-[38px] flex items-center justify-between gap-2 cursor-pointer">
                        <Plus color="#ffffff" size={16} />
                        <span>Создать заявку</span>
                    </button>

                </div>


                {showPagination && sortedData.length > 0 && (
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        Показано {paginatedData.length} из {sortedData.length} записей
                    </div>
                )}
            </div>

            {/* Таблица */}
            <Table
                data={paginatedData}
                columns={columns}
                keyField={keyField}
                loading={loading}
                emptyMessage={emptyMessage}
                onRowClick={onRowClick}
                sortConfig={sortConfig}
                onSort={handleSort}
            />

            {/* Пагинация */}
            {showPagination && (totalPages > 1 || pageSize !== defaultPageSize) && (
                <div className="mt-4">
                    <TablePagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        pageSize={pageSize}
                        onPageSizeChange={handlePageSizeChange}
                        totalItems={sortedData.length}
                    />
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Пример модального окна"
                size="xl"
            >
                <div className="space-y-4">
                    <p className="text-gray-600 dark:text-white">
                        Это содержимое модального окна. Здесь может быть любой контент:
                        формы, текст, изображения и т.д.
                    </p>
                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mt-3">
                        <h4 className="font-medium mb-2">Дополнительная информация</h4>
                        <p className="text-sm text-gray-600 dark:text-white">
                            Модальное окно поддерживает различные размеры и автоматически
                            блокирует прокрутку фонового контента.
                        </p>
                    </div>
                </div>

                {/* Кастомный футер */}
                <div className="flex items-center gap-3 mt-3">
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 text-gray-600 dark:text-white hover:text-gray-800 transition-colors dark:hover:text-gray-200 cursor-pointer"
                    >
                        Отмена
                    </button>
                    <button
                        onClick={() => {
                            console.log('Действие выполнено!');
                            setIsModalOpen(false);
                        }}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors cursor-pointer"
                    >
                        Подтвердить
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default TableWithControls;