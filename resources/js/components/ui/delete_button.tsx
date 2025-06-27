import { Trash2 } from 'lucide-react';
import type { PopconfirmProps } from 'antd';
import { Popconfirm, message } from 'antd';


const App: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const confirm: PopconfirmProps['onConfirm'] = (e) => {
        console.log(e);
        messageApi.open({
            type: 'success',
            content: 'client deleted successfully.',
            });

    };

    const cancel: PopconfirmProps['onCancel'] = (e) => {
        console.log(e);
        messageApi.open({
            type: 'warning',
            content: 'There are error in deleting client.',
            });
    };

     return (
        <>
        {contextHolder}
            <Popconfirm
                title="Delete the client"
                description="Are you sure to delete this client?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
            >
                <a href="#"><Trash2 size={18} color="#e70d0d"/></a>
            </Popconfirm>
        </>
     );
};


export default App;
