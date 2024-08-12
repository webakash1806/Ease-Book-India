import React, { useEffect } from 'react'
import HomeLayout from './Layout/HomeLayout'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import RegisterPage from './Pages/RegisterPage'
import LoginPage from './Pages/LoginPage'
import Places from './Pages/Places'
import Cars from './Pages/Cars'
import OrderCar from './Pages/Orders/OrderCar'
import BookBoat from './Pages/Orders/BookBoat'
import PastCarOrders from './Pages/Orders/PastCarOrders'
import CarBookDetail from './Pages/Orders/CarBookDetail'
import BoatPage from './Pages/BoatPage'
import PastBoatOrders from './Pages/Orders/PastBoatOrders'
import BoatBookDetail from './Pages/Orders/BoatBookDetail'
import PoojaList from './Pages/PoojaList'
import PriestList from './Pages/PriestList'
import BookPriest from './Pages/Orders/BookPriest'
import PastPriestOrders from './Pages/Orders/PastPriestOrders'
import PriestBookDetail from './Pages/Orders/PriestBookDetail'
import PlacesPage from './Pages/PlacesPage'
import GuiderList from './Pages/GuiderList'
import BookGuider from './Pages/Orders/BookGuider'
import PastGuiderOrders from './Pages/Orders/PastGuiderOrders'
import GuiderBookDetail from './Pages/Orders/GuiderBookDetail'
import Hotel from './Pages/Hotel'
import HotelsWithRoom from './Pages/HotelsWithRoom'
import BookHotel from './Pages/Orders/BookHotel'
import PastHotelOrders from './Pages/Orders/PastHotelOrders'
import HotelBookDetail from './Pages/Orders/HotelBookDetail'
import RequireAuth from './Components/Auth/RequireAuth'
import AboutPage from './Pages/AboutPage'
import ContactPage from './Pages/ContactPage'
import Profile from './Pages/Profile'
import TestimonialSection from './Pages/TestimonialSection'

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
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/contact' element={<ContactPage />} />

        <Route path='/testimonial' element={<TestimonialSection />} />

        <Route element={<RequireAuth allowedRoles={['USER']} />} >

          <Route path='/profile/:fullName' element={<Profile />} />
          <Route path='/places' element={<Places />} />
          <Route path='/car' element={<Cars />} />
          <Route path='/boat' element={<BoatPage />} />
          <Route path='/hotels' element={<Hotel />} />
          <Route path='/car-book/:id' element={<OrderCar />} />
          <Route path='/hotel/:id' element={<HotelsWithRoom />} />
          <Route path='/hotel-book/hotel/:id/room/:roomId' element={<BookHotel />} />
          <Route path='/boat-book/:id' element={<BookBoat />} />
          <Route path='/priest-book/:id' element={<BookPriest />} />
          <Route path='/guider-book/:id' element={<BookGuider />} />
          <Route path='/order/car-book/:id' element={<PastCarOrders />} />
          <Route path='/order/boat-book/:id' element={<PastBoatOrders />} />
          <Route path='/order/priest-book/:id' element={<PastPriestOrders />} />
          <Route path='/order/guider-book/:id' element={<PastGuiderOrders />} />
          <Route path='/order/hotel-book/:id' element={<PastHotelOrders />} />
          <Route path='/car-book-detail/:id' element={<CarBookDetail />} />
          <Route path='/boat-book-detail/:id' element={<BoatBookDetail />} />
          <Route path='/priest-book-detail/:id' element={<PriestBookDetail />} />
          <Route path='/guider-book-detail/:id' element={<GuiderBookDetail />} />
          <Route path='/hotel-book-detail/:id' element={<HotelBookDetail />} />
          <Route path='/pooja-list' element={<PoojaList />} />
          <Route path='/place-list' element={<PlacesPage />} />
          <Route path='/priest-list' element={<PriestList />} />
          <Route path='/guider-list' element={<GuiderList />} />
        </Route>
      </Routes>
    </HomeLayout>
  )
}

export default App
