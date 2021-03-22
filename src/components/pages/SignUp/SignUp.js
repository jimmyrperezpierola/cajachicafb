import React from 'react';
import HeroSection from '../../HeroSection/HeroSection';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from './Data';
import Pricing from '../../Pricing/Pricing';

function SignUp() {
  return (
    <>
      <HeroSection {...homeObjOne} />
      {/* <HeroSection {...homeObjThree} /> */}
    </>
  );
}

export default SignUp;
