import React from 'react';
import { Flex, Table, Typography, Card } from 'antd';
import type { TableColumnsType } from 'antd';
const { Text } = Typography;

interface DataType {
  key: string;
  location: string;
  reservation: string;
  military_base: string;
  miles: string;
  branch_address: string;
  mileage_fee: string;
}
const columns: TableColumnsType<DataType> = [
  {
    title: 'Zip Location',
    dataIndex: 'location',
  },
  {
    title: 'Reservation',
    dataIndex: 'reservation',
  },
  {
    title: 'Military Base',
    dataIndex: 'military_base',
  },
  {
    title: 'Miles',
    dataIndex: 'miles',
  },
  {
    title: 'Branch Address',
    dataIndex: 'branch_address',
  },
  {
    title: 'Mileage Fee',
    dataIndex: 'mileage_fee',
  },
  {
    title: 'Mileage Fee',
    dataIndex: 'mileage_fee',
  },
  {
    title: 'Mileage Fee',
    dataIndex: 'mileage_fee',
  },
  {
    title: 'Mileage Fee',
    dataIndex: 'mileage_fee',
  },
  {
    title: 'Mileage Fee',
    dataIndex: 'mileage_fee',
  },
  {
    title: 'Mileage Fee',
    dataIndex: 'mileage_fee',
  },
  {
    title: 'Mileage Fee',
    dataIndex: 'mileage_fee',
  },
  {
    title: 'Mileage Fee',
    dataIndex: 'mileage_fee',
  },
  {
    title: 'Mileage Fee',
    dataIndex: 'mileage_fee',
  },
];

const dataSource: DataType[] = [
  {
    key: '1',
    location: 'CLovis,NM 88103,USA',
    reservation: 'No',
    military_base: 'Yes',
    miles: '11.8 mi',
    branch_address: 'Clovis, NM 88101',
    mileage_fee: '$0.00',
  },
];

// const fixedColumns: TableColumnsType<FixedDataType> = [
//   {
//     title: 'Name',
//     dataIndex: 'name',
//     fixed: true,
//     width: 100,
//   },
//   {
//     title: 'Description',
//     dataIndex: 'description',
//   },
// ];

// const fixedDataSource = Array.from({ length: 20 }).map<FixedDataType>((_, i) => ({
//   key: i,
//   name: ['Light', 'Bamboo', 'Little'][i % 3],
//   description: 'Everything that has a beginning, has an end.',
// }));

const App: React.FC = () => {
//   const { styles } = useStyle();
  return (
    <Flex vertical gap="small">
      <Table<DataType>
        bordered
        // className={styles.customTable}
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        scroll={{ x: 'max-content' }}
        summary={(pageData) => {
          let totalBorrow = 0;
          let totalRepayment = 0;
        //   pageData.forEach(({ if_repo, if_close }) => {
        //     totalBorrow += if_repo;
        //     totalRepayment += if_close;
        //   });

          return (
            <>
              <Table.Summary.Row>
                {/* <Table.Summary.Cell index={0}>Total Invoice Amount</Table.Summary.Cell> */}
                {/* <Table.Summary.Cell index={1} colSpan={2}>
                  <Text type="danger">${totalBorrow - totalRepayment}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2} colSpan={2}>
                  <Text type="danger">${totalBorrow - totalRepayment}</Text>
                </Table.Summary.Cell> */}
              </Table.Summary.Row>
            </>
          );
        }}
      />
    </Flex>
  );
};

export default App;
