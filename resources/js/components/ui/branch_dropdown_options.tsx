import React from 'react';
import type { CascaderProps } from 'antd';
import { Cascader, Col, Row } from 'antd';

interface Option {
  value: string;
  label: string;
}

const options: Option[] = [
  {
    value: 'BETO MEZA @ PREMIER AUTO CENTER',
    label: 'BETO MEZA @ PREMIER AUTO CENTER',

  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
  },
];

const onChange: CascaderProps<Option>['onChange'] = (value) => {
  console.log(value);
};

const App: React.FC = () => (
    <>
        <div>
            <Row>
                <div className='flex mb-4 ml-4 mr-4 overflow-x-scroll'>
                    <div className='flex'>
                        <div className='mr-4 ml-4'>
                            <p className='mr-10 ml-0'>Client & Lienholder:</p>
                            <Col span={8}><Cascader options={options} onChange={onChange} placeholder="Please choose type" /></Col>
                        </div>

                        <div className='mr-4 ml-4'>
                            <p className='mr-10 ml-0'>Order Type:</p>
                            <Col span={8}><Cascader options={options} onChange={onChange} placeholder="Please choose type" /></Col>
                        </div>

                        <div className='mr-4 ml-4 content-start'>
                            <p className='mr-10 ml-0'>Two Stop Fee:</p>
                            <Col span={8}><Cascader options={options} onChange={onChange} placeholder="Please choose type" /></Col>
                        </div>
                    </div>
                </div>
            </Row>
        </div>
    </>
);

export default App;
