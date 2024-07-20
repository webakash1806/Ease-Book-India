import React, { useState } from 'react'
import cruiseImg from '../assets/Images/cruise.png'
import AliceCarousel, { Link } from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css';
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

    const trendingList = [{ 'image': cruiseImg, 'name': "Cruise", 'price': '100', 'link': '/' },
    { 'image': cruiseImg, 'name': "Cruise", 'price': '100', 'link': '/' },
    { 'image': cruiseImg, 'name': "Cruise", 'price': '100', 'link': '/' },
    { 'image': cruiseImg, 'name': "Cruise", 'price': '100', 'link': '/' }
    ]

    const item = trendingList.map((val) => {
        return <>
            <Link className='flex flex-col p-2 items-start bg-white text-black pb-3  rounded-md m-3 w-fit  text-[15px] md:text-[16px] lg:text-[17px] '>
                <div className='flex items-center justify-center gap-3'>
                    <div className='bg-[#FFF3E5] p-2 rounded-full'>
                        <FaLocationDot className='text-[#FF8900] text-[0.95rem]' />
                    </div>
                    <p>Location</p>
                </div>
                <h2>Place name</h2>

                < img src={val.image} alt="" className='sm:w-[24rem] w-[85vw] sm:h-[20rem] h-[16rem]   mb-2 lg:mb-4 object-cover' />


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
            <div >
                <div className='w-[85vw] sm:w-[24rem] lg:w-[48rem] flex items-center justify-center border  '>
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
