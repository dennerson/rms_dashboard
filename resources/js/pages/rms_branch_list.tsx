import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import React from 'react';
import { Flex, Layout } from 'antd';

const { Header, Footer, Content} = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#3E424B',
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: 120,
  color: '#fff',
//   backgroundColor: '#0958d9',
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
//   margin-top: 2,
  backgroundColor: '#3E424B',
};

const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  width: 'calc(100% - 8px)',
  maxWidth: 'calc(100% - 8px)',
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'BranchList',
        href: '/rms-branch-list',
    },
];


import { Table } from 'antd';
import { TableColumnsType } from 'antd';
// import { createStyles } from 'antd-style';
import { Pagination } from 'antd';

// const useStyle = createStyles(({ css, token }) => {
//   const { antCls } = token;
//   return {
//     customTable: css`
//       ${antCls}-table {
//         ${antCls}-table-container {
//           ${antCls}-table-body,
//           ${antCls}-table-content {
//             scrollbar-width: thin;
//             scrollbar-color: #eaeaea transparent;
//             scrollbar-gutter: stable;
//           }
//         }
//       }
//     `,
//   };
// });

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
    { title: 'Column 10', dataIndex: 'address', key: '10'},
    { title: 'Column 11', dataIndex: 'address', key: '11'},
    { title: 'Column 12', dataIndex: 'address', key: '12'},
    { title: 'Column 13', dataIndex: 'address', key: '13'},
    { title: 'Column 14', dataIndex: 'address', key: '14'},
    { title: 'Column 15', dataIndex: 'address', key: '15'},
    { title: 'Column 16', dataIndex: 'address', key: '16'},
    { title: 'Column 17', dataIndex: 'address', key: '17'},
    { title: 'Column 18', dataIndex: 'address', key: '18'},
    { title: 'Column 19', dataIndex: 'address', key: '19'},
    { title: 'Column 20', dataIndex: 'address', key: '20'},
    {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: () => <a>action</a>,
    },
];

const dataSource: DataType[] = [
    {key: '1', name: 'Olivia', age: 32, address: 'London'},
    {key: '2', name: 'John', age: 42, address: 'New York'},
    {key: '3', name: 'Jack', age: 28, address: 'Jerusalem'},
    {key: '4', name: 'Linda', age: 35, address: 'Paris' },
    {key: '5', name: 'Tom', age: 40, address: 'Manila'},
];

const App: React.FC = () => {
    // const { styles } = useStyle();

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <>
                    <Flex gap="middle" wrap className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                        <Layout style={layoutStyle}>
                            <Header style={headerStyle}>
                                {/* <h1>Recovery Management Solutions</h1>
                                <p>Professional Repossession Company</p> */}
                            </Header>
                            <div>
                                <div>
                                    <p>input here</p>
                                </div>
                            </div>
                            <Content style={contentStyle}>
                                <div>
                                    <Table<DataType>
                                        // className={styles.customTable}
                                        pagination={false}
                                        columns={columns}
                                        dataSource={dataSource}
                                        scroll={{ x: 'max-content' }}
                                    />
                                </div>
                                <div className='mt-2'>
                                    <Pagination
                                        total={100}
                                        showSizeChanger
                                        showQuickJumper
                                        showTotal={(total) => `Total ${total} items`}
                                    />
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
