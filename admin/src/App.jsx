import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomeLayout from './Layouts/HomeLayouts'
import Home from './Pages/Home'
import Footer from '../../carsClient/src/Components/Footer'

const App = () => {
  return (
    <div className='bg-white min-h-[100vh]'>
      <HomeLayout>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </HomeLayout>
    </div>
  )
}

export default App
