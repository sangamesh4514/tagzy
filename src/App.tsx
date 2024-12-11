import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivacyPolicy from './common/routes/PrivacyPolicy'
import AdminAuth from './common/routes/AdminAuth/AdminAuth'
import Home from './common/routes/Home'
import Dashboard from './common/routes/Dashboard'
import ProtectedRoute from './common/routes/ProtectedRoute'
import ProProfile from './common/components/profile/userProfile'
import NotFound from './common/routes/NotFound'
import FAQ from './common/components/FAQ'
import Provider from './common/routes/Provider'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Home />} />
          <Route path='/privacyPolicy' element={<PrivacyPolicy />} />
          <Route path='/admin/login' element={<AdminAuth />} />
          <Route path='/profile/:userId' element={<ProProfile />} /> 
          <Route path="*" element={<NotFound />} />
          <Route path='/faq' element={<FAQ />} />
          <Route path='/provider' element={<Provider />} />

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