import React from 'react';
import { Box, Heading, Text, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText } from '@chakra-ui/react';

const LoanStatistics = ({ loanApplications }) => {
  const totalLoans = loanApplications.length;
  const approvedLoans = loanApplications.filter(loan => loan.status === 'APPROVED').length;
  const totalAmount = loanApplications.reduce((sum, loan) => sum + parseFloat(loan.loanAmount), 0);
  const averageAmount = totalLoans > 0 ? totalAmount / totalLoans : 0;

  return (
    <Box bg="white" borderRadius="xl" shadow="md" p={6}>
      <Heading size="md" mb={4}>Loan Statistics</Heading>
      <SimpleGrid columns={2} spacing={4}>
        <Stat>
          <StatLabel>Total Applications</StatLabel>
          <StatNumber>{totalLoans}</StatNumber>
          <StatHelpText>All time</StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Approved Loans</StatLabel>
          <StatNumber>{approvedLoans}</StatNumber>
          <StatHelpText>{((approvedLoans / totalLoans) * 100).toFixed(1)}% approval rate</StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Total Amount Requested</StatLabel>
          <StatNumber>${totalAmount.toLocaleString()}</StatNumber>
          <StatHelpText>Across all applications</StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Average Loan Amount</StatLabel>
          <StatNumber>${averageAmount.toLocaleString()}</StatNumber>
          <StatHelpText>Per application</StatHelpText>
        </Stat>
      </SimpleGrid>
    </Box>
  );
};

export default LoanStatistics;

