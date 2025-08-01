import React from 'react';
import { Cascader, CascaderProps, Col, Row } from 'antd';

interface Option {
    value: string;
    label: string;
}


interface BranchProps {
    clientOptions: Option[];
    onClientSelect: (value: string[]) => void;
    onOrderTypeChange: (value: string) => void;
    onTwoStopChange: (value: string) => void;
}

// const onChange: CascaderProps<Option>['onChange'] = (value) => {
//     console.log('selected client: ', value);
// }

const selectTwoStop: Option[] = [
    { value: 'yes', label: 'Yes'},
    { value: 'no', label: 'No'},
];
 
const selectOrderType: Option[] = [
    { value: 'none', label: 'None'},
    { value: 'voluntary', label: 'Voluntary'},
    { value: 'impound',label: 'Impound'},
    { value: 'involuntary',label: 'Involuntary'},
];

const Branch: React.FC<BranchProps> = ({
    clientOptions,
    onClientSelect,
    onOrderTypeChange,
    onOrderTypeSelect,

    onTwoStopChange,
    onTwoStopSelect,
}) => {

    // const onChange: CascaderProps<Option>['onChange'] = (value) => {
    //     onClientSelect(value);
    // };

    const handleClientChange: CascaderProps<Options>['onChange'] = (value) => {
        onClientSelect(value);
    };

    const handleOrderTypeChange: CascaderProps<Options>['onChange'] = (value) => {
        const selected = value[0];
        onOrderTypeSelect(selected);
    }
    const handleTwoStopChange: CascaderProps<Option>['onChange'] = (value) => {
        const selected = value[0];
        onTwoStopSelect(selected);
    }

    return (
        <Row>
            <div className='flex mb-4 ml-4 mr-4 overflow-x-scroll'>
                <div className='flex'>
                    <div className='mr-4 ml-4'>
                        <p className='mr-10 ml-0'>Client & Lienholder:</p>
                        <Col span={8}><Cascader options={clientOptions} onChange={handleClientChange} placeholder=" Choose Client" /></Col>
                    </div>

                    <div className='mr-4 ml-4'>
                        <p className='mr-10 ml-0'>Order Type:</p>
                        <Col span={8}><Cascader options={selectOrderType} onChange={handleOrderTypeChange} placeholder=" Choose Order Type" /></Col>
                    </div>

                    <div className='mr-4 ml-4 content-start'>
                        <p className='mr-10 ml-0'>Two Stop Fee:</p>
                        <Col span={8}><Cascader options={selectTwoStop} onChange={handleTwoStopChange} placeholder=" Choose Options" /></Col>
                    </div>
                </div>
            </div>
        </Row>
    );
}
export default Branch;

