'use client';

import React from "react";
import { Table, TableWithControls, useSort } from "@/shared/ui/Table";
import { Badge } from '@/shared/ui/Badge'
import { CircleCheck, CircleX, Pencil, Printer, Trash2 } from "lucide-react";

interface Application {
    id: number;
    status: string;
    date: string;
    type: string;
    branch: string;
    signer: string;
}

const ApplicationTable: React.FC<{ applications: Application[] }> = ({ applications }) => {
    const { sortedData, sortConfig, handleSort } = useSort<Application>(applications, {
        key: 'date',
        direction: 'asc'
    })

    const columns = [
        {
            key: 'status',
            header: 'Статус',
            sortable: true,
            render: (value: string) => (
                <span>
                    {value === 'approved' ? <Badge variant={"success"} size="lg">Утверждена</Badge> : <Badge variant={"danger"} size="lg">Не утверждена</Badge>}
                </span>

            ),
        },
        {
            key: 'date',
            header: 'Дата',
            sortable: true,
            render: (value: string) => (
                <span>{new Date(value).toLocaleDateString()}</span>
            )
        },
        {
            key: 'type',
            header: 'Название',
            sortable: true,
        },
        {
            key: 'branch',
            header: 'Подразделение',
            sortable: true,
            width: 300
        },
        {
            key: 'signer',
            header: 'Кем утвержден',
            sortable: true,
        },

        {
            key: '',
            header: '',
            render: () => (
                <div className="justify-end flex flex-row gap-2">
                    <Pencil size={20} color="#3e00ff" /> 
                    <Printer size={20} color="#07d942" /> 
                    <Trash2 size={20} color="#d05858" />
                </div>
            )
        }
    ]


    return (
        <TableWithControls
            data={applications}
            columns={columns}
            keyField="id"
            onRowClick={(application) => console.log('Application clicked:', application)}
            showSearch={true}
            showPagination={true}
            defaultPageSize={10}
            searchFields={['date','type', 'branch', 'signer']} // Поля для поиска
            className="mt-6"
        />
    );

}

export default React.memo(ApplicationTable);