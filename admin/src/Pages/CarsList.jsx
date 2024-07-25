import React, { useEffect, useState } from 'react';
import HomeLayout from '../Layouts/HomeLayouts';
import { useDispatch, useSelector } from 'react-redux';
import { getDriverList, updateDriverStatus } from '../Redux/Slices/ListSlice';
import CarsListCard from '../Components/Cards/CarsListCard';
import { FaEye } from 'react-icons/fa';

const CarsList = () => {
    const dispatch = useDispatch();
    const list = useSelector((state) => state?.list?.driverList);
    const [statusUpdated, setStatusUpdated] = useState(false);

    const loadData = () => {
        dispatch(getDriverList());
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (statusUpdated) {
            loadData();
            setStatusUpdated(false); // Reset the flag
        }
    }, [statusUpdated]);

    const handleStatusChange = (id, status) => {
        dispatch(updateDriverStatus({ id: id, status: status }))
            .unwrap()
            .then(() => setStatusUpdated(true)); // Trigger data reload
    };

    return (
        <HomeLayout>
            <div className='mt-2 overflow-x-scroll border border-red-500 md:w-custom'>
                <div className='flex flex-col items-center justify-center gap-[2.5px] min-w-[46.5rem]'>
                    <div className='flex items-center justify-between w-full gap-3 bg-[#353a51] rounded-t text-white px-3 py-4 lg:px-6 font-semibold mb-[0.5px]'>
                        <p className='min-w-[3rem] text-center'>S.no</p>
                        <div className='min-w-[14.5rem] lg:min-w-[17rem] line-clamp-1'>
                            <p>Name</p>
                        </div>
                        <div className='min-w-[14.5rem] lg:min-w-[17rem] truncate line-clamp-1'>
                            <p>Email</p>
                        </div>
                        <p className='min-w-[6.8rem] text-center'>Status</p>
                        <p className='min-w-[3.3rem] text-center'>Action</p>
                    </div>
                    {list.map((data, index) => (
                        <div key={data?._id} className='flex items-center justify-between w-full gap-3 px-3 py-3 text-black bg-white'>
                            <p className='min-w-[3rem] text-center'>{index + 1}.</p>
                            <div className='min-w-[14.5rem] lg:min-w-[17rem] line-clamp-1'>
                                <p>{data?.fullName}</p>
                            </div>
                            <div className='min-w-[14.5rem] lg:min-w-[17rem] truncate line-clamp-1'>
                                <p>{data?.email}</p>
                            </div>
                            <div className='flex items-center gap-2 min-w-[6.8rem]'>
                                <div className='flex items-center justify-center gap-[0.1rem]'>
                                    <label htmlFor='' className='font-semibold text-yellow-500'>P:</label>
                                    <input
                                        type='radio'
                                        name={`status${index}`}
                                        checked={data?.status === 'PENDING'}
                                        onChange={() => handleStatusChange(data?._id, 'PENDING')}
                                        value='PENDING'
                                        className='size-[15px] accent-yellow-400'
                                    />
                                </div>
                                <div className='flex items-center justify-center gap-[0.1rem]'>
                                    <label htmlFor='' className='font-semibold text-green-600'>A:</label>
                                    <input
                                        type='radio'
                                        name={`status${index}`}
                                        checked={data?.status === 'ACCEPTED'}
                                        onChange={() => handleStatusChange(data?._id, 'ACCEPTED')}
                                        value='ACCEPTED'
                                        className='size-[15px] accent-green-400'
                                    />
                                </div>
                                <div className='flex items-center justify-center gap-[0.1rem]'>
                                    <label htmlFor='' className='font-semibold text-red-500'>R:</label>
                                    <input
                                        type='radio'
                                        name={`status${index}`}
                                        checked={data?.status === 'REJECTED'}
                                        onChange={() => handleStatusChange(data?._id, 'REJECTED')}
                                        value='REJECTED'
                                        className='size-[15px] accent-red-500'
                                    />
                                </div>
                            </div>
                            <div className='min-w-[3.3rem] flex items-center justify-center'>
                                <FaEye className='text-[1.45rem] cursor-pointer' />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </HomeLayout>
    );
};

export default CarsList;
