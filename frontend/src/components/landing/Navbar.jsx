import { 
  Grid, GridItem, Flex, Image, Box, Button, Text, Link, IconButton, Collapse, VStack 
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [isMenuOpen, setMenuOpen] = useState(false); // Track menu state

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setMenuOpen(false); // Close menu on link click
  };

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  return (
    <>
      {/* Navbar Container */}
      <Grid
        templateColumns={{ base: '1fr auto', md: 'repeat(6, 1fr)' }}
        alignItems="center"
        p={4}
        ml={{ base: '20px', md: '50px' }}
        mr={{ base: '20px', md: '50px' }}
        borderBottom="solid 1px"
      >
        {/* Brand Logo */}
        <GridItem colSpan={{ md: 1 }}>
          <Box
            className="brand-logo"
            width="130px"
            height="60px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            opacity="60%"
            _hover={{
              opacity: '0.8',
            }}
          >
            <Image src="asmas-logo-dark.png" />
          </Box>
        </GridItem>

        {/* Centered Links - Hidden on Small Viewports */}
        <GridItem colSpan={{ md: 4 }} display={{ base: 'none', md: 'block' }}>
          <Flex justifyContent="center" alignItems="center" gap={12}>
            {['home', 'services', 'cards', 'about'].map((link) => (
              <Link
                key={link}
                href="#"
                onClick={() => handleLinkClick(link)}
                fontSize={25}
                fontFamily="Poppins"
                fontWeight="semibold"
                textDecoration={activeLink === link ? 'underline' : 'none'}
                mr={3}
                ml={3}
                opacity={activeLink === link ? 0.8 : 0.4}
                _hover={{
                  textDecoration: activeLink === link ? 'underline' : 'none',
                  color: 'inherit',
                  opacity: '0.8',
                }}
                textUnderlineOffset="12px"
              >
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </Link>
            ))}
          </Flex>
        </GridItem>

        {/* Buttons - Hidden on Small Viewports */}
        <GridItem colSpan={{ md: 1 }} display={{ base: 'none', md: 'block' }}>
          <Flex justifyContent="flex-end" alignItems="center" gap={4}>
            <Button
              size="lg"
              variant="outline"
              border="1px solid black"
              borderRadius={10}
              _hover={{
                borderColor: 'black',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              }}
              _focus={{
                boxShadow: 'none',
              }}
            >
              Get Started
            </Button>
            <Button
              as={RouterLink}
              to="/login"
              size="lg"
              variant="outline"
              borderColor="black"
              borderRadius={10}
              _hover={{
                borderColor: 'black',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              }}
              _focus={{
                boxShadow: 'none',
              }}
            >
              Login
            </Button>
          </Flex>
        </GridItem>

        {/* Hamburger Button for Small Viewports */}
        <GridItem display={{ base: 'block', md: 'none' }}>
          <IconButton
            icon={isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
            variant="outline"
            aria-label="Toggle Navigation"
            onClick={toggleMenu}
            size="lg"
          />
        </GridItem>
      </Grid>

      {/* Collapsible Menu for Small Viewports */}
      <Collapse in={isMenuOpen} animateOpacity>
        <Box p={4} display={{ md: 'none' }} bg="gray.50" shadow="md">
          <VStack align="start" spacing={4}>
            {['home', 'services', 'cards', 'about'].map((link) => (
              <Link
                key={link}
                href="#"
                onClick={() => handleLinkClick(link)}
                fontSize={20}
                fontFamily="Poppins"
                fontWeight="semibold"
                textDecoration={activeLink === link ? 'underline' : 'none'}
                opacity={activeLink === link ? 0.8 : 0.6}
                _hover={{
                  textDecoration: 'underline',
                  color: 'inherit',
                }}
                textUnderlineOffset="8px"
              >
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </Link>
            ))}
            <Button
              size="md"
              variant="outline"
              w="full"
              _hover={{
                borderColor: 'black',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              }}
            >
              Get Started
            </Button>
            <Button
              as={RouterLink}
              to="/login"
              size="md"
              variant="outline"
              w="full"
              _hover={{
                borderColor: 'black',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              }}
            >
              Login
            </Button>
          </VStack>
        </Box>
      </Collapse>
    </>
  );
};

export default Navbar;
