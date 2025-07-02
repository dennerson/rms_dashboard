import { Trash2 } from 'lucide-react';
import type { PopconfirmProps } from 'antd';
import { Popconfirm, message } from 'antd';
import axios from 'axios';


const DeleteButton: React.FC = ({ clientId, onDeleted }) => {
    const [messageApi, contextHolder] = message.useMessage();

    // const confirm: PopconfirmProps['onConfirm'] = (e) => {
    //     console.log(e);
        // messageApi.open({
        //     type: 'success',
        //     content: 'client deleted successfully.',
        //     });

    // };

    // const cancel: PopconfirmProps['onCancel'] = (e) => {
    //     console.log(e);
    //     messageApi.open({
    //         type: 'warning',
    //         content: 'There are error in deleting client.',
    //         });
    // };

    const handleDelete:PopconfirmProps['onConfirm'] = async () => {
        try {
            await axios.delete(`/api/clients/${clientId}`);
            // message.success('Client deleted successfully');
            messageApi.open({
                type: 'success',
                content: 'client deleted successfully.',
            });
            if (typeof onDeleted === 'function') {
                onDeleted();
            }
        }catch (error) {
            message.error('Failed to delete client');
            // messageApi.open({
            //     type: 'warning',
            //     content: 'There are error in deleting client.',
            // });
            console.error(error);
        }
    };

     return (
        <>
        {contextHolder}
            <Popconfirm
                title="Delete the client"
                description="Are you sure to delete this client?"
                onConfirm={handleDelete}
                // onCancel={cancel}
                okText="Yes"
                cancelText="No"
            >
                <a href="#"><Trash2 size={18} color="#e70d0d"/></a>
            </Popconfirm>
        </>
     );
};


export default DeleteButton;
