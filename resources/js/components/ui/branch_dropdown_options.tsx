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
                <div className='flex'>
                    <div className='mr-18'><p className='mr-13'>Client & Lienholder:</p>
                        <Col span={8}><Cascader options={options} onChange={onChange} placeholder="Client & Lienholder" /></Col>
                    </div>
                    <div className='mr-18'><p className='mr-26'>Order Type:</p>
                        <Col span={8}><Cascader options={options} onChange={onChange} placeholder="Order Type" /></Col>
                    </div>
                    <div className=''><p className='mr-26'>Two Stop Fee:</p>
                        <Col span={8}><Cascader options={options} onChange={onChange} placeholder="Two Stop Fee" /></Col>
                    </div>
                </div>
            </Row>
        </div>
    </>
);

export default App;
