import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { checkOutUpdate, getHotelOrders } from '../../Redux/Slices/OrderSlice';
import { FaArrowLeft, FaArrowRight, FaBowlFood, FaHotel, FaLocationDot, FaUser } from 'react-icons/fa6';
import { MdFilterList } from 'react-icons/md';
import OtpInput from 'react-otp-input';
import dayjs from 'dayjs';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { IoBed } from 'react-icons/io5';
import SocialCard from '../../Components/SocialCard';

const PastHotelOrders = () => {
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
    const hotelData = useSelector((state) => state?.order?.hotelOrderData) || [];

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



    const loadOrder = async () => {
        setLoading(true);
        await dispatch(getHotelOrders(id));
        setLoading(false);
    };



    console.log(hotelData[3])


    const handleVerify = async (orderId) => {
        const res = await dispatch(checkOutUpdate({ checkOutOTP: otpValues[orderId], id: orderId }));
        if (res?.payload?.success) {
            loadOrder();
        }
    };

    useEffect(() => {
        loadOrder();
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

    const filteredOrderData = getTimeFilteredData().slice().reverse().sort((a, b) => {
        if (a.status === 'Completed' && (b.status === 'Started' || b.status === 'Booked')) {
            return 1;
        }
        if ((a.status === 'Started' || a.status === 'Booked') && b.status === 'Completed') {
            return -1;
        }
        return 0;
    });

    if (loading) {
        return (
            <div className='relative flex flex-col min-h-[90vh] items-center py-4 text-black bg-white md:flex-row md:items-start'>
                <div className={`fixed top-0 left-0 w-[13rem] lg:w-[14rem] md:w-[10rem] mt-14 h-full shadow-xl bg-white p-4 md:flex md:flex-col ${showFilters ? 'block' : 'hidden'} md:block`}>
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
                        <h3 className='mb-2 font-medium'><Skeleton width={150} /></h3>
                        <div className='flex flex-col'>
                            <Skeleton count={5} height={20} />
                        </div>
                    </div>
                    <div className='w-full md:flex md:flex-col'>
                        <h3 className='mb-2 font-medium'><Skeleton width={150} /></h3>
                        <div className='flex flex-col'>
                            <Skeleton count={6} height={20} />
                        </div>
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
                    <div className='w-full'>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div key={index} className='flex gap-4 p-4 mb-4 bg-gray-100 rounded-md shadow-md'>
                                <Skeleton circle={true} height={80} width={80} />
                                <div className='flex flex-col flex-grow'>
                                    <Skeleton height={20} width='80%' />
                                    <Skeleton height={15} width='60%' className='mt-2' />
                                    <Skeleton height={15} width='40%' className='mt-2' />
                                    <Skeleton height={15} width='60%' className='mt-2' />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Hotel Bookings' },
    ];
    return (

        <>
            <div className='relative right-0 flex items-end justify-end w-full '>
                <div className='w-full md:w-custom lg:w-custom'>
                    <SocialCard item={breadcrumbItems} icon={""} title={"Hotel Bookings"} des={"Here is the full list of past bookings of hotels."} />


                </div>
            </div>
            <div className='from-[#e7eafd] bg-gradient-to-b via-[#f7f7fb] to-white p-4 py-10 flex flex-col items-center gap-8 justify-center text-black'>
                <div className={`fixed top-0 left-0 pt-20 w-[13rem] z-[10] lg:w-[11rem] md:w-[11rem]  h-full shadow-xl bg-white p-4 md:flex md:flex-col ${showFilters ? 'block' : 'hidden'} md:block`}>
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
                        {['All', 'Confirmed', 'Check-in', 'Check-out', 'Cancelled'].map(status => (
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
                    {(!filteredOrderData || filteredOrderData.length === 0) ? (
                        <div className="text-lg text-gray-500">No orders till now</div>
                    ) : (
                        filteredOrderData.map((room, index) => (
                            <div
                                key={room.id}
                                onClick={() => navigate(`/hotel-book-detail/${room._id}`)}
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

                                    {room?.status === 'CONFIRMED' && (

                                        <h3 className='py-[7px] text-center text-white bg-gradient-to-r w-full from-[#1751fe] via-[#0074f9] transition-all duration-300 to-[#0199ff] p-1'>Check-in OTP - {room?.checkInOTP}</h3>
                                    )}
                                    {room?.status === 'CHECK_IN' && (
                                        <div className='flex items-center p-2 mt-1' onClick={(e) => e.stopPropagation()}>
                                            <h3 className='flex items-center gap-2'>Check-out
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
                    )}
                </div>
            </div >
        </>
    );
};

export default PastHotelOrders;
