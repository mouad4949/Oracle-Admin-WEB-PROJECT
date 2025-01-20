import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  HStack,
  Circle,
  Icon,
  Button,
  Progress,
} from '@chakra-ui/react';
import { FiGift, FiCoffee,FiAirplay, FiShoppingBag } from 'react-icons/fi';

const rewards = [
  {
    id: 1,
    name: 'Cashback Rewards',
    points: 12500,
    nextTier: 15000,
    icon: FiGift,
    color: 'blue',
  },
  {
    id: 2,
    name: 'Travel Miles',
    points: 45000,
    nextTier: 50000,
    icon: FiAirplay,
    color: 'purple',
  },
  {
    id: 3,
    name: 'Shopping Points',
    points: 8000,
    nextTier: 10000,
    icon: FiShoppingBag,
    color: 'pink',
  },
];

const availableRewards = [
  {
    id: 1,
    name: '$50 Amazon Gift Card',
    points: 5000,
    icon: FiShoppingBag,
  },
  {
    id: 2,
    name: 'Movie Tickets',
    points: 3000,
    icon: FiAirplay,
  },
  {
    id: 3,
    name: 'Coffee Shop Voucher',
    points: 1500,
    icon: FiCoffee,
  },
];

function Rewards() {
  return (
    <Box p={8}>
      <Heading mb={6} color="gray.800">Rewards & Points</Heading>

      <SimpleGrid columns={3} spacing={6} mb={8}>
        {rewards.map((reward) => (
          <Box
            key={reward.id}
            bg="white"
            p={6}
            borderRadius="lg"
            shadow="sm"
            _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
            transition="all 0.2s"
          >
            <VStack spacing={4} align="stretch">
              <HStack>
                <Circle size="40px" bg={`${reward.color}.100`}>
                  <Icon as={reward.icon} color={`${reward.color}.500`} boxSize={5} />
                </Circle>
                <Text fontSize="lg" fontWeight="bold">{reward.name}</Text>
              </HStack>

              <Box>
                <Text fontSize="2xl" fontWeight="bold" color={`${reward.color}.500`}>
                  {reward.points.toLocaleString()}
                </Text>
                <Text fontSize="sm" color="gray.500">points earned</Text>
              </Box>

              <Box>
                <HStack justify="space-between" mb={2}>
                  <Text fontSize="sm">Next Tier</Text>
                  <Text fontSize="sm">{reward.nextTier.toLocaleString()}</Text>
                </HStack>
                <Progress
                  value={(reward.points / reward.nextTier) * 100}
                  colorScheme={reward.color}
                  borderRadius="full"
                />
              </Box>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>

      <Box bg="white" p={6} borderRadius="lg" shadow="sm">
        <Heading size="md" mb={4}>Available Rewards</Heading>
        <SimpleGrid columns={3} spacing={6}>
          {availableRewards.map((reward) => (
            <Box
              key={reward.id}
              p={4}
              borderRadius="lg"
              border="1px"
              borderColor="gray.200"
              _hover={{ borderColor: 'blue.500' }}
              transition="all 0.2s"
            >
              <VStack spacing={3}>
                <Circle size="50px" bg="gray.100">
                  <Icon as={reward.icon} color="gray.600" boxSize={6} />
                </Circle>
                <Text fontWeight="medium">{reward.name}</Text>
                <Text fontSize="sm" color="gray.500">{reward.points.toLocaleString()} points</Text>
                <Button size="sm" colorScheme="blue" width="full">
                  Redeem
                </Button>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default Rewards;