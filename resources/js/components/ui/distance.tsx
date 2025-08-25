import React from 'react';
import { Flex, Table, Spin, Card } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';

interface DataType {
  key: string;
  destination_address: string;
  reservation: string;
  military_base: string;
  miles: string;
  branch_address: string;
  mileage_fee: string;
  duration: string;
}

interface DistanceProps {
    data: {
        destination_address:string;
        isTribal: boolean;
        isMilitary: boolean;
        zip?: string;
        miles: string;
        branch_address: string;
        mileage_fee: string;
        duration: string;
    } | null;
    loading: boolean;
}
const Distance: React.FC<DistanceProps> = ({ data, loading }) => {
    const columns: TableColumnsType<DataType> = [
        {
            title: 'Location',
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
    ];

    const dataSource: DataType[] = data ? [{
        key: '1',
        location: data.nearest.destination_address ,
        reservation: data.isTribal ? 'Yes' : 'No',
        military_base: data.isMilitary ? 'Yes' : 'No',
        miles: data.nearest.distance ,
        branch_address: data.nearest.origin_address ,
        mileage_fee: data.data.mileageFee ? `$${parseFloat(data.data.mileageFee).toFixed(2)}` : '0',
    }] : [];

    const distanceColumns: TableColumnsType<DataType> = [
        {
            title: 'Location',
            dataIndex: 'origin_address',
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
            title: 'Duration',
            dataIndex: 'duration',
        },
    ];

    const distanceData: DataType[] = data ? data.results.map((item: any, index: number) => ({
        key: index.toString(),
        origin_address: item.destination_address ,
        miles: item.distance,
        branch_address: item.origin_address ,
        duration: item.duration ,
    })) : [];

    return (
        <Flex vertical gap="small">
            {loading ? (<Spin indicator={<LoadingOutlined spin />} size="large" />) : (
                dataSource.length > 0 && (
                   <>
                        <Card hoverable>
                            <Table<DataType>
                                bordered
                                columns={columns}
                                dataSource={dataSource}
                                pagination={false}
                                scroll={{ x: 'max-content' }}
                            />
                        </Card>
                        <Card title="Results: " hoverable>
                            <Table<DataType>
                                bordered
                                columns={distanceColumns}
                                dataSource={distanceData}
                                pagination={false}
                                scroll={{ x: 'max-content' }}
                            />
                        </Card>
                   </>
                )
            )}
        </Flex>
    );
};

export default Distance;
