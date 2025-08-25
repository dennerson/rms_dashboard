import { Trash2 } from 'lucide-react';
import type { PopconfirmProps } from 'antd';
import { Popconfirm, message } from 'antd';
import axios from 'axios';

interface DeleteButtonProps {
    zip_code: string;
    onDelete?: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ zip_code, onDeleted }) => {
    const [messageApi, contextHolder] = message.useMessage();

    const handleDelete:PopconfirmProps['onConfirm'] = async () => {
        try {
            await axios.delete(`/api/branches/${zip_code}`);
            messageApi.open({
                type: 'success',
                content: 'client deleted successfully.',
            });
            if (typeof onDeleted === 'function') {
                onDeleted();
            }
        }catch (error) {
            // message.error('Failed to delete client');
            messageApi.open({
                type: 'error',
                content: 'There are error in deleting Branch data.',
            });
            console.error(error);
        }
    };

     return (
        <>
        {contextHolder}
            <Popconfirm
                title="This action cannot be undo!"
                description="Are you sure to delete this Branch data?"
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
