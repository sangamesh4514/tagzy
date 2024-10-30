import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Comingsoon from './common/routes/ComingSoon'
import PrivacyPolicy from './common/routes/PrivacyPolicy'
import AdminAuth from './common/routes/AdminAuth/AdminAuth'
import Home from './common/routes/Home'
import Dashboard from './common/routes/Dashboard'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/newPage' element={<Comingsoon />} />
          <Route path='/privacyPolicy' element={<PrivacyPolicy />} />
          <Route path='/admin/login' element={<AdminAuth />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App