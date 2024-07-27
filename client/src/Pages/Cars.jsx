import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCarsList } from '../Redux/Slices/ServiceSlice';
import { FaRegUserCircle } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Cars = () => {
    const dispatch = useDispatch();
    const serviceList = useSelector((state) => state?.service?.carsData) || [];
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        await dispatch(getCarsList());
        setLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className='from-[#d0f7e6] bg-gradient-to-b to-[#f7fffb] p-4 py-10 flex flex-wrap items-start gap-8 justify-center'>
            {loading ? (
                Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className='bg-white text-black max-w-[20rem] w-[90vw] rounded-xl shadow-[0px_0px_5px_#808080] overflow-hidden'>
                        <Skeleton height={224} />
                        <div className='p-3'>
                            <Skeleton height={28} width={160} />
                            <div className='flex items-center justify-between my-2'>
                                <Skeleton height={24} width={100} />
                                <Skeleton height={24} width={60} />
                            </div>
                            <div className='flex items-center justify-between pt-3 mt-3 border-t'>
                                <Skeleton height={28} width={80} />
                                <Skeleton height={40} width={120} />
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                serviceList.map((data, key) => (
                    <div key={key + 1} className='bg-white text-black max-w-[20rem] w-[90vw] hover:from-[#d0f7e6] transition-all duration-300 hover:bg-gradient-to-b hover:to-[#f7fffb] rounded-xl shadow-[0px_0px_5px_#808080] overflow-hidden'>
                        <img src={data?.proofFiles[3]?.fileUrl} alt="" className='h-[14rem] w-full object-cover' />
                        <div className='p-3'>
                            <h2 className='text-[1.1rem] font-semibold'>{data?.carName}</h2>
                            <div className='flex items-center justify-between my-2'>
                                <h1 className='flex items-center justify-center gap-2'><FaRegUserCircle />{data?.fullName}</h1>
                                <h2>{data?.age} years</h2>
                            </div>
                            <div className='flex items-center justify-between pt-3 mt-3 border-t'>
                                <h3>
                                    <span className='text-[1.05rem] font-semibold text-[#19B56F]'>Rs.{data?.servicesData?.kmFare}</span> / Km
                                </h3>
                                <button className='border p-2 px-4 rounded-full border-[#19B56F] hover:bg-[#19B56F] transition-all duration-500 hover:text-white text-[#19B56F] font-semibold'>BOOK NOW</button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Cars;
