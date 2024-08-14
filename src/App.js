import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Comingsoon from './pages/Comingsoon'
import NewPage from './components/NewPage'
import Greet from './pages/greet/Greet'
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Comingsoon />} />
          <Route path='/new' element={<NewPage />} />
          <Route path='/greet' element={<Greet />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App