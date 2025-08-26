import React from 'react';
import { Card, Table, Button, Space } from 'antd';
// import type { TableColumnsType } from 'antd';
import { ExportOutlined,
    AuditOutlined,
    UsergroupAddOutlined,
    CalendarOutlined,
    TagOutlined,
    EnvironmentOutlined,
    DashboardOutlined,
    ShopOutlined,
    CarOutlined,
    KeyOutlined,
    AppstoreOutlined,
    GlobalOutlined, } from '@ant-design/icons';
// import { Trash2, FilePenLine } from 'lucide-react';

// import Staff from '@/components/ui/ReportStaffTable'

interface DataType {
  key: React.Key;
  client: string;
  zip: number;
  location: string;
  miles: string;
  branch_zip: number;
  branch_location: string;
  mileage: string;
  vin: string;
  size: string;
  zone: string;
  date: string;
}

const dataSource = Array.from({ length: 5 }).map<DataType>((_, i) => ({
    key: i,
    client: `Edward King ${i}`,
    zip: 12540,
    location: `London, Park Lane no. ${i}`,
    miles: '60 mi',
    branch_zip: 87504,
    branch_location: 'somewhere-someplace',
    mileage: '$ 250.00',
    vin: '54T875S5F45R6G325',
    size: 'oversized',
    zone: 'reservation ',
    date: '2025-08-14 07:57:53',
}));

const ReportTable: React.FC = () => {

    const columns = [
        {
            title: (
                <span className="flex items-center gap-2">
                    <span className="text-green-500"><UsergroupAddOutlined /></span>
                    <span>Client</span>
                </span>
            ), //can we get the IP of the client?
            width: 120,
            dataIndex: 'client',
            key: 'client',
        },
        {
            title: (
                <span className="flex items-center gap-2">
                    <span className="text-green-500"><TagOutlined /></span>
                    <span>Zip</span>
                </span>
            ),
            width: 80,
            dataIndex: 'zip',
            key: 'zip',
            // fixed: 'left',
        },
        {
            title: (
                <span className="flex items-center gap-2">
                    <span className="text-green-500"><EnvironmentOutlined /></span>
                    <span>Location</span>
                </span>
            ),
            dataIndex: 'location',
            key: '1',
            width: 200,
        },
        {
            title: (
                <span className="flex items-center gap-2">
                    <span className="text-green-500"><DashboardOutlined /></span>
                    <span>Miles</span>
                </span>
            ),
            dataIndex: 'miles',
            key: '2',
            width: 90,
        },
        {
            title: (
                <span className="flex items-center gap-2">
                    <span className="text-green-500"><TagOutlined /></span>
                    <span>Branch Zip</span>
                </span>
            ),
            dataIndex: 'branch_zip',
            key: '3',
            width: 120,
        },
        {
            title: (
                <span className="flex items-center gap-2">
                    <span className="text-green-500"><ShopOutlined /></span>
                    <span>Branch Location</span>
                </span>
            ),
            dataIndex: 'branch_location',
            key: '4',
            width: 180,
        },
        {
            title: (
                <span className="flex items-center gap-2">
                    <span className="text-green-500"><CarOutlined /></span>
                    <span>Mileage</span>
                </span>
            ),
            dataIndex: 'mileage',
            key: '5',
            width: 100,
        },
        {
            title: (
                <span className="flex items-center gap-2">
                    <span className="text-green-500"><KeyOutlined /></span>
                    <span>Vin</span>
                </span>
            ),
            dataIndex: 'vin',
            key: '6',
            width: 150,
        },
        {
            title: (
                <span className="flex items-center gap-2">
                    <span className="text-green-500"><AppstoreOutlined /></span>
                    <span>Size</span>
                </span>
            ),
            dataIndex: 'size',
            key: '7',
            width: 90,
        },
        {
            title: (
                <span className="flex items-center gap-2">
                    <span className="text-green-500"><GlobalOutlined /></span>
                    <span>Zone</span>
                </span>
            ),
            dataIndex: 'zone',
            key: '8',
            width: 100,
        },
        {
            title: (
                <span className="flex items-center gap-2">
                    <span className="text-green-500"><CalendarOutlined /></span>
                    <span>Date</span>
                </span>
            ),
            dataIndex: 'date',
            key: '9',
            width: 160,
        },
        //   {
        //     title: 'Action',
        //     key: 'operation',
        //     fixed: 'right',
        //     width: 100,
        //     render: () =>
        //         <>
        //             <div className='flex'>
        //                 <a href="#" className='mr-2'><FilePenLine size={18} color="#0d61e7"/></a>
        //                 <a href="#"><Trash2 size={18} color="#e70d0d"/></a>
        //             </div>
        //         </>,
        //   },
    ];

    return (
        <>
            <div className='mb-4'>
                <div className='flex flex-wrap md:flex-nowrap gap-4 mb-4'>
                    <div className='flex-1 min-w-[200px]'>
                        <h3 className='flex'><i><AuditOutlined /></i>Search Details </h3>
                    </div>
                    <Button className=''><i><ExportOutlined /></i>export Excel</Button>
                </div>
                <Card title=''  size='small' hoverable>
                    <Table<DataType>
                        columns={columns}
                        dataSource={dataSource}
                        scroll={{ x: 'max-content', y: 50 * 5 }}
                        pagination={false}
                    />
                </Card>
            </div>
            <div className=''>
                {/* <Staff /> */}
            </div>
        </>
    );
};

export default ReportTable;
