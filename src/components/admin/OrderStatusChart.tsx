import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { chartColors, statusColors } from '@/lib/chartTheme';

interface Props {
  data: Array<{ status: string; count: number; percentage: number }>;
}

export default function OrderStatusChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={(props: any) => `${props.status}: ${props.percentage.toFixed(1)}%`}
          outerRadius={80}
          fill={chartColors.primary}
          dataKey="count"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={statusColors[entry.status] || chartColors.grid} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: chartColors.tooltip,
            border: `1px solid ${chartColors.grid}`,
            borderRadius: '6px',
            color: chartColors.text,
          }}
          formatter={(value: number | undefined, _name: string | undefined, props: any) => [
            `${value || 0} orders (${props.payload.percentage.toFixed(1)}%)`,
            props.payload.status,
          ]}
        />
        <Legend
          wrapperStyle={{ color: chartColors.text }}
          formatter={(_value, entry: any) => entry.payload.status}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
