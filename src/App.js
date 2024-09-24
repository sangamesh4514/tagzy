import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Comingsoon from './pages/Comingsoon'
import Greet from './pages/greet/Greet'
import NewPage from './pages/NewPage'
import PrivacyPolicy from './pages/utils/privacyPolicy'
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Comingsoon />} />
          <Route path='/new' element={<NewPage />} />
          <Route path='/greet' element={<Greet />} />
          <Route path='/privacyPolicy' element={<PrivacyPolicy />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App