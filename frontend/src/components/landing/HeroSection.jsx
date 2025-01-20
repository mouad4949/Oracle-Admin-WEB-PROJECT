import { Flex, Box, Heading, Button, Image, Text, ButtonGroup } from '@chakra-ui/react';
import React from 'react';
import { motion } from 'framer-motion';
import { MdOutlineBrokenImage } from 'react-icons/md';

const MotionBox = motion(Box);
const MotionText = motion(Text);
const MotionImage = motion(Image);

const HeroSection = () => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      mt={10}
      ml='5%'
      mr='5%'
      flexWrap="wrap"
      position="relative"
    >
      {/* Left Content */}
      <MotionBox
        margin="0 40px"
        maxW="1000px"
        textAlign="left"
        zIndex={2}
        initial={{ opacity: 0, x: -200 }}
        whileInView={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <MotionText
          as="h1"
          fontFamily="Poppins"
          fontWeight="semibold"
          fontSize="8rem"
          color="black"
          opacity='80%'
          lineHeight="1"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          Innovate <br/>
          your <Text as="span" fontWeight="extrabold" opacity="100" bgGradient="linear(to-r, black, #BF8AFF)" bgClip="text"> banking </Text> experience
        </MotionText> 
        <Flex mt={12} gap={8}>
            <Button
                size="lg"
                h="70px"
                w="200px"
                variant="outline"
                fontSize="25px"
                border="1px solid black"
                borderRadius={10}
                borderStyle="solid" // Explicitly set border style
                _hover={{
                borderColor: "black",
                backgroundColor: 'rgba(0, 0, 0, 0.1)', // Slightly darken background
                }}
                _focus={{
                boxShadow: 'none', // Remove focus ring
                }}
            > 
                Get Started
            </Button>
            <Button
                size="lg"
                h="70px"
                w="200px"
                variant="outline"
                fontSize="25px"
                border="1px solid black"
                borderRadius={10}
                borderStyle="solid" // Explicitly set border style
                _hover={{
                borderColor: "black",
                backgroundColor: 'rgba(0, 0, 0, 0.1)', // Slightly darken background
                }}
                _focus={{
                boxShadow: 'none', // Remove focus ring
                }}
            >
                Learn more
          </Button>
        </Flex>
      </MotionBox>

      {/* Right Image */}
      <Box 
        position="absolute" 
        top={-5} 
        right={10} 
        maxW="700px" 
        mt={0} 
        zIndex={1}
      >
        <MotionImage
          src="/credit-cards.png"
          alt="Cards"
          w="600px"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </Box>
    </Flex>
  );
};

export default HeroSection;
