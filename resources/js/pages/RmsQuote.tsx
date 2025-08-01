import AppLayout from '@/layouts/app-layout';
import QuoteTable from '@/components/ui/quote_table';
import Distance from '@/components/ui/distance';
import { type BreadcrumbItem } from '@/types';
import React, { useState , } from 'react';
import { Flex, Layout, Form, Input, Button, Space, Card, Spin } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
// import QuoteForm from './QuoteForm';

const { Footer, Content} = Layout;

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: 120,
    color: '#fff',
    backgroundColor: '#DBE2E9',
    // marginTop: 30,
    borderRadius: 8,
};

const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'oklch(0.145 0 0)',
};

const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
    width: 'calc(100% - 8px)',
    maxWidth: 'calc(100% - 8px)',
    backgroundColor:'oklch(0.145 0 0)',
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Quote',
        href: '/rms-quote',
    },
];

const layout = {
//   labelCol: { span: 220 },
//   wrapperCol: { span: 120 },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid VIN!',
    number: '${label} is not a valid ZIPCODE!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const Quote: React.FC = () => {
    const [ combineData, setCombineData ] = useState(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (values: any) => {
        const zipCode = values?.zipcode?.value;

        if (!zipCode) return;
        setLoading(true);

        try {
            const zoneResponse = await axios.post('http://localhost:8888/check-zone', { zipCode });
            const matrixResponse = await axios.get(`http://localhost:8000/api/distance?destination=${zipCode}`);
            const mileageFee = await axios.get('http://localhost:8000/api/mileage-fee')

            setCombineData({...zoneResponse.data, ...matrixResponse.data, ...mileageFee.data});

        } catch (error) {
            console.error('Error fetching zone error: ', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <>
                    <Flex gap="middle" wrap className="relative min-h-[100vh] flex-1 overflow-hidden">
                        <Layout style={layoutStyle}>
                            <Content style={contentStyle}>
                                <Card style={contentStyle}>
                                    <div className='mb-4 ml-4 mr-4'>
                                    <>
                                        <div className='mt-4'>
                                            <Card hoverable>
                                                <Form
                                                    {...layout}
                                                    name="nest-messages"
                                                    onFinish={onSubmit}
                                                    validateMessages={validateMessages}
                                                    style={{ marginTop: 10 }}
                                                >
                                                    <>
                                                        <div className=''>
                                                            <Space style={{marginBottom: 0 }} align="baseline">
                                                                <Form.Item name={['vin', 'value']} label="VIN" >
                                                                    <Input placeholder="Enter VIN (17 digits)" />
                                                                </Form.Item>

                                                                <Form.Item name={['zipcode', 'value']} label="Zipcode" >
                                                                    <Input placeholder='Enter Zip code'/>
                                                                </Form.Item>
                                                            </Space>
                                                        </div>
                                                    </>

                                                    <Form.Item label={null} style={{marginBottom:0}}>
                                                        <Button color="default" variant="outlined" htmlType='submit' disabled={loading} style={{ minWidth: 100 }}>
                                                            {loading ? (<Spin indicator={<LoadingOutlined spin />} size="small" style={{ marginLeft: 4, marginRight: 4 }} />) : (
                                                            'Submit'
                                                            )}
                                                        </Button>
                                                    </Form.Item>
                                                </Form>
                                            </Card>
                                        </div>
                                    </>

                                    <>
                                        <div className='mb-3 mt-4'>
                                            <div className="mb-3">
                                                <Card title="Nearest Distance" size='small' hoverable>
                                                    <Distance data={combineData} loading={loading} />
                                                </Card>
                                            </div>
                                            <div className="">
                                                <Card title="Quote" size='small' hoverable>
                                                    <QuoteTable />
                                                </Card>
                                            </div>
                                        </div>
                                    </>
                                </div>
                                </Card>
                            </Content>

                            <Footer style={footerStyle}>
                                <p>Copyright © 2025 Recovery Management Solutions</p>
                            </Footer>
                        </Layout>
                    </Flex>
                </>
            </AppLayout>
        </>
    );
};


export default Quote;
