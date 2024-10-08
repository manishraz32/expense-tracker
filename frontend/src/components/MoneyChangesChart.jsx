import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Oct 07, 2024', Expense: 0, Income: 0 },
  { day: 'Oct 07, 2024', Expense: -3000, Income: 1398 },
  { day: 'Oct 07, 2024', Expense: -2000, Income: 9800 },
  { day: 'Oct 07, 2024', Expense: -2780, Income: 3908 },
  { day: 'Oct 07, 2024', Expense: -1890, Income: 4800 },
  { day: 'Oct 07, 2024', Expense: -2390, Income: 3800 },
  { day: 'Oct 07, 2024', Expense: -3490, Income: 4300 },
];

const MoneyChangesChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        {/* Apply barSize to control the width of bars */}
        <Bar dataKey="Expense" fill="#8884d8" barSize={5} activeBar={<Rectangle fill="pink" stroke="blue" />} />
        <Bar dataKey="Income" fill="#82ca9d" barSize={5} activeBar={<Rectangle fill="gold" stroke="purple" />} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MoneyChangesChart;
