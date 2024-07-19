import React, { useState } from 'react'
import carImg from '../assets/Images/car.png'
import cruiseImg from '../assets/Images/cruise.png'
import priestImg from '../assets/Images/priest.png'
import guiderImg from '../assets/Images/guider.png'
import hotelImg from '../assets/Images/hotel.png'

const CategorySection = () => {
    const [active, setActive] = useState(1)
    return (
        <div className='w-full h-[20rem] bg-gradient-to-b from-[#161d1b] from-[0%] via-[#60dbb8] via-[5%] to-[#E2FAF3]'>
            <div>
                <div className='grid grid-cols-3 md:grid-cols-6 items-center justify-center w-fit'>
                    <div onClick={() => setActive(1)} className={`w-[6rem] md:w-[7rem] flex flex-col p-1 items-center justify-center ${active === 1 ? 'bg-[#FF8900]' : 'bg-white'}`}>
                        <img className='w-[3.8rem]' src={hotelImg} alt="" />
                        <h3 className={`${active === 1 ? 'text-white' : 'text-black'} font-semibold`}>Hotels</h3>
                    </div>
                    <div onClick={() => setActive(2)} className={`w-[6rem] md:w-[7rem] flex flex-col p-1 items-center justify-center ${active === 2 ? 'bg-[#FF8900]' : 'bg-white'}`}>
                        <img className='w-[3.8rem]' src={guiderImg} alt="" />

                        <h3 className={`${active === 2 ? 'text-white' : 'text-black'} font-semibold`}>Guider</h3>

                    </div>
                    <div onClick={() => setActive(3)} className={`w-[6rem] md:w-[7rem] flex flex-col p-1 items-center justify-center ${active === 3 ? 'bg-[#FF8900]' : 'bg-white'}`}>
                        <img className='w-[3.8rem]' src={carImg} alt="" />
                        <h3 className={`${active === 3 ? 'text-white' : 'text-black'} font-semibold`}>Car rentals</h3>

                    </div>
                    <div onClick={() => setActive(4)} className={`w-[6rem] md:w-[7rem] flex flex-col p-1 items-center justify-center ${active === 4 ? 'bg-[#FF8900]' : 'bg-white'}`}>
                        <img className='w-[3.8rem]' src={cruiseImg} alt="" />

                        <h3 className={`${active === 4 ? 'text-white' : 'text-black'} font-semibold`}>Boats</h3>

                    </div>
                    <div onClick={() => setActive(5)} className={`w-[6rem] md:w-[7rem] flex flex-col p-1 items-center justify-center ${active === 5 ? 'bg-[#FF8900]' : 'bg-white'}`}>
                        <img className='w-[3.8rem]' src={priestImg} alt="" />

                        <h3 className={`${active === 5 ? 'text-white' : 'text-black'} font-semibold`}>Priests</h3>

                    </div>
                    <div onClick={() => setActive(6)} className={`w-[6rem] md:w-[7rem] flex flex-col p-1 items-center justify-center ${active === 6 ? 'bg-[#FF8900]' : 'bg-white'}`}>
                        <img className='w-[3.8rem]' src={hotelImg} alt="" />

                        <h3 className={`${active === 6 ? 'text-white' : 'text-black'} font-semibold`}>---</h3>

                    </div>
                </div>
                <div>bottom</div>
            </div>
        </div>
    )
}

export default CategorySection
