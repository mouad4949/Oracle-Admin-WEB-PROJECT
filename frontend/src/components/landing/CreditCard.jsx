import React from 'react';
import { Box, Text, VStack, Image, List, ListItem } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const CreditCard = ({ type, color, features }) => (
  <MotionBox
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    <VStack spacing={4} align="stretch">
      {/* Card Design */}
      <Box
        bg={color}
        borderRadius="xl"
        p={6}
        position="relative"
        height="240px"
        boxShadow="lg"
        width="420px"
      >
        <Image
          src='/asmas-logo-light-cropped.png'
          alt="Bank logo"
          width="25px"
          height="auto"
        /> 
        <Image
          src="mastercard.png"
          alt="Mastercard logo"
          position="absolute"
          top={5}
          right={5}
          width="50px"
          height="auto"
        />
        <Box 
          position="absolute"
          left={6}
          top="50%"
          display="flex"
          transform="translateY(-50%)"
        >
          <Image
            src="/chip.png"
            alt="Chip"
            mb={4}
            mt={4}
            width="65px"
          />
          <Text 
            mt={1}
            ml={5}
            fontFamily="Poppins"
            fontSize="5xl" 
            fontWeight="thin" 
            letterSpacing="12px"  
            color="black"
          >
            {type.toUpperCase()}
          </Text>
        </Box>
        <Text
          position="absolute"
          bottom={4}
          right={4}
          fontSize="sm"
          color="black"
        >
          exp: 12/12
        </Text>
      </Box>

      {/* Plan Details */}
      <VStack align="center" spacing={3} my={4} maxWidth="400px">
        <Text fontFamily="Poppins" fontSize="3xl" fontWeight="semibold" color="white">
          {type} Plan
        </Text>
        <List fontFamily="Poppins" spacing={2} textAlign="left" mt={2}>
          {features.map((feature, index) => (
            <ListItem 
              key={index} 
              color="whiteAlpha.900" 
              fontSize="sm"
            >
              {feature.highlight ? (
                <>
                  {feature.text.split(feature.highlight).map((part, i, arr) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <Text as="span" color="purple.300" fontWeight="bold">
                          {feature.highlight}
                        </Text>
                      )}
                    </React.Fragment>
                  ))}
                </>
              ) : (
                feature.text
              )}
            </ListItem>
          ))}
        </List>
      </VStack>
    </VStack>
  </MotionBox>
);

export default CreditCard;
