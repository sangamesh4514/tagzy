import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivacyPolicy from './common/routes/PrivacyPolicy'
import AdminAuth from './common/routes/AdminAuth/AdminAuth'
import Home from './common/routes/Home'
import Dashboard from './common/routes/Dashboard'
import ProtectedRoute from './common/routes/ProtectedRoute'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Home />} />
          <Route path='/privacyPolicy' element={<PrivacyPolicy />} />
          <Route path='/admin/login' element={<AdminAuth />} />

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