import React from 'react';
import { Funnel, Line } from '@ant-design/charts';

const data = [
    { month: 'Jan', value: 100 },
    { month: 'Feb', value: 220 },
    { month: 'Mar', value: 110 },
    { month: 'Apr', value: 300 },
    { month: 'May', value: 140 },
    { month: 'Jun', value: 400 },
    { month: 'July', value: 300 },
    { month: 'Aug', value: 800 },
    { month: 'Sept', value: 900 },
    { month: 'Oct', value: 540 },
];

const config = {
    data,
    xField: 'month',
    yField: 'value',
    point: {
        size: 1,
        shape: 'diamond',
    },
    color: '#1890ff',
    height: 220,
    autoFit: true,
    smooth: true,
};

const BarChart = () => (
    <div className="">
        <Line {...config} />
    </div>
);

export default BarChart;
