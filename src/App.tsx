import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivacyPolicy from './common/routes/PrivacyPolicy'
import Careers from './common/routes/Careers'
import AdminAuth from './common/routes/AdminAuth/AdminAuth'
import Home from './common/routes/Home'
import Dashboard from './common/routes/Dashboard'
import ProtectedRoute from './common/routes/ProtectedRoute'
import ProProfile from './common/components/profile/userProfile'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Home />} />
          <Route path='/privacyPolicy' element={<PrivacyPolicy />} />
          <Route path='/careers' element={<Careers />} />
          <Route path='/admin/login' element={<AdminAuth />} />
          <Route path='/profile/:userId' element={<ProProfile />} /> 

          {/* Protected Routes */}
          <Route path='/' element={<ProtectedRoute />} >
            <Route path='/admin/dashboard' element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App