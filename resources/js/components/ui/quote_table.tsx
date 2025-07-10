import React from 'react';
import { Flex, Table, Typography, Card } from 'antd';
import type { TableColumnsType } from 'antd';
import Branch from '@/components/ui/branch_dropdown_options'

const { Text } = Typography;

interface DataType {
  key: string;
  if_repo: number;
  service_item: string;
  if_close: number;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Service Item',
    dataIndex: 'service_item',
  },
  {
    title: 'IF REPO',
    dataIndex: 'if_repo',
  },
  {
    title: 'Service Item',
    dataIndex: 'service_item',
  },
  {
    title: 'IF Closed',
    dataIndex: 'if_close',
  },
  {
    title: 'Rate Pre-Approved',
    dataIndex: 'rate',
  },
];

const dataSource: DataType[] = [
  {
    key: '1',
    if_repo: 1020,
    service_item: 'REPO CLOSE',
    if_close: 100,
  },
  {
    key: '2',
    if_repo: 150,
    service_item: 'NON-CONTIGENT MILEAGE',
    if_close: 100,
  },
  {
    key: '3',
    if_repo: 1000,
    service_item: 'OVERSIZED CLOSE',
    if_close: 100,
  },
  {
    key: '4',
    if_repo: 300,
    service_item: 'TWO STOP CLOSE',
    if_close: 100,
  },
];

const App: React.FC = () => {
//   const { styles } = useStyle();
  return (
    <Flex vertical gap="small">
        <div className=''>
            <Card hoverable>
                <Branch />
            </Card>
        </div>
      <Table<DataType>
        bordered
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: 'max-content' }}
        pagination={false}
        summary={(pageData) => {
          let totalBorrow = 0;
          let totalRepayment = 0;
          pageData.forEach(({ if_repo, if_close }) => {
            totalBorrow += if_repo;
            totalRepayment += if_close;
          });

          return (
            <>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>Total Invoice Amount</Table.Summary.Cell>
                <Table.Summary.Cell index={1} colSpan={2}>
                  <Text type="danger">${totalBorrow - totalRepayment}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2} colSpan={2}>
                  <Text type="danger">${totalBorrow - totalRepayment}</Text>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          );
        }}
      />
    </Flex>
  );
};

export default App;
