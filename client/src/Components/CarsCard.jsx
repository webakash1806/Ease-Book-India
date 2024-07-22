import React from 'react'
import car1 from '../assets/Images/car1.jpeg'
import { FaRegUserCircle } from "react-icons/fa";
const CarsCard = () => {
    return (
        <div className='bg-white text-black max-w-[20rem] w-[90vw] hover:from-[#d0f7e6] transition-all duration-300 hover:bg-gradient-to-b  hover:to-[#f7fffb] rounded-xl shadow-[0px_0px_5px_#808080] overflow-hidden'>
            <img src={car1} alt="" className='h-[14rem] w-full object-cover' />
            <div className='p-3'>
                <h2 className='text-[1.1rem] font-semibold'>Vehicle Name</h2>
                <div className='flex items-center justify-between my-2'>
                    <h1 className='flex items-center justify-center gap-2'><FaRegUserCircle /> Driver Name</h1>
                    <h2>26 years</h2>
                </div>
                <div className='flex items-center justify-between border-t pt-3 mt-3'>
                    <h3>
                        <span className='text-[1.05rem] font-semibold text-[#19B56F]'>Rs.100</span> / Km
                    </h3>
                    <button className='border p-2 px-4 rounded-full border-[#19B56F] hover:bg-[#19B56F] transition-all duration-500 hover:text-white text-[#19B56F] font-semibold'>BOOK NOW</button>

                </div>
            </div>
        </div>
    )
}

export default CarsCard
