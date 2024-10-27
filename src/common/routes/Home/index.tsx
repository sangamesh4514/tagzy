import React from 'react'
import Header from '../../components/Header'
import { Helmet } from 'react-helmet';
import { MarqueeDemo } from '../../components/MagicUiDesign/MarqueeDemo';
import { BentoDemo } from '../../components/MagicUiDesign/BentoDemo';
import { AnimatedBeamMultipleOutputDemo } from '../../components/MagicUiDesign/AnimatedBeamMultipleOutputDemo';
import { AnimatedBeamDemo } from '../../components/MagicUiDesign/AnimatedBeamDemo';

const Home = () => {

  return (
    <>
      <Helmet>
        <title>TagZy-New</title>
        <meta
          name='description'
          content='Tagzy is coming soon. Stay tuned for updates on our web app to hire professionals.'
        />
      </Helmet>
      <Header />
      {/* <MarqueeDemo /> */}
      {/* <BentoDemo /> */}
      <AnimatedBeamMultipleOutputDemo className="relative right-2 top-4 h-[300px] border-none transition-all duration-300 ease-out group-hover:scale-105" />
      <AnimatedBeamDemo />
    </>
  )
}

export default Home