import React from 'react'
import HomeLayout from './Layouts/HomeLayouts'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import RequireAuth from './Components/Auth/RequireAuth'

const App = () => {
  return (
    <HomeLayout>
      <Routes>
        <Route element={<RequireAuth allowedRoles={['RIDER']} />}>
          <Route path='/' element={<Home />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </HomeLayout>
  )
}

export default App
