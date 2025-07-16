import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteButton from '@/components/ui/BranchDeleteButton';

import { Table, message, Button, Flex } from 'antd';
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
        {title: 'Zipcodes', dataIndex: 'zip_code', fixed: 'left'},
        {title: 'Branch', dataIndex: 'branch_name', sorter: true},
        {title: 'Branch Zip', dataIndex: 'branch_zip'},
        {title: 'City', dataIndex: 'city'},
        {title: 'State', dataIndex: 'state'},
        {title: 'County', dataIndex: 'county'},
        {title: 'Miles', dataIndex: 'miles'},
        {title: 'Miles Incl', dataIndex: 'miles_incl'},
        {title: 'Rate', dataIndex: 'rate'},
        {title: 'Actual', dataIndex: 'actual'},
        {title: 'Rounded', dataIndex: 'rounded'},
        {title: 'Mileage Fee', dataIndex: 'mileage_fee'},
        {title: 'Reservation', dataIndex: 'reservation'},
        {title: 'Military', dataIndex: 'military'},
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
