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
        <div className='bg-[#2A4046] explore gap-1 flex flex-col text-center items-center justify-center p-10'>
            <h3 className='text-[#FF8900] text-[2rem] overlock-bold-italic '>EXPLORE WONDERFUL EXPERIENCE</h3>
            <h2 className='text-[1.3rem] lora-700'>Visit Popular Destinations in the World</h2>
            <div className='flex flex-wrap gap-6 my-5 text-[1.05rem] font-semibold'>
                <h5 className={`hover:text-[#23efab] ${active === 1 ? 'text-[#23efab]' : 'text-white'}`} onClick={() => setActive(1)}>Special Place</h5>
                <h5 className={`hover:text-[#23efab] ${active === 2 ? 'text-[#23efab]' : 'text-white'}`} onClick={() => setActive(2)}>Popular</h5>
                <h5 className={`hover:text-[#23efab] ${active === 3 ? 'text-[#23efab]' : 'text-white'}`} onClick={() => setActive(3)}>Recommendation</h5>
                <h5 className={`hover:text-[#23efab] ${active === 4 ? 'text-[#23efab]' : 'text-white'}`} onClick={() => setActive(4)}>Best Place</h5>
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
