import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteButton from '@/components/ui/ClientDeleteButton';

import { Button, Flex, Table, message } from 'antd';
import { FilePenLine } from 'lucide-react';
import { TablePaginationConfig } from 'antd/es/table/interface';


interface Client {
    id: string;
    client: string;
    lienholder: string;
    use_system: string;
    involuntary_fee: string;
    involuntary_fee_contracted: string;
    voluntary_fee: string;
    voluntary_fee_contracted: string;
    impound_fee: string;
    impound_fee_contracted: string;
    military_base_fee: string;
    military_base_fee_contracted: string;
    reservation_fee: string;
    reservation_fee_contracted: string;
    oversized_fee: string;
    oversized_fee_contracted: string;
    two_stop_fee: string;
    two_stop_fee_contracted: string;
    reservation_close_fee: string;
    military_close_fee: string;
    oversized_close_fee: string;
    impound_close_fee: string;
    involuntary_close_fee: string;
    miles_included: string;
    mileage_rate: string;
    mileage_contracted: string;
    authorization_required: string;
    keys_required: string;
    client_forms: string;
    lienholder_forms: string;

}

const ClientTable: React.FC<{ onEdit: (data:Client) => void; refreshFlag: boolean;}> = ({ onEdit, refreshFlag }) => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ current: 1, total: 0, pageSize: 10});

    const fetchClients = async (page = 1, pageSize = 10) => {
        setLoading(true);
        try {
            const res = await axios.get(`/api/clients?page=${page}&pageSize=${pageSize}`);
            setClients(res.data.data);
            console.log('editing: ',res);
            setPagination({
                current: res.data.currentPage,
                pageSize: res.data.pageSize,
                total: res.data.totalRecords,
            });
        } catch (error) {
            console.error('An error occurred.', error);
            message.error('Failed to load clients');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClients(pagination.current, pagination.pageSize);
    }, [refreshFlag]);

    const handleTableChange = (pagination: TablePaginationConfig) => {
        if (pagination.current && pagination.pageSize) {
            fetchClients(pagination.current, pagination.pageSize);
        }
    };

    const columns = [
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
            title: 'Actions',
            key: 'actions',
            fixed: 'right',
            width: 50,
            render: (_:any, record:any) =>
               <>
                    {/* <div className='flex gap-2'>
                        <a onClick={() => onEdit(record)}><FilePenLine size={18}/></a>
                        <DeleteButton clientId={record.id} onDeleted={() => fetchClients(pagination.current, pagination.pageSize)}/>
                    </div> */}

                    <Flex vertical gap="middle">
                        <Flex>
                            <Button
                            color='blue'
                            variant='text'
                            size='small'
                            >
                                <a onClick={() => onEdit(record)}><FilePenLine size={18}/></a>
                            </Button>

                            <Button
                            color='volcano'
                            variant='text'
                            size='small'
                            >
                                <DeleteButton clientId={record.id} onDeleted={() => fetchClients(pagination.current, pagination.pageSize)}/>
                            </Button>
                        </Flex>
                    </Flex>
               </>

        },
    ];
    return (
        <Table
            className='text-center'
            columns={columns}
            dataSource={clients}
            rowKey='id'
            pagination={pagination}
            loading={loading}
            onChange={handleTableChange}
            scroll={{ x: 'max-content' }}
        />
    );
};

export default ClientTable;
