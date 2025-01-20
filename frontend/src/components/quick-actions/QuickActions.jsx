import { SimpleGrid, Box, Icon, Text, VStack } from '@chakra-ui/react';
import { FiSend, FiDownload, FiCreditCard, FiDollarSign } from '../icons';

const actions = [
  { icon: FiSend, label: 'Send Money', color: 'blue.500' },
  { icon: FiDownload, label: 'Request', color: 'green.500' },
  { icon: FiCreditCard, label: 'Pay Bills', color: 'purple.500' },
  { icon: FiDollarSign, label: 'Top Up', color: 'orange.500' }
];

function QuickActions() {
  return (
    <SimpleGrid columns={[2, 3, 4]} spacing={2}>
      {actions.map((action, index) => (
        <Box
          maxHeight={125}
          key={index}
          p={6}
          bg="white"
          borderRadius="lg"
          shadow="sm"
          cursor="pointer"
          _hover={{ transform: 'translateY(-6px)', shadow: 'xl', bg: 'gray.50' }}
          transition="all 0.3s"
          border="1px" borderColor="gray.200"
        >
          <VStack spacing={3} align="center">
            <Icon as={action.icon} boxSize={8} color={action.color} />
            <Text fontSize="md" fontWeight="medium" color="gray.700">{action.label}</Text>
          </VStack>
        </Box>
      ))}
    </SimpleGrid>
  );
}

export default QuickActions;
