import React from 'react'
import img from '../assets/Images/hero1.jpeg'
import { IoTimerOutline } from "react-icons/io5";
const PlaceCard = () => {
    return (
        <div className='bg-white text-black w-[92vw] max-w-[24rem] rounded-xl overflow-hidden hover:from-[#d0f7e6] bg-gradient-to-b shadow-[0px_0px_8px_#808080] hover:to-[#f7fffb]'>
            <div className='relative'>
                <img src={img} alt="" className='w-[full] h-[17rem] object-cover' />
                <div className='flex items-center justify-center gap-2 font-semibold bg-[#f5faf5] w-fit p-2 px-6 rounded-full absolute left-[22%] bottom-[-19.5px]'>
                    <IoTimerOutline />
                    <h4>3 Days 4 Nights</h4>
                </div>
            </div>
            <div className='p-2'>
                <div className='flex w-full mt-10 items-start justify-between'>
                    <h2 className='font-semibold'>Ganga Ghat <br />Varanasi</h2>
                    <div className='text-center text-[0.9rem] font-semibold'>
                        <h5>Starting From <br /> <span className='text-[#19B56F] text-[1rem]'>Rs. 1000</span> / Person</h5>
                    </div>
                </div>
                <div className='flex w-full mt-4 mb-2 items-start justify-between '>
                    <button className='border p-2 px-4 rounded-full border-[#FF8900] hover:bg-[#FF8900] transition-all duration-500 hover:text-white text-[#FF8900] font-semibold'>MORE DETAILS</button>
                    <button className='border p-2 px-4 rounded-full border-[#19B56F] hover:bg-[#19B56F] transition-all duration-500 hover:text-white text-[#19B56F] font-semibold'>BOOK NOW</button>
                </div>
            </div>
        </div>
    )
}

export default PlaceCard
