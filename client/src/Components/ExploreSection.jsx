import React, { useState } from 'react'
import cruiseImg from '../assets/Images/cruise.png'
import AliceCarousel, { Link } from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css';
import hero2Img from '../assets/Images/hero2.jpeg'

import { FaLocationDot } from 'react-icons/fa6';
const ExploreSection = () => {

    const [active, setActive] = useState(1)


    const responsive = {
        0: {
            items: 1,
        },
        640: {
            items: 1
        },
        900: {
            items: 1
        },
        1024: {
            items: 2
        }

    }

    const trendingList = [{ 'image': hero2Img, 'name': "Cruise", 'price': '100', 'link': '/' },
    { 'image': hero2Img, 'name': "Cruise", 'price': '100', 'link': '/' },
    { 'image': hero2Img, 'name': "Cruise", 'price': '100', 'link': '/' },
    { 'image': hero2Img, 'name': "Cruise", 'price': '100', 'link': '/' }
    ]

    const item = trendingList.map((val) => {
        return <>
            <Link className='flex flex-col p-2 items-start bg-white text-black pb-3  rounded-md m-3 w-fit  text-[15px] md:text-[16px] lg:text-[17px] '>
                <div className='flex items-center justify-center gap-3'>
                    <div className='bg-[#FFF3E5] p-2 rounded-full'>
                        <FaLocationDot className='text-[#FF8900] animate-pulse text-[0.95rem]' />
                    </div>
                    <p className=' lora-700 text-[1.05rem] '>Kashi vishwanath, Varanasi</p>
                </div>
                <h2 className='text-center w-full text-[1.1rem] text-white mt-3 rounded-t-md py-2 from-[#1751fe] bg-gradient-to-bl via-[#0074f9]  to-[#0199ff]  font-semibold tracking-wide'>Kashi Vishwanath Temple</h2>

                < img src={val.image} alt="" className='sm:w-[24rem] w-[85vw] sm:h-[22rem] h-[85vw]  object-cover' />


            </ Link>
        </>
    })

    return (
        <div className='bg-[#2A4046] explore gap-1 flex flex-col text-center items-center justify-center py-10 px-[3vw]'>
            <h1 className='text-[#FF8900] sm:text-[2rem] text-[1.5rem] overlock-bold-italic '>EXPLORE WONDERFUL EXPERIENCE</h1>
            <h2 className='text-[1.3rem]  lora-700'>Visit Popular Destinations in the World</h2>
            <div className='flex border border-white bg-white rounded-full my-5 text-[0.8rem] overflow-hidden font-semibold'>
                <h3 className={` p-2 px-3 rounded-full transition-all duration-300 ${active === 1 ? 'bg-[#005AFF] text-white' : 'text-black'}`} onClick={() => setActive(1)}>Special Place</h3>
                <h3 className={` p-2 px-4 rounded duration-300 transition-all ${active === 2 ? 'bg-[#005AFF] text-white' : 'text-black'}`} onClick={() => setActive(2)}>Popular</h3>
                <h3 className={` p-2 px-2 rounded-full transition-all duration-300 ${active === 3 ? 'bg-[#005AFF] text-white' : 'text-black'}`} onClick={() => setActive(3)}>Recommendation</h3>
            </div>
            <div >
                <div className='w-[85vw] sm:w-[24rem] lg:w-[48rem] flex items-center justify-center   '>
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
            </div>
        </div>
    )
}

export default ExploreSection
