import Header from '../../components/Header'
import { Helmet } from 'react-helmet';

const Dashboard = () => {

  return (
    <>
      <Helmet>
        <title>TagZy-Dashboard</title>
      </Helmet>
      <Header />
    </>
  )
}

export default Dashboard