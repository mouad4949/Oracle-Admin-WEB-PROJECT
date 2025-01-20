import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  Button,
  SimpleGrid,
} from '@chakra-ui/react';

const LoanApplicationModal = ({ isOpen, onClose, onSubmit, accounts }) => {
  const [formData, setFormData] = useState({
    personAge: '',
    personGender: '',
    personEducation: '',
    personIncome: '',
    personEmpExp: '',
    personHomeOwnership: '',
    loanAmount: '',
    loanIntent: '',
    previousLoanDefaultsOnFile: '',
    loanIntRate: 10,
    loanPercentIncome: 15.5,
    cbPersonCredHistLength: 10,
    creditScore: 600,
    id_account: '', 
    status: 'PENDING',
    predictionResult: '',
    applicationDate: new Date().toISOString().split('T')[0],
  });

  console.log(accounts);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    console.log(formData);
    setFormData({
      personAge: '',
      personGender: '',
      personEducation: '',
      personIncome: '',
      personEmpExp: '',
      personHomeOwnership: '',
      loanAmount: '',
      loanIntent: '',
      previousLoanDefaultsOnFile: '',
      loanIntRate: 10,
      loanPercentIncome: 15.5,
      cbPersonCredHistLength: 10,
      creditScore: 600,
      id_account: '', 
      status: 'PENDING',
      predictionResult: '',
      applicationDate: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Apply for Loan</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit}>
            <SimpleGrid columns={2} spacing={4}>
              <FormControl isRequired>
                <FormLabel>Age</FormLabel>
                <NumberInput min={18}>
                  <NumberInputField name="personAge" value={formData.personAge} onChange={handleChange} />
                </NumberInput>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Gender</FormLabel>
                <Select name="personGender" value={formData.personGender} onChange={handleChange}>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Education</FormLabel>
                <Select name="personEducation" value={formData.personEducation} onChange={handleChange}>
                  <option value="">Select Education</option>
                  <option value="High School">High School</option>
                  <option value="Associate">Associate</option>
                  <option value="Bachelor">Bachelor</option>
                  <option value="Master">Master</option>
                  <option value="Doctorate">Doctorate</option>
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Home Ownership</FormLabel>
                <Select name="personHomeOwnership" value={formData.personHomeOwnership} onChange={handleChange}>
                  <option value="">Select Ownership</option>
                  <option value="Own">Own</option>
                  <option value="Rent">Rent</option>
                  <option value="Mortgage">Mortgage</option>
                  <option value="Others">Others</option>
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Annual Income</FormLabel>
                <NumberInput min={0}>
                  <NumberInputField name="personIncome" value={formData.personIncome} onChange={handleChange} />
                </NumberInput>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Employment Experience (Years)</FormLabel>
                <NumberInput min={0} max={40}>
                  <NumberInputField name="personEmpExp" value={formData.personEmpExp} onChange={handleChange} />
                </NumberInput>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Previous Loan Defaults</FormLabel>
                <Select
                  name="previousLoanDefaultsOnFile"
                  value={formData.previousLoanDefaultsOnFile}
                  onChange={handleChange}
                >
                  <option value="">Select an Option</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Loan Amount</FormLabel>
                <NumberInput min={0}>
                  <NumberInputField name="loanAmount" value={formData.loanAmount} onChange={handleChange} />
                </NumberInput>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Loan Purpose</FormLabel>
                <Select name="loanIntent" value={formData.loanIntent} onChange={handleChange}>
                  <option value="">Select Purpose</option>
                  <option value="Personal">Personal</option>
                  <option value="Debt Consolidation">Debt Consolidation</option>
                  <option value="Education">Education</option>
                  <option value="Medical">Medical</option>
                  <option value="Venture">Venture</option>
                  <option value="Home Improvement">Home Improvement</option>
                </Select>
              </FormControl>

              {/* New Account Selection Dropdown */}
              <FormControl isRequired>
                <FormLabel>Select Account</FormLabel>
                <Select name="id_account" value={formData.id_account} onChange={handleChange}>
                  <option value="">Select an Account</option>
                  {accounts.map((account) => (
                    <option key={account.id_account} value={account.id_account}>
                      {account.accountNumber} 
                    </option>
                  ))}
                </Select>
              </FormControl>

            </SimpleGrid>
            <Button mt={8} colorScheme="purple" type="submit" width="full">
              Submit Application
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoanApplicationModal;
