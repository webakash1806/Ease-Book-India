import React, { useEffect, useState } from 'react';
import HomeLayout from '../../Layouts/HomeLayouts';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDriverDetail, updateDriverStatus } from '../../Redux/Slices/ListSlice';
import { toast } from 'react-toastify';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CarDetail = () => {
    const [loaderActive, setLoaderActive] = useState(false);
    const [viewingImage, setViewingImage] = useState(null);
    const [statusUpdated, setStatusUpdated] = useState(false);

    const driverData = useSelector((state) => state?.list?.driverDetail);
    const dispatch = useDispatch();
    const { id } = useParams();

    const loadData = () => {
        setLoaderActive(true);
        dispatch(getDriverDetail(id)).finally(() => setLoaderActive(false));
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (statusUpdated) {
            loadData();
            setStatusUpdated(false);
        }
    }, [statusUpdated]);

    const handleStatusChange = async (id, status) => {
        const res = await dispatch(updateDriverStatus({ id, status }))
            .unwrap()
            .then(() => {
                setStatusUpdated(true);
                return toast.success("Status updated!");
            });

        console.log(res);
    };

    const mainDiv = 'flex flex-col gap-[0.5px]';
    const labelStyle = "text-[0.83rem] tracking-wide text-[#CFCCE4] font-[400] ml-[0.5px]";
    const inputStyle = 'border border-[#685ED4] w-full rounded-[3px] h-full px-2 p-[7px] outline-none text-[0.95rem] tracking-wide resize-none bg-[#3D4056] text-white';

    const renderImageButton = (label, fileUrl, key) => (
        <div className='flex flex-col gap-1' key={key}>
            <button
                type="button"
                className='bg-[#685ED4] hover:bg-[#FF4C51] text-white flex items-center justify-center transition-all duration-700 w-full rounded-md p-[6.9px] font-semibold'
                onClick={() => setViewingImage(fileUrl)}
            >
                View {label}
            </button>
        </div>
    );

    const vehicleImageFile = driverData?.proofFiles?.find(file => file.fileName === 'vehicleImage');
    const otherFiles = driverData?.proofFiles?.filter(file => file.fileName !== 'vehicleImage') || [];

    return (
        <HomeLayout>
            {loaderActive ? (
                <SkeletonTheme baseColor="#2F3349" highlightColor="#3D4056">
                    <div className='flex items-center justify-center'>
                        <form className='p-6 bg-[#2F3349] text-white relative rounded-md shadow-[0px_0px_20px_#3D4056] overflow-hidden my-12 flex flex-col lg:flex-row gap-4 w-fit max-w-[100%] md:max-w-[80%] lg:max-w-[100%]'>
                            <div className='w-full flex flex-col gap-2'>
                                <div className='mb-4'>
                                    <h2 className='text-[1.8rem] font-semibold tracking-wide'>
                                        <Skeleton width={200} />
                                    </h2>
                                    <div className='flex items-center mt-2'>
                                        <Skeleton width={12} height={5} className='mr-1 rounded-full' />
                                        <Skeleton width={12} height={5} className='mr-1 rounded-full' />
                                        <Skeleton width={5} height={5} className='rounded-full' />
                                    </div>
                                </div>
                                <div className={mainDiv}>
                                    <Skeleton height={30} />
                                </div>
                                <div className={mainDiv}>
                                    <Skeleton height={30} />
                                </div>
                                <div className={mainDiv}>
                                    <Skeleton height={30} />
                                </div>
                                <div className='flex justify-between gap-2'>
                                    <div className={`${mainDiv} w-[48%]`}>
                                        <Skeleton height={30} />
                                    </div>
                                    <div className={`${mainDiv} w-[48%]`}>
                                        <Skeleton height={30} />
                                    </div>
                                </div>
                            </div>
                            <div className='w-full flex flex-col gap-2 lg:mt-[5rem]'>
                                <div className='flex justify-between gap-2'>
                                    <div className={`${mainDiv} w-[48%]`}>
                                        <Skeleton height={30} />
                                    </div>
                                    <div className={`${mainDiv} w-[48%]`}>
                                        <Skeleton height={30} />
                                    </div>
                                </div>
                                <div className='w-full flex flex-col mt-1'>
                                    <Skeleton height={50} />
                                    <div className='grid grid-cols-2 gap-2'>
                                        <Skeleton height={50} count={2} />
                                    </div>
                                </div>
                                <div className='flex items-center gap-4 min-w-[6.8rem] justify-center bg-white shadow-[0px_0px_12px_#808080_inset] mt-1 p-2 rounded text-black'>
                                    <Skeleton height={30} width={100} />
                                </div>
                            </div>
                        </form>
                    </div>
                </SkeletonTheme>
            ) : (
                <div className='flex items-center justify-center'>
                    <form className='p-6 bg-[#2F3349] text-white relative rounded-md shadow-[0px_0px_20px_#3D4056] overflow-hidden my-12 flex flex-col lg:flex-row gap-4 w-fit max-w-[100%] md:max-w-[80%] lg:max-w-[100%]'>
                        <div className='absolute flex items-center justify-center bg-[#685ED4] rounded-full animate-ping right-[-6px] size-8 top-[-6px]'>
                            <div className='bg-[#FF4C51] rounded-full size-4 flex items-center justify-center'>
                                <div className='size-2 bg-[#2F3349] rounded-full'></div>
                            </div>
                        </div>
                        <div className='w-full flex flex-col gap-2'>
                            <div className='mb-4'>
                                <h2 className='text-[1.8rem] font-semibold tracking-wide'>Driver detail</h2>
                                <div className='flex items-center mt-2'>
                                    <div className='bg-[#685ED4] w-12 h-[5px] rounded-full mr-1'></div>
                                    <div className='bg-[#685ED4] w-[12px] h-[5px] rounded-full mr-1'></div>
                                    <div className='bg-[#FF4C51] w-[5px] h-[5px] rounded-full'></div>
                                </div>
                            </div>
                            <div className={mainDiv}>
                                <label className={labelStyle} htmlFor="fullName">Full Name</label>
                                <input readOnly className={inputStyle} name='fullName' value={driverData?.fullName || ''} id='fullName' type="text" />
                            </div>
                            <div className={mainDiv}>
                                <label className={labelStyle} htmlFor="email">Email</label>
                                <input readOnly className={inputStyle} type="email" name='email' value={driverData?.email || ''} id='email' />
                            </div>
                            <div className={mainDiv}>
                                <label className={labelStyle} htmlFor="carName">Car Name</label>
                                <input readOnly className={inputStyle} type="text" name='carName' value={driverData?.carName || ''} id='carName' />
                            </div>
                            <div className='flex justify-between gap-2'>
                                <div className={`${mainDiv} w-[48%]`}>
                                    <label className={labelStyle} htmlFor="carNumber">Car Number</label>
                                    <input readOnly className={inputStyle} type="text" name='carNumber' value={driverData?.carNumber || ''} id='carNumber' />
                                </div>
                                <div className={`${mainDiv} w-[48%]`}>
                                    <label className={labelStyle} htmlFor="phoneNumber">Phone Number</label>
                                    <input readOnly className={inputStyle} type="number" name='phoneNumber' value={driverData?.phoneNumber || ''} id='phoneNumber' />
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex flex-col gap-2 lg:mt-[5rem]'>
                            <div className='flex justify-between gap-2'>
                                <div className={`${mainDiv} w-[48%]`}>
                                    <label className={labelStyle} htmlFor="age">Age</label>
                                    <input readOnly className={inputStyle} type="number" name='age' value={driverData?.age || ''} id='age' />
                                </div>
                                <div className={`${mainDiv} w-[48%]`}>
                                    <label className={labelStyle} htmlFor="experience">Experience</label>
                                    <input readOnly className={inputStyle} type="number" name='experience' value={driverData?.experience || ''} id='experience' />
                                </div>
                            </div>
                            <div className='w-full flex flex-col mt-1'>
                                {vehicleImageFile && (
                                    <div className='w-full mb-2'>
                                        {renderImageButton('Vehicle Image', vehicleImageFile.fileUrl, 'vehicleImage')}
                                    </div>
                                )}
                                <div className='grid grid-cols-2 gap-2'>
                                    {otherFiles.map((file, index) => renderImageButton(file.fileName, file.fileUrl, index))}
                                </div>
                            </div>
                            <div className='flex items-center gap-4 min-w-[6.8rem] justify-center bg-white shadow-[0px_0px_12px_#808080_inset] mt-1 p-2 rounded text-black'>
                                <label htmlFor="" className='font-semibold'>Status:</label>
                                <div className='flex items-center justify-center gap-[0.1rem]'>
                                    <label htmlFor='' className='font-semibold text-yellow-600'>P:</label>
                                    <input
                                        type='radio'
                                        name={`status`}
                                        checked={driverData?.status === 'PENDING'}
                                        onChange={() => handleStatusChange(driverData?._id, 'PENDING')}
                                        value='PENDING'
                                        className='size-[15px] accent-yellow-400'
                                    />
                                </div>
                                <div className='flex items-center justify-center gap-[0.1rem]'>
                                    <label htmlFor='' className='font-semibold text-green-600'>A:</label>
                                    <input
                                        type='radio'
                                        name={`status`}
                                        checked={driverData?.status === 'ACCEPTED'}
                                        onChange={() => handleStatusChange(driverData?._id, 'ACCEPTED')}
                                        value='ACCEPTED'
                                        className='size-[15px] accent-green-400'
                                    />
                                </div>
                                <div className='flex items-center justify-center gap-[0.1rem]'>
                                    <label htmlFor='' className='font-semibold text-red-500'>R:</label>
                                    <input
                                        type='radio'
                                        name={`status`}
                                        checked={driverData?.status === 'REJECTED'}
                                        onChange={() => handleStatusChange(driverData?._id, 'REJECTED')}
                                        value='REJECTED'
                                        className='size-[15px] accent-red-400'
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                    {viewingImage && (
                        <div className='fixed inset-0 z-[10000000000] flex items-center justify-center bg-black bg-opacity-75'>
                            <div className='relative'>
                                <button
                                    className='absolute top-0 right-0 text-white bg-red-500 rounded p-1 px-4'
                                    onClick={() => setViewingImage(null)}
                                >
                                    ✕
                                </button>
                                <img src={viewingImage} alt="Proof Document" className='max-w-full rounded max-h-[85vh]' />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </HomeLayout>
    );
};

export default CarDetail;
