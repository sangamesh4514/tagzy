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
          content='Tagzy is coming soon. Stay tuned for updates on our web app to hire professionals.'
        />
      </Helmet>
      <Header />
      <AnimatedGridPatternDemo />
    </>
  )
}

export default Home