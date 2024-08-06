import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBookingStatsData, getStatsData } from '../../Redux/Slices/StatsSlice'
import { useEffect } from 'react'
import { FiUsers } from "react-icons/fi";
import { IoCarSportOutline } from "react-icons/io5";
import { FaHotel } from "react-icons/fa6";
import { GiBinoculars } from "react-icons/gi";
import { GiSunPriest } from "react-icons/gi";
import { MdOutlineDirectionsBoatFilled } from "react-icons/md";

const Statistics = () => {
    const dispatch = useDispatch()

    const { totalUser,
        totalBoater,
        totalHotel,
        totalGuider,
        totalDriver,
        totalPriest,
        totalBoatBook,
        totalHotelBook,
        totalGuiderBook,
        totalCarBook,
        totalPriestBook } = useSelector((state) => state?.stats)

    const loadData = async () => {
        await dispatch(getStatsData())
        await dispatch(getBookingStatsData())
    }



    useEffect(() => {
        loadData()
    }, [])

    return (
        <div className='flex flex-col justify-between gap-3 my-3 lg:flex-row'>
            <div className='p-4  w-full bg-white rounded-md shadow-[0px_0px_10px_-3px_#808080]'>
                <h1 className='text-[1.2rem]  mb-4 font-semibold text-[#5F54D5]'>Statistics</h1>
                <div className='grid justify-between grid-cols-2 gap-4 lg:grid-cols-2 xl:grid-cols-3 sm:grid-cols-3'>
                    <div className='flex items-center gap-4 w-fit'>
                        <div className='bg-[#D6F4F8] w-fit p-[10px] rounded-md'>
                            <FiUsers className='text-[#00a5bb] text-[1.25rem]' />
                        </div>
                        <div className='mb-[7px]'>
                            <p className='font-semibold text-[1.35rem] text-[#353535]'>{totalUser}</p>
                            <p className='text-[0.82rem] font-semibold text-[#737373]'>Customers</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 w-fit'>
                        <div className='bg-[#FFE2E3] w-fit p-[10px] rounded-md'>
                            <IoCarSportOutline className='text-[#e61e24] text-[1.25rem]' />
                        </div>
                        <div className='mb-[7px]'>
                            <p className='font-semibold text-[1.35rem] text-[#353535]'>{totalDriver}</p>
                            <p className='text-[0.82rem] font-semibold text-[#737373]'>Drivers</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 w-fit'>
                        <div className='bg-[#E9E7FD] w-fit p-[10px] rounded-md'>
                            <FaHotel className='text-[#5f54d5] text-[1.25rem]' />
                        </div>
                        <div className='mb-[7px]'>
                            <p className='font-semibold text-[1.35rem] text-[#353535]'>{totalHotel}</p>
                            <p className='text-[0.82rem] font-semibold text-[#737373]'>Hotels</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 w-fit'>
                        <div className='bg-[#DDF6E8] w-fit p-[10px] rounded-md'>
                            <GiBinoculars className='text-[#00b753] text-[1.25rem]' />
                        </div>
                        <div className='mb-[7px]'>
                            <p className='font-semibold text-[1.35rem] text-[#353535]'>{totalGuider}</p>
                            <p className='text-[0.82rem] font-semibold text-[#737373]'>Guiders</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 w-fit'>
                        <div className='bg-[#ffebd8] w-fit p-[10px] rounded-md'>
                            <GiSunPriest className='text-[#ff5900] text-[1.25rem]' />
                        </div>
                        <div className='mb-[7px]'>
                            <p className='font-semibold text-[1.35rem] text-[#353535]'>{totalPriest}</p>
                            <p className='text-[0.82rem] font-semibold text-[#737373]'>Priest</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 w-fit'>
                        <div className='bg-[#d9f3fc] w-fit p-[10px] rounded-md'>
                            <MdOutlineDirectionsBoatFilled className='text-[#1206ff] text-[1.25rem]' />
                        </div>
                        <div className='mb-[7px]'>
                            <p className='font-semibold text-[1.35rem] text-[#353535]'>{totalBoater}</p>
                            <p className='text-[0.82rem] font-semibold text-[#737373]'>Boaters</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='p-4  bg-white w-full rounded-md shadow-[0px_0px_10px_-3px_#808080]'>
                <h1 className='text-[1.2rem] mb-4 font-semibold text-[#5F54D5]'>Booking Statistics</h1>
                <div className='grid justify-between grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3'>
                    <div className='flex items-center gap-4 w-fit'>
                        <div className='bg-[#d9f3fc] w-fit p-[10px] rounded-md'>
                            <MdOutlineDirectionsBoatFilled className='text-[#1206ff] text-[1.25rem]' />
                        </div>
                        <div className='mb-[7px]'>
                            <p className='font-semibold text-[1.35rem] text-[#353535]'>{totalBoater}</p>
                            <p className='text-[0.82rem] font-semibold text-[#737373]'>Boat</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 w-fit'>
                        <div className='bg-[#FFE2E3] w-fit p-[10px] rounded-md'>
                            <IoCarSportOutline className='text-[#e61e24] text-[1.25rem]' />
                        </div>
                        <div className='mb-[7px]'>
                            <p className='font-semibold text-[1.35rem] text-[#353535]'>{totalCarBook}</p>
                            <p className='text-[0.82rem] font-semibold text-[#737373]'>Car</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 w-fit'>
                        <div className='bg-[#E9E7FD] w-fit p-[10px] rounded-md'>
                            <FaHotel className='text-[#5f54d5] text-[1.25rem]' />
                        </div>
                        <div className='mb-[7px]'>
                            <p className='font-semibold text-[1.35rem] text-[#353535]'>{totalHotelBook}</p>
                            <p className='text-[0.82rem] font-semibold text-[#737373]'>Hotels</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 w-fit'>
                        <div className='bg-[#DDF6E8] w-fit p-[10px] rounded-md'>
                            <GiBinoculars className='text-[#00b753] text-[1.25rem]' />
                        </div>
                        <div className='mb-[7px]'>
                            <p className='font-semibold text-[1.35rem] text-[#353535]'>{totalGuiderBook}</p>
                            <p className='text-[0.82rem] font-semibold text-[#737373]'>Guider</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 w-fit'>
                        <div className='bg-[#ffebd8] w-fit p-[10px] rounded-md'>
                            <GiSunPriest className='text-[#ff5900] text-[1.25rem]' />
                        </div>
                        <div className='mb-[7px]'>
                            <p className='font-semibold text-[1.35rem] text-[#353535]'>{totalPriestBook}</p>
                            <p className='text-[0.82rem] font-semibold text-[#737373]'>Priest</p>
                        </div>
                    </div>
                    {/* <div className='flex items-center gap-4 w-fit'>
                        <div className='bg-[#d9f3fc] w-fit p-[10px] rounded-md'>
                            <MdOutlineDirectionsBoatFilled className='text-[#1206ff] text-[1.25rem]' />
                        </div>
                        <div className='mb-[7px]'>
                            <p className='font-semibold text-[1.35rem] text-[#353535]'>{totalBoater}</p>
                            <p className='text-[0.82rem] font-semibold text-[#737373]'>Boat</p>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Statistics
