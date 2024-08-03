import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHotelList } from '../Redux/Slices/ServiceSlice';
import { FaHotel, FaSwimmingPool, FaWifi } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { MdOutlineFreeBreakfast } from 'react-icons/md';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Hotel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const hotelListData = useSelector((state) => state?.service?.hotelListData) || [];
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        await dispatch(getHotelList());
        setLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
    };

    return (
        <div className='bg-[#f0f0f0] w-full py-10 p-4 flex flex-col items-center gap-8 justify-center'>
            {loading ? (
                <div className='flex flex-wrap gap-4'>
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div key={index} className='bg-white text-black max-w-[20rem] w-[90vw] rounded-xl shadow-[0px_0px_5px_-3px_#808080] overflow-hidden'>
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
                                <div className='flex items-center justify-between pt-3 mt-3 border-t'>
                                    <Skeleton height={28} width={80} />
                                    <Skeleton height={40} width={120} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='flex flex-col w-full gap-20 p-0'>
                    <div className='flex flex-col items-center justify-center w-full gap-8'>
                        {hotelListData.map((data, key) => (
                            <div
                                key={key}
                                className='bg-white flex flex-col md:border-r-[6px] lg:hover:border-r-[0.5px] border-blue-500 sm:flex-row min-w-[19.5rem] text-black max-w-[20rem] sm:max-w-[45rem] md:max-w-[50rem] lg:max-w-[60rem] w-[90vw] hover:from-[#f3fbff] cursor-pointer transition-all duration-500 hover:bg-gradient-to-b hover:to-[#f8fafc] rounded-xl shadow-[0px_5px_10px_-6px_#808080] overflow-hidden'
                                onClick={() => navigate(`/hotel/${data._id}`)}
                            >
                                <div className='w-full sm:w-[19rem]'>
                                    <Slider {...settings}>
                                        {data?.proofFiles?.slice(0, 5).map((file, index) => (
                                            <img key={index} src={file.fileUrl} alt={`Proof ${index + 1}`} className='h-[11.5rem] sm:h-[13.5rem] w-full object-cover' />
                                        ))}
                                    </Slider>
                                </div>
                                <div className='flex flex-col justify-between px-3 pb-2 lg:gap-4 lg:flex-row'>
                                    <div className='lg:w-[27rem]'>
                                        <div className='flex items-center justify-between mt-3'>
                                            <h2 className='text-[1.2rem] lg:text-[1.45rem] font-semibold'>{data?.hotelName}</h2>
                                            <h2 className='flex items-center gap-1 '><FaHotel />{data?.servicesData?.roomType}</h2>
                                        </div>
                                        <div className='flex items-center justify-between mt-1'>
                                            <h1 className='flex text-[0.85rem] lg:text-[0.95rem] font-semibold items-center text-[#555555] justify-center gap-1'><FaLocationDot className='text-black' />{data?.address}</h1>
                                        </div>
                                        <div className='flex items-center justify-between my-1 '>
                                            <p className='text-[0.8rem] lg:text-[0.87rem] lg:line-clamp-5 line-clamp-3'>{data?.description}</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-between mt-1 border-t lg:py-4 lg:pl-4 lg:border-t-0 lg:border-l lg:ml-6 lg:w-fit lg:flex-col'>
                                        <div className='flex flex-col items-start'>
                                            <div className='flex items-center mr-4 justify-center gap-1 text-[0.8rem] text-[#808080] font-semibold'>
                                                <FaWifi className='text-green-500' />
                                                Wifi
                                            </div>
                                            <div className='flex items-center justify-center gap-1 text-[0.8rem] text-[#808080] font-semibold'>
                                                <FaSwimmingPool className='text-blue-500' />
                                                <p>Swimming Pool</p>
                                            </div>
                                            <div className='flex items-center justify-center gap-1 text-[0.8rem] text-[#808080] font-semibold'>
                                                <MdOutlineFreeBreakfast className='text-red-500' />
                                                <p>Free breakfast</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col items-center justify-center  relative top-[-6px]'>
                                            <p className='text-[0.7rem] flex flex-col top-3 items-center font-semibold text-[#505050] relative'>&#8377;15000
                                                <p className='h-[1.15px] w-[2.4rem] rotate-[-8deg] absolute top-2 bg-red-600'></p>

                                            </p>
                                            <span className='text-[1.2rem] relative top-2 font-semibold text-[#19B56F]'>&#8377; 1500</span>
                                            <p> <span className='text-[1rem] text-[#515151] font-semibold'>Per night</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Hotel;
