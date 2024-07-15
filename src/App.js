import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Comingsoon from './pages/Comingsoon'
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Comingsoon />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App