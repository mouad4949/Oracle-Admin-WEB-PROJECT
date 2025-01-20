import React from 'react'
import '../landing.css'
import Navbar from '../components/landing/Navbar'
import HeroSection from '../components/landing/HeroSection'
import { Box } from '@chakra-ui/react'
import ServicesSection from '../components/landing/ServicesSection'
import CTASection from '../components/landing/CTASection'
import Footer from '../components/landing/Footer'

const Landing = () => {
  return (
    <Box bgColor='#9A83DB'>
        <Navbar/>
        <HeroSection/>
        <ServicesSection/>
        <CTASection/>
        <Footer/>
    </Box>
  )
}

export default Landing