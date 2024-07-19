import React, { useState } from 'react'
import carImg from '../assets/Images/car.png'
import cruiseImg from '../assets/Images/cruise.png'
import priestImg from '../assets/Images/priest.png'
import guiderImg from '../assets/Images/guider.png'
import hotelImg from '../assets/Images/hotel.png'
import AliceCarousel, { Link } from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css';
const CategorySection = () => {
    const [active, setActive] = useState(1)


    const responsive = {
        0: {
            items: 1,
        },
        640: {
            items: 3
        },
        768: {
            items: 3
        },
        1024: {
            items: 3
        }

    }

    const trendingList = [{ 'image': cruiseImg, 'name': "Cruise", 'price': '100', 'link': '/' },
    { 'image': cruiseImg, 'name': "Cruise", 'price': '100', 'link': '/' },
    { 'image': cruiseImg, 'name': "Cruise", 'price': '100', 'link': '/' },
    { 'image': cruiseImg, 'name': "Cruise", 'price': '100', 'link': '/' }
    ]

    const item = trendingList.map((val) => {
        return <>
            <Link className='flex flex-col items-start bg-white text-black pb-3 w-[12rem] rounded-md  text-[15px] md:text-[16px] lg:text-[17px] '>
                < img src={val.image} alt="" className='w-full h-[6.5rem]  mb-2 lg:mb-4 object-cover' />
                <div className='p-2'>
                    <div className='flex items-start  flex-col justify-between w-full'>
                        <h3 className='font-bold w-[8.8rem] truncate'>{val.name}</h3>
                        <p className='w-[8.8rem] truncate'>location</p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <strike>2355</strike>
                        <h4>1335</h4>
                    </div>
                    <p>1 room per night</p>
                </div>

            </ Link>
        </>
    })


    return (
        <div className='w-full h-fit py-24  bg-gradient-to-b from-[#161d1b] from-[0%] via-[#86f8d7] via-[5%] to-[#E2FAF3] flex items-center justify-center overflow-hidden'>
            <div className='rounded-xl overflow-hidden '>
                <div className='grid grid-cols-3 md:grid-cols-6 items-center justify-center w-fit'>
                    <div onClick={() => setActive(1)} className={`w-[6rem] md:w-[7rem] lg:w-[10rem] lg:p-2 flex flex-col p-1 items-center justify-center ${active === 1 ? 'bg-[#FF8900]' : 'bg-white'}`}>
                        <img className='w-[3.5rem]' src={hotelImg} alt="" />
                        <h3 className={`${active === 1 ? 'text-white' : 'text-black'} font-semibold`}>Hotels</h3>
                    </div>
                    <div onClick={() => setActive(2)} className={`w-[6rem] md:w-[7rem] lg:w-[10rem] lg:p-2 flex flex-col p-1 items-center justify-center ${active === 2 ? 'bg-[#FF8900]' : 'bg-white'}`}>
                        <img className='w-[3.5rem]' src={guiderImg} alt="" />

                        <h3 className={`${active === 2 ? 'text-white' : 'text-black'} font-semibold`}>Guider</h3>

                    </div>
                    <div onClick={() => setActive(3)} className={`w-[6rem] md:w-[7rem] lg:w-[10rem] lg:p-2 flex flex-col p-1 items-center justify-center ${active === 3 ? 'bg-[#FF8900]' : 'bg-white'}`}>
                        <img className='w-[3.5rem]' src={carImg} alt="" />
                        <h3 className={`${active === 3 ? 'text-white' : 'text-black'} font-semibold`}>Car rentals</h3>

                    </div>
                    <div onClick={() => setActive(4)} className={`w-[6rem] md:w-[7rem] lg:w-[10rem] lg:p-2 flex flex-col p-1 items-center justify-center ${active === 4 ? 'bg-[#FF8900]' : 'bg-white'}`}>
                        <img className='w-[3.5rem]' src={cruiseImg} alt="" />

                        <h3 className={`${active === 4 ? 'text-white' : 'text-black'} font-semibold`}>Boats</h3>

                    </div>
                    <div onClick={() => setActive(5)} className={`w-[6rem] md:w-[7rem] lg:w-[10rem] lg:p-2  flex flex-col p-1 items-center justify-center ${active === 5 ? 'bg-[#FF8900]' : 'bg-white'}`}>
                        <img className='w-[3.5rem]' src={priestImg} alt="" />

                        <h3 className={`${active === 5 ? 'text-white' : 'text-black'} font-semibold`}>Priests</h3>

                    </div>
                    <div onClick={() => setActive(6)} className={`w-[6rem] md:w-[7rem] lg:w-[10rem] lg:p-2 flex flex-col p-1 items-center justify-center ${active === 6 ? 'bg-[#FF8900]' : 'bg-white'}`}>
                        <img className='w-[3.5rem]' src={hotelImg} alt="" />

                        <h3 className={`${active === 6 ? 'text-white' : 'text-black'} font-semibold`}>---</h3>

                    </div>
                </div>
                <div className='bg-[#96f1d4] shadow-md pt-5 flex flex-col  w-full items-center justify-center'>
                    <div className='w-[12.5rem]   sm:w-[20rem] md:w-[37.8rem] flex items-center justify-center '>
                        <AliceCarousel
                            mouseTracking
                            autoPlayInterval={2500}
                            animationDuration={1200}
                            infinite
                            responsive={responsive}
                            disableDotsControls
                            disableButtonsControls
                            items={item}
                            autoPlay
                        />
                    </div>
                    <button className='bg-[#1EC28B] my-6 p-2 px-8 rounded-full font-semibold'>See more...</button>
                </div>
            </div>
        </div>
    )
}

export default CategorySection
