import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  FormErrorMessage,
  Image,
  HStack,
  InputGroup,
  InputRightElement,
  IconButton
} from '@chakra-ui/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import React Icons
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { login } from '../api/api'; // Import the login function from the API
import axios from 'axios'; // Import Axios for API calls

export default function LoginPage() {
  const [username, setUsername] = useState(''); // Changed email to username
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const navigate = useNavigate(); // Initialize navigate

  const validateForm = () => {
    const newErrors = {};
    if (!username) newErrors.username = 'Username is required'; // Changed email to username
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      // Call the login API
      const { token } = await login(username, password);

      // Save the token in localStorage (or cookies for better security)
      localStorage.setItem('authToken', token);
      console.log(token);

      // Show success toast
      toast({
        title: 'Login successful',
        status: 'success',
        duration: 2000, // Show for 2 seconds
        isClosable: true,
      });

      // Delay navigation to allow toast to be visible
      setTimeout(() => {
        navigate('/overview'); // Navigate to the next page
      }, 2000); // Navigate after 2 seconds
    } catch (error) {
      // Show error toast
      toast({
        title: 'Invalid credentials',
        description: 'Please check your username and password',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }

    setIsLoading(false);
  };

  return (
    <Box
      minH="100vh"
      bg="linear-gradient(135deg, #9747FF 0%, #7B3FE4 100%)"
      py={10}
      position="relative"
      overflow="hidden"
    >
      {/* Decorative card images */}
      <Box
        position="absolute"
        right="-5%"
        top="5%"
        transform="rotate(15deg)"
        opacity={0.1}
        width="400px"
      >
        <Image src="/placeholder.svg?height=250&width=400" alt="Decorative card" />
      </Box>
      <Box
        position="absolute"
        left="-5%"
        bottom="5%"
        transform="rotate(-15deg)"
        opacity={0.1}
        width="400px"
      >
        <Image src="/placeholder.svg?height=250&width=400" alt="Decorative card" />
      </Box>

      <Container maxW="lg" position="relative" zIndex={1}>
        <VStack spacing={8} align="center" mb={8}>
          <Heading
            size="2xl"
            color="white"
            fontWeight="bold"
            letterSpacing="-0.02em"
            textAlign="center"
          >
            <Text
              fontFamily="Poppins"
              fontWeight="semibold"
            >
              Welcome to Modern Banking
            </Text>
          </Heading>
          <Text
            fontFamily="Poppins"
            fontWeight="semibold"
            color="whiteAlpha.900"
            fontSize="25px"
            textAlign="center"
            maxW="1000px"
          >
            Access your account securely and experience innovative banking
          </Text>
        </VStack>

        <Box
          bg="white"
          p={10}
          rounded="2xl"
          shadow="2xl"
          borderWidth="1px"
          borderColor="whiteAlpha.200"
          backdropFilter="blur(10px)"
        >
          <VStack spacing={8} align="stretch">
            <form onSubmit={handleSubmit}>
              <VStack spacing={6}>
                <FormControl isInvalid={errors.username}>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="500"
                    color="gray.700"
                  >
                    Username
                  </FormLabel>
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    size="lg"
                    fontSize="md"
                    borderRadius="xl"
                    borderWidth="2px"
                    _focus={{
                      borderColor: "purple.500",
                      boxShadow: "0 0 0 1px #9747FF",
                    }}
                  />
                  <FormErrorMessage>{errors.username}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.password}>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="500"
                    color="gray.700"
                  >
                    Password
                  </FormLabel>
                  <InputGroup size="lg">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      fontSize="md"
                      borderRadius="xl"
                      borderWidth="2px"
                      _focus={{
                        borderColor: "purple.500",
                        boxShadow: "0 0 0 1px #9747FF",
                      }}
                    />
                    <InputRightElement>
                      <IconButton
                        variant="ghost"
                        onClick={() => setShowPassword(!showPassword)}
                        icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      />
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>

                <Button
                  type="submit"
                  size="lg"
                  width="full"
                  isLoading={isLoading}
                  bg="black"
                  color="white"
                  fontSize="md"
                  fontWeight="500"
                  height="56px"
                  borderRadius="xl"
                  _hover={{
                    bg: "gray.800",
                  }}
                  _active={{
                    bg: "gray.900",
                  }}
                >
                  Sign In
                </Button>
              </VStack>
            </form>

            <HStack justify="space-between" fontSize="sm">
              <Button
                variant="link"
                color="purple.600"
                fontWeight="500"
                fontSize="sm"
              >
                Forgot Password?
              </Button>
              <Button
                variant="link"
                color="purple.600"
                fontWeight="500"
                fontSize="sm"
              >
                Create Account
              </Button>
            </HStack>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}
