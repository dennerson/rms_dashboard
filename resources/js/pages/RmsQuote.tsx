import AppLayout from '@/layouts/app-layout';
import QuoteTable from '@/components/ui/quote_table';
import Distance from '@/components/ui/distance';

import axios from 'axios';
import React, { useState , } from 'react';

import { type BreadcrumbItem } from '@/types';
import { Flex, Layout, Form, Input, Button, Space, Card, Spin, Alert, FloatButton } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

// import { 00022FileSpreadsheet } from 'lucide-react';

const { Footer, Content} = Layout;

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: 120,
    color: '#fff',
    backgroundColor: '#DBE2E9',
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

// const layout = {
// //   labelCol: { span: 220 },
// //   wrapperCol: { span: 120 },
// };

const validateMessages = {
  required: '${label} is required!',
  types: {
    string: '${label} is not a valid VIN!',
    number: '${label} is not a valid ZIPCODE!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const Quote: React.FC = () => {
    const [combineData, setCombineData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [clientSelected, setClientSelected] = useState(false);
    const [formError, setFormError] = useState("");

    const onSubmit = async (values: any) => {
        const zipCode = values?.zipcode?.value;
        const vin = values?.vin?.value;

        if (zipCode.length !== 5) {
            setFormError("Enter a valid 5-digit ZIP code.");
            return;
        }
        setFormError("");

        if (vin.length !== 17) {
            setFormError(" VIN must be 17 characters long");
            return;
        }
        setFormError("");

        if (!zipCode && !vin) return;
        setLoading(true);
        setFormSubmitted(false);

        try {
            const zoneResponse = await axios.post('http://localhost:8888/check-zone', { zipCode });
            const matrixResponse = await axios.get(`http://localhost:8000/api/distance?destination=${zipCode}`);
            const mileageFee = await axios.get('http://localhost:8000/api/mileage-fee');
            const decodeVinNumber = await axios.post('http://localhost:8000/api/decode-vin', { vin });

            console.log('distance: ', matrixResponse.data.results);
            setCombineData({...zoneResponse.data, ...matrixResponse.data, ...decodeVinNumber.data, ...mileageFee.data});
            setFormSubmitted(true);
        } catch (error) {
            console.error('fetching error: ', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                    <Flex gap="middle" wrap className="relative min-h-[100vh] flex-1 overflow-hidden">
                        <Layout style={layoutStyle}>
                            <Content style={contentStyle}>
                                <Card style={contentStyle}>
                                    <div className='mb-4 ml-4 mr-4'>
                                        <div className='mt-4'>
                                            <Card hoverable>
                                                {formError && <Alert message={formError} type="error" />}
                                                <Form
                                                    // {...layout}
                                                    name="nest-messages"
                                                    onFinish={onSubmit}
                                                    validateMessages={validateMessages}
                                                    style={{ marginTop: 10 }}
                                                >
                                                    <>
                                                        <div className=''>
                                                            <Space style={{marginBottom: 0 }} align="baseline">
                                                                <Form.Item name={['vin', 'value']} label="VIN" rules={[{ required: true }]}>
                                                                    <Input placeholder="" />
                                                                </Form.Item>

                                                                <Form.Item name={['zipcode', 'value']} label="Zipcode" rules={[{ required: true }]}>
                                                                    <Input placeholder=''/>
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

                                        <div className='mb-3 mt-4'>
                                            <div className="mb-3">
                                            {/* <FloatButton tooltip={{title: 'See all results', color: 'bule', placement: 'top'}} shape={'circle'} type={'default'} /> */}
                                                <Card title="Nearest Distance" size='small' hoverable>
                                                    <Distance data={combineData} loading={loading} />
                                                </Card>
                                            </div>
                                            <div className="">
                                                <Card title="Client Quote" size='small' hoverable>
                                                    <QuoteTable distanceData={combineData} formSubmitted={formSubmitted} clientSelected={clientSelected} setClientSelected={setClientSelected} />
                                                </Card>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </Content>

                            <Footer style={footerStyle}>
                                <p>Copyright © 2025 Recovery Management Solutions</p>
                            </Footer>
                        </Layout>
                    </Flex>
            </AppLayout>
        </>
    );
};


export default Quote;
