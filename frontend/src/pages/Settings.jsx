import React, { useState } from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  FormControl,
  FormLabel,
  HStack,
  useToast,
  Grid,
  Icon,
  Badge,
  Input,
  InputGroup,
  InputRightElement,
  Switch,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  FaLock,
  FaUserShield,
  FaEnvelope,
  FaMobile,
  FaCheckCircle,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const SettingSection = ({ icon, title, description, children }) => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box 
      bg={bgColor} 
      p={6} 
      borderRadius="xl" 
      boxShadow="lg"
      border="1px solid"
      borderColor={borderColor}
      transition="all 0.3s"
      _hover={{ boxShadow: 'xl', transform: 'translateY(-2px)' }}
    >
      <VStack align="stretch" spacing={6}>
        <HStack spacing={4}>
          <Icon as={icon} boxSize={6} color="purple.500" />
          <Box>
            <Heading size="md" mb={1}>{title}</Heading>
            <Text fontSize="sm" color="gray.500">{description}</Text>
          </Box>
        </HStack>
        <Box>{children}</Box>
      </VStack>
    </Box>
  );
};

function Settings() {
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const gradientText = useColorModeValue(
    'linear(to-r, purple.600, pink.600)',
    'linear(to-r, purple.400, pink.400)'
  );

  return (
    <MotionBox
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    bg="gray.50" minH="100vh" p={8}
    >
      <VStack spacing={8} align="stretch" maxW="1200px" mx="auto">
        {/* Header */}
        <VStack align="start" spacing={1}>
          <Heading size="2xl" bgGradient={gradientText} bgClip="text">
            Settings
          </Heading>
          <Text color="gray.500" fontSize="lg">
            Manage your account settings and security preferences
          </Text>
        </VStack>

        <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={8}>
          {/* Security Section */}
          <SettingSection
            icon={FaUserShield}
            title="Security"
            description="Protect your account and personal information"
          >
            <VStack align="stretch" spacing={6}>
              <FormControl display="flex" alignItems="center" justifyContent="space-between">
                <VStack align="start" spacing={0}>
                  <HStack>
                    <FormLabel mb={0} fontSize="md">Two-Factor Authentication</FormLabel>
                    <Badge colorScheme="green">Recommended</Badge>
                  </HStack>
                  <Text fontSize="sm" color="gray.500">Add an extra layer of security to your account</Text>
                </VStack>
                <Switch colorScheme="purple" size="lg" />
              </FormControl>

              <VStack align="stretch" spacing={2}>
                <FormLabel>Change Password</FormLabel>
                <InputGroup size="lg">
                  <Input
                    pr="4.5rem"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
                      <Icon as={showPassword ? FaEyeSlash : FaEye} />
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </VStack>

              <Button leftIcon={<FaLock />} colorScheme="purple" variant="outline">
                Update Security Settings
              </Button>
            </VStack>
          </SettingSection>

          {/* Contact Information */}
          <SettingSection
            icon={FaEnvelope}
            title="Contact Information"
            description="Keep your contact details up to date"
          >
            <VStack align="stretch" spacing={6}>
              <FormControl>
                <FormLabel>Email Address</FormLabel>
                <Input size="lg" defaultValue="john.doe@example.com" />
              </FormControl>

              <FormControl>
                <FormLabel>Phone Number</FormLabel>
                <Input size="lg" defaultValue="+1 (555) 123-4567" />
              </FormControl>

              <HStack>
                <Icon as={FaCheckCircle} color="green.500" />
                <Text fontSize="sm" color="green.500">All contact information is verified</Text>
              </HStack>

              <Button leftIcon={<FaMobile />} colorScheme="purple" variant="outline">
                Verify New Contact
              </Button>
            </VStack>
          </SettingSection>
        </Grid>

        {/* Save Button */}
        <Button
          colorScheme="purple"
          size="lg"
          onClick={handleSave}
          w={{ base: "full", md: "auto" }}
          alignSelf="flex-end"
          boxShadow="md"
          _hover={{ boxShadow: 'lg', transform: 'translateY(-2px)' }}
          transition="all 0.3s"
        >
          Save Changes
        </Button>
      </VStack>
    </MotionBox>
  );
}

export default Settings;

