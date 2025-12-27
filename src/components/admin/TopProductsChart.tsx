import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { chartColors, chartConfig } from '@/lib/chartTheme';
import { TopProduct } from '@/types/analytics';

interface Props {
  data: TopProduct[];
}

export default function TopProductsChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ ...chartConfig.margin, left: 150 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
        <XAxis
          type="number"
          stroke={chartColors.text}
          style={{ fontSize: chartConfig.fontSize, fontFamily: chartConfig.fontFamily }}
          tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
        />
        <YAxis
          type="category"
          dataKey="productName"
          stroke={chartColors.text}
          style={{ fontSize: chartConfig.fontSize, fontFamily: chartConfig.fontFamily }}
          width={140}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: chartColors.tooltip,
            border: `1px solid ${chartColors.grid}`,
            borderRadius: '6px',
            color: chartColors.text,
          }}
          formatter={(value: number, name: string) => [
            name === 'revenue' ? `NPR ${value.toLocaleString()}` : value,
            name === 'revenue' ? 'Revenue' : 'Quantity Sold',
          ]}
        />
        <Bar dataKey="revenue" fill={chartColors.primary} radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
