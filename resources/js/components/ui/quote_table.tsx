import React, { useEffect, useState } from 'react';
import { Flex, Table, Typography, Card } from 'antd';
import type { TableColumnsType } from 'antd';
import Branch from '@/components/ui/BranchDropDownOption'

import axios from 'axios';

const { Text } = Typography;

interface DataType {
  key: string;
  if_repo: number;
  service_item_if_closed: string;
  service_item_if_repo: string;
  if_close: number;
  rate: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Service Item',
    dataIndex: 'service_item_if_repo',
  },
  {
    title: 'IF REPO',
    dataIndex: 'if_repo',
  },
  {
    title: 'Service Items',
    dataIndex: 'service_item_if_closed',
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
    if_repo: 120,
    service_item_if_repo: 'Non-Contigent Mileage',
    service_item_if_closed: 'Non-Contigent Mileage',
    if_close: 100,
    rate: 'NO',
  },
//   {
//     key: '2',
//     // if_repo: 100,
//     service_item_if_closed: 'REPO CLOSE ',
//     if_close: 100,
//   },
//   {
//     key: '3',
//     // if_repo: 100,
//     service_item_if_repo: 'NON-CONTIGENT MILEAGE',
//     if_close: 100,
//   },
//    {
//     key: '4',
//     // if_repo: 100,
//     service_item_if_repo: 'NON-CONTIGENT MILEAGE',
//     if_close: 100,
//   },
];

const QuoteTable: React.FC = () => {
    // const [ selectClient, setSelectClient ] = useState(null);
    const [ selectedOrderType, setSelectedOrderType] = useState(null);
    const [ selectedTwoStop, setSelectedTwoStop] = useState(null);
    const [ twoStopFee, setTwoStopFee] = useState<number | null>(null);
    const [ selectClient, setSelectClient ] = useState<typeof Option[]>([]);
    const [ clientOptions, setClientOptions] = useState<Option[]>([]);
    
    // for order type
    const [orderType, setOrderType] = useState<string | null>(null);
    const [selectedFee, setSelectedFee] = useState<number | null>(null);

    
    const onSelect = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/clients');
            const clients = response.data.data.map((clients: any) => ({
                value: clients.id,
                label: `${clients.client} @ ${clients.lienholder}`,
            }));
            console.log(response.data);
            // setSelectClient(clients);
            setClientOptions(clients);
        } catch (err) {
            console.error(err);
        }

    };

    const handleTwoStopSelect = async (value: string) => {
        if (value === 'no') {
            setTwoStopFee(null);
            return;
        }

        try {
            const response = await axios.get('http://localhost:8000/api/clients');

            const client = response.data.data.find((c: any) => c.id === Number(selectClient?.[0]));

            console.log('twoStop: ', client.two_stop_fee);
            if (client) {
                setTwoStopFee(client.two_stop_fee);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleOrderTypeSelect = async (type: string) => {
        setOrderType(type);

        if (type === 'none') {
            setSelectedFee(null);
            return;
        }

        try {
            const response = await axios.get('http://localhost:8000/api/clients');

            const client = response.data.data.find((c: any) => c.id === Number(selectClient?.[0]));

            console.log('type: ', client.voluntary_fee);
            if (!client) return;

            let fee = null;
            switch (type) {
                case 'voluntary':
                    fee = client.voluntary_fee;
                    break;
                case 'involuntary':
                    fee = client.involuntary_fee;
                    break;
                case 'impound':
                    fee = client.impound_fee;
                    break;
            }
            setSelectedFee(fee);
        } catch (err) {
            console.error(err);
        };
    };


    useEffect(() => {
        onSelect();
    }, []);

    const handleClientSelect = (value: string[]) => {
        setSelectClient(value);
    };
  return (
    <Flex vertical gap="small">
        <div className=''>
            <Card hoverable>
                <Branch
                    // clientOptions={selectClient}
                    clientOptions={clientOptions}
                    onClientSelect={handleClientSelect}
                    onOrderTypeChange={setSelectedOrderType}
                    onTwoStopSelect={handleTwoStopSelect}
                    onOrderTypeSelect={handleOrderTypeSelect}
                />
            </Card>
        </div>
        {selectedFee !== null && (
            <div className="ml-4">
                <Text strong>Order Type Fee:</Text> ${selectedFee}
            </div>
        )}

        {twoStopFee !== null && (
            <div className="ml-4">
                <Text strong>Two Stop Fee:</Text> ${twoStopFee}
            </div>
        )}
        {selectClient && selectClient.length > 0 && (
            <Table<DataType>
            bordered
            columns={columns}
            dataSource={dataSource}
            scroll={{ x: 'max-content' }}
            pagination={false}
            summary={(pageData) => {
            let totalRepo = 0;
            let totalCloseRepo = 0;
            pageData.forEach(({ if_repo, if_close }) => {
                totalRepo += if_repo;
                totalCloseRepo += if_close;
            });

            return (
                <>
                    {/* <Table.Summary.Row>
                        <Table.Summary.Cell index={0}>Total Invoice Amount</Table.Summary.Cell>
                        <Table.Summary.Cell index={1} colSpan={2}>
                        <Text type="danger">${totalRepo + totalRepo}</Text>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={2} colSpan={2}>
                        <Text type="danger">${totalCloseRepo + totalCloseRepo}</Text>
                        </Table.Summary.Cell>
                    </Table.Summary.Row> */}

                    {selectedOrderType && (
                        <Table.Summary.Row>
                            {/* repo */}
                            <Table.Summary.Cell index={0}>Reposession</Table.Summary.Cell>
                            <Table.Summary.Cell index={1} colSpan={1}>
                            <Text>{selectedOrderType}</Text>
                            </Table.Summary.Cell>
                            {/* closed */}
                            <Table.Summary.Cell index={0}>Repo Close</Table.Summary.Cell>
                            <Table.Summary.Cell index={1} colSpan={1}>
                            <Text>{selectedOrderType}</Text>
                            </Table.Summary.Cell>
                            {/* Rate */}
                            <Table.Summary.Cell index={1} colSpan={1}>
                            <Text>No</Text>
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                    )}

                    {/* <Table.Summary.Row>
                        <Table.Summary.Cell index={0}>Non-Contigent Mileage</Table.Summary.Cell>
                        <Table.Summary.Cell index={1} colSpan={1}>
                        <Text>123</Text>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={0}>Non-Contigent Mileage</Table.Summary.Cell>
                        <Table.Summary.Cell index={1} colSpan={1}>
                        <Text>123</Text>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={1} colSpan={1}>
                        <Text>No</Text>
                        </Table.Summary.Cell>
                    </Table.Summary.Row> */}

                    {selectedTwoStop && (
                        <Table.Summary.Row>
                            {/* repo two stop */}
                            <Table.Summary.Cell index={0}>Two Stop Fee</Table.Summary.Cell>
                            <Table.Summary.Cell index={1} colSpan={1}>
                            <Text>{selectedTwoStop}</Text>
                            </Table.Summary.Cell>
                            {/* close two stop */}
                            <Table.Summary.Cell index={0}>Two Stop Close</Table.Summary.Cell>
                            <Table.Summary.Cell index={1} colSpan={1}>
                            <Text>{selectedTwoStop}</Text>
                            </Table.Summary.Cell>
                            {/* rate */}
                            <Table.Summary.Cell index={1} colSpan={1}>
                            <Text>{selectedTwoStop}</Text>
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                    )}

                    <Table.Summary.Row>
                        <Table.Summary.Cell index={0}>Total Invoice Amount</Table.Summary.Cell>
                        <Table.Summary.Cell index={1} colSpan={2}>
                        <Text type="danger">${totalRepo + totalRepo}</Text>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={2} colSpan={2}>
                        <Text type="danger">${totalCloseRepo + totalCloseRepo}</Text>
                        </Table.Summary.Cell>
                    </Table.Summary.Row>
                </>
            );
            }}
        />
        )}
    </Flex>
  );
};

export default QuoteTable;
