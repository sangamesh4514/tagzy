import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Comingsoon2 from './pages/Comingsoon2'
import NewPage from './components/NewPage'
import Greet from './pages/Greet'
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Comingsoon2 />} />
          <Route path='/newpage' element={<NewPage />} />
          <Route path='/greet' element={<Greet />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App