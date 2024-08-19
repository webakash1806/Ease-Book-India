import React, { Suspense, useEffect, useState } from 'react';
import HomeLayout from './Layout/HomeLayout';
import { Route, Routes, useLocation } from 'react-router-dom';
import { startLoading, stopLoading } from './Components/nprogressSetup';

const HomePage = React.lazy(() => import('./Pages/HomePage'));
const RegisterPage = React.lazy(() => import('./Pages/Auth/RegisterPage'));
const LoginPage = React.lazy(() => import('./Pages/Auth/LoginPage'));
const Places = React.lazy(() => import('./Pages/Places'));
const Cars = React.lazy(() => import('./Pages/CarPage/Cars'));
const OrderCar = React.lazy(() => import('./Pages/CarPage/OrderCar'));
const BookBoat = React.lazy(() => import('./Pages/BoatPage/BookBoat'));
const PastCarOrders = React.lazy(() => import('./Pages/CarPage/PastCarOrders'));
const CarBookDetail = React.lazy(() => import('./Pages/CarPage/CarBookDetail'));
const BoatPage = React.lazy(() => import('./Pages/BoatPage/BoatPage'));
const PastBoatOrders = React.lazy(() => import('./Pages/BoatPage/PastBoatOrders'));
const BoatBookDetail = React.lazy(() => import('./Pages/BoatPage/BoatBookDetail'));
const PoojaList = React.lazy(() => import('./Pages/PriestPage/PoojaList'));
const PriestList = React.lazy(() => import('./Pages/PriestPage/PriestList'));
const BookPriest = React.lazy(() => import('./Pages/PriestPage/BookPriest'));
const PastPriestOrders = React.lazy(() => import('./Pages/PriestPage/PastPriestOrders'));
const PriestBookDetail = React.lazy(() => import('./Pages/PriestPage/PriestBookDetail'));
const PlacesPage = React.lazy(() => import('./Pages/GuiderPage/PlacesPage'));
const GuiderList = React.lazy(() => import('./Pages/GuiderPage/GuiderList'));
const BookGuider = React.lazy(() => import('./Pages/GuiderPage/BookGuider'));
const PastGuiderOrders = React.lazy(() => import('./Pages/GuiderPage/PastGuiderOrders'));
const GuiderBookDetail = React.lazy(() => import('./Pages/GuiderPage/GuiderBookDetail'));
const Hotel = React.lazy(() => import('./Pages/HotelPage/Hotel'));
const HotelsWithRoom = React.lazy(() => import('./Pages/HotelPage/HotelsWithRoom'));
const BookHotel = React.lazy(() => import('./Pages/HotelPage/BookHotel'));
const PastHotelOrders = React.lazy(() => import('./Pages/HotelPage/PastHotelOrders'));
const HotelBookDetail = React.lazy(() => import('./Pages/HotelPage/HotelBookDetail'));
const RequireAuth = React.lazy(() => import('./Components/Auth/RequireAuth'));
const AboutPage = React.lazy(() => import('./Pages/AboutPage'));
const ContactPage = React.lazy(() => import('./Pages/ContactPage'));
const Profile = React.lazy(() => import('./Pages/Auth/Profile'));
const TestimonialSection = React.lazy(() => import('./Components/TestimonialSection'));
const ResetPassword = React.lazy(() => import('./Pages/Auth/ResetPassword'));

const App = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    startLoading(); // Start the loading indicator when the route changes
    setLoading(true);
    setTimeout(() => {
      stopLoading();
    }, 500);

    return () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    };

  }, [location]);

  const handleLoadFinish = () => {
    setLoading(false);
    stopLoading(); // Stop the loading indicator when the route has finished loading
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <HomeLayout>
      <Suspense fallback={<div className='min-h-[100vh] flex items-center justify-center  max-w-full overflow-hidden text-black bg-[#f8f7ff]'>
        <div className="loader">
          <div className="box box0">
            <div></div>
          </div>
          <div className="box box1">
            <div></div>
          </div>
          <div className="box box2">
            <div></div>
          </div>
          <div className="box box3">
            <div></div>
          </div>
          <div className="box box4">
            <div></div>
          </div>
          <div className="box box5">
            <div></div>
          </div>
          <div className="box box6">
            <div></div>
          </div>
          <div className="box box7">
            <div></div>
          </div>
          <div className="ground">
            <div></div>
          </div>
        </div>
      </div>}>
        <Routes>
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/pooja-list' element={<PoojaList />} />
          <Route path='/place-list' element={<PlacesPage />} />
          <Route path='/priest-list' element={<PriestList />} />
          <Route path='/guider-list' element={<GuiderList />} />
          <Route path='/places' element={<Places />} />
          <Route path='/hotels' element={<Hotel />} />
          <Route path='/testimonial' element={<TestimonialSection />} />
          <Route path='/car' element={<Cars />} />
          <Route path='/boat' element={<BoatPage />} />
          <Route path='/reset-password/:resetToken' element={<ResetPassword />} />
          <Route path='/hotel/:id' element={<HotelsWithRoom />} />

          <Route element={<RequireAuth allowedRoles={['USER']} />} >
            <Route path='/profile/:fullName' element={<Profile />} />
            <Route path='/car-book/:id' element={<OrderCar />} />
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
          </Route>
        </Routes>
        {!loading && handleLoadFinish()}
      </Suspense>
    </HomeLayout>
  );
};

export default App;
