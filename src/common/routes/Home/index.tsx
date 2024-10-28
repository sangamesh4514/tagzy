import Header from '../../components/Header'
import { Helmet } from 'react-helmet';
import { MarqueeDemo } from '../../components/MagicUiDesign/MarqueeDemo';
import { BentoDemo } from '../../components/MagicUiDesign/BentoDemo';
import { AnimatedBeamMultipleOutputDemo } from '../../components/MagicUiDesign/AnimatedBeamMultipleOutputDemo';
import { AnimatedBeamDemo } from '../../components/MagicUiDesign/AnimatedBeamDemo';
import Iphone15Pro from '../../../magicUi/ui/iphone-15-pro';
import BoxRevealWrapper from '../../components/Test';
import { AnimatedGridPatternDemo } from 'src/common/components/MagicUiDesign/AnimatedGridPatternDemo';

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
      <AnimatedGridPatternDemo />
      {/* <MarqueeDemo /> */}
      {/* <BentoDemo /> */}
      {/* <BoxRevealWrapper />
      <AnimatedBeamMultipleOutputDemo className="relative right-2 top-4 h-[300px] border-none transition-all duration-300 ease-out group-hover:scale-105" />
      <AnimatedBeamDemo />
      <div className="absolute">
        <Iphone15Pro
          className="size-full"
          src="https://tagzybucket.s3.ap-south-1.amazonaws.com/tree.png"
        />
      </div> */}
    </>
  )
}

export default Home