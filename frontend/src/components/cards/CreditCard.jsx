import { Box, VStack, HStack, Text, Icon } from '@chakra-ui/react';
import { FiCreditCard } from 'react-icons/fi';

function CreditCard({ card }) {
  return (
    <Box
      bg={card.color}
      color="white"
      p={6}
      borderRadius="xl"
      shadow="lg"
      position="relative"
      overflow="hidden"
      transition="transform 0.3s ease, box-shadow 0.3s ease"
      _hover={{
        transform: 'scale(1.05)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      <VStack align="stretch" spacing={4}>
        {/* Card Type and Icon */}
        <HStack justify="space-between" align="center">
          <Icon as={FiCreditCard} boxSize={8} />
          <Text fontSize="lg" fontWeight="bold" letterSpacing="0.5px" opacity={0.9}>
            {card.type}
          </Text>
        </HStack>

        {/* Card Number */}
        <Text fontSize="xl" letterSpacing={2} fontWeight="medium" opacity={0.8}>
          {card.number}
        </Text>

        {/* Expiry and Balance Information */}
        <HStack justify="space-between">
          <VStack align="start" spacing={0}>
            <Text fontSize="sm" opacity={0.7}>Expires</Text>
            <Text fontSize="md" fontWeight="medium">{card.expires}</Text>
          </VStack>

          <VStack align="end" spacing={0}>
            <Text fontSize="sm" opacity={0.7}>Balance</Text>
            <Text fontSize="md" fontWeight="medium">${card.balance.toFixed(2)}</Text>
          </VStack>
        </HStack>
      </VStack>
    </Box>
  );
}

export default CreditCard;
