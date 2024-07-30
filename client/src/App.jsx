import React, { useEffect } from 'react'
import HomeLayout from './Layout/HomeLayout'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import RegisterPage from './Pages/RegisterPage'
import LoginPage from './Pages/LoginPage'
import Places from './Pages/Places'
import Cars from './Pages/Cars'
import OrderCar from './Pages/Orders/OrderCar'
import PastCarOrders from './Pages/Orders/PastCarOrders'
import CarBookDetail from './Pages/Orders/CarBookDetail'
import BoatPage from './Pages/BoatPage'

const App = () => {
  // In your component
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <HomeLayout>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/places' element={<Places />} />
        <Route path='/car' element={<Cars />} />
        <Route path='/boat' element={<BoatPage />} />
        <Route path='/car-book/:id' element={<OrderCar />} />
        <Route path='/order/car-book/:id' element={<PastCarOrders />} />
        <Route path='/car-book-detail/:id' element={<CarBookDetail />} />
      </Routes>
    </HomeLayout>
  )
}

export default App
