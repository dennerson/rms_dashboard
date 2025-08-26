import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteButton from '@/components/ui/ClientDeleteButton';

import { Button, Flex, Table, message } from 'antd';
import { FilePenLine } from 'lucide-react';
import { TablePaginationConfig } from 'antd/es/table/interface';
import {
    UserOutlined,
    BankOutlined,
    LaptopOutlined,
    DollarOutlined,
    WalletOutlined,
    CarOutlined,
    PushpinOutlined,
    SafetyCertificateOutlined,
    AppstoreOutlined,
    PauseOutlined,
    LockOutlined,
    DashboardOutlined,
    LineChartOutlined,
    CheckCircleOutlined,
    KeyOutlined,
    FileDoneOutlined,
    FileTextOutlined,
    FileProtectOutlined,
} from "@ant-design/icons";


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
    reservation_fee: string;
    reservation_fee_contracted: string;
    military_base_fee: string;
    military_base_fee_contracted: string;
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
        {
            title: (
                <span className='flex items-center gap-2'>
                    <span className='text-green-500'><UserOutlined /></span>
                    <span>Client Name</span>
                </span>
            ),
            dataIndex: 'client',
            fixed: 'left',
            sorter: true,
            width: 180,
        },
        {
            title: (
                <span className='flex items-center gap-2'>
                    <span className='text-green-500'><BankOutlined /></span>
                    <span>Lienholder</span>
                </span>
            ),
            dataIndex: 'lienholder',
            sorter: true,
            width: 180,
        },
        {
            title: (
                <span className='flex items-center gap-2'>
                    <span className='text-green-500'><LaptopOutlined /></span>
                    <span>System</span>
                </span>
            ), dataIndex: 'use_system'

        },
        {
            title: (
                <span className='flex items-center gap-2'>
                    <span className='text-green-500'><DollarOutlined /></span>
                    <span>Involuntary Fee</span>
                </span>
            ),
            dataIndex: 'involuntary_fee'

        },
        {
            title: (
                <span className='flex items-center gap-2'>
                    <span className='text-green-500'><FileDoneOutlined /></span>
                    <span>Involuntary Fee Contracted?</span>
                </span>
            ),
            dataIndex: 'involuntary_fee_contracted'

        },
        {
            title: (
                <span className='flex items-center gap-2'>
                    <span className='text-green-500'><WalletOutlined /></span>
                    <span>Voluntary Fee</span>
                </span>
            ),
            dataIndex: 'voluntary_fee'

        },
        {
            title: (
                <span className='flex items-center gap-2'>
                    <span className='text-green-500'><FileDoneOutlined /></span>
                    <span>Voluntary Fee Contracted?</span>
                </span>
            ),
            dataIndex: 'voluntary_fee_contracted'

        },
        {
            title: (
                <span className='flex items-center gap-2'>
                    <span className='text-green-500'><CarOutlined /></span>
                    <span>Impound Fee</span>
                </span>
            ),
            dataIndex: 'impound_fee'

        },
        {
            title: (
                <span className='flex items-center gap-2'>
                    <span className='text-green-500'><FileDoneOutlined /></span>
                    <span>Impound Fee Contracted?</span>
                </span>
            ),
            dataIndex: 'impound_fee_contracted'

        },
        {
            title: (
                <span className='flex items-center gap-2'>
                    <span className='text-green-500'><PushpinOutlined /></span>
                    <span>Reservation Fee</span>
                </span>
            ),
            dataIndex: 'reservation_fee'

        },
        {
            title: (
                <span className='flex items-center gap-2'>
                    <span className='text-green-500'><FileDoneOutlined /></span>
                    <span>Reservation Fee Contracted?</span>
                </span>
            ),
            dataIndex: 'reservation_fee_contracted'

        },
        {
            title: (
                <span className='flex items-center gap-2'>
                    <span className='text-green-500'><SafetyCertificateOutlined /></span>
                    <span>Military Fee</span>
                </span>
            ),
            dataIndex: 'military_base_fee'

        },
        {
            title: (
                <span className='flex items-center gap-2'>
                    <span className='text-green-500'><FileDoneOutlined /></span>
                    <span>Military Fee Contracted?</span>
                </span>
            ),
            dataIndex: 'military_base_fee_contracted'

        },
        {
            title: (
                <span className='flex items-center gap-2'>
                    <span className='text-green-500'><AppstoreOutlined /></span>
                    <span>Over Size Fee</span>
                </span>
            ),
            dataIndex: 'oversized_fee'

        },
        {
            title: (
                <span className='flex items-center gap-2'>
                    <span className='text-green-500'><FileDoneOutlined /></span>
                    <span>Over Size Contracted?</span>
                </span>
            ),
            dataIndex: 'oversized_fee_contracted'

        },
        {
            title: (
                <span className='flex items-center gap-2'>
                    <span className='text-green-500'><PauseOutlined /></span>
                    <span>Two Stop Fee</span>
                </span>
            ),
            dataIndex: 'two_stop_fee'

        },
        {
            title: (
                <span className='flex items-center gap-2'>
                    <span className='text-green-500'><FileDoneOutlined /></span>
                    <span>Two Stop Fee Contracted?</span>
                </span>
            ),
            dataIndex: 'two_stop_fee_contracted'

        },
        {
            title: (
                <span className='flex items-center gap-2'>
                    <span className='text-green-500'><LockOutlined /></span>
                    <span>Reservation Close Fee</span>
                </span>
            ),
            dataIndex: 'reservation_close_fee'

        },
        {
            title: (
                <span className='flex items-center gap-2'>
                    <span className='text-green-500'><SafetyCertificateOutlined /></span>
                    <span>Military Close Fee</span>
                </span>
            ),
            dataIndex: 'military_base_close_fee'

        },
        {
            title: (
                <span className='flex items-center gap-2'>
                    <span className='text-green-500'><AppstoreOutlined /></span>
                    <span> Oversized Close Fee</span>
                </span>
            ),
            dataIndex: 'oversized_close_fee'

        },
        {
            title: (
                <span className='flex items-center gap-2'>
                    <span className='text-green-500'><CarOutlined /></span>
                    <span>Impound Close Fee</span>
                </span>
            ),
            dataIndex: 'impound_close_fee'

        },
        {
            title: (
                <span className='flex items-center gap-2'>
                    <span className='text-green-500'><DollarOutlined /></span>
                    <span>Involuntary Close Fee</span>
                </span>
            ),
            dataIndex: 'involuntary_close_fee'

        },
        {
            title: (
                <span className='flex items-center gap-2'>
                    <span className='text-green-500'><DashboardOutlined /></span>
                    <span>Miles Included</span>
                </span>
            ),
            dataIndex: 'miles_included'

        },
        {
            title: (
                <span className='flex items-center gap-2'>
                    <span className='text-green-500'><LineChartOutlined /></span>
                    <span>Mileage Rate</span>
                </span>
            ),
            dataIndex: 'mileage_rate'

        },
        {
            title: (
                <span className='flex items-center gap-2'>
                    <span className='text-green-500'><FileDoneOutlined /></span>
                    <span>Mileage Contracted?</span>
                </span>
            ),
            dataIndex: 'mileage_contracted'

        },
        {
            title: (
                <span className='flex items-center gap-2'>
                    <span className='text-green-500'><CheckCircleOutlined /></span>
                    <span>Authorization Required?</span>
                </span>
            ),
            dataIndex: 'authorization_required'

        },
        {
            title: (
                <span className='flex items-center gap-2'>
                    <span className='text-green-500'><KeyOutlined /></span>
                    <span>Keys Required?</span>
                </span>
            ),
            dataIndex: 'keys_required'

        },
        {
            title: (
                <span className='flex items-center gap-2'>
                    <span className='text-green-500'><FileTextOutlined /></span>
                    <span>Client Forms</span>
                </span>
            ),
            dataIndex: 'client_forms'

        },
        {
            title: (
                <span className='flex items-center gap-2'>
                    <span className='text-green-500'><FileProtectOutlined /></span>
                    <span>Lienholder Forms</span>
                </span>
            ),
            dataIndex: 'lienholder_forms'

        },
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
