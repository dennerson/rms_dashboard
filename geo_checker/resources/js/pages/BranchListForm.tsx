import React, { useEffect } from 'react';
import { Button, Col, Drawer, Form, Input, Row, Select, Space, message } from 'antd';


const { Option } = Select;

const BranchForm = ({ branch, onSubmitted, onClose, open, setOpen }) => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if (branch && open) {
            form.setFieldsValue(branch);
        }
    }, [branch, open]);

    const handleClose = () => {
        form.resetFields();
        setOpen(false);
        onClose?.();
    };

    const normalizedYesNoFields = (data: Record<string, any>) => {
        const yesNoFields = [
            "reservation",
            "military",
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

            const method = branch ? 'put' : 'post';
            const url = branch ? `/api/branches/${branch.zip_code}` : '/api/branches';
            await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cleanValues),
            });
            messageApi.success(`branch ${branch ? 'updated' : 'created'} successfully`);
            handleClose();
            onSubmitted();
        } catch (error) {
            console.error('An error occurred.', error);
            messageApi.error('Error saving branch');
        }
    };
    return (
        <>
            {contextHolder}
            <Drawer
                title={branch ? 'Edit Branch' : 'Add Branch'}
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
                                name="zip_code"
                                label="Zipcode"
                                rules={[{ required: true, message: 'Please enter zipcode' }]}
                            >
                                <Input placeholder="Please enter zipcode" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                            name="branch_name"
                            label="Branch name"
                            rules={[{ required: true, message: 'Please enter Branch name' }]}
                            >
                                <Input placeholder="Please enter Branch name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                            name="branch_zip"
                            label="Branch zip"
                            rules={[{ required: true, message: 'Please enter Branch zip' }]}
                            >
                                <Input placeholder="Please enter involuntary fee Branch zip" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="city"
                                label="City"
                                rules={[{ required: true, message: 'Please enter City' }]}
                            >
                                <Input placeholder="Please enter City" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="state"
                                label="State"
                                rules={[{ required: true, message: 'Please enter State' }]}
                            >
                                <Input placeholder="Please enter State" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="county"
                                label="County"
                                rules={[{ required: true, message: 'Please enter County' }]}
                            >
                                <Input placeholder="Please enter County" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="miles"
                                label="Miles"
                                rules={[{ required: true, message: 'Please enter Miles' }]}
                            >
                                <Input placeholder="Please enter Miles" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="miles_incl"
                                label="Miles Included"
                                rules={[{ required: true, message: 'Please enter Miles Included' }]}
                            >
                                <Input placeholder="Please enter Miles Included" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="rate"
                                label="Rate"
                                rules={[{ required: true, message: 'Please enter Rate' }]}
                            >
                                <Input placeholder="Please enter Rate" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="actual"
                                label="Actual"
                                rules={[{ required: true, message: 'Please enter Actual' }]}
                            >
                                <Input placeholder="Please enter Actual" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="rounded"
                                label="Rounded"
                                rules={[{ required: true, message: 'Please enter Rounded' }]}
                            >
                                <Input placeholder="Please enter Rounded" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="mileage_fee"
                                label="Mileage fee"
                                rules={[{ required: true, message: 'Please enter Mileage fee' }]}
                            >
                                <Input placeholder="Please enter Mileage fee" />
                            </Form.Item>
                        </Col>


                        <Col span={12}>
                            <Form.Item
                            name="reservation"
                            label="Reservation"
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
                            name="military"
                            label="Military"
                            rules={[{ required: true, message: 'Please choose the type' }]}
                            >
                            <Select placeholder="Please choose the type">
                                <Option value="Yes">Yes</Option>
                                <Option value="No">No</Option>
                            </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
}

export default BranchForm;
