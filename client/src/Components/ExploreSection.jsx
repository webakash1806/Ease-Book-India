import React, { useState } from 'react'
import cruiseImg from '../assets/Images/cruise.png'
import AliceCarousel, { Link } from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css';
const ExploreSection = () => {

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
        <div className='bg-[#2A4046] flex flex-col items-center justify-center p-10'>
            <h3 className='text-[#FF8900]'>EXPLORE WONDERFUL EXPERIENCE</h3>
            <h2>Visit Popular Destinations in the World</h2>
            <div className='flex gap-6'>
                <h5>Special Place</h5>
                <h5>Popular</h5>
                <h5>Recommendation</h5>
                <h5>Best Place</h5>
            </div>
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
        </div>
    )
}

export default ExploreSection
