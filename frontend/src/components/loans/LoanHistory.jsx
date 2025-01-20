import React from 'react';
import { Box, Heading, VStack, Text, Flex, Badge } from '@chakra-ui/react';

const LoanHistory = ({ loanApplications }) => {
  const sortedApplications = [...loanApplications].sort((a, b) => new Date(b.applicationDate) - new Date(a.applicationDate));
  const recentApplications = sortedApplications.slice(0, 5);

  return (
    <Box bg="white" borderRadius="xl" shadow="md" p={6}>
      <Heading size="md" mb={4}>Recent Loan History</Heading>
      <VStack spacing={4} align="stretch">
        {recentApplications.map((loan) => (
          <Flex key={loan.id} justify="space-between" align="center" p={3} bg="gray.50" borderRadius="md">
            <VStack align="start" spacing={0}>
              <Text fontWeight="bold">${loan.loanAmount.toLocaleString()} - {loan.loanIntent}</Text>
              <Text fontSize="sm" color="gray.600">
                {new Date(loan.applicationDate).toLocaleDateString()}
              </Text>
            </VStack>
            <Badge
              colorScheme={
                loan.status === 'APPROVED'
                  ? 'green'
                  : loan.status === 'REJECTED'
                  ? 'red'
                  : 'yellow'
              }
            >
              {loan.status || 'Pending'}
            </Badge>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
};

export default LoanHistory;

