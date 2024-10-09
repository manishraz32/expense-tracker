import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomBarChart = ({
  data,
  xKey = "day",
  expenseKey = "expense",
  incomeKey = "income",
  width = "100%",
  height = 400,
  barSize = 5,
  expenseColor = "#f14c52",
  incomeColor = "#82ca9d"
}) => {
  return (
    <ResponsiveContainer width={width} height={height}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey={expenseKey}
          fill={expenseColor}
          barSize={barSize}
          activeBar={<Rectangle />}
        />
        <Bar
          dataKey={incomeKey}
          fill={incomeColor}
          barSize={barSize}
          activeBar={<Rectangle />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
