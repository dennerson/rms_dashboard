import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';

interface DataType {
  key: string;
  location: string;
  reservation: string;
  military: string;
  miles: string;
  branch: string;
  mileage: number;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Reservation',
    dataIndex: 'reservation',
    key: 'reservation',
  },
  {
    title: 'Military Base',
    dataIndex: 'military',
    key: 'military',
  },
  {
    title: 'Miles',
    dataIndex: 'miles',
    key: 'miles',
  },
  {
    title: 'Branch Address',
    dataIndex: 'branch',
    key: 'branch',
  },
  {
    title: 'Mileage Fee',
    dataIndex: 'mileage',
    key: 'mileage',
  },
//   {
//     title: 'Miles',
//     key: 'miles',
//     dataIndex: 'miles',
//     render: (_, { tags }) => (
//       <>
//         {tags.map((tag) => {
//           let color = tag.length > 5 ? 'geekblue' : 'green';
//           if (tag === 'loser') {
//             color = 'volcano';
//           }
//           return (
//             <Tag color={color} key={tag}>
//               {tag.toUpperCase()}
//             </Tag>
//           );
//         })}
//       </>
//     ),
//   },
//   {
//     title: 'Action',
//     key: 'action',
//     render: (_, record) => (
//       <Space size="middle">
//         <a>Invite {record.name}</a>
//         <a>Delete</a>
//       </Space>
//     ),
//   },
];

const data: DataType[] = [
  {
    key: '1',
    location: 'Hatch, NM 87937, USA',
    reservation: 'No',
    military: 'No',
    miles: '45 mil',
    branch: 'Las Cruces, NM 88001, USA',
    mileage: 75.00,
  },
];

const App: React.FC = () =>
    <>
        <Table<DataType> columns={columns} dataSource={data} pagination={false}/>
        {/* <Table /> */}
    </>
    ;

export default App;
