import React from 'react';
import {
  Box,
  Text,
  Flex,
  VStack,
  HStack,
  Button,
  Icon,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaCreditCard, FaWifi, FaLock, FaEllipsisH, FaPause } from 'react-icons/fa';
import { SiVisa, SiMastercard } from 'react-icons/si';

export const CardComponent = ({ card, onLockToggle, onFreezeToggle }) => {
  const { cardNumber, expiryDate, balance, cardType, holderName, isLocked, isFrozen, color } = card;

  const bgGradient = `linear-gradient(135deg, ${color[0]}, ${color[1]})`;
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  return (
    <Box
      bg={cardBg}
      borderRadius="xl"
      overflow="hidden"
      boxShadow="xl"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', boxShadow: '2xl' }}
    >
      <Box
        bg={bgGradient}
        p={6}
        position="relative"
        h="220px"
        _before={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            'radial-gradient(circle at 50% -20%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, transparent 80%)',
        }}
      >
        <Flex direction="column" h="full" justify="space-between">
          <Flex justify="space-between" align="center">
            <Icon as={FaCreditCard} w={8} h={8} color="white" />
            <HStack spacing={2}>
              <Icon as={FaWifi} transform="rotate(90deg)" color="white" />
              {cardType === 'visa' ? (
                <Icon as={SiVisa} w={12} h={12} color="white" />
              ) : (
                <Icon as={SiMastercard} w={12} h={12} color="white" />
              )}
            </HStack>
          </Flex>

          <Text color="white" fontSize="xl" letterSpacing={8} mt={4}>
            **** **** **** {cardNumber.slice(-4)}
          </Text>

          <Flex justify="space-between" align="flex-end">
            <Box>
              <Text color="whiteAlpha.700" fontSize="xs" mb={1}>
                Card Holder
              </Text>
              <Text color="white" fontSize="sm" fontWeight="bold">
                {holderName.toUpperCase()}
              </Text>
              <Text color="whiteAlpha.700" fontSize="xs" mt={2}>
                Expires
              </Text>
              <Text color="white" fontSize="sm">
                {expiryDate}
              </Text>
            </Box>
            <Box textAlign="right">
              <Text color="whiteAlpha.700" fontSize="xs" mb={1}>
                Balance
              </Text>
              <Text color="white" fontSize="xl" fontWeight="bold">
                ${balance}
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Box>
      <Box p={4}>
        <Flex justify="space-between" align="center" mb={4}>
          <HStack spacing={2}>
            <Button
              size="sm"
              leftIcon={<FaLock />}
              colorScheme={isLocked ? 'red' : 'gray'}
              variant={isLocked ? 'solid' : 'outline'}
              onClick={onLockToggle}
            >
              {isLocked ? 'Unlock' : 'Lock'}
            </Button>
            <Button
              size="sm"
              leftIcon={<FaPause />}
              colorScheme={isFrozen ? 'blue' : 'gray'}
              variant={isFrozen ? 'solid' : 'outline'}
              onClick={onFreezeToggle}
            >
              {isFrozen ? 'Unfreeze' : 'Freeze'}
            </Button>
          </HStack>
          <Button
            size="sm"
            variant="ghost"
            colorScheme="gray"
            rightIcon={<FaEllipsisH />}
          >
            Details
          </Button>
        </Flex>
        <Flex justify="space-between" align="center">
          <Badge colorScheme={isLocked ? 'red' : isFrozen ? 'blue' : 'green'}>
            {isLocked ? 'Locked' : isFrozen ? 'Frozen' : 'Active'}
          </Badge>
          <Text fontSize="sm" color={textColor}>
            Daily Limit: $10,000
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

