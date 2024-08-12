import React, { useState } from 'react'
import carImg from '../assets/Images/car.png'
import cruiseImg from '../assets/Images/cruise.png'
import priestImg from '../assets/Images/priest.png'
import guiderImg from '../assets/Images/guider.png'
import hotelImg from '../assets/Images/hotel.png'
import hero2Img from '../assets/Images/hero2.jpeg'
import AliceCarousel, { Link } from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css';
const CategorySection = () => {
    const [active, setActive] = useState(1)


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

    const trendingList = [{ 'image': hero2Img, 'name': "Cruise", 'price': '100', 'link': '/' },
    { 'image': hero2Img, 'name': "Cruise", 'price': '100', 'link': '/' },
    { 'image': hero2Img, 'name': "Cruise", 'price': '100', 'link': '/' },
    { 'image': hero2Img, 'name': "Cruise", 'price': '100', 'link': '/' }
    ]

    const item = trendingList.map((val) => {
        return <>
            <Link className='flex overflow-hidden mx-auto flex-col items-start bg-white text-black pb-3 w-[14rem] rounded-md  text-[15px] md:text-[16px] lg:text-[17px] '>
                < img src={hero2Img} alt="" className='w-full h-[6.5rem]  mb-2 lg:mb-4 object-cover' />
                <div className='p-2'>
                    <div className='flex flex-col items-start justify-between w-full'>
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
        <div className='w-full h-fit py-24  bg-gradient-to-b from-[#86fad9] from-[-1%] via-[#befdeb] via-[20%] to-[50%] lg:to-[65%] to-white flex flex-col items-center justify-center overflow-hidden'>
            <div className='rounded-[1rem] overflow-hidden '>
                <div className='grid items-center justify-center grid-cols-3 md:grid-cols-6 w-fit'>
                    <div onClick={() => setActive(1)} className={`w-[6rem] sm:w-[13rem] md:w-[8rem] lg:w-[10rem] lg:p-2 flex flex-col p-1 items-center justify-center ${active === 1 ? 'bg-[#FF8900]' : 'bg-white'}`}>
                        <img className='w-[3.5rem]' src={hotelImg} alt="" />
                        <h3 className={`${active === 1 ? 'text-white' : 'text-black'} font-semibold`}>Hotels</h3>
                    </div>
                    <div onClick={() => setActive(2)} className={`w-[6rem] sm:w-[13rem] md:w-[8rem] lg:w-[10rem] lg:p-2 flex flex-col p-1 items-center justify-center ${active === 2 ? 'bg-[#FF8900]' : 'bg-white'}`}>
                        <img className='w-[3.5rem]' src={guiderImg} alt="" />

                        <h3 className={`${active === 2 ? 'text-white' : 'text-black'} font-semibold`}>Guider</h3>

                    </div>
                    <div onClick={() => setActive(3)} className={`w-[6rem] sm:w-[13rem] md:w-[8rem] lg:w-[10rem] lg:p-2 flex flex-col p-1 items-center justify-center ${active === 3 ? 'bg-[#FF8900]' : 'bg-white'}`}>
                        <img className='w-[3.5rem]' src={carImg} alt="" />
                        <h3 className={`${active === 3 ? 'text-white' : 'text-black'} font-semibold`}>Car rentals</h3>

                    </div>
                    <div onClick={() => setActive(4)} className={`w-[6rem] sm:w-[13rem] md:w-[8rem] lg:w-[10rem] lg:p-2 flex flex-col p-1 items-center justify-center ${active === 4 ? 'bg-[#FF8900]' : 'bg-white'}`}>
                        <img className='w-[3.5rem]' src={cruiseImg} alt="" />

                        <h3 className={`${active === 4 ? 'text-white' : 'text-black'} font-semibold`}>Boats</h3>

                    </div>
                    <div onClick={() => setActive(5)} className={`w-[6rem] sm:w-[13rem] md:w-[8rem] lg:w-[10rem] lg:p-2  flex flex-col p-1 items-center justify-center ${active === 5 ? 'bg-[#FF8900]' : 'bg-white'}`}>
                        <img className='w-[3.5rem]' src={priestImg} alt="" />

                        <h3 className={`${active === 5 ? 'text-white' : 'text-black'} font-semibold`}>Priests</h3>

                    </div>
                    <div onClick={() => setActive(6)} className={`w-[6rem] sm:w-[13rem] md:w-[8rem] lg:w-[10rem] lg:p-2 flex flex-col p-1 items-center justify-center ${active === 6 ? 'bg-[#FF8900]' : 'bg-white'}`}>
                        <img className='w-[3.5rem]' src={hotelImg} alt="" />

                        <h3 className={`${active === 6 ? 'text-white' : 'text-black'} font-semibold`}>---</h3>

                    </div>
                </div>
                <div className='flex flex-col items-center justify-center w-full  pt-5 bg-gradient-to-r from-[#1751fe] via-[#0074f9] transition-all duration-300 to-[#0199ff] shadow-md'>
                    <div className='w-[14.5rem]  sm:w-[30rem] md:w-[39rem] lg:w-[55rem]  flex items-center justify-center '>
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
            <div className='text-black flex flex-col items-center justify-center gap-5 my-20 py-10 lg:w-[70vw]'>
                <div className='text-center md:w-full md:text-start'>
                    <h4 className='text-[#FF8900] font-bold lg:text-[1.6rem] text-[1.35rem]'>WHAT WE SERVE</h4>
                    <h2 className='text-[1.75rem] md:text-[3rem] lg:text-[3.5rem] md:ml-24 font-bold md:text-end w-fit'>TOP VALUES <br className='hidden md:block ' /> FOR YOU!</h2>
                </div>
                <div className='flex flex-wrap items-center justify-center gap-5 md:gap-8 lg:gap-10'>
                    <div className='w-[17rem]  border-t-4 border-blue-500 transition-all duration-700 flex flex-col items-center hover:from-[#5494fc3c] hover:to-white bg-gradient-to-b justify-center  text-center p-4 to-[#fff] from-[#e3faf4] gap-2 py-12 rounded-lg'>
                        <img className='w-[5rem]' src={hotelImg} alt="" />
                        <h3 className='text-[1.4rem] font-semibold'>Lot of choices</h3>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat animi ut minima odio, nesciunt voluptates consequatur eos !</p>
                    </div>
                    <div className='w-[17rem] transition-all 
                    border-t-4 border-blue-500  duration-700 flex flex-col items-center hover:from-[#5494fc3c] hover:to-white bg-gradient-to-b justify-center  text-center p-4 to-[#fff] from-[#e3faf4] gap-2 py-12 rounded-lg lg:mt-16'>
                        <img className='w-[5rem]' src={hotelImg} alt="" />
                        <h3 className='text-[1.4rem] font-semibold'>Lot of choices</h3>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat animi ut minima odio, nesciunt voluptates consequatur eos !</p>
                    </div>
                    <div className='w-[17rem] transition-all
                    border-t-4 border-blue-500  duration-700 flex flex-col items-center hover:from-[#5494fc3c] hover:to-white bg-gradient-to-b justify-center  text-center p-4 to-[#fff] from-[#e3faf4] gap-2 py-12 rounded-lg lg:mt-32'>
                        <img className='w-[5rem]' src={hotelImg} alt="" />
                        <h3 className='text-[1.4rem] font-semibold'>Lot of choices</h3>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat animi ut minima odio, nesciunt voluptates consequatur eos !</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CategorySection
