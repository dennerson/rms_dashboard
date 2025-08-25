import React, { useEffect, useState } from 'react';
import { Flex, Table, Typography, Card } from 'antd';
import type { TableColumnsType } from 'antd';
import Branch from '@/components/ui/BranchDropDownOption';
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

interface QuoteTableProps {
    distanceData: {
        isTribal: boolean;
        isMilitary: boolean;
        is_oversized: string;
        oversized_fee?: number;
        oversized_close_fee?: number;
        client: string;
        lienholder: string;
    } | null;
    // loading: boolean;
    formSubmitted: boolean;
    clientSelected: boolean;
    setClientSelected: (value: boolean) => void;
}

// const QuoteTable: React.FC = () => {
const QuoteTable: React.FC<QuoteTableProps> = ({ distanceData, formSubmitted, clientSelected, setClientSelected }) => {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [selectedOrderType, setSelectedOrderType] = useState<string | null>(null);

  const [selectedTwoStop, setSelectedTwoStop] = useState<number | null>(null);
  const [selectedTwoStopRate, setSelectedTwoStopRate] = useState<string | null>(null);
  const [selectedTwoStopClose, setSelectedTwoStopClose] = useState<number | null>(null);

  const [selectClient, setSelectClient] = useState<string[]>([]);
  const [clientOptions, setClientOptions] = useState<{ value: number; label: string }[]>([]);

  const [selectedFeeFromOrderTypeRepo, setSelectedFeeFromOrderTypeRepoRepo] = useState<number | null>(null);
  const [selectedFeeFromOrderTypeClose, setSelectedFeeFromOrderTypeRepoClose] = useState<number | null>(null)
  const [selectedFeeFromOrderTypeRate, setSelectedFeeFromOrderTypeRate] = useState<string | null>(null);

  const [clientFees, setClientFees] = useState<any | null>(null);
  const [oversizedFee, setOverSizedFee] = useState<any | null>(null);


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
            title: 'Service Item',
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

    const fetchClients = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/clients');
            const clients = response.data.data.map((client: any) => ({
                value: client.id,
                label: `${client.client} @ ${client.lienholder}`,
            }));

            setClientOptions(clients);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const handleClientSelect = async (value: string[]) => {
        setSelectClient(value);

        try {
            const response = await axios.get('http://localhost:8000/api/clients');
            const client = response.data.data.find((c: any) => c.id === Number(value[0]));

            if (client) {
                const mileageResponse = await axios.get('http://localhost:8000/api/mileage-fee');
                const mileageFee = mileageResponse.data?.data.mileageFee;
                const rows: DataType[] = [
                    {
                        key: client.id.toString(),
                        if_repo: mileageFee,
                        if_close: mileageFee,
                        service_item_if_repo: 'Non-Contingent Mileage',
                        service_item_if_closed: 'Non-Contingent Mileage',
                        rate: 'No',
                    },
                ];
                setDataSource(rows);
            }
        } catch (error) {
            console.error('Error fetching client info:', error);
        }
    };

    const handleOrderTypeSelect = async (type: string) => {
        setSelectedOrderType(type);

        if (type === 'none') {
            setSelectedFeeFromOrderTypeRepoRepo(null);
            return;
        }

        try {
            const response = await axios.get('http://localhost:8000/api/clients');
            const client = response.data.data.find((c: any) => c.id === Number(selectClient?.[0]));

            let fee = null;
            let close = null;
            let rate = null;
            switch (type) {
                case 'voluntary':
                    fee = client?.voluntary_fee;
                    close = client?.involuntary_close_fee;
                    rate = client?.involuntary_fee_contracted;
                    break;
                case 'involuntary':
                    fee = client?.involuntary_fee;
                    close = client?.involuntary_close_fee;
                    rate = client?.involuntary_fee_contracted;
                    break;
                case 'impound':
                    fee = client?.impound_fee;
                    close = client?.involuntary_close_fee;
                    rate = client?.involuntary_fee_contracted;
                    break;
            }
            setSelectedFeeFromOrderTypeRepoRepo(fee);
            setSelectedFeeFromOrderTypeRepoClose(close);
            setSelectedFeeFromOrderTypeRate(rate);
        } catch (err) {
            console.error(err);
        }
    };

    const handleTwoStopSelect = async (value: string) => {
        if (value === 'no') {
            setSelectedTwoStop(null);
            setSelectedTwoStopRate(null);
            setSelectedTwoStopClose(null);
            return;
        }

        try {
            const response = await axios.get('http://localhost:8000/api/clients');
            const client = response.data.data.find((c: any) => c.id === Number(selectClient?.[0]));

            if (client) {
                setSelectedTwoStop(client.two_stop_fee ?? null);
                setSelectedTwoStopRate(client.two_stop_fee_contracted ?? null);
                setSelectedTwoStopClose(client.impound_close_fee ?? null);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const fetchFees = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/clients');
                const clients = response.data.data;
                const selectedClientData = clients.find(c => c.id === Number(selectClient?.[0]));

                setClientFees(selectedClientData);
            } catch (error) {
                console.error('Error fetching tribal and military fees:', error);
            }
        };
        if (distanceData?.isTribal || distanceData?.isMilitary) {
            fetchFees();
        }
        const fetchOversizedFee = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/clients');
                const clients = response.data.data;
                const selectedClientData = clients.find(c => c.id === Number(selectClient?.[0]));

                setOverSizedFee(selectedClientData);
            } catch (error) {
                console.error('Error fetching oversized fees:', error);
            }
        };
        if ( distanceData?.is_oversized === 'Oversized') {
            // console.log('oversized in table: ',distanceData?.is_oversized);
            fetchOversizedFee();
        }
    }, [distanceData, selectClient]);

    return (
        <Flex vertical gap="small">
        <Card hoverable>
            <Branch
                clientOptions={clientOptions}
                // onClientSelect={handleClientSelect}
                onClientSelect={(value) => {
                    handleClientSelect(value);
                    setClientSelected(value.length > 0);
                }}
                onOrderTypeChange={setSelectedOrderType}
                onTwoStopSelect={handleTwoStopSelect}
                onOrderTypeSelect={handleOrderTypeSelect}
                clientDisabled={!formSubmitted}
                otherDisabled={!clientSelected}
                />
        </Card>

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
                    pageData.forEach(({ if_repo, if_close  }) => {
                        totalRepo =  if_repo + Number(selectedFeeFromOrderTypeRepo || 0)
                            + Number(selectedTwoStop || 0)
                            + (distanceData?.isTribal ? Number(clientFees?.reservation_fee || 0) : 0)
                            + (distanceData?.isMilitary ? Number(clientFees?.military_base_fee || 0) : 0)
                            + (distanceData?.is_oversized ? Number(oversizedFee?.oversized_fee || 0) : 0);

                        totalCloseRepo = if_close + Number(selectedFeeFromOrderTypeClose || 0)
                            + Number(selectedTwoStopClose || 0)
                            + (distanceData?.isTribal ? Number(clientFees?.reservation_close_fee || 0) : 0)
                            + (distanceData?.isMilitary ? Number(clientFees?.military_base_fee || 0) : 0)
                            + (distanceData?.is_oversized ? Number(oversizedFee?.oversized_close_fee || 0) : 0);

                    });

                    return (
                    <>
                        {selectedFeeFromOrderTypeRepo !== null && (
                            <Table.Summary.Row>
                                <Table.Summary.Cell index={0}>Repossession</Table.Summary.Cell>
                                <Table.Summary.Cell index={1}>
                                    <Text>${selectedFeeFromOrderTypeRepo}</Text>
                                </Table.Summary.Cell>

                                <Table.Summary.Cell index={2}>Repo Close</Table.Summary.Cell>
                                <Table.Summary.Cell index={3}>
                                    <Text>${selectedFeeFromOrderTypeClose}</Text>
                                </Table.Summary.Cell>

                                <Table.Summary.Cell index={4}>
                                    <Text>{selectedFeeFromOrderTypeRate}</Text>
                                </Table.Summary.Cell>
                            </Table.Summary.Row>
                        )}

                        {selectedTwoStop && (
                            <Table.Summary.Row>
                                <Table.Summary.Cell index={0}>Two Stop Fee</Table.Summary.Cell>
                                <Table.Summary.Cell index={1}>
                                    <Text>${selectedTwoStop}</Text>
                                </Table.Summary.Cell>

                                <Table.Summary.Cell index={2}>Two Stop Close</Table.Summary.Cell>
                                <Table.Summary.Cell index={3}>
                                    <Text>${selectedTwoStopClose}</Text>
                                </Table.Summary.Cell>

                                <Table.Summary.Cell index={4}>
                                    <Text>{selectedTwoStopRate}</Text>
                                </Table.Summary.Cell>
                            </Table.Summary.Row>
                        )}

                        {distanceData?.isTribal && clientFees && (
                            <Table.Summary.Row>
                                <Table.Summary.Cell index={0}>Reservation Zone Fee</Table.Summary.Cell>
                                <Table.Summary.Cell index={1}>
                                <Text>${clientFees?.reservation_fee ? clientFees.reservation_fee : '0.00'}</Text>
                                </Table.Summary.Cell>

                                <Table.Summary.Cell index={2}>Reservation Close Fee</Table.Summary.Cell>
                                <Table.Summary.Cell index={3}>
                                <Text>${clientFees?.reservation_close_fee ? clientFees.reservation_close_fee : '0.00'}</Text>
                                </Table.Summary.Cell>

                                <Table.Summary.Cell index={4}>
                                <Text>{clientFees.reservation_fee_contracted}</Text>
                                </Table.Summary.Cell>
                            </Table.Summary.Row>
                        )}

                        {distanceData?.isMilitary && clientFees && (
                            <Table.Summary.Row>
                                <Table.Summary.Cell index={0}>Military Base Fee</Table.Summary.Cell>
                                <Table.Summary.Cell index={1}>
                                <Text>${clientFees?.military_base_fee ? clientFees.military_base_fee : '0.00'}</Text>
                                </Table.Summary.Cell>

                                <Table.Summary.Cell index={2}>Military Close Fee</Table.Summary.Cell>
                                <Table.Summary.Cell index={3}>
                                <Text>${clientFees?.military_base_fee ? clientFees.military_base_fee : '0.00'}</Text>
                                </Table.Summary.Cell>

                                <Table.Summary.Cell index={4}>
                                <Text>{clientFees.military_base_fee_contracted}</Text>
                                </Table.Summary.Cell>
                            </Table.Summary.Row>
                        )}

                        {distanceData?.is_oversized && oversizedFee &&(
                            <Table.Summary.Row>
                                <Table.Summary.Cell index={0}>Oversized Fee</Table.Summary.Cell>
                                <Table.Summary.Cell index={1}>
                                <Text>${oversizedFee.oversized_fee ? oversizedFee.oversized_fee : '0.00'}</Text>
                                </Table.Summary.Cell>

                                <Table.Summary.Cell index={2}>Oversized Close Fee</Table.Summary.Cell>
                                <Table.Summary.Cell index={3}>
                                <Text>${oversizedFee.oversized_close_fee ? oversizedFee.oversized_close_fee : '0.00'}</Text>
                                </Table.Summary.Cell>

                                <Table.Summary.Cell index={4}>
                                <Text>{oversizedFee.oversized_fee_contracted}</Text>
                                </Table.Summary.Cell>
                            </Table.Summary.Row>
                        )}

                        <Table.Summary.Row>
                            <Table.Summary.Cell index={0}>Total Invoice Amount</Table.Summary.Cell>
                            <Table.Summary.Cell index={1} colSpan={2}>
                                <Text type="danger">${totalRepo.toFixed(2)}</Text>
                            </Table.Summary.Cell>

                            <Table.Summary.Cell index={3} colSpan={2}>
                                <Text type="danger">${totalCloseRepo.toFixed(2)}</Text>
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
