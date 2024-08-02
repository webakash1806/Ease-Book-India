import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCarsList, getPriestList } from '../Redux/Slices/ServiceSlice';
import { FaCar, FaRegUserCircle } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineAirlineSeatReclineExtra } from "react-icons/md";
import { useLocation, useNavigate } from 'react-router-dom';
import { GiSunPriest } from "react-icons/gi";

const PriestList = () => {
    const location = useLocation()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const serviceList = useSelector((state) => state?.service?.priestListData) || [];
    const [loading, setLoading] = useState(true);

    const { state } = location

    console.log(state.pooja.name)

    const filterWithPooja = serviceList.filter((data) =>
        data?.servicesData?.poojaList?.some(pooja => pooja.name === state.pooja.name)
    );


    const availableList = filterWithPooja.filter((data) => data?.servicesData?.availability === "AVAILABLE")

    const breakList = filterWithPooja.filter((data) => data?.servicesData?.availability === "BREAK")

    const maintenanceList = filterWithPooja.filter((data) => data?.servicesData?.availability === "MAINTENANCE")

    const onServiceList = filterWithPooja.filter((data) => data?.servicesData?.availability === "ON SERVICE")

    const loadData = async () => {
        await dispatch(getPriestList());
        setLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className='from-[#ddfcee] bg-gradient-to-b via-[#f7fffb] to-white p-4 py-10 flex flex-col items-center gap-8 justify-center'>
            {loading ? (
                <div className='flex flex-wrap gap-4'>
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div key={index} className='bg-white text-black  max-w-[20rem] w-[90vw] rounded-xl shadow-[0px_0px_5px_#808080] overflow-hidden'>
                            <Skeleton height={200} />
                            <div className='p-3'>
                                <Skeleton height={25} width={160} />
                                <div className='flex items-center justify-between my-2'>
                                    <Skeleton height={24} width={100} />
                                    <Skeleton height={24} width={60} />
                                </div>
                                <div className='flex items-center justify-between my-2'>
                                    <Skeleton height={24} width={100} />
                                    <Skeleton height={24} width={60} />
                                </div>
                                <div className='flex items-center justify-between my-2'>
                                    <Skeleton height={24} width={100} />
                                    <Skeleton height={24} width={60} />
                                </div>
                                <div className='flex items-center justify-between my-2'>
                                    <Skeleton height={24} width={100} />
                                    <Skeleton height={24} width={100} />
                                </div>
                                <div className='flex items-center justify-between pt-3 mt-3 border-t'>
                                    <Skeleton height={28} width={80} />
                                    <Skeleton height={40} width={120} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='flex flex-col w-full gap-20 p-4'>
                    <div className='flex flex-wrap items-center justify-start w-full gap-8'>

                        {
                            availableList.map((data, key) => (
                                <div key={key + 1} className='bg-white text-black max-w-[20rem] w-[90vw] hover:from-[#d0f7e6] transition-all duration-300 hover:bg-gradient-to-b hover:to-[#f7fffbf0] rounded-xl shadow-[0px_0px_5px_#808080] overflow-hidden'>
                                    <div className='p-3'>
                                        <h2 className='text-[1.3rem] text-orange-500 mb-4 text-center  font-semibold'>{state.pooja.name}</h2>
                                        <div className='flex items-center justify-between my-2'>
                                            <h1 className='flex items-center justify-center gap-2'><FaRegUserCircle />{data?.fullName}</h1>
                                            <h2>{data?.age} years</h2>
                                        </div>
                                        <div className='flex items-center justify-between my-2'>
                                            <h1 className='flex items-center justify-center gap-2'><GiSunPriest />Experience</h1>
                                            <h2>{data?.experience} years</h2>
                                        </div>
                                        <div className='flex items-center justify-between my-2'>
                                            <h1 className='flex items-center justify-center gap-2'><FaLocationDot />{data?.servicesData?.serviceArea}</h1>
                                        </div>
                                        <div className='flex items-center justify-between pt-3 mt-3 border-t'>

                                            <h3>
                                                <span className='text-[1.02rem] font-semibold text-[#19B56F]'>Rs.{data?.servicesData?.fare + Number(state.pooja.price)}</span>
                                            </h3>
                                            <button onClick={() => navigate(`/priest-book/${data?._id}`, { state: { state } })} className='border p-2 px-4 rounded-full border-[#19B56F] hover:bg-[#19B56F] transition-all duration-500 hover:text-white text-[#19B56F] font-semibold'>BOOK NOW</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                </div>
            )}
        </div>
    );
};

export default PriestList;
