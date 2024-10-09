import React from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const CustomPieChart = ({
  data,
  dataKey = 'value',
  innerRadius = 40,
  outerRadius = 80,
  fill = '#82ca9d',
  showTooltip = true,
  showLegend = false,
  label = false,
}) => {

  console.log("customData", data);
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          dataKey={dataKey}
          data={data}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          fill={fill}
          label={label}
        />
        {showTooltip && <Tooltip />}
        {showLegend && <Legend />}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
