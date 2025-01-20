import React from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Badge,
  Icon,
  useTheme,
} from '@chakra-ui/react';

export const AccountCard = ({ account, icon }) => {
  const theme = useTheme();

  const getAccountColor = (accountType) => {
    switch (accountType.toLowerCase()) {
      case 'gold':
        return 'yellow';
      case 'titanium':
        return 'gray';
      case 'silver':
        return 'gray';
      default:
        return 'purple';
    }
  };

  const accountColor = getAccountColor(account.accountType);

  return (
    <Box
      bg="white"
      p={6}
      borderRadius="lg"
      boxShadow="xl"
      position="relative"
      overflow="hidden"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        bgGradient: `linear(to-r, ${accountColor}.400, ${accountColor}.600)`,
      }}
    >
      <VStack align="start" spacing={4}>
        <Icon as={icon} boxSize={8} color={`${accountColor}.500`} />
        <Heading size="md" color={`${accountColor}.600`}>
          Account {account.accountNumber}
        </Heading>
        <Text fontSize="sm" color="gray.500">
          Type: {account.accountType}
        </Text>
        <Text fontSize="xl" fontWeight="bold" color={`${accountColor}.500`}>
          ${account.balance.toFixed(2)}
        </Text>
        <Text fontSize="xs" color="gray.400">
          Created on {new Date(account.createdAt).toLocaleDateString()}
        </Text>
        <Badge colorScheme={account.status === 'ACTIVE' ? 'green' : 'red'}>
          {account.status}
        </Badge>
      </VStack>
    </Box>
  );
};

