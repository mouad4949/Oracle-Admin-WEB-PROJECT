import React from 'react';
import { Box, Flex, Text, Stat, StatLabel, StatNumber, StatGroup } from '@chakra-ui/react';

export const AccountsSummary = ({ accounts }) => {
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
  const totalAccounts = accounts.length;

  return (
    <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
      <Flex justify="space-between" align="center">
        <Text fontSize="2xl" fontWeight="bold" color="purple.600">
          Accounts Summary
        </Text>
        <StatGroup>
          <Stat>
            <StatLabel>Total Balance</StatLabel>
            <StatNumber
              fontSize="3xl"
              fontWeight="extrabold"
              bgGradient="linear(to-r, purple.500, pink.500)"
              bgClip="text"
            >
              ${totalBalance.toFixed(2)}
            </StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Total Accounts</StatLabel>
            <StatNumber fontSize="xl" fontWeight="semibold" color="gray.700">
              {totalAccounts}
            </StatNumber>
          </Stat>
        </StatGroup>
      </Flex>
    </Box>
  );
};
