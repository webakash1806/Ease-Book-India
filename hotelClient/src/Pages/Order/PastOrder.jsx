import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrders, updateStatus } from '../../Redux/Slices/OrderSlice';
import OtpInput from 'react-otp-input';
import { FaArrowRight, FaBowlFood, FaHotel, FaLocationDot, FaUser } from 'react-icons/fa6';
import { IoBed } from 'react-icons/io5';

import { MdCall, MdFilterList } from 'react-icons/md';
import dayjs from 'dayjs';
import guiderIcon from "../../assets/guiderIcon.png"


const SkeletonLoader = () => {
    return (
        <div className='flex flex-wrap justify-center gap-4'>
            {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className='flex cursor-pointer rounded-sm sm:justify-between sm:min-w-[38rem] sm:flex-row shadow-[0px_0px_5px_#808080] overflow-hidden flex-col items-start sm:w-[65vw] w-[90vw] md:w-[63vw] lg:w-[58vw] xl:w-[50rem] min-w-[19.7rem]'>
                    <div className='flex items-center gap-2 p-4 md:gap-3 lg:gap-4'>
                        <div className='w-[8.3rem] h-[6.4rem] lg:w-[9rem] bg-gray-300 animate-pulse'></div>
                        <div className='text-[0.9rem] font-semibold'>
                            <div className='h-4 mb-2 bg-gray-300 animate-pulse'></div>
                            <div className='h-4 mb-2 bg-gray-300 animate-pulse'></div>
                            <div className='h-4 mb-2 bg-gray-300 animate-pulse'></div>
                        </div>
                    </div>
                    <div className='w-full text-[0.95rem] sm:w-[17.5rem] md:w-[18.5rem] xl:w-[23rem] sm:pr-2'>
                        <div className='flex items-center justify-between w-full p-1 border-t'>
                            <div className='h-4 bg-gray-300 animate-pulse w-[40%]'></div>
                            <div className='h-4 bg-gray-300 animate-pulse w-[10%]'></div>
                            <div className='h-4 bg-gray-300 animate-pulse w-[40%]'></div>
                        </div>
                        <div className='flex items-center justify-between w-full p-1 border-t'>
                            <div className='h-4 bg-gray-300 animate-pulse w-[40%]'></div>
                            <div className='h-4 bg-gray-300 animate-pulse w-[20%]'></div>
                        </div>
                        <div className='flex items-center justify-between w-full p-1 border-t'>
                            <div className='h-4 bg-gray-300 animate-pulse w-[50%]'></div>
                            <div className='h-4 bg-gray-300 animate-pulse w-[40%]'></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const PastOrder = () => {
    const [otpValues, setOtpValues] = useState({});
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterTime, setFilterTime] = useState('All');
    const [showFilters, setShowFilters] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentRoomIndex, setCurrentRoomIndex] = useState(null);
    const [hotelMainImage, setHotelMainImage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();


    const loadData = async () => {
        setLoading(true);
        await dispatch(getOrders(id));
        setLoading(false);
    };

    const hotelData = useSelector((state) => state?.order?.orderData) || [];

    console.log(hotelData)

    useEffect(() => {
        hotelData.forEach((room) => {
            setHotelMainImage(room.roomData?.roomImage[0].fileUrl);
        });

    }, [hotelData]);


    const handleRoomImage = (url, index) => {
        setHotelMainImage(url);
        setCurrentRoomIndex(index);
    };

    console.log(hotelData[3]?.checkInOTP)


    const handleVerify = async (orderId) => {
        const res = await dispatch(updateStatus({ checkInOTP: otpValues[orderId], id: orderId }));
        if (res?.payload?.success) {
            loadData();
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleOtpChange = (otp, orderId) => {
        setOtpValues(prevState => ({
            ...prevState,
            [orderId]: otp
        }));
    };

    const getTimeFilteredData = () => {
        const now = dayjs();
        let filteredData = hotelData;

        switch (filterTime) {
            case 'Last Week':
                filteredData = hotelData.filter(order => dayjs(order.orderDate).isAfter(now.subtract(1, 'week')));
                break;
            case 'Last Month':
                filteredData = hotelData.filter(order => dayjs(order.orderDate).isAfter(now.subtract(1, 'month')));
                break;
            case 'Last 3 Months':
                filteredData = hotelData.filter(order => dayjs(order.orderDate).isAfter(now.subtract(3, 'month')));
                break;
            case 'Last 6 Months':
                filteredData = hotelData.filter(order => dayjs(order.orderDate).isAfter(now.subtract(6, 'month')));
                break;
            case 'Last Year':
                filteredData = hotelData.filter(order => dayjs(order.orderDate).isAfter(now.subtract(1, 'year')));
                break;
            default:
                filteredData = hotelData;
        }

        if (filterStatus !== 'All') {
            filteredData = filteredData.filter(order => order.status === filterStatus);
        }

        return filteredData;
    };

    const filteredOrderData = getTimeFilteredData().slice().reverse();

    return (
        <div className='relative flex flex-col min-h-[90vh] items-center py-4 text-black bg-[#efefef] md:flex-row md:items-start'>
            <div className={`fixed top-0 left-0 w-[13rem] pt-20 h-full shadow-xl bg-white p-4 md:flex md:flex-col ${showFilters ? 'block' : 'hidden'} md:block`}>
                <div className='md:hidden'>
                    <button
                        className="flex items-center gap-2 px-2 py-1 mb-4 bg-white border border-gray-300 rounded"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <MdFilterList />
                        <span className="font-medium">Close Filters</span>
                    </button>
                </div>
                <div className='w-full md:flex md:flex-col'>
                    <h3 className='mb-2 font-medium'>Filter by Status</h3>
                    {['All', 'On the way', 'Picked up', 'Dropped', 'Cancelled'].map(status => (
                        <label key={status} className='flex items-center mb-2'>
                            <input
                                type='checkbox'
                                checked={filterStatus === status}
                                onChange={() => setFilterStatus(status)}
                                className='mr-2'
                            />
                            {status}
                        </label>
                    ))}
                </div>
                <div className='w-full md:flex md:flex-col'>
                    <h3 className='mb-2 font-medium'>Filter by Time</h3>
                    {['All', 'Last Week', 'Last Month', 'Last 3 Months', 'Last 6 Months', 'Last Year'].map(time => (
                        <label key={time} className='flex items-center mb-2'>
                            <input
                                type='checkbox'
                                checked={filterTime === time}
                                onChange={() => setFilterTime(time)}
                                className='mr-2'
                            />
                            {time}
                        </label>
                    ))}
                </div>
            </div>
            <div className='flex flex-col items-center w-full gap-6 px-4 md:w-3/4 md:ml-auto md:px-6'>
                <div className='flex justify-between w-full mb-4 md:hidden'>
                    <button
                        className="flex items-center gap-2 px-2 py-1 bg-white border border-gray-300 rounded"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <MdFilterList />
                        <span className="font-medium">Filters</span>
                    </button>
                </div>
                {loading ? (
                    <SkeletonLoader />
                ) : filteredOrderData && filteredOrderData.length > 0 ? (
                    filteredOrderData.map((room, index) => (
                        <div
                            key={room.id}
                            onClick={() => navigate(`/book-detail/${room._id}`)}
                            className='bg-white mb-2 flex flex-col md:border-r-[6px] lg:hover:border-r-[0.5px] pb-0 border-blue-500 min-w-[19.5rem] text-black max-w-[20rem] sm:max-w-[37rem] md:max-w-[35rem] lg:max-w-[48rem] w-[90vw] hover:from-[#f3fbff] cursor-pointer transition-all duration-500 hover:bg-gradient-to-b hover:to-[#f8fafc] rounded-xl shadow-[0px_5px_10px_-6px_#808080] overflow-hidden'
                        >
                            <div className='flex flex-col sm:flex-row'>
                                <div className="w-full sm:max-w-[19rem] md:max-w-[18rem] lg:max-w-[19rem]">
                                    <img
                                        src={currentRoomIndex === index ? hotelMainImage : room.roomData.roomImage[0].fileUrl}
                                        alt="Hotel Main"
                                        className="h-[12rem] w-full object-cover transition-all duration-500 animate-fadeIn"
                                    />
                                    <div className="flex justify-between bg-[#eeeeef] p-2">
                                        {room.roomData.roomImage.slice(0, 4).map((file, imgIndex) => (
                                            <img
                                                key={imgIndex}
                                                src={file.fileUrl}
                                                alt={`Hotel Proof ${imgIndex + 1}`}
                                                className={`h-[3rem] w-[23%] rounded object-cover cursor-pointer transition-all duration-300 ${hotelMainImage === file.fileUrl && currentRoomIndex === index
                                                    ? 'border-2 border-blue-500 shadow-lg transform scale-105'
                                                    : ''
                                                    }`}
                                                onClick={() => handleRoomImage(file.fileUrl, index)}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className='flex flex-col justify-between px-3 pb-2 lg:gap-4 lg:flex-row'>
                                    <div className='lg:w-[19rem]'>

                                        <div className='flex items-center justify-between mt-3'>

                                            <h2 className='flex text-[1.2rem] items-center gap-2 font-semibold '><FaHotel />{room?.hotelData?.hotelName}</h2>
                                        </div>
                                        <h2 className='flex text-[0.8rem] text-[#515151]  items-center gap-2 font-semibold '>{room?.roomData?.roomType}</h2>
                                        <div className='flex items-center justify-between mt-1'>
                                            <h1 className='flex text-[0.85rem] lg:text-[0.95rem] font-semibold items-center text-[#555555] justify-center gap-1'><FaLocationDot className='text-black' />{room?.hotelData?.address}</h1>
                                        </div>

                                        <div className='flex flex-col items-start gap-[2px] my-1 mt-2 ml-2 sm:flex-wrap lg:flex-col'>
                                            <div className='flex items-start justify-center gap-4'>
                                                <div className='flex items-center justify-center gap-1  text-[#444444] text-[0.9rem] font-semibold'>
                                                    <IoBed className='text-black-500 text-[1.2rem]' />
                                                    {room?.roomData?.roomType === "PREMIUM_DELUXE" ? "Maharaja Bed" :
                                                        room?.roomType === "SINGLE" ? "Single Bed" : "Double Bed"}
                                                </div>
                                                <div className='flex items-center justify-center gap-1  text-[#444444] text-[0.9rem] font-semibold'>
                                                    <FaUser className='mx-[2.5px] text-black-500' />
                                                    {Number(room?.adults) + Number(room?.children)} Guest
                                                </div>
                                            </div>
                                            {room.roomData.courtyardView &&
                                                <div className='flex items-center justify-center gap-1  text-[#444444] text-[0.9rem] font-semibold'>
                                                    <img src="https://gos3.ibcdn.com/roomViewIcon-1678093525.png" className='w-[1rem] mx-[2px]' alt="" />
                                                    Courtyard View
                                                </div>}

                                            {room?.food &&
                                                <div className='flex items-center justify-center gap-1  text-[#444444] text-[0.9rem] font-semibold'>
                                                    <FaBowlFood className=' text-[1.1rem] text-black-500' />
                                                    {room?.food}
                                                </div>}
                                            <div className='flex gap-6 text-[0.9rem] font-semibold text-[#555555]'>
                                                <p>{room?.checkIn}</p>-
                                                <p>{room?.checkOut}</p>
                                            </div>
                                        </div>




                                    </div>
                                    <div className='flex items-center justify-between mt-1 w-full border-t lg:py-4 lg:pl-2 lg:border-t-0 lg:border-l lg:ml-2 lg:flex-col lg:w-[8rem]'>

                                        <div className='flex flex-col items-center justify-center text-[0.9rem] font-semibold text-[#777777]'>
                                            <div>{room?.totalRoom} Room</div>
                                            <div>{room?.status}</div>
                                        </div>

                                        <div className='flex flex-col items-center justify-center relative top-[-6px]'>
                                            <p className='text-[0.7rem] flex flex-col top-3 items-center font-semibold text-[#505050] relative'>&#8377;{room?.priceBeforeDis}
                                                <p className='h-[1.15px] w-[2.4rem] rotate-[-8deg] absolute top-2 bg-red-600'></p>
                                            </p>
                                            <span className='text-[1.2rem] relative top-2 font-semibold text-[#19B56F]'>&#8377; {room?.totalAmt}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex  items-center justify-center bg-[#f1f2ff] font-semibold'>

                                {room?.status === "CHECK_OUT" &&
                                    <p className='py-[9px] text-center text-white bg-gradient-to-r w-full from-[#1751fe] via-[#0074f9] transition-all duration-300 to-[#0199ff]'>COMPLETED</p>

                                }

                                {room?.status === "CANCELLED" &&
                                    <p className='py-[9px] text-center text-white bg-gradient-to-r w-full from-[#1751fe] via-[#0074f9] transition-all duration-300 to-[#0199ff]'>Booking Cancelled</p>}

                                {room?.status === 'CHECK_IN' && (

                                    <h3 className='py-[7px] text-center text-white bg-gradient-to-r w-full from-[#1751fe] via-[#0074f9] transition-all duration-300 to-[#0199ff] p-1'>Check-out OTP - {room?.checkOutOTP}</h3>
                                )}
                                {room?.status === 'CONFIRMED' && (
                                    <div className='flex items-center p-2 mt-1' onClick={(e) => e.stopPropagation()}>
                                        <h3 className='flex items-center gap-2'>Check-in
                                            <OtpInput
                                                value={otpValues[room?._id] || ''}
                                                onChange={(otp) => handleOtpChange(otp, room?._id)}
                                                numInputs={4}
                                                renderSeparator={<span>-</span>}
                                                renderInput={(props) => (
                                                    <input
                                                        {...props}
                                                        style={{
                                                            width: '1.9rem',
                                                            height: '1.9rem',
                                                            margin: '0 0.1rem',
                                                            fontSize: '1rem',
                                                            borderRadius: '4px',
                                                            border: '1px solid #ccc',
                                                            textAlign: 'center',
                                                            backgroundColor: 'white',
                                                            color: 'black',
                                                        }}
                                                    />
                                                )}
                                            />
                                        </h3>
                                        <div className='size-[1.9rem] ml-2 flex items-center rounded justify-center bg-blue-500 cursor-pointer text-white' onClick={() => handleVerify(room?._id)}><FaArrowRight /></div>
                                    </div>
                                )}

                            </div>

                        </div>
                    ))
                ) : (
                    <div>No orders found.</div>
                )}
            </div>
        </div>
    );
}

export default PastOrder;
