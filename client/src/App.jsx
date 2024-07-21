import React from 'react'
import HomeLayout from './Layout/HomeLayout'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import RegisterPage from './Pages/RegisterPage'
import LoginPage from './Pages/LoginPage'
import Places from './Pages/Places'
import Cars from './Pages/Cars'

const App = () => {
  return (
    <HomeLayout>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/places' element={<Places />} />
        <Route path='/car' element={<Cars />} />
      </Routes>
    </HomeLayout>
  )
}

export default App
