import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Comingsoon2 from './pages/Comingsoon2'
const App = () => {
  return (
    <div className=''>
      <BrowserRouter>
        <Routes>
          <Route path='/coming' element={<Comingsoon2 />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App