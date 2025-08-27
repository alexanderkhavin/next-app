'use client';

import React from "react";
import { Table, useSort } from "@/shared/ui/Table";
import { CircleCheck, CircleX } from "lucide-react";

interface Application {
    id: number;
    status: 'approved' | 'notapproved';
    date: string;
    type: 'Доступ в инспекцию' | 'Учетная запись' | 'Местные ресурсы';
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
            key: 'status', header: '', sortable: true, render: (value: string) => (
                <span>
                    {value === 'approved' ? <CircleCheck /> : <CircleX />}
                </span>

            )
        }
    ]


    return <Table 
        data={sortedData} 
        columns={columns} 
        keyField="id"
        sortConfig={sortConfig}
        onSort={handleSort}
        onRowClick={(user) => console.log('User clicked:', user)}
        className="mt-6" />

}

export default React.memo(ApplicationTable);