import React, { useEffect, useState } from 'react'
import carImg from '../assets/Images/car.png'
import cruiseImg from '../assets/Images/cruise.png'
import priestImg from '../assets/Images/priest.png'
import guiderImg from '../assets/Images/guider.png'
import hotelImg from '../assets/Images/hotel.png'
import hero2Img from '../assets/Images/hero2.jpeg'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AliceCarousel, { Link } from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css';
import { useDispatch, useSelector } from 'react-redux'
import { getBoatList, getCarsList, getHotelData, getHotelList } from '../Redux/Slices/ServiceSlice'
import { useNavigate } from 'react-router-dom'
import { MdOutlineAirlineSeatReclineExtra, MdRestaurantMenu } from 'react-icons/md'
import { FaHotel, FaMapMarkerAlt, FaParking, FaRegUserCircle, FaSwimmingPool, FaWifi } from 'react-icons/fa'
import { FaCar, FaLocationDot, FaUserCheck } from 'react-icons/fa6'
import { GiSunPriest } from 'react-icons/gi'
import { CgGym } from 'react-icons/cg'
import { GrLounge } from 'react-icons/gr'
const CategorySection = () => {
    const [active, setActive] = useState(1)
    const serviceList = useSelector((state) => state?.service?.carsData) || [];
    const boatList = useSelector((state) => state?.service?.boatData) || [];
    const hotelListData = useSelector((state) => state?.service?.hotelListData) || [];
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loadData = async () => {
        await dispatch(getCarsList());
        await dispatch(getBoatList());
        await dispatch(getHotelList());
    };

    useEffect(() => {
        loadData()
    }, [])

    const responsive = {
        0: {
            items: 1,
        },
        647: {
            items: 2
        },
        768: {
            items: 2
        },
        1024: {
            items: 3
        }

    }

    const availableCarList = serviceList.filter((data) => data?.servicesData?.availability === "AVAILABLE");
    const availableBoatList = boatList.filter((data) => data?.servicesData?.availability === "AVAILABLE");

    const poojaOptions = [
        { name: 'Rudra Havan', price: "1500" },
        { name: 'Maha mrityunjay jap', price: "2000" },
        { name: 'Vishnu yagna', price: "1800" },
        { name: 'Kaal Sarp yog', price: "3300" },
        { name: 'Bhagwat katha', price: "3000" },
        { name: 'Vastu shanti', price: "2000" },
        { name: 'Naw grah shanti', price: "1500" },
        { name: 'Nakshastra shanti', price: "3000" },
        { name: 'Rudra abhishekh', price: "5000" },
    ];

    const poojaItem = poojaOptions?.map((pooja, index) => (
        <div key={index} className='flex border-l-[6px] border-orange-500   flex-col mx-auto items-center justify-center px-4 py-8 my-4 h-[18rem] transition-transform transform bg-[#fefdf7] rounded-lg shadow-[1px_0px_10px_-3px_#808080] w-[16rem] hover:scale-105'>
            <GiSunPriest className='text-orange-600 text-[4rem] mb-2' />
            <h2 className='mb-2 text-2xl font-semibold text-center text-gray-800'>{pooja.name}</h2>
            <div className='flex items-center mb-4'>
                <FaMapMarkerAlt className='mr-2 text-red-500' />
                <span className='text-lg text-gray-600'>Varanasi</span>
            </div>
            <button
                onClick={() => navigate('/priest-list', { state: { pooja } })}
                className='px-6 py-[6px] text-lg border-none font-medium text-white transition-all duration-300 bg-green-500 rounded-md hover:bg-orange-500'
            >
                Book Now
            </button>
        </div>
    ))

    const placeOptions = [
        { name: 'All ghats', price: 2000 },
        { name: 'All Ghats temple', price: 3000 },
        { name: 'Kashi vishwanath temple', price: 1500 },
        { name: 'Sarnath temple', price: 1000 },
        { name: 'Assi ghat - Dasaswamedh ghat', price: 2000 },
        { name: 'Dasaswamedh ghat - Mankikarnika ghat', price: 1500 },
        { name: 'Assi ghat - Mankikarnika ghat', price: 3000 },

    ];

    const placeItem = placeOptions?.map((place, index) => (
        <div key={index} className='flex border-l-[6px] h-[17.5rem] border-blue-500 flex-col items-center justify-between py-8 p-6 sm:m-4 my-4 transition-transform transform bg-[#fefdf7] rounded-lg shadow-[1px_0px_10px_-3px_#808080] w-[16rem] mx-auto hover:scale-105'>
            <img src={guiderImg} className='w-[4.5rem]' alt="" />
            <h2 className='w-full mb-2 text-[1.3rem] font-semibold text-center text-gray-800'>{place.name}</h2>
            <div className='flex items-center mb-4'>
                <FaMapMarkerAlt className='mr-2 text-red-500' />
                <span className='text-lg text-gray-600'>Varanasi</span>
            </div>
            <button
                onClick={() => navigate('/guider-list', { state: { place } })}
                className='px-6 py-[6px] text-lg border-none font-medium text-white transition-all duration-300 bg-green-500 rounded-md hover:bg-orange-500'
            >
                Book Now
            </button>
        </div>
    ))

    const carItem = availableCarList?.slice(0, 4)?.map((data, key) => {
        return <>
            <div key={key + 1} className='bg-white mx-auto my-4 text-black w-[16rem] hover:from-[#d0f7e6] transition-all duration-300 hover:bg-gradient-to-b hover:to-[#f7fffb] rounded-xl shadow-[0px_0px_5px_#808080] overflow-hidden'>
                <img src={data?.proofFiles[3]?.fileUrl} alt="" className='h-[10rem] w-full object-cover' />
                <div className='p-3 pt-0 text-[0.85rem] text-[#292929]'>
                    <div className='flex items-center justify-between my-2 text-black'>
                        <h2 className='text-[1rem] font-semibold'>{data?.carName}</h2>
                        <h2 className='flex items-center gap-1'><MdOutlineAirlineSeatReclineExtra />{data?.servicesData?.seatingCap}</h2>
                    </div>
                    <div className='flex items-center justify-between my-2'>
                        <h1 className='flex items-center justify-center gap-2'><FaRegUserCircle />{data?.fullName}</h1>
                        <h2>{data?.age} years</h2>
                    </div>
                    <div className='flex items-center justify-between my-2'>
                        <h1 className='flex items-center justify-center gap-2'><FaCar />Experience</h1>
                        <h2>{data?.experience} years</h2>
                    </div>
                    <div className='flex items-center justify-between my-2'>
                        <h1 className='flex items-center justify-center gap-2'><FaLocationDot />{data?.servicesData?.serviceArea}</h1>
                    </div>
                    <div className='flex items-center justify-between pt-3 mt-3 border-t'>
                        <div>
                            <h3>
                                <span className='text-[1.02rem] font-semibold text-[#19B56F]'>Rs.{data?.servicesData?.kmFare}</span> / Km
                            </h3>
                            <h3>
                                <span className='text-[1.02rem] font-semibold text-[#19B56F]'>Rs.{data?.servicesData?.hrFare}</span> / hr
                            </h3>
                        </div>
                        <button onClick={() => navigate(`/car-book/${data?._id}`)} className='border p-2 px-4 rounded-full border-[#19B56F] hover:bg-[#19B56F] transition-all duration-500 hover:text-white text-[#19B56F] font-semibold'>BOOK NOW</button>
                    </div>
                </div>
            </div>
        </>
    })

    const boatItem = availableBoatList?.slice(0, 3)?.map((data, key) => {
        return <>
            <div key={key + 1} className='bg-white mx-auto my-4 text-black w-[16rem] hover:from-[#d0f7e6] transition-all duration-300 hover:bg-gradient-to-b hover:to-[#f7fffb] rounded-xl shadow-[0px_0px_5px_#808080] overflow-hidden'>
                <img src={data?.proofFiles[3]?.fileUrl} alt="" className='h-[10rem] w-full object-cover' />
                <div className='p-3 pt-0 text-[0.85rem] text-[#292929]'>
                    <div className='flex items-center justify-between my-2 text-black'>
                        <h2 className='text-[1rem] font-semibold'>{data?.boatType}</h2>
                        <h2 className='flex items-center gap-1'><MdOutlineAirlineSeatReclineExtra />{data?.servicesData?.seatingCap}</h2>
                    </div>
                    <div className='flex items-center justify-between my-2'>
                        <h1 className='flex items-center justify-center gap-2'><FaRegUserCircle />{data?.fullName}</h1>
                        <h2>{data?.age} years</h2>
                    </div>
                    <div className='flex items-center justify-between my-2'>
                        <h1 className='flex items-center justify-center gap-2'><FaCar />Experience</h1>
                        <h2>{data?.experience} years</h2>
                    </div>
                    <div className='flex items-center justify-between my-2'>
                        <h1 className='flex items-center justify-center gap-2'><FaLocationDot />{data?.servicesData?.serviceArea}</h1>
                    </div>
                    <div className='flex items-center justify-between pt-3 mt-3 border-t'>
                        <div>
                            <h3>
                                <span className='text-[1.02rem] font-semibold text-[#19B56F]'>Rs.{data?.servicesData?.fullBoatFare}</span> / boat
                            </h3>
                            <h3>
                                <span className='text-[1.02rem] font-semibold text-[#19B56F]'>Rs.{data?.servicesData?.seatFare}</span> / seat
                            </h3>
                        </div>
                        <button onClick={() => navigate(`/car-book/${data?._id}`)} className='border p-2 px-4 rounded-full border-[#19B56F] hover:bg-[#19B56F] transition-all duration-500 hover:text-white text-[#19B56F] font-semibold'>BOOK NOW</button>
                    </div>
                </div>
            </div>
        </>
    })

    const settings = {
        dots: false,
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
    };


    const hotelItem = hotelListData?.map((data, key) => (
        <div
            key={key}
            className='bg-white flex flex-col mx-auto border-b-[6px] my-4 hover:border-b-[0.5px] border-blue-500  w-[16.8rem] text-black  hover:from-[#f3fbff] cursor-pointer transition-all duration-500 hover:bg-gradient-to-b hover:to-[#f8fafc] rounded-xl shadow-[0px_5px_10px_-6px_#808080] overflow-hidden'
            onClick={() => navigate(`/hotel/${data._id}`)}
        >
            <div className='w-full sm:w-[19rem]'>
                <Slider {...settings}>
                    {data?.proofFiles?.slice(0, 5).map((file, index) => (
                        <img key={index} src={file?.fileUrl} alt={`Proof ${index + 1}`} className='h-[9.5rem] w-full object-cover' />
                    ))}
                </Slider>
            </div>
            <div className='flex flex-col justify-between px-3 pb-2'>
                <div className=''>
                    <div className='flex items-center justify-between mt-1'>
                        <h1 className='text-[1.2rem] font-semibold'>{data?.hotelName}</h1>
                        <h2 className='flex items-center gap-1 '><FaHotel />{data?.servicesData?.roomType}</h2>
                    </div>
                    <div className='flex items-center justify-between mt-1'>
                        <h3 className='flex text-[0.85rem] font-semibold items-center text-[#555555] justify-center gap-1'><FaLocationDot className='text-black' />{data?.address}</h3>
                    </div>
                    <div className='flex items-center justify-between my-1 '>
                        <p className='text-[0.8rem] line-clamp-2'>{data?.description}</p>
                    </div>
                </div>
                <div className='flex items-center justify-between mt-1 border-t '>
                    <div className='flex flex-wrap w-[70%]'>
                        <div className='flex items-center mr-4 justify-center gap-1 text-[0.87rem] text-[#6e6d6d] font-semibold'>
                            <FaWifi className='' />
                            Free Wifi
                        </div>
                        <div className='flex items-center mr-4  justify-center gap-1 text-[0.87rem] text-[#6e6d6d] font-semibold'>
                            <GrLounge className='' />
                            <p>Lounge</p>
                        </div>

                        <div className='flex items-center mr-4  justify-center gap-1 text-[0.87rem] text-[#6e6d6d] font-semibold'>
                            <FaSwimmingPool className='' />
                            <p>Swimming Pool</p>
                        </div>
                        <div className='flex items-center mr-4  justify-center gap-1 text-[0.87rem] text-[#6e6d6d] font-semibold'>
                            <FaParking className='' />
                            <p>Free Parking</p>
                        </div>
                        <div className='flex items-center mr-4  justify-center gap-1 text-[0.87rem] text-[#6e6d6d] font-semibold'>
                            <CgGym className='' />
                            <p>Gym</p>
                        </div>
                        <div className='flex items-center mr-4  justify-center gap-1 text-[0.87rem] text-[#6e6d6d] font-semibold'>
                            <MdRestaurantMenu className='' />
                            <p>Restaurant</p>
                        </div>

                    </div>
                    <div className='flex flex-col items-center justify-center  relative top-[-6px]'>
                        <p className='text-[0.7rem] flex flex-col top-3 items-center font-semibold text-[#505050] relative'>&#8377;15000
                            <p className='h-[1.15px] w-[2.4rem] rotate-[-8deg] absolute top-2 bg-red-600'></p>

                        </p>
                        <span className='text-[1.2rem] relative top-2 font-semibold text-[#19B56F]'>&#8377; 1500</span>
                        <p> <span className='text-[1rem] text-[#515151] font-semibold'>Per night</span></p>
                    </div>
                </div>
            </div>
        </div>
    ))


    return (
        <div className='w-full h-fit py-24  bg-gradient-to-b from-[#86fad9] from-[-1%] via-[#befdeb] via-[20%] to-[50%] lg:to-[65%] to-white flex flex-col items-center justify-center overflow-hidden'>
            <div className='rounded-[1rem] overflow-hidden '>
                <div className='grid items-center justify-center grid-cols-3 md:grid-cols-6 w-fit shadow-[1px_5px_16px_-5px_#CFD6FA] relative z-[10]'>
                    <div onClick={() => setActive(1)} className={`w-[6.6rem] sm:w-[13rem] md:w-[8rem] lg:w-[10rem] lg:p-2 flex flex-col p-1 items-center justify-center ${active === 1 ? 'bg-[#FF8900]' : 'bg-white'}`}>
                        <img className='w-[3.5rem]' src={hotelImg} alt="" />
                        <h2 className={`${active === 1 ? 'text-white' : 'text-black'} font-semibold`}>Hotels</h2>
                    </div>
                    <div onClick={() => setActive(2)} className={`w-[6.6rem] sm:w-[13rem] md:w-[8rem] lg:w-[10rem] lg:p-2 flex flex-col p-1 items-center justify-center ${active === 2 ? 'bg-[#FF8900]' : 'bg-white'}`}>
                        <img className='w-[3.5rem]' src={guiderImg} alt="" />

                        <h2 className={`${active === 2 ? 'text-white' : 'text-black'} font-semibold`}>Guider</h2>

                    </div>
                    <div onClick={() => setActive(3)} className={`w-[6.6rem] sm:w-[13rem] md:w-[8rem] lg:w-[10rem] lg:p-2 flex flex-col p-1 items-center justify-center ${active === 3 ? 'bg-[#FF8900]' : 'bg-white'}`}>
                        <img className='w-[3.5rem]' src={carImg} alt="" />
                        <h2 className={`${active === 3 ? 'text-white' : 'text-black'} font-semibold`}>Car rentals</h2>

                    </div>
                    <div onClick={() => setActive(4)} className={`w-[6.6rem] sm:w-[13rem] md:w-[8rem] lg:w-[10rem] lg:p-2 flex flex-col p-1 items-center justify-center ${active === 4 ? 'bg-[#FF8900]' : 'bg-white'}`}>
                        <img className='w-[3.5rem]' src={cruiseImg} alt="" />

                        <h2 className={`${active === 4 ? 'text-white' : 'text-black'} font-semibold`}>Boats</h2>

                    </div>
                    <div onClick={() => setActive(5)} className={`w-[6.6rem] sm:w-[13rem] md:w-[8rem] lg:w-[10rem] lg:p-2  flex flex-col p-1 items-center justify-center ${active === 5 ? 'bg-[#FF8900]' : 'bg-white'}`}>
                        <img className='w-[3.5rem]' src={priestImg} alt="" />

                        <h2 className={`${active === 5 ? 'text-white' : 'text-black'} font-semibold`}>Priests</h2>

                    </div>
                    <div onClick={() => setActive(6)} className={`w-[6.6rem] sm:w-[13rem] md:w-[8rem] lg:w-[10rem] lg:p-2 flex flex-col p-1 items-center justify-center ${active === 6 ? 'bg-[#FF8900]' : 'bg-white'}`}>
                        <img className='w-[3.5rem]' src={hotelImg} alt="" />

                        <h2 className={`${active === 6 ? 'text-white' : 'text-black'} font-semibold`}>---</h2>

                    </div>
                </div>
                <div className='flex flex-col items-center justify-center w-full  pt-5 bg-[#fbfbff] backdrop-blur-md via-[#3985ff25] to-[#0062ff52a] transition-all duration-300  shadow-[0px_0px_10px_-6px_#808080_inset] '>
                    <div className='w-[19.5rem] sm:w-[35rem] md:w-[35rem] lg:w-[52rem]  flex items-center justify-center '>
                        {active === 1 &&
                            <AliceCarousel
                                mouseTracking
                                autoPlayInterval={2500}
                                animationDuration={1200}
                                infinite
                                responsive={responsive}
                                disableDotsControls
                                controlsStrategy="alternate"
                                disableButtonsControls
                                autoPlayDirection="ltr"
                                animationType="fadeout"
                                items={hotelItem}
                                autoPlay
                            />}
                        {active === 2 &&
                            <AliceCarousel
                                mouseTracking
                                autoPlayInterval={2500}
                                animationDuration={1200}
                                infinite
                                responsive={responsive}
                                disableDotsControls
                                controlsStrategy="alternate"
                                disableButtonsControls
                                autoPlayDirection="ltr"
                                animationType="fadeout"
                                items={placeItem}
                                autoPlay
                            />}
                        {active === 3 &&
                            <AliceCarousel
                                mouseTracking
                                autoPlayInterval={2500}
                                animationDuration={1200}
                                infinite
                                responsive={responsive}
                                disableDotsControls
                                controlsStrategy="alternate"
                                disableButtonsControls
                                autoPlayDirection="ltr"
                                animationType="fadeout"
                                items={carItem}
                                autoPlay
                            />}
                        {active === 4 &&
                            <AliceCarousel
                                mouseTracking
                                autoPlayInterval={2500}
                                animationDuration={1200}
                                infinite
                                controlsStrategy="alternate"
                                responsive={responsive}
                                autoPlayDirection="ltr"
                                animationType="fadeout"
                                disableDotsControls
                                disableButtonsControls
                                items={boatItem}
                                autoPlay
                            />}
                        {active === 5 &&
                            <AliceCarousel
                                mouseTracking
                                autoPlayInterval={2500}
                                animationDuration={1200}
                                infinite
                                controlsStrategy="alternate"
                                responsive={responsive}
                                autoPlayDirection="ltr"
                                animationType="fadeout"
                                disableDotsControls
                                disableButtonsControls
                                items={poojaItem}
                                autoPlay
                            />}
                    </div>
                    {active === 1 &&
                        <button onClick={() => navigate('/hotels')} className='from-[#1751fe] cursor-pointer hover:bg-gradient-to-bl via-[#0074f9]  to-[#0199ff]  shadow-md transition-all duration-500 bg-gradient-to-tl rounded-full p-[10px] px-8 mb-6 mt-2 text-[1rem] font-semibold'>See more...</button>
                    }
                    {active === 2 &&
                        <button onClick={() => navigate('/place-list')} className='from-[#1751fe] cursor-pointer hover:bg-gradient-to-bl via-[#0074f9]  to-[#0199ff]  shadow-md transition-all duration-500 bg-gradient-to-tl rounded-full p-[10px] px-8 mb-6 mt-2 text-[1rem] font-semibold'>See more...</button>
                    }
                    {active === 3 &&
                        <button onClick={() => navigate('/car')} className='from-[#1751fe] cursor-pointer hover:bg-gradient-to-bl via-[#0074f9]  to-[#0199ff]  shadow-md transition-all duration-500 bg-gradient-to-tl rounded-full p-[10px] px-8 mb-6 mt-2 text-[1rem] font-semibold'>See more...</button>
                    }
                    {active === 4 &&
                        <button onClick={() => navigate('/boat')} className='from-[#1751fe] cursor-pointer hover:bg-gradient-to-bl via-[#0074f9]  to-[#0199ff]  shadow-md transition-all duration-500 bg-gradient-to-tl rounded-full p-[10px] px-8 mb-6 mt-2 text-[1rem] font-semibold'>See more...</button>
                    }
                    {active === 5 &&
                        <button onClick={() => navigate('/pooja-list')} className='from-[#1751fe] cursor-pointer hover:bg-gradient-to-bl via-[#0074f9]  to-[#0199ff]  shadow-md transition-all duration-500 bg-gradient-to-tl rounded-full p-[10px] px-8 mb-6 mt-2 text-[1rem] font-semibold'>See more...</button>
                    }
                    {active === 6 &&
                        <Link to='/' className='from-[#1751fe] cursor-pointer hover:bg-gradient-to-bl via-[#0074f9]  to-[#0199ff]  shadow-md transition-all duration-500 bg-gradient-to-tl rounded-full p-[10px] px-8 mb-6 mt-2 text-[1rem] font-semibold'>See more...</Link>
                    }
                </div>
            </div>
            <div className='text-black flex flex-col items-center justify-center gap-5 my-20 py-10 lg:w-[70vw]'>
                <div className='text-center md:w-full md:text-start'>
                    <h1 className='text-[#FF8900] overlock-black-italic lg:text-[1.6rem] text-[1.35rem] '>WHAT WE SERVE</h1>
                    <h1 className='text-[1.75rem] md:text-[3rem] lg:text-[3.5rem] md:ml-24 lora-900 md:text-end w-fit'>TOP VALUES <br className='hidden md:block ' /> FOR YOU!</h1>
                </div>

                <div className='flex flex-wrap items-center justify-center gap-5 md:gap-8 lg:gap-10'>
                    <div className='w-[17rem] border-t-4 border-blue-500 transition-all duration-700 flex flex-col items-center hover:from-[#5494fc3c] hover:to-white bg-gradient-to-b justify-center text-center p-4 to-[#fff] from-[#e3faf4] gap-2 py-12 rounded-lg'>
                        <FaCar className='text-[4rem] text-blue-500' />  {/* Icon for Unmatched Convenience */}
                        <h2 className='text-[1.4rem] font-semibold'>Unmatched Convenience</h2>
                        <p>Experience a hassle-free booking process, allowing you to easily manage all your travel needs in one place.</p>
                    </div>
                    <div className='w-[17rem] transition-all border-t-4 border-blue-500 duration-700 flex flex-col items-center hover:from-[#5494fc3c] hover:to-white bg-gradient-to-b justify-center text-center p-4 to-[#fff] from-[#e3faf4] gap-2 py-12 rounded-lg lg:mt-16'>
                        <FaHotel className='text-[4rem] text-blue-500' />  {/* Icon for Comprehensive Choices */}
                        <h2 className='text-[1.4rem] font-semibold'>Comprehensive Choices</h2>
                        <p>Enjoy a wide array of options tailored to your preferences, ensuring you find the perfect fit for your journey.</p>
                    </div>
                    <div className='w-[17rem] transition-all border-t-4 border-blue-500 duration-700 flex flex-col items-center hover:from-[#5494fc3c] hover:to-white bg-gradient-to-b justify-center text-center p-4 to-[#fff] from-[#e3faf4] gap-2 py-12 rounded-lg lg:mt-32'>
                        <FaUserCheck className='text-[4rem] text-blue-500' />  {/* Icon for Personalized Experience */}
                        <h2 className='text-[1.4rem] font-semibold'>Personalized Experience</h2>
                        <p>Benefit from personalized recommendations and services, designed to make your travel experience truly unique.</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CategorySection
