// import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import Report from '@/components/ui/ReportTable';
import { type BreadcrumbItem } from '@/types';
// import { Head } from '@inertiajs/react';
import { CarOutlined } from '@ant-design/icons';

import { Card, Col, Row, Flex, Layout, Space} from 'antd';
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';
import ColumnChart from '@/components/charts/ColumnChart';
// import { Space } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const { Footer, Content} = Layout;

const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  width: 'calc(100% - 8px)',
  maxWidth: 'calc(100% - 8px)',
  backgroundColor: '#DBE2E9',
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: 120,
  color: '#F2F3F4',
//   backgroundColor: '#DBE2E9',
//   borderRadius: 8,
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#F2F3F4',
  borderRadius: '5px',
  backgroundColor: 'oklch(0.145 0 0)',
};

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Flex gap="middle" wrap className="relative min-h-[100vh] flex-1 overflow-hidden">
                {/* <Head title="Dashboard" /> */}
                <Layout style={layoutStyle}>
                    <Content style={contentStyle}>
                        <>
                            <div className="flex flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                                    <div className="rounded-xl ">
                                        <Card title="Appointments" size='small' hoverable>
                                            <LineChart />
                                        </Card>
                                    </div>
                                    <div className="rounded-xl ">
                                        <Card title="Success Appointments" size='small' hoverable>
                                            <LineChart />
                                        </Card>
                                    </div>
                                    <div className="rounded-xl ">
                                        <Card title="Cancelled Appointments" size='small' hoverable>
                                            <ColumnChart />
                                        </Card>

                                    </div>
                                </div>

                                {/* <div className='flex flex-wrap'>
                                    <div className='flex-1'>
                                        <Card>
                                            <div className='flex'>
                                                <div className='flex'>
                                                    <Col span={80} pull={0}>
                                                        <Card title="Success Appointments"  hoverable>
                                                                <BarChart />
                                                        </Card>
                                                    </Col>
                                                </div>
                                                <div className='flex'>
                                                    <Col span={90} push={10}>
                                                        <Card>Hello</Card>
                                                    </Col>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                </div> */}
                                <div className=''>
                                    <div className=''>
                                        <Card hoverable>
                                            <Row gutter={16}>
                                                {/* Left side */}
                                                <Col flex="auto">
                                                    <Row gutter={16}>
                                                        <Col span={12}>
                                                            <Card size="small" hoverable>
                                                                <CarOutlined />
                                                                <p>Searches</p>
                                                                <p>
                                                                <strong>400%</strong>
                                                                </p>
                                                            </Card>
                                                        </Col>

                                                        <Col span={12}>
                                                            <Card size="small" hoverable>
                                                                <CarOutlined />
                                                                <p>Searches</p>
                                                                <p>
                                                                <strong>400%</strong>
                                                                </p>
                                                            </Card>
                                                        </Col>
                                                    </Row>

                                                    <Card size="default" hoverable style={{ marginTop: 16 }}>
                                                        <BarChart />
                                                    </Card>
                                                </Col>

                                                {/* Right side */}
                                                <Col flex="120px">
                                                    <Space direction="vertical" style={{ width: "100%" }}>
                                                        <Card size="small" hoverable style={{ textAlign: "center", height: 120 }}>
                                                            {/* <CarOutlined /> */}
                                                            {/* <p>Searches</p>
                                                            <p>
                                                                <strong>400%</strong>
                                                            </p> */}
                                                            <p className='text-xs'>coming soon...</p>
                                                        </Card>
                                                        <Card size="small" hoverable style={{ textAlign: "center", height: 120 }}>
                                                            {/* <CarOutlined /> */}
                                                            {/* <p>Searches</p>
                                                            <p>
                                                                <strong>400%</strong>
                                                            </p> */}
                                                            <p className='text-xs'>coming soon...</p>
                                                        </Card>
                                                        <Card size="small" hoverable style={{ textAlign: "center", height: 120 }}>
                                                            {/* <CarOutlined />
                                                            <p>Searches</p>
                                                            <p>
                                                                <strong>400%</strong>
                                                            </p> */}
                                                            <p className='text-xs'>coming soon...</p>
                                                        </Card>
                                                    </Space>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </div>
                                </div>

                                <div className="relative flex-1 rounded-xl ">
                                    <Card title="" hoverable>
                                        <h1 className='flex text-wrap font-bold mb-3 text-xl'>Search History </h1>
                                        <Report />
                                    </Card>
                                </div>
                            </div>
                        </>
                    </Content>

                    <Footer style={footerStyle}>
                        <p>Copyright © 2025 Recovery Management Solutions</p>
                    </Footer>
                </Layout>
            </Flex>
        </AppLayout>
    );
}
