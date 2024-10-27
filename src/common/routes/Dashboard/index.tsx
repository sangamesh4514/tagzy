import Header from '../../components/Header'
import { Helmet } from 'react-helmet';

const Dashboard = () => {

  return (
    <>
      <Helmet>
        <title>TagZy-New</title>
        <meta
          name='dashboard'
          content='Tagzy is coming soon. Stay tuned for updates on our web app to hire professionals.'
        />
      </Helmet>
      <Header />
    </>
  )
}

export default Dashboard