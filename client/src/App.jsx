import React from 'react'
import HomeLayout from './Layout/HomeLayout'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import RegisterPage from './Pages/RegisterPage'
import LoginPage from './Pages/LoginPage'

const App = () => {
  return (
    <HomeLayout>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </HomeLayout>
  )
}

export default App
