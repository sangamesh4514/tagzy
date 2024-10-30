import Footer from '../../components/Footer';
import Header from '../../components/Header'
import { Helmet } from 'react-helmet';
import { AnimatedGridPatternDemo } from 'src/common/components/MagicUiDesign/AnimatedGridPatternDemo';

const Home = () => {

  return (
    <>
      <Helmet>
        <title>TagZy-New</title>
        <meta
          name='description'
          content='Your one-stop marketplace for local services. Find trusted professionals for all your needs.'
        />
      </Helmet>
      <Header />
      <AnimatedGridPatternDemo />
      <Footer />
    </>
  )
}

export default Home