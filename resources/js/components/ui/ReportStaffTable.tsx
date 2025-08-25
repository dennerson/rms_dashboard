import React from 'react';
import { Card, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { Trash2, FilePenLine } from 'lucide-react';

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

const columns: TableColumnsType<DataType> = [
  {
    title: 'Client', //can we get the IP of the client?
    width: 100,
    dataIndex: 'client',
    key: 'client',
    // fixed: 'left',
  },
  {
    title: 'Zip',
    width: 100,
    dataIndex: 'zip',
    key: 'zip',
    // fixed: 'left',
  },
  {
    title: 'Location',
    dataIndex: 'location',
    key: '1',
    width: 150,
  },
  {
    title: 'Miles',
    dataIndex: 'miles',
    key: '2',
    width: 150,
  },
  {
    title: 'Branch zip',
    dataIndex: 'branch_zip',
    key: '3',
    width: 150,
  },
  {
    title: 'Branch location',
    dataIndex: 'branch_location',
    key: '4',
    width: 150,
  },
  {
    title: 'Mileage',
    dataIndex: 'mileage',
    key: '5',
    width: 150,
  },
  {
    title: 'Vin',
    dataIndex: 'vin',
    key: '6',
    width: 150,
  },
  {
    title: 'Size',
    dataIndex: 'size',
    key: '7',
    width: 150,
  },
  {
    title: 'Zone',
    dataIndex: 'zone',
    key: '8',
    width: 150,
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: '9',
    width: 150,
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
    size: 'standard',
    zone: 'military',
    date: '2025-08-14 07:57:53',
}));

const App: React.FC = () => {
  return (
    <>
        <div className='mb-4'>
            <Card title='Staff'  size='small' hoverable>
                <Table<DataType>
                    columns={columns}
                    dataSource={dataSource}
                    scroll={{ x: 'max-content', y: 50 * 5 }}
                />
            </Card>
        </div>
    </>
  );
};

export default App;
