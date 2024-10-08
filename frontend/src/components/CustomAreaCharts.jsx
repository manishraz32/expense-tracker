import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomAreaChart = ({ data, xKey, yKey, chartWidth = 500, chartHeight = 400, strokeColor = "#8884d8", fillColor = "#8884d8" }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={chartWidth}
        height={chartHeight}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey={yKey} stroke={strokeColor} fill={fillColor} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default CustomAreaChart;
