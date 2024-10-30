import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Comingsoon from './pages/Comingsoon'
import PrivacyPolicy from './pages/utils/privacyPolicy'
import AdminAuth from './components/AdminAuth'
import NewPage from './pages/NewPage'
import Dashboard from './pages/Dashboard'
import { PrivateRoute } from './routes/PrivateRoute'
// import EditableProfile from './components/UserProfile'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Comingsoon />} />
          <Route path='/newPage' element={<NewPage />} />
          <Route path='/privacyPolicy' element={<PrivacyPolicy />} />
          <Route path='/admin/login' element={<AdminAuth />} />
          {/* <Route path='/user' element={<EditableProfile />} /> */}

          {/* Private Route */}
          <Route path= '/' element={<PrivateRoute />}>
            <Route path='/admin/dashboard' element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App