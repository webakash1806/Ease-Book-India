import React from 'react'
import HomeLayout from './Layouts/HomeLayouts'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import RequireAuth from './Components/Auth/RequireAuth'
import PastOrder from './Pages/Order/PastOrder'
import PriestBookDetail from './Pages/Order/PriestBookDetail'

const App = () => {
  return (
    <HomeLayout>
      <Routes>
        <Route element={<RequireAuth allowedRoles={['GUIDER']} />}>
          <Route path='/' element={<Home />} />
          <Route path='/order/:id' element={<PastOrder />} />
          <Route path='/book-detail/:id' element={<PriestBookDetail />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </HomeLayout>
  )
}

export default App
