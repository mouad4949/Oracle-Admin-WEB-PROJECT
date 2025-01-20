import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Heading,
  Text,
  Flex,
  VStack,
  Button,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaCreditCard } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import { getAccountsbyClientID } from '../api/api';
import { CardComponent } from '../components/cards/CardComponent';

const MotionBox = motion(Box);

function Cards() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const toast = useToast();

  useEffect(() => {
    const fetchAccounts = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        const clientId = decodedToken.user_id;
        const fetchedUsername = decodedToken.sub;
        setUsername(fetchedUsername);

        const fetchedAccounts = await getAccountsbyClientID(clientId, token);

        const cardData = fetchedAccounts.map((account) => ({
          id: account.id_account,
          cardNumber: account.cardNumber || '****',
          expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 5))
            .toLocaleDateString('en-US', { month: '2-digit', year: '2-digit' }),
          balance: account.balance.toFixed(2),
          cardType: account.accountType.toLowerCase() === 'gold' ? 'visa' : 'mastercard',
          holderName: fetchedUsername || 'UNKNOWN',
          isLocked: account.isLocked,
          isFrozen: false,
          color:
            account.accountType.toLowerCase() === 'gold'
              ? ['#ffd700', '#ffa500']
              : account.accountType.toLowerCase() === 'silver'
              ? ['#c0c0c0', '#808080']
              : ['#0ea5e9', '#2563eb'],
        }));

        setCards(cardData);
      } catch (error) {
        console.error('Error fetching accounts:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch card data. Please try again later.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, [toast]);

  const toggleLock = async (id) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === id ? { ...card, isLocked: !card.isLocked } : card
        )
      );

      toast({
        title: 'Card Updated',
        description: `Card has been ${
          cards.find((c) => c.id === id).isLocked ? 'unlocked' : 'locked'
        }.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update card status. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const toggleFreeze = async (id) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === id ? { ...card, isFrozen: !card.isFrozen } : card
        )
      );

      toast({
        title: 'Card Updated',
        description: `Card has been ${
          cards.find((c) => c.id === id).isFrozen ? 'unfrozen' : 'frozen'
        }.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update card status. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Spinner size="xl" color="purple.500" />
      </Flex>
    );
  }

  return (
    <Box p={8} bg="gray.50" minH="100vh">
      <VStack spacing={8} align="stretch">
        {/* Title Section with Motion */}
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Flex justify="space-between" align="center">
            <VStack align="start" spacing={1}>
              <Heading size="xl" bgGradient="linear(to-r, purple.500, pink.500)" bgClip="text">
                Your Cards
              </Heading>
              <Text color="gray.600">Manage and control your cards</Text>
            </VStack>
            {/* <Button
              colorScheme="purple"
              size="md"
              leftIcon={<FaCreditCard />}
              _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
              transition="all 0.2s"
            >
              Add New Card
            </Button> */}
          </Flex>
        

        {/* Cards List Section */}
        <Grid
          templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
          gap={8}
          alignItems="start"
          mt={4}
        >
          {cards.map((card) => (
            <CardComponent
              key={card.id}
              card={card}
              onLockToggle={() => toggleLock(card.id)}
              onFreezeToggle={() => toggleFreeze(card.id)}
            />
          ))}
        </Grid>
        </MotionBox>
      </VStack>
    </Box>
  );
}

export default Cards;
