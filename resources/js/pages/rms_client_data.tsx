import AppLayout from '@/layouts/app-layout';
import ClientForm from '@/pages/rms_add_client_data';
import DeleteButton from '@/components/ui/delete_button';
import { type BreadcrumbItem } from '@/types';
import React, {useState} from 'react';
import { Card, Flex, Layout, Upload, Button, Table, message } from 'antd';
import type { GetProp, UploadProps, UploadFile, TableColumnsType } from 'antd';
import { FilePenLine, FileUp } from 'lucide-react';


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

interface DataType {
    key: React.Key;
    name: string;
    age:number;
    address: string;
}

const columns: TableColumnsType<DataType> = [
    {
        title: 'Full Name',
        width: 100,
        dataIndex: 'name',
        key: 'name',
        fixed: 'left',
    },
    {
        title: 'Age',
        width: 100,
        dataIndex: 'age',
        key: 'age',
        fixed: 'left',
        sorter: true,
    },
    { title: 'Column 1', dataIndex: 'address', key: '1'},
    { title: 'Column 2', dataIndex: 'address', key: '2'},
    { title: 'Column 3', dataIndex: 'address', key: '3'},
    { title: 'Column 4', dataIndex: 'address', key: '4'},
    { title: 'Column 5', dataIndex: 'address', key: '5'},
    { title: 'Column 6', dataIndex: 'address', key: '6'},
    { title: 'Column 7', dataIndex: 'address', key: '7'},
    { title: 'Column 8', dataIndex: 'address', key: '8'},
    { title: 'Column 9', dataIndex: 'address', key: '9'},
    {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: () =>
            <>
                <div className='flex'>
                    <a href="#" className='mr-2'><FilePenLine size={18} color="#0d61e7"/></a>
                    {/* <ClientForm /> */}

                    <DeleteButton />
                </div>
            </>,
    },
];

// data
const dataSource = Array.from({ length: 100 }).map<DataType>((_, i) => ({
    key: i, name: `Edward King ${i}`, age: 32, address: `London, Park Lane no. ${i}`,
}));

// upload
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const App: React.FC = () => {

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [uploading, setUploading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

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
                                                <ClientForm />
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                            <Content style={contentStyle}>
                                <div className='ml-4 mr-4'>
                                    <div>
                                        <Table<DataType>
                                            columns={columns}
                                            dataSource={dataSource}
                                            scroll={{ x: 'max-content', y: 50 * 5  }}
                                        />
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

