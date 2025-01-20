import React from 'react';
import { Box, Text, Button, Container, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionText = motion(Text);

const CTASection = () => {
  return (
    <Box
      py={20}
      px={4}
      textAlign="center"
      position="relative"
      overflow="hidden"
    >
      <Container maxW="container.xl">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <MotionText
            fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
            fontFamily="Poppins"
            fontWeight="bold"
            opacity="80%"
            color="black"
            mb={6}
            lineHeight="1.2"
          >
            Ready to Transform Your
            <br />
            Banking Experience?
          </MotionText>

          <Flex margin="auto"
                justifyContent="center" mt="90px" w="100%">
          <Text
            fontSize="3xl"
            fontFamily="Poppins"
            fontWeight="semibold"
            color="black"
            opacity="80%"
            mb={8}
            align="left"
          >
            Join thousands of satisfied customers today and take the first
            step toward smarter financial management.
          </Text>

          <Button
                size="lg"
                h="70px"
                w="260px"
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
          </Flex>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default CTASection;

