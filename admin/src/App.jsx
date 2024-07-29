import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomeLayout from './Layouts/HomeLayouts'
import Home from './Pages/Home'
import Footer from '../../carsClient/src/Components/Footer'
import Login from './Pages/Auth/Login'
import RequireAuth from './Components/Auth/RequireAuth'
import CarsList from './Pages/CarsPages/CarsList'
import CarDetail from './Pages/CarsPages/CarDetail'
import UsersList from './Pages/UserPages/UsersList'
import CarOrders from './Pages/CarsPages/CarOrders'

const App = () => {
  return (
    <div className='bg-[#F2F2F7] min-h-[100vh]'>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route element={<RequireAuth allowedRoles={['ADMIN']} />} >
          <Route path='/' element={<Home />} />
          <Route path='/car-list' element={<CarsList />} />
          <Route path='/driver/:id' element={<CarDetail />} />
          <Route path='/users-list' element={<UsersList />} />
          <Route path='/car-booking' element={<CarOrders />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
