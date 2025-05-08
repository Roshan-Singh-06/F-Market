import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturesProducts from '../components/FeaturesProducts';
import FarmerCarousel from '../components/FarmerCarousel';
import OurFarmers from '../components/OurFarmers';
import HowItWorks from "../components/HowItWorks";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <FarmerCarousel />
      <FeaturesProducts />
      <OurFarmers />
      <HowItWorks />
    </div>
  );
};

export default Home;
