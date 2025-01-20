import React from 'react';
import { Box, Flex, Text, Grid, VStack, Icon } from '@chakra-ui/react';
import { FaWallet, FaExchangeAlt, FaPiggyBank, FaMobileAlt, FaMoneyCheckAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import CreditCard from './CreditCard';

const MotionBox = motion(Box);
const MotionText = motion(Text);
const MotionGrid = motion(Grid);
const MotionVStack = motion(VStack);

const ServiceCard = ({ icon, title, description, isHighlighted }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    <Box
      bg={isHighlighted ? 'purple.600' : '#3B3B3B'}
      borderRadius="lg"
      p={6}
      color="white"
      maxWidth="620px"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <VStack textAlign="left" align="start" spacing={4}>
        <Flex align="center">
          <Icon as={icon} boxSize={6} mr={4} />
          <Text fontSize="xl" fontFamily="Poppins" fontWeight="semibold">{title}</Text>
        </Flex>
        <Text ml="38px" fontFamily="Poppins" fontWeight="medium" fontSize="sm" opacity={0.8}>{description}</Text>
      </VStack>
    </Box>
  </motion.div>
);

const ServicesSection = () => {
  const creditCardData = [
    {
      type: "Classic",
      color: "#4C1D95",
      features: [
        { text: ".Secure withdrawals up to $1,000 /day" },
        { text: ".Secure purchases in-store, online, in the country or abroad up to $1,000/month" },
        { text: ".Assistance in case of loss, theft, or malfunction of the card" }
      ]
    },
    {
      type: "Premium",
      color: "#EAB308",
      features: [
        { text: ".Secure withdrawals up to $3,000 /day" },
        { text: ".Secure purchases in-store, online, in the country or abroad up to $10,000/month" },
        { text: ".Exclusive access to premium services and concierge support" },
        { text: ".Assistance in case of loss, theft, or malfunction of the card" }
      ]
    },
    {
      type: "Titanium",
      color: "#A3A3A3",
      features: [
        { text: ".Secure withdrawals up to $5,000 /day" },
        { text: ".Secure purchases in-store, online, in the country or abroad up to $15,000/month" },
        { text: ".Comprehensive travel insurance and luxury rewards" },
        { text: ".Assistance in case of loss, theft, or malfunction of the card" }
      ]
    }
  ];

  return (
    <Box
      bgColor='#080808'
      minHeight="100vh"
      color="white"
      position="relative"
      py={20}
      px={0}
      mt='100px'
      pr="5vh"
      pl="5vh"
    >
      <Box
        position="absolute"
        bottom="620px"
        right="542px"
        h="100%"
        w="100%"
        zIndex={0}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        px={12}
        pointerEvents="none"
      >
        <Text
          fontFamily="Poppins"
          fontSize="300px"
          fontWeight="bold"
          color="#6B5E90"
          opacity={0.5}
          lineHeight="1"
        >
          01
        </Text>
        <Text
          position="relative"
          bottom="120px"
          right="50px"
          fontSize="25px"
          fontFamily="Poppins"
          fontWeight="semibold"
          opacity={0.8}
          color="#6B5E90"
          mt={-12}
        >
          Services
        </Text>
      </Box>

      <Flex
        direction="column"
        maxWidth="1920px"
        mx="10"
        position="relative"
        zIndex={1}
      >
        <MotionBox
          textAlign='left'
          mb={16}
          mt="270px"
          lineHeight={1.2}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <MotionText fontSize="6xl" fontFamily="Poppins" fontWeight="semibold" color="purple.300">
            Discover Our
          </MotionText>
          <MotionText fontSize="6xl" fontFamily="Poppins" fontWeight="semibold" color="white">
            Banking Solutions
          </MotionText>
        </MotionBox>

        <MotionGrid
          m="auto"
          templateColumns="repeat(2, 1fr)"
          gap={8}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <ServiceCard
            icon={FaWallet}
            title="Everyday Banking"
            description="Convenient checking accounts for daily transactions, paired with secure online and mobile banking access."
            isHighlighted={true}
          />
          <ServiceCard
            icon={FaExchangeAlt}
            title="Bill Payments and Transfers"
            description="Easily pay bills, schedule recurring payments, and transfer money securely domestically and internationally."
            isHighlighted={false}
          />
          <ServiceCard
            icon={FaMoneyCheckAlt}
            title="Cash Loans"
            description="Flexible cash loans tailored to your needs with competitive rates and quick approval."
            isHighlighted={false}
          />

          <ServiceCard
            icon={FaMobileAlt}
            title="Financial Management Anywhere"
            description="Manage your accounts on the go with our secure and intuitive online banking platform."
            isHighlighted={false}
          />
        </MotionGrid>
      </Flex>

      <Box
        position="absolute"
        top="100px"
        left="500px"
        h="100%"
        w="100%"
        zIndex={0}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        px={12}
        pointerEvents="none"
      >
        <Text
          fontFamily="Poppins"
          fontSize="300px"
          fontWeight="bold"
          color="#6B5E90"
          opacity={0.5}
          lineHeight="1"
        >
          02
        </Text>
        <Text
          position="relative"
          bottom="120px"
          left="70px"
          fontSize="25px"
          fontFamily="Poppins"
          fontWeight="semibold"
          opacity={0.8}
          color="#6B5E90"
          mt={-12}
        >
          Cards
        </Text>
      </Box>

      <Flex
        direction="column"
        maxWidth="1920px"
        mx="10"
        position="relative"
        zIndex={1}
      >
        <MotionBox
          textAlign='right'
          mb={16}
          mt="200px"
          lineHeight={1.2}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <MotionText fontSize="6xl" fontFamily="Poppins" fontWeight="semibold" color="purple.300">
            Explore our Credit
          </MotionText>
          <MotionText fontSize="6xl" fontFamily="Poppins" fontWeight="semibold" color="white">
            Card Options
          </MotionText>
        </MotionBox>

        <MotionGrid
          m="auto"
          templateColumns="repeat(3, 1fr)"
          gap={8}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {creditCardData.map((card, index) => (
            <CreditCard
              key={index}
              type={card.type}
              color={card.color}
              features={card.features}
            />
          ))}
        </MotionGrid>
      </Flex>
    </Box>
  );
};

export default ServicesSection;

