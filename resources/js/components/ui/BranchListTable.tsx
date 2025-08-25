import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteButton from '@/components/ui/BranchDeleteButton';

import { Table, message, Button, Flex } from 'antd';
import {
    TagOutlined,
  ShopOutlined,
  HomeOutlined,
  FlagOutlined,
  ClusterOutlined,
  DashboardOutlined,
  PlusCircleOutlined,
  LineChartOutlined,
  CheckCircleOutlined,
  ReloadOutlined,
  DollarOutlined,
  PushpinOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { FilePenLine } from 'lucide-react';
import { TablePaginationConfig } from 'antd/es/table/interface';


interface Branch {
    id: string;
    zip_code: string;
    branch_name: string;
    branch_zip: string;
    city: string;
    state: string;
    county: string;
    miles: string;
    miles_incl: string;
    rate: string;
    actual: string;
    rounded: string;
    mileage_fee: string;
    reservation: string;
    military: string;

}

const BranchTable: React.FC<{ onEdit: (data:Branch) => void; refreshFlag: boolean;}> = ({ onEdit, refreshFlag }) => {
    const [branches, setBranches] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ current: 1, total: 0, pageSize: 10});

    const fetchBranch = async (page = 1, pageSize = 10) => {
        setLoading(true);
        try {
            const res = await axios.get(`/api/branches?page=${page}&pageSize=${pageSize}`);
            setBranches(res.data.data);
            setPagination({
                current: res.data.currentPage,
                pageSize: res.data.pageSize,
                total: res.data.totalRecords,
            });
        } catch (error) {
            console.error('An error occurred.', error);
            message.error('Failed to load branches');
        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBranch(pagination.current, pagination.pageSize);
    }, [refreshFlag]);

    const handleTableChange = (pagination: TablePaginationConfig) => {
        if (pagination.current && pagination.pageSize) {
            fetchBranch(pagination.current, pagination.pageSize);
        }
    };

    const columns = [
        {
            title: (
                <span className='flex items-center gap-2'>
                    <span className='text-green-500'><TagOutlined /></span>
                    <span>Zipcodes</span>
                </span>
            ),
            dataIndex: 'zip_code',
            fixed: 'left'
        },
        {
            title: (
                <span className='flex items-center gap-2'>
                    <span className='text-green-500'><ShopOutlined /></span>
                    <span>Branch</span>
                </span>
            ),
            dataIndex: 'branch_name',
            sorter: true
        },
        {
            title: (
                <span className='flex items-center gap-2'>
                    <span className='text-green-500'><TagOutlined /></span>
                    <span>Branch Zip</span>
                </span>
            ),
            dataIndex: 'branch_zip'
        },
        {
            title: (
                <span className='flex items-center gap-2'>
                    <span className='text-green-500'><HomeOutlined /></span>
                    <span>City</span>
                </span>
            ),
            dataIndex: 'city'
        },
        {
            title: (
                <span className='flex items-center gap-2'>
                    <span className='text-green-500'><FlagOutlined /></span>
                    <span>State</span>
                </span>
            ),
            dataIndex: 'state'
        },
        {
            title: (
                <span className='flex items-center gap-2'>
                    <span className='text-green-500'><ClusterOutlined /></span>
                    <span>County</span>
                </span>
            ),
            dataIndex: 'county'
        },
        {
            title: (
                <span className='flex items-center gap-2'>
                    <span className='text-green-500'><DashboardOutlined /></span>
                    <span>Miles</span>
                </span>
            ),
            dataIndex: 'miles'
        },
        {
            title: (
                <span className='flex items-center gap-2'>
                    <span className='text-green-500'><PlusCircleOutlined /></span>
                    <span>Miles Incl</span>
                </span>
            ),
            dataIndex: 'miles_incl'
        },
        {
            title: (
                <span className='flex items-center gap-2'>
                    <span className='text-green-500'><LineChartOutlined /></span>
                    <span>Rate</span>
                </span>
            ),
            dataIndex: 'rate'
        },
        {
            title: (
                <span className='flex items-center gap-2'>
                    <span className='text-green-500'><CheckCircleOutlined /></span>
                    <span>Actual</span>
                </span>
            ),
            dataIndex: 'actual'
        },
        {
            title: (
                <span className='flex items-center gap-2'>
                    <span className='text-green-500'><ReloadOutlined /></span>
                    <span>Rounded</span>
                </span>
            ),
            dataIndex: 'rounded'
        },
        {
            title: (
                <span className='flex items-center gap-2'>
                    <span className='text-green-500'><DollarOutlined /></span>
                    <span>Mileage Fee</span>
                </span>
            ),
            dataIndex: 'mileage_fee'
        },
        {
            title: (
                <span className='flex items-center gap-2'>
                    <span className='text-green-500'>< PushpinOutlined /></span>
                    <span>Reservation</span>
                </span>
            ),
            dataIndex: 'reservation'
        },
        {
            title: (
                <span className='flex items-center gap-2'>
                    <span className='text-green-500'><SafetyCertificateOutlined /></span>
                    <span>Military</span>
                </span>
            ),
            dataIndex: 'military'
        },
        {
            title: 'Actions',
            key: 'actions',
            fixed: 'right',
            width: 50,
            render: (_:any, record:any) =>
               <>
                    <Flex vertical flex="" gap="middle">
                        <Flex gap="" >
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
                                <DeleteButton zip_code={record.zip_code} onDeleted={() => fetchBranch(pagination.current, pagination.pageSize)}/>
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
            dataSource={branches}
            rowKey='zip_code'
            pagination={pagination}
            loading={loading}
            onChange={handleTableChange}
            scroll={{ x: 'max-content' }}
        />
    );
};

export default BranchTable;
