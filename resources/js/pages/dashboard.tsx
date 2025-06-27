import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import AdminTesting from '@/components/admin/testing'
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

import { Card, Layout} from 'antd';
import LineChart from '@/components/charts/userchart';

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
  backgroundColor: 'oklch(0.205 0 0)',
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: 120,
  color: '#F2F3F4',
  backgroundColor: '#DBE2E9',
  borderRadius: 8,
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
            <Head title="Dashboard" />
                <Layout style={layoutStyle}>
                    <Content style={contentStyle}>
                        <>
                            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                                    <div className="relative aspect-3/2 overflow-hidden rounded-xl ">
                                        <Card title="Appointments" className="w-full max-w-5xl mx-auto p-4" size='small' hoverable>
                                            <LineChart />
                                        </Card>
                                    </div>
                                    <div className="relative aspect-3/2 overflow-hidden rounded-xl ">
                                        <Card title="Success Appointments" className="w-full max-w-5xl mx-auto p-4" size='small' hoverable>
                                            <LineChart />
                                        </Card>
                                    </div>
                                    <div className="relative aspect-3/2 overflow-hidden rounded-xl ">
                                        <Card title="Cancelled Appointments" size='small' hoverable>
                                            <LineChart />
                                        </Card>

                                    </div>
                                </div>
                                <div className="relative flex-1 overflow-hidden rounded-xl ">
                                    <Card><AdminTesting /></Card>
                                </div>
                            </div>
                        </>
                    </Content>

                    <Footer style={footerStyle}>
                        <p>Copyright © 2025 Recovery Management Solutions</p>
                    </Footer>
                </Layout>
        </AppLayout>
    );
}
