'use client';
import { useToken } from '@chakra-ui/react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="text-gray-600 mb-2">{label}</p>
        <p className="text-green-600 font-semibold">
          Income: ${payload[0].value.toFixed(2)}
        </p>
        <p className="text-red-600 font-semibold">
          Expenses: ${Math.abs(payload[1].value).toFixed(2)}
        </p>
      </div>
    );
  }
  return null;
};

const processTransactionsForChart = (transactions) => {
  // Create a map to store daily totals
  const dailyTotals = new Map();

  // Get the current date
  const currentDate = new Date();
  
  // Get date from 7 days ago
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(currentDate.getDate() - 7);

  // Initialize the dailyTotals map with the last 7 days
  for (let d = new Date(sevenDaysAgo); d <= currentDate; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0];
    dailyTotals.set(dateStr, { date: dateStr, income: 0, expenses: 0 });
  }

  // Process transactions
  transactions.forEach(transaction => {
    const dateStr = new Date(transaction.date).toISOString().split('T')[0];
    if (dailyTotals.has(dateStr)) {
      const daily = dailyTotals.get(dateStr);
      if (transaction.amount > 0) {
        daily.income += transaction.amount;
      } else {
        daily.expenses += Math.abs(transaction.amount);
      }
    }
  });

  // Convert map to array and sort by date
  return Array.from(dailyTotals.values())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map(daily => ({
      name: new Date(daily.date).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      }),
      amount: daily.income,
      expenses: daily.expenses,
      fullDate: daily.date
    }));
};

export default function OverviewChart({ transactions }) {
  const [purple600, purple100] = useToken('colors', ['purple.600', 'purple.100']);
  
  const chartData = processTransactionsForChart(transactions || []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={chartData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={purple600} stopOpacity={0.2} />
            <stop offset="95%" stopColor={purple600} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={purple100} stopOpacity={0.2} />
            <stop offset="95%" stopColor={purple100} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#666' }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#666' }}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="amount"
          stroke={purple600}
          fill="url(#incomeGradient)"
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="expenses"
          stroke={purple100}
          fill="url(#expensesGradient)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}