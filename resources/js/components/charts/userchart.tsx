import React from 'react';
import { Line } from '@ant-design/charts';

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
        size: 5,
        shape: 'diamond',
    },
    color: '#1890ff',
    height: 120,
    autoFit: true,
    smooth: true,
};

const LineChart = () => (
    <div className="h-[50vh] w-full">
        <Line {...config} />
    </div>
);

export default LineChart;
