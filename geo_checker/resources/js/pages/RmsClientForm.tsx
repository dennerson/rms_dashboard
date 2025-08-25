import React, { useEffect } from 'react';
import { Button, Col, Drawer, Form, Input, Row, Select, Space, message } from 'antd';
// import { CirclePlus } from 'lucide-react';


const { Option } = Select;

const CLientForm = ({ client, onSubmitted, onClose, open, setOpen }) => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();


    useEffect(() => {
        if (client && open) {
            form.setFieldsValue(client);
        }
    }, [client, open]);

    const handleClose = () => {
        form.resetFields();
        setOpen(false);
        onClose?.();
    };

    const normalizedYesNoFields = (data: Record<string, any>) => {
        const yesNoFields = [
            "involuntary_fee_contracted",
            "voluntary_fee_contracted",
            "impound_fee_contracted",
            "military_base_fee_contracted",
            "reservation_fee_contracted",
            "oversized_fee_contracted",
            "two_stop_fee_contracted",
            "mileage_contracted",
            "authorization_required",
            "keys_required",
            "client_forms",
            "lienholder_forms",
        ];

        yesNoFields.forEach(field => {
            if (data[field] === 'Yes') data[field] = 1;
            else if (data[field] === 'No') data[field] = 0;
        });

        return data;
    };

    const handleSubmit = async () => {
        try {
            const values = form.getFieldsValue(true);
            await form.validateFields();

            const cleanValues = normalizedYesNoFields(values);

            const method = client ? 'put' : 'post';
            const url = client ? `/api/clients/${client.id}` : '/api/clients';
            await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cleanValues),
            });
            messageApi.success(`Client ${client ? 'updated' : 'created'} successfully`);
            handleClose();
            onSubmitted();
        } catch (error) {
            console.error('An error occurred.', error);
            messageApi.error('Error saving client');
        }
    };
    return (
        <>
            {contextHolder}
            <Drawer
                title={client ? 'Edit Client' : 'Add Client'}
                width={720}
                onClose={handleClose}
                open={open}
                styles={{
                    body: {
                    paddingBottom: 80,
                    },
                }}
                extra={
                    <Space>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button
                            onClick={handleSubmit}
                            type="primary"
                        >
                            Submit
                        </Button>
                    </Space>
                }
            >
                <Form layout="vertical" form={form} hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                            name="client"
                            label="Client Name"
                            rules={[{ required: true, message: 'Please enter client name' }]}
                            >
                                <Input placeholder="Please enter client name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                            name="lienholder"
                            label="Lienholder Name"
                            rules={[{ required: true, message: 'Please enter lienholder name' }]}
                            >
                                <Input placeholder="Please enter lienholder name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                            name="involuntary_fee"
                            label="Involuntary Fee"
                            rules={[{ required: true, message: 'Please enter amount' }]}
                            >
                                <Input placeholder="Please enter involuntary fee amount" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                            name="involuntary_fee_contracted"
                            label="Involuntary Fee Contracted?"
                            rules={[{ required: true, message: 'Please choose the type' }]}
                            >
                            <Select placeholder="Please choose the type">
                                <Option value="Yes">Yes</Option>
                                <Option value="No">No</Option>
                            </Select>
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                            name="voluntary_fee"
                            label="Voluntary Fee"
                            rules={[{ required: true, message: 'Please enter amount' }]}
                            >
                                <Input placeholder="Please enter voluntary fee amount" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                            name="voluntary_fee_contracted"
                            label="Voluntary Fee Contracted?"
                            rules={[{ required: true, message: 'Please choose the type' }]}
                            >
                            <Select placeholder="Please choose the type">
                                <Option value="Yes">Yes</Option>
                                <Option value="No">No</Option>
                            </Select>
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                            name="impound_fee"
                            label="Impound Fee"
                            rules={[{ required: true, message: 'Please enter amount' }]}
                            >
                                <Input placeholder="Please enter impound fee amount" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                            name="impound_fee_contracted"
                            label="Impound Fee Contracted?"
                            rules={[{ required: true, message: 'Please choose the type' }]}
                            >
                            <Select placeholder="Please choose the type">
                                <Option value="Yes">Yes</Option>
                                <Option value="No">No</Option>
                            </Select>
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                            name="military_base_fee"
                            label="Military Fee"
                            rules={[{ required: true, message: 'Please enter amount' }]}
                            >
                                <Input placeholder="Please enter military fee amount" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                            name="military_base_fee_contracted"
                            label="Military Fee Contracted?"
                            rules={[{ required: true, message: 'Please choose the type' }]}
                            >
                            <Select placeholder="Please choose the type">
                                <Option value="Yes">Yes</Option>
                                <Option value="No">No</Option>
                            </Select>
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                            name="reservation_fee"
                            label="Reservation Fee"
                            rules={[{ required: true, message: 'Please enter amount' }]}
                            >
                                <Input placeholder="Please enter reservation fee amount" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                            name="reservation_fee_contracted"
                            label="Reservation Fee Contracted?"
                            rules={[{ required: true, message: 'Please choose the type' }]}
                            >
                            <Select placeholder="Please choose the type">
                                <Option value="Yes">Yes</Option>
                                <Option value="No">No</Option>
                            </Select>
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                            name="oversized_fee"
                            label="OverSize Fee"
                            rules={[{ required: true, message: 'Please enter amount' }]}
                            >
                                <Input placeholder="Please enter oversize fee amount" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                            name="oversized_fee_contracted"
                            label="OverSize Fee Contracted?"
                            rules={[{ required: true, message: 'Please choose the type' }]}
                            >
                            <Select placeholder="Please choose the type">
                                <Option value="Yes">Yes</Option>
                                <Option value="No">No</Option>
                            </Select>
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                            name="two_stop_fee"
                            label="Two Stop Fee"
                            rules={[{ required: true, message: 'Please enter amount' }]}
                            >
                                <Input placeholder="Please enter two stop fee amount" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                            name="two_stop_fee_contracted"
                            label="Two Stop Fee Contracted?"
                            rules={[{ required: true, message: 'Please choose the type' }]}
                            >
                            <Select placeholder="Please choose the type">
                                <Option value="Yes">Yes</Option>
                                <Option value="No">No</Option>
                            </Select>
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                            name="reservation_close_fee"
                            label="Reservation Close Fee"
                            rules={[{ required: true, message: 'Please enter amount' }]}
                            >
                                <Input placeholder="Please enter reservation close fee amount" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                            name="military_base_close_fee"
                            label="Military Close Fee"
                            rules={[{ required: true, message: 'Please enter amount' }]}
                            >
                                <Input placeholder="Please enter military close fee amount" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                            name="oversized_close_fee"
                            label="OverSized Close Fee"
                            rules={[{ required: true, message: 'Please enter amount' }]}
                            >
                                <Input placeholder="Please enter oversized close fee amount" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                            name="impound_close_fee"
                            label="Impound Close Fee"
                            rules={[{ required: true, message: 'Please enter amount' }]}
                            >
                                <Input placeholder="Please enter impound close fee amount" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                            name="involuntary_close_fee"
                            label="Involuntary Close Fee"
                            rules={[{ required: true, message: 'Please enter amount' }]}
                            >
                                <Input placeholder="Please enter involuntary close fee amount" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                            name="miles_included"
                            label="Miles Included"
                            rules={[{ required: true, message: 'Please enter miles included' }]}
                            >
                                <Input placeholder="Please enter miles included" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                            name="mileage_rate"
                            label="Mileage Rate"
                            rules={[{ required: true, message: 'Please enter mileage rate' }]}
                            >
                                <Input placeholder="Please enter mileage rate" />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                            name="mileage_contracted"
                            label="Mileage Contracted?"
                            rules={[{ required: true, message: 'Please choose the type' }]}
                            >
                            <Select placeholder="Please choose the type">
                                <Option value="Yes">Yes</Option>
                                <Option value="No">No</Option>
                            </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                            name="authorization_required"
                            label="Authorization Required?"
                            rules={[{ required: true, message: 'Please choose the type' }]}
                            >
                            <Select placeholder="Please choose the type">
                                <Option value="Yes">Yes</Option>
                                <Option value="No">No</Option>
                            </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                            name="keys_required"
                            label="Keys Required?"
                            rules={[{ required: true, message: 'Please choose the type' }]}
                            >
                            <Select placeholder="Please choose the type">
                                <Option value="Yes">Yes</Option>
                                <Option value="No">No</Option>
                            </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                            name="client_forms"
                            label="Client Forms"
                            rules={[{ required: true, message: 'Please choose the type' }]}
                            >
                            <Select placeholder="Please choose the type">
                                <Option value="Yes">Yes</Option>
                                <Option value="No">No</Option>
                            </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                            name="lienholder_forms"
                            label="Lienholder Forms"
                            rules={[{ required: true, message: 'Please choose the type' }]}
                            >
                            <Select placeholder="Please choose the type">
                                <Option value="Yes">Yes</Option>
                                <Option value="No">No</Option>
                            </Select>
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                            name="use_system"
                            label="System"
                            rules={[{ required: true, message: 'Please enter system used' }]}
                            >
                                <Input placeholder="Please enter system used" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
}

export default CLientForm;
