import React, { useState, useEffect } from 'react';
import { Table, message } from 'antd';
import type { TableColumnsType } from 'antd';
import { FilePenLine } from 'lucide-react';
import axios from 'axios';

import DeleteButton from '@/components/ui/delete_button';


const ClientsTable = ({ refreshFlag, onRefresh }) => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ current: 1, total: 0, pageSize: 10 });

    const fetchClients = async (page = 1, pageSize = 10) => {
        setLoading(true);
        try {
            const res = await axios.get(`/api/clients?page=${page}&pageSize=${pageSize}`);
            console.log(res);
            setClients(res.data.data);
            setPagination({
                current: res.data.currentPage,
                pageSize: res.data.pageSize,
                total: res.data.totalRecords,
            });
        }catch (error) {
            message.error('Failed to load clients');
            console.error(error);
        }finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClients(pagination.current, pagination.pageSize);
    }, [refreshFlag]);

    const handleTableChange = (pagination) => {
        fetchClients(pagination.current, pagination.pageSize);
    };

    interface DataType {
        key: React.Key;
        client: string;
        lienholder:string;
        use_system: string;
    }

    const columns: TableColumnsType<DataType> = [
        {title: 'Client Name', dataIndex: 'client', fixed: 'left'},
        {title: 'Lienholder Name', dataIndex: 'lienholder', sorter: true},
        {title: 'System', dataIndex: 'use_system'},
        {title: 'Involuntary Fee', dataIndex: 'involuntary_fee'},
        {title: 'Involuntary Fee Contracted?', dataIndex: 'involuntary_fee_contracted'},
        {title: 'Voluntary Fee', dataIndex: 'voluntary_fee'},
        {title: 'Voluntary Fee Contracted?', dataIndex: 'voluntary_fee_contracted'},
        {title: 'Impound Fee', dataIndex: 'impound_fee'},
        {title: 'Impound Fee Contracted?', dataIndex: 'impound_fee_contracted'},
        {title: 'Military Fee', dataIndex: 'military_base_fee'},
        {title: 'Military Fee Contracted?', dataIndex: 'military_base_fee_contracted'},
        {title: 'Reservation Fee', dataIndex: 'reservation_fee'},
        {title: 'Reservation Fee Contracted?', dataIndex: 'reservation_fee_contracted'},
        {title: 'Over Size', dataIndex: 'oversized_fee'},
        {title: 'Over Size Contracted?', dataIndex: 'oversized_fee_contracted'},
        {title: 'Two Stop Fee', dataIndex: 'two_stop_fee'},
        {title: 'Two Stop Fee Contracted?', dataIndex: 'two_stop_fee_contracted'},
        {title: 'Reservation Close Fee', dataIndex: 'reservation_close_fee'},
        {title: 'Military Close Fee', dataIndex: 'military_base_close_fee'},
        {title: 'OverSized Close Fee', dataIndex: 'oversized_close_fee'},
        {title: 'Impound Close Fee', dataIndex: 'impound_close_fee'},
        {title: 'Involuntary Close Fee', dataIndex: 'involuntary_close_fee'},
        {title: 'Miles Included', dataIndex: 'miles_included'},
        {title: 'Mileage Rate', dataIndex: 'mileage_rate'},
        {title: 'Mileage Contracted?', dataIndex: 'mileage_contracted'},
        {title: 'Authorization Required?', dataIndex: 'authorization_required'},
        {title: 'Keys Required?', dataIndex: 'keys_required'},
        {title: 'Client Forms', dataIndex: 'client_forms'},
        {title: 'Lienholder Forms', dataIndex: 'lienholder_forms'},
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: (_:any, record:any) =>
                <>
                    <div className='flex'>
                        <a href="#" className='mr-2'><FilePenLine size={18} color="#0d61e7"/></a>
                        {/* <ClientForm /> */}

                        <DeleteButton
                            clientId={record.id}
                            // onDelete={() => fetchClients(pagination.current, pagination.pageSize)}
                            onDeleted={onRefresh}
                        />
                    </div>
                </>,
        },
    ];

    return (
        <>
            <div>
                <Table<DataType>
                    columns={columns}
                    dataSource={clients}
                    rowKey="id"
                    loading={loading}
                    pagination={pagination}
                    onChange={handleTableChange}
                    scroll={{ x: 'max-content' }}
                />
            </div>
        </>
    );
};

export default ClientsTable;
