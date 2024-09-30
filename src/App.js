import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Comingsoon from './pages/Comingsoon'
import NewPage from './pages/NewPage'
import PrivacyPolicy from './pages/utils/privacyPolicy'
import AdminAuth from './components/AdminAuth'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Comingsoon />} />
          <Route path='/new' element={<NewPage />} />
          <Route path='/privacyPolicy' element={<PrivacyPolicy />} />
          <Route path='/admin' element={<AdminAuth />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App