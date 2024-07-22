import React from 'react'
import HomeLayout from './Layouts/HomeLayouts'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'

const App = () => {
  return (
    <HomeLayout>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </HomeLayout>
  )
}

export default App
