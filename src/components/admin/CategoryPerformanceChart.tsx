import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { chartColors, chartConfig } from '@/lib/chartTheme';
import { TopCategory } from '@/types/analytics';

interface Props {
  data: TopCategory[];
}

export default function CategoryPerformanceChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={chartConfig.margin}>
        <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
        <XAxis
          dataKey="category"
          stroke={chartColors.text}
          style={{ fontSize: chartConfig.fontSize, fontFamily: chartConfig.fontFamily }}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis
          stroke={chartColors.text}
          style={{ fontSize: chartConfig.fontSize, fontFamily: chartConfig.fontFamily }}
          tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: chartColors.tooltip,
            border: `1px solid ${chartColors.grid}`,
            borderRadius: '6px',
            color: chartColors.text,
          }}
          formatter={(value: number | undefined, name: string | undefined) => [
            name === 'revenue' ? `NPR ${(value || 0).toLocaleString()}` : (value || 0),
            name === 'revenue' ? 'Revenue' : 'Quantity Sold',
          ]}
        />
        <Legend wrapperStyle={{ color: chartColors.text }} />
        <Bar dataKey="quantitySold" fill={chartColors.secondary} name="Quantity Sold" />
        <Bar dataKey="revenue" fill={chartColors.primary} name="Revenue" />
      </BarChart>
    </ResponsiveContainer>
  );
}
