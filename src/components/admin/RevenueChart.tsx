import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { chartColors, chartConfig } from '@/lib/chartTheme';

interface Props {
  data: Array<{ date: string; amount: number }>;
}

export default function RevenueChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={chartConfig.margin}>
        <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
        <XAxis
          dataKey="date"
          stroke={chartColors.text}
          style={{ fontSize: chartConfig.fontSize, fontFamily: chartConfig.fontFamily }}
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
          formatter={(value: number | undefined) => [`NPR ${(value || 0).toLocaleString()}`, 'Revenue']}
        />
        <Line
          type="monotone"
          dataKey="amount"
          stroke={chartColors.primary}
          strokeWidth={2}
          dot={{ fill: chartColors.primary, r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
