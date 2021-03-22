import React from 'react';
import HeroSection from '../../HeroSection/HeroSection';
import { homeObjOne, homeTransacciones } from './Data';
// import Pricing from '../../Pricing/Pricing';

function Home() {
  return (
    <>
      <HeroSection {...homeTransacciones} />
      {/* <Pricing /> */}
    </>
  );
}

export default Home;
