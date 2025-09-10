// components/Table/TableWithControls.tsx
'use client';

import React, { useMemo, useState } from 'react';
import TableSearch from '../TableSearch/TableSearch';
import Table from '../Table/Table';
import TablePagination from '../TablePagination/TablePagination';
import { useSort } from '../../hooks/useSort';
import { Plus } from 'lucide-react';
import { Modal } from '@/shared/ui/Modal';
import { requestTypes } from './mock';
import { Field } from '@/shared/ui/Modal/types/modal';

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
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};
        const type = requestTypes.find(t => t.id === selectedType);

        if (type) {
            type.fields.forEach(field => {
                if (field.required && !formData[field.name]?.trim()) {
                    newErrors[field.name] = 'Это поле обязательно для заполнения';
                }
            });
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (selectedType && validateForm()) {
            /*onSubmit({
              type: selectedType,
              ...formData,
              createdAt: new Date().toISOString()
            });*/
            setSelectedType(null);
            setFormData({});
            setErrors({});
        }
    };

    const renderField = (field: Field) => {
        const error = errors[field.name];
        switch (field.type) {
            case 'textarea':
                return (
                    <textarea
                        className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                            }`}
                        rows={3}
                        value={formData[field.name] || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                        placeholder={field.label}
                    />
                );
            case 'select':
                return (
                    <select
                        className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                            }`}
                        value={formData[field.name] || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                    >
                        <option value="">Выберите...</option>
                        {field.options?.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                );
            case 'number':
                return (
                    <input
                        type="number"
                        className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                            }`}
                        value={formData[field.name] || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                        placeholder={field.label}
                    />
                );
            default:
                return (
                    <input
                        type="text"
                        className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                            }`}
                        value={formData[field.name] || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                        placeholder={field.label}
                    />
                );
        }
    };

    const renderFormFields = () => {
        const type = requestTypes.find(t => t.id === selectedType);
        if (!type) return null;
        return (
            <div className="mt-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {type.title}
                </h3>

                {type.fields.map((field) => (
                    <div key={field.name}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {field.label}
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        {renderField(field)}
                        {errors[field.name] && (
                            <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
                        )}
                    </div>
                ))}
                <div className="flex gap-2 mt-6">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Создать заявку
                    </button>
                    <button
                        onClick={() => {
                            setSelectedType(null);
                            setFormData({});
                            setErrors({});
                        }}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                    >
                        Назад
                    </button>
                </div>
            </div>
        );
    };

    // 1. Фильтруем данные по поиску
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
                        className="bg-blue-700 hover:bg-blue-600 rounded-lg text-white text-sm text-center px-3 py-2 my-2 mx-2 flex-shrink-0 min-w-[145px] h-[38px] flex items-center justify-between gap-2 cursor-pointer transition-all duration-200 ease-in-out">
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
                title={selectedType ? 'Создание заявки' : 'Выбор типа заявки'}
                size="xl"
                onSubmit={() => handleSubmit()}
            >
                {!selectedType ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {requestTypes.map((type) => (
                            <div
                                key={type.id}
                                onClick={() => setSelectedType(type.id)}
                                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 cursor-pointer hover:border-blue-300 dark:hover:border-blue-600 transition-colors hover:shadow-md"
                            >
                                <div className="flex items-center mb-2">
                                    <span className="text-2xl mr-3">{type.icon}</span>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">
                                        {type.title}
                                    </h3>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    {type.description}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    renderFormFields()
                )}
            </Modal>
        </div>
    );
};

export default TableWithControls;