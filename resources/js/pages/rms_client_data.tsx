import AppLayout from '@/layouts/app-layout';
import ClientForm from '@/pages/rms_add_client_data';
import ClientTable from '@/components/ui/clients_table';
import { type BreadcrumbItem } from '@/types';
import React, {useState} from 'react';
import { Card, Flex, Layout, Upload, Button, message } from 'antd';
import type { GetProp, UploadProps, UploadFile } from 'antd';
import { FileUp } from 'lucide-react';


const { Footer, Content} = Layout;

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: 120,
  color: '#F2F3F4',
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#F2F3F4',
  backgroundColor: 'oklch(0.145 0 0)',
};

const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  width: 'calc(100% - 8px)',
  maxWidth: 'calc(100% - 8px)',
  backgroundColor: '#DBE2E9',
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Client Data',
        href: '/rms-client-data',
    },
];

// upload
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const App: React.FC = () => {

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [uploading, setUploading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [refreshFlag, setRefreshFlag] = useState(false);
    const [editingClient, setEditingClient] = useState(null);

    const handleEditClient = (clientData) => {
        setEditingClient(clientData);
    };

    const refreshTable = () => {
        setRefreshFlag(prev => !prev);
    };

    // upload
    const handleUpload = () => {
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('files[]', file as FileType);
        });
        setUploading(true);
        fetch('https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload', {
            method: 'POST',
            body: formData,
        })
        .then((res) => res.json())
        .then(() => {
            setFileList([]);
            messageApi.open({
            type: 'success',
            content: 'Upload successfully',
        });
        })
        .catch(() => {
            messageApi.open({
            type: 'error',
            content: 'An Error occured',
        });
        })
        .finally(() => {
            setUploading(false);
        });
    };

    const props: UploadProps = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);

            return false;
        },
        fileList,
    };

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <>
                {contextHolder}
                    <Flex gap="middle" wrap className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                        <Layout style={layoutStyle}>
                            <div className='ml-4 justify-center mr-4'>
                                <div className='mb-4 mt-4'>
                                    <Card hoverable>
                                        <div className='flex'>
                                            <div className='flex-1'>
                                                <div className='flex gap-3'>

                                                    <Upload {...props} >
                                                        <Button><FileUp size={16} color="#2c2b2b"/>Upload Client Data</Button>
                                                    </Upload>

                                                <Button
                                                    type='primary'
                                                    onClick={handleUpload}
                                                    disabled={fileList.length === 0}
                                                    loading={uploading}
                                                >
                                                    {uploading ? 'Uploading...' : 'Upload'}
                                                </Button>
                                                </div>
                                            </div>
                                            <div className=' ml-4'>
                                                <ClientForm onClientSaved={refreshTable} editingClient={editingClient} onCloseEdit={() => setEditingClient(null)} />
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                            <Content style={contentStyle}>
                                <div className='ml-4 mr-4'>
                                    <div>
                                        <ClientTable refreshFlag={refreshFlag} onRefresh={refreshTable} onEditCLient={handleEditClient} />
                                    </div>
                                </div>
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


export default App;

