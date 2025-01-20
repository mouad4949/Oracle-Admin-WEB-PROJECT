import { Box, Heading, Grid, Text, VStack, HStack, Progress, SimpleGrid } from '@chakra-ui/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const portfolioData = [
  { name: 'Stocks', value: 45, color: '#3182CE' },
  { name: 'Bonds', value: 25, color: '#38A169' },
  { name: 'Real Estate', value: 15, color: '#DD6B20' },
  { name: 'Crypto', value: 10, color: '#805AD5' },
  { name: 'Cash', value: 5, color: '#718096' },
];

const performanceData = [
  { name: 'Tesla (TSLA)', value: 12.5, change: '+2.3%' },
  { name: 'Apple (AAPL)', value: 8.2, change: '-0.5%' },
  { name: 'Microsoft (MSFT)', value: 15.1, change: '+1.8%' },
  { name: 'Amazon (AMZN)', value: 10.4, change: '+0.7%' },
];

function Investments() {
  return (
    <Box p={8}>
      <Heading mb={6} color="gray.800">Investment Portfolio</Heading>
      
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <Box bg="white" p={6} borderRadius="lg" shadow="sm">
          <Heading size="md" mb={4}>Asset Allocation</Heading>
          <Box height="300px">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={portfolioData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {portfolioData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        <Box bg="white" p={6} borderRadius="lg" shadow="sm">
          <Heading size="md" mb={4}>Top Holdings</Heading>
          <VStack spacing={4} align="stretch">
            {performanceData.map((stock, index) => (
              <Box key={index}>
                <HStack justify="space-between" mb={2}>
                  <Text fontWeight="medium">{stock.name}</Text>
                  <Text color={stock.change.startsWith('+') ? 'green.500' : 'red.500'}>
                    {stock.change}
                  </Text>
                </HStack>
                <Progress value={stock.value * 5} colorScheme="blue" size="sm" />
              </Box>
            ))}
          </VStack>
        </Box>
      </Grid>
    </Box>
  );
}

export default Investments;