import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import React from 'react';
import { Col, Row, Card, Flex, Layout } from 'antd';

const { Header, Footer, Content} = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: 'oklch(0.145 0 0)',
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
//   minHeight: 120,
//   lineHeight: '120px',
//   marginLeft: 30,
  color: '#fff',
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  borderRadius: 8,
  backgroundColor: 'oklch(0.145 0 0)',
};

const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  width: 'calc(100% - 8px)',
  maxWidth: 'calc(100% - 8px)',
  backgroundColor: 'oklch(0.145 0 0)',
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'RmsWeb',
        href: '/rms-web',
    },
];

const { Meta } = Card;

const column = {
    imageTitle: 'Repossession',
    imageDescription: "Cars of the future",
    imageUrl: 'https://imageio.forbes.com/specials-images/imageserve/5d3703e2f1176b00089761a6/2020-Chevrolet-Corvette-Stingray/0x0.jpg?crop=4560,2565,x836,y799,safe&height=399&width=711&fit=bounds',
    imageLink: 'https://www.google.com',
    imageSize: 200,
}

export default function RmsWeb() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <>
               <Layout style={layoutStyle}>
                    {/* <Flex gap="middle" wrap className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                        <Layout style={layoutStyle}>
                            <Header style={headerStyle}>
                                <div>
                                    <h1>Recovery Management Solutions</h1>
                                </div>
                            </Header>
                            <Content style={contentStyle}>
                                <Row className='mt-5'>
                                    <Col span={7} className="mx-auto" >
                                        <Card
                                            hoverable
                                            style={{ width: 265}}
                                            cover={<img alt="sample" src="https://imageio.forbes.com/specials-images/imageserve/5d3703e2f1176b00089761a6/2020-Chevrolet-Corvette-Stingray/0x0.jpg?crop=4560,2565,x836,y799,safe&height=399&width=711&fit=bounds"></img>}

                                            >
                                            <Meta title={column.imageTitle} description={column.imageLink} />
                                        </Card>
                                    </Col>
                                    <Col span={7} className="mx-auto">
                                        <Card
                                            hoverable
                                            style={{ width: 265 }}
                                            cover={<img alt="sample" src="https://imageio.forbes.com/specials-images/imageserve/5d3703e2f1176b00089761a6/2020-Chevrolet-Corvette-Stingray/0x0.jpg?crop=4560,2565,x836,y799,safe&height=399&width=711&fit=bounds"></img>}
                                            >
                                            <Meta title={column.imageTitle} description={column.imageLink} />
                                        </Card>
                                    </Col>
                                    <Col span={7} className="mx-auto">
                                        <Card
                                            hoverable
                                            style={{ width: 265 }}
                                            cover={<img alt="sample" src="https://imageio.forbes.com/specials-images/imageserve/5d3703e2f1176b00089761a6/2020-Chevrolet-Corvette-Stingray/0x0.jpg?crop=4560,2565,x836,y799,safe&height=399&width=711&fit=bounds"></img>}
                                            className="ml-90"
                                            >
                                            <Meta title={column.imageTitle} description={column.imageLink} />
                                        </Card>
                                    </Col>
                                </Row>
                            </Content>
                            <Footer style={footerStyle}>
                                <p>Copyright © 2025 Recovery Management Solutions</p>
                            </Footer>
                        </Layout>
                    </Flex> */}
                    <div className='flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto'>
                        <Header style={headerStyle}>
                            <div>
                                <h1>Recovery Management Solutions</h1>
                            </div>
                        </Header>
                        <Content style={contentStyle}>
                            <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
                                <div className='relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border'>
                                    <Card
                                        hoverable
                                        style={{ width: 265 }}
                                        cover={<img alt="sample" src="https://imageio.forbes.com/specials-images/imageserve/5d3703e2f1176b00089761a6/2020-Chevrolet-Corvette-Stingray/0x0.jpg?crop=4560,2565,x836,y799,safe&height=399&width=711&fit=bounds"></img>}
                                        className="ml-90"
                                        >
                                        <Meta title={column.imageTitle} description={column.imageLink} />
                                    </Card>
                                </div>

                                <div className='relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border'>
                                    <Card
                                        hoverable
                                        style={{ width: 265 }}
                                        cover={<img alt="sample" src="https://imageio.forbes.com/specials-images/imageserve/5d3703e2f1176b00089761a6/2020-Chevrolet-Corvette-Stingray/0x0.jpg?crop=4560,2565,x836,y799,safe&height=399&width=711&fit=bounds"></img>}
                                        className="ml-90"
                                        >
                                        <Meta title={column.imageTitle} description={column.imageLink} />
                                    </Card>
                                </div>

                                <div className='relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border'>
                                    <Card
                                        hoverable
                                        style={{ width: 370, height: 500 }}
                                        cover={<img alt="sample" src="https://imageio.forbes.com/specials-images/imageserve/5d3703e2f1176b00089761a6/2020-Chevrolet-Corvette-Stingray/0x0.jpg?crop=4560,2565,x836,y799,safe&height=399&width=711&fit=bounds"></img>}
                                        className="ml-90"
                                        >
                                        <Meta title={column.imageTitle} description={column.imageLink} />
                                    </Card>
                                </div>
                            </div>
                        </Content>
                        <Footer style={footerStyle}>
                            <p>Copyright © 2025 Recovery Management Solutions</p>
                        </Footer>
                    </div>
               </Layout>
            </>
        </AppLayout>
    );
}
