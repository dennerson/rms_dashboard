import AppLayout from '@/layouts/app-layout';
import ClientForm from '@/pages/rms_add_client_data';
import ClientTable from '@/components/ui/clients_table';
import React, {useState} from 'react';
import { Card, Flex, Layout, Upload, Button, message } from 'antd';
import type { UploadProps, UploadFile } from 'antd';
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

// upload
type FileType = File;

const ClientList: React.FC = () => {

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [uploading, setUploading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const [refreshFlag, setRefreshFlag] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);

    const handleEdit = (client) => setSelectedClient(client);
    const clearEdit = () => setSelectedClient(null);

    const refreshTable = () => {
        setRefreshFlag(prev => !prev);
    };

    // upload
    const handleUpload = () => {
        if (fileList.length === 0) {
        messageApi.error('Please select a file to upload.');
        return;
        }

        const formData = new FormData();
        formData.append('file', fileList[0] as FileType);

        setUploading(true);

        fetch('/api/clients/upload', {
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
            setRefreshFlag(prev => !prev);
        })
        .catch((err) => {
            console.error(err);
            messageApi.error(err.message || 'Upload failed');
        })
        .finally(() => setUploading(false));
    };

    const uploadProps: UploadProps = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([file]);
            return false;
        },
        fileList,
    };
    return (
        <>
            <AppLayout
            breadcrumbs={[{ title: 'Client Data', href: '/rms-client-data'}]}
            >
                <>
                {contextHolder}
                    <Flex gap="middle" wrap className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                        <Layout style={layoutStyle}>
                            <div className='ml-4 justify-center mr-4'>
                                <div className='mb-4 mt-4'>
                                    <Card hoverable>
                                        <div className="flex flex-wrap md:flex-nowrap gap-4">
                                            <div className="flex-1 min-w-[250px]">
                                                <div className="flex flex-wrap sm:flex-nowrap gap-3">
                                                    <Upload {...uploadProps}>
                                                        <Button>
                                                            <FileUp size={16} color="#2c2b2b" />
                                                            Upload Client Data
                                                        </Button>
                                                    </Upload>

                                                    <Button
                                                        type="primary"
                                                        onClick={handleUpload}
                                                        disabled={fileList.length === 0}
                                                        loading={uploading}
                                                    >
                                                        {uploading ? 'Uploading...' : 'Upload'}
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className="w-full md:w-auto min-w-[100px]">
                                                <ClientForm
                                                    client={selectedClient}
                                                    onClose={clearEdit}
                                                    onSubmitted={refreshTable}
                                                />
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                            <Content style={contentStyle}>
                                <div className='ml-4 mr-4 mb-4'>
                                    <div>
                                        <Card hoverable>
                                            <ClientTable
                                                refreshFlag={refreshFlag}
                                                onEdit={handleEdit}

                                            />
                                        </Card>
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


export default ClientList;




