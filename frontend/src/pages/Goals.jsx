import { 
  Box, 
  Heading, 
  VStack, 
  HStack, 
  Text, 
  Progress, 
  Button,
  SimpleGrid,
  Icon,
  useDisclosure
} from '@chakra-ui/react';
import { FiHome, FiTruck, FiBookOpen, FiUmbrella } from 'react-icons/fi';

const goals = [
  {
    id: 1,
    name: 'House Down Payment',
    icon: FiHome,
    target: 50000,
    current: 35000,
    date: '2025-12-31',
    color: 'blue',
  },
  {
    id: 2,
    name: 'New Car',
    icon: FiTruck,
    target: 25000,
    current: 15000,
    date: '2024-06-30',
    color: 'green',
  },
  {
    id: 3,
    name: 'Education Fund',
    icon: FiBookOpen,
    target: 30000,
    current: 10000,
    date: '2026-09-01',
    color: 'purple',
  },
  {
    id: 4,
    name: 'Emergency Fund',
    icon: FiUmbrella,
    target: 20000,
    current: 18000,
    date: '2024-12-31',
    color: 'orange',
  },
];

function Goals() {
  return (
    <Box p={8}>
      <HStack justify="space-between" mb={6}>
        <Heading color="gray.800">Financial Goals</Heading>
        <Button colorScheme="blue">Add New Goal</Button>
      </HStack>

      <SimpleGrid columns={2} spacing={6}>
        {goals.map((goal) => (
          <Box 
            key={goal.id}
            bg="white"
            p={6}
            borderRadius="lg"
            shadow="sm"
            _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
            transition="all 0.2s"
          >
            <HStack spacing={4} mb={4}>
              <Icon as={goal.icon} boxSize={6} color={`${goal.color}.500`} />
              <VStack align="start" spacing={0}>
                <Text fontSize="lg" fontWeight="bold">{goal.name}</Text>
                <Text fontSize="sm" color="gray.500">Target Date: {goal.date}</Text>
              </VStack>
            </HStack>

            <VStack align="stretch" spacing={2}>
              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.600">Progress</Text>
                <Text fontSize="sm" fontWeight="medium">
                  ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                </Text>
              </HStack>
              <Progress 
                value={(goal.current / goal.target) * 100} 
                colorScheme={goal.color}
                borderRadius="full"
              />
              <Text fontSize="sm" color="gray.500" textAlign="right">
                {Math.round((goal.current / goal.target) * 100)}% Complete
              </Text>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default Goals;