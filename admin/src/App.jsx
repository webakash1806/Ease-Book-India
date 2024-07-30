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
import CarBookDetails from './Pages/CarsPages/CarBookDetails'
import BoatList from './Pages/BoatPages/BoatList'
import BoatDetail from './Pages/BoatPages/BoatDetail'

const App = () => {
  return (
    <div className='bg-[#F2F2F7] min-h-[100vh]'>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route element={<RequireAuth allowedRoles={['ADMIN']} />} >
          <Route path='/' element={<Home />} />
          <Route path='/car-list' element={<CarsList />} />
          <Route path='/driver/:id' element={<CarDetail />} />
          <Route path='/boat/:id' element={<BoatDetail />} />
          <Route path='/book-detail/:id' element={<CarBookDetails />} />
          <Route path='/car-booking' element={<CarOrders />} />
          <Route path='/users-list' element={<UsersList />} />
          <Route path='/boatman-list' element={<BoatList />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
