import React from 'react';
import { Box, Flex, Text, Link, Icon, Grid } from '@chakra-ui/react';
import { FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Grid
      as="footer"
      color="black"
      opacity="80%"
      py={4}
      px={8}
      alignItems="center"
        p={4}
        ml={{ base: '20px', md: '50px' }}
        mr={{ base: '20px', md: '50px' }}
        borderTop="solid 1px"
      gap="80px"
    >
      <Flex
        fontFamily="Poppins"
        fontWeight="semibold"
        maxW="100%"
        mx="auto"
        justify="space-between"
        align="center"
        flexWrap="strech"
        gap="70px"
      >
        <Text fontSize="lg" opacity={0.9}>
            Copyright © ASMAS {new Date().getFullYear()}
        </Text>
        <Link
          href="#"
          fontSize="lg"
          opacity={0.9}
          _hover={{ opacity: 1, textDecoration: 'none' }}
        >
          Terms of Service
        </Link>

        <Link
          onClick={scrollToTop}
          display="flex"
          alignItems="center"
          gap={2}
          fontSize="lg"
          opacity={0.9}
          _hover={{ opacity: 1, textDecoration: 'none' }}
          cursor="pointer"
          alignSelf="right"
          fontFamily="Poppins"
        >
          Back to top
          <Icon as={FaArrowUp} boxSize={3} />
        </Link>
      </Flex>
    </Grid>
  );
};

export default Footer;

