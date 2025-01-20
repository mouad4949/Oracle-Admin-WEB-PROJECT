import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const MoneyDistributionChart = ({ accounts }) => {
  const accountTypes = ['Gold', 'Titanium', 'Silver'];
  const data = accountTypes.map(
    (type) => accounts
      .filter((account) => account.accountType.toLowerCase() === type.toLowerCase())
      .reduce((sum, account) => sum + account.balance, 0)
  );

  const chartData = {
    labels: accountTypes,
    datasets: [
      {
        data: data,
        backgroundColor: ['#FFD700', '#B2BEB5', '#C0C0C0'],
        hoverBackgroundColor: ['#FFC000', '#A2AEA5', '#B0B0B0'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((acc, curr) => acc + curr, 0);
            const percentage = ((value / total) * 100).toFixed(2);
            return `${label}: $${value.toFixed(2)} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
      <Text fontSize="xl" fontWeight="bold" mb={4} color="purple.600">
        Money Distribution
      </Text>
      <Box height="300px">
        <Doughnut data={chartData} options={options} />
      </Box>
    </Box>
  );
};

