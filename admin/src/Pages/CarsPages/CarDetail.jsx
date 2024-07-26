import React, { useState } from 'react';
import HomeLayout from '../../Layouts/HomeLayouts';
import { useLocation } from 'react-router-dom';

const CarDetail = () => {
    const [loaderActive, setLoaderActive] = useState(false);
    const [viewingImage, setViewingImage] = useState(null);
    const { state } = useLocation();
    const { fullName, email, phoneNumber, proofFiles, carName, carNumber, age, experience } = state;

    const mainDiv = 'flex flex-col gap-[0.1px]';
    const labelStyle = "text-[0.83rem] tracking-wide text-[#CFCCE4] font-[400] ml-[0.5px]";
    const inputStyle = 'border border-[#685ED4] w-full rounded-[3px] h-full px-2 p-[5.5px] outline-none text-[0.95rem] tracking-wide resize-none bg-[#3D4056] text-white';

    const renderImageButton = (label, fileUrl, key) => (
        <div className={'grid grid-cols-2 gap-4'} key={key}>
            <button
                type="button"
                className='bg-[#685ED4] hover:bg-[#FF4C51] text-white flex items-center justify-center transition-all duration-700 w-full rounded-md p-[6.9px] font-semibold'
                onClick={() => setViewingImage(fileUrl)}
            >
                View {label}
            </button>
        </div>
    );

    return (
        <HomeLayout>
            <div className='flex items-center justify-center'>
                <form className='p-6 bg-[#2F3349] text-white rounded-md shadow-[0px_0px_20px_#3D4056] my-12 flex flex-col lg:flex-row gap-4 w-fit max-w-[100%] md:max-w-[80%] lg:max-w-[100%]'>
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
                            <input readOnly className={inputStyle} name='fullName' value={fullName} id='fullName' type="text" />
                        </div>
                        <div className={mainDiv}>
                            <label className={labelStyle} htmlFor="email">Email</label>
                            <input readOnly className={inputStyle} type="email" name='email' value={email} id='email' />
                        </div>
                        <div className={mainDiv}>
                            <label className={labelStyle} htmlFor="phoneNumber">Phone Number</label>
                            <input readOnly className={inputStyle} type="number" name='phoneNumber' value={phoneNumber} id='phoneNumber' />
                        </div>
                        <div className={mainDiv}>
                            <label className={labelStyle} htmlFor="carName">Car Name</label>
                            <input readOnly className={inputStyle} type="text" name='carName' value={carName} id='carName' />
                        </div>
                        <div className={mainDiv}>
                            <label className={labelStyle} htmlFor="carNumber">Car Number</label>
                            <input readOnly className={inputStyle} type="text" name='carNumber' value={carNumber} id='carNumber' />
                        </div>
                    </div>
                    <div className='w-full flex flex-col gap-2 mt-2'>
                        <div className='flex justify-between gap-2'>
                            <div className={`${mainDiv} w-[48%]`}>
                                <label className={labelStyle} htmlFor="age">Age</label>
                                <input readOnly className={inputStyle} type="number" name='age' value={age} id='age' />
                            </div>
                            <div className={`${mainDiv} w-[48%]`}>
                                <label className={labelStyle} htmlFor="experience">Experience</label>
                                <input readOnly className={inputStyle} type="number" name='experience' value={experience} id='experience' />
                            </div>
                        </div>
                        {proofFiles.map((file, index) => renderImageButton(file.fileName, file.fileUrl, index))}
                        <button
                            onClick={() => setLoaderActive(true)}
                            type="button"
                            className='bg-[#685ED4] hover:bg-[#FF4C51] text-white flex items-center justify-center transition-all duration-700 w-full rounded-md p-[6.9px] font-semibold mt-[12px] mb-1'
                        >
                            Sign Up
                            {loaderActive && <div className='ml-4 ease-in-out mt-1 size-[1.25rem] border-[2.4px] border-t-[#46454546] animate-spin rounded-full'></div>}
                        </button>
                    </div>
                </form>
                {viewingImage && (
                    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-75'>
                        <div className='relative'>
                            <button
                                className='absolute top-0 right-0  text-white bg-red-500 rounded p-1 px-4'
                                onClick={() => setViewingImage(null)}
                            >
                                ✕
                            </button>
                            <img src={viewingImage} alt="Proof Document" className='max-w-full rounded max-h-[85vh]' />
                        </div>
                    </div>
                )}
            </div>
        </HomeLayout>
    );
};

export default CarDetail;
