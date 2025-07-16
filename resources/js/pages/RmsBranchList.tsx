import AppLayout from '@/layouts/app-layout';
import BranchListForm from '@/pages/BranchListForm';
import BranchTable from '@/components/ui/BranchListTable';
import React, {useState} from 'react';
import { Card, Flex, Layout, Upload, Button, message } from 'antd';
import type { UploadProps, UploadFile } from 'antd';
import { FileUp, CirclePlus } from 'lucide-react';


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

const BranchList: React.FC = () => {

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [uploading, setUploading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const [refreshFlag, setRefreshFlag] = useState(false);
    const [selectedBranch, setSelectedBranch] = useState(null);

    const [drawerOpen, setDrawerOpen] = useState(false);

    // const handleEdit = (branch) => setSelectedBranch(branch);
    const handleBranchEdit = (branch) => {
        setSelectedBranch(branch);
        setDrawerOpen(true);
    };
    // const clearEdit = () => setSelectedBranch(null);
    const handleAddbranch = () => {
        setSelectedBranch(null);
        setDrawerOpen(true);
    };

    const handleCloseBranchDrawer = () => {
        setDrawerOpen(false);
        setSelectedBranch(null);
    };

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

        fetch('/api/branches/upload', {
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
            breadcrumbs={[{ title: 'Branch List', href: '/rms-branch-list'}]}
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
                                                        <Button type='default'>
                                                            <FileUp size={16}/>
                                                            Upload Branch Data
                                                        </Button>
                                                    </Upload>

                                                    <Button
                                                        type="primary"
                                                        onClick={handleUpload}
                                                        disabled={fileList.length === 0}
                                                        loading={uploading}
                                                        variant='outlined'
                                                        color='blue'
                                                    >
                                                        {uploading ? 'Uploading...' : 'Upload'}
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className="w-full md:w-auto min-w-[100px]">
                                                <Button
                                                    onClick={handleAddbranch}
                                                    className="ml-2"
                                                    type='default'
                                                >
                                                    <CirclePlus size={15} />
                                                    Add Branch
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                            <Content style={contentStyle}>
                                <div className='ml-4 mr-4 mb-4'>
                                    <div>
                                        <Card hoverable>
                                            <BranchTable
                                                refreshFlag={refreshFlag}
                                                onEdit={handleBranchEdit}

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
                    <BranchListForm
                        branch={selectedBranch}
                        open={drawerOpen}
                        setOpen={setDrawerOpen}
                        onClose={handleCloseBranchDrawer}
                        onSubmitted={refreshTable}
                    />
                </>
            </AppLayout>
        </>
    );
};


export default BranchList;




