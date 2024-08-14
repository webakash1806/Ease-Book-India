import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getPriestOrders, poojaFinishUpdate, updateDrop } from '../../Redux/Slices/OrderSlice';
import { FaArrowLeft, FaArrowRight, FaLocationDot } from 'react-icons/fa6';
import { MdCall, MdFilterList } from 'react-icons/md';
import OtpInput from 'react-otp-input';
import dayjs from 'dayjs';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { GiSunPriest } from "react-icons/gi";
import SocialCard from '../../Components/SocialCard';

const PastPriestOrders = () => {
    const [otpValues, setOtpValues] = useState({});
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterTime, setFilterTime] = useState('All');
    const [showFilters, setShowFilters] = useState(false);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const orderData = useSelector((state) => state?.order?.priestOrderData) || [];

    const loadOrder = async () => {
        setLoading(true);
        await dispatch(getPriestOrders(id));
        setLoading(false);
    };

    const handleVerify = async (orderId) => {
        const res = await dispatch(poojaFinishUpdate({ dropOTP: otpValues[orderId], id: orderId }));
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
        let filteredData = orderData;

        switch (filterTime) {
            case 'Last Week':
                filteredData = orderData.filter(order => dayjs(order.orderDate).isAfter(now.subtract(1, 'week')));
                break;
            case 'Last Month':
                filteredData = orderData.filter(order => dayjs(order.orderDate).isAfter(now.subtract(1, 'month')));
                break;
            case 'Last 3 Months':
                filteredData = orderData.filter(order => dayjs(order.orderDate).isAfter(now.subtract(3, 'month')));
                break;
            case 'Last 6 Months':
                filteredData = orderData.filter(order => dayjs(order.orderDate).isAfter(now.subtract(6, 'month')));
                break;
            case 'Last Year':
                filteredData = orderData.filter(order => dayjs(order.orderDate).isAfter(now.subtract(1, 'year')));
                break;
            default:
                filteredData = orderData;
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
        { label: 'Pooja Bookings' },
    ];
    return (

        <>
            <div className='relative right-0 flex items-end justify-end w-full '>
                <div className='w-full md:w-custom lg:w-custom'>
                    <SocialCard item={breadcrumbItems} icon={"priest"} title={"Priest Bookings"} des={"Here is the full list of past bookings of priest."} />

                    <div onClick={() => navigate(-1)} className='absolute top-1 left-1 p-2 bg-[#4960f8] shadow-md rounded w-fit'>
                        <FaArrowLeft onClick={() => navigate(-1)} className='text-white text-[1.1rem]' />
                    </div>
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
                        {['All', 'Booked', 'Started', 'Completed', 'Cancelled'].map(status => (
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
                        filteredOrderData.map(order => (
                            <div
                                key={order._id}
                                className={`flex flex-col w-full md:max-w-[45rem] p-4 bg-white rounded-lg shadow-md border-l-4 ${order.status === 'Completed' ? 'border-green-500' : order.status === 'Started' || order.status === 'Booked' ? 'border-orange-500' : order.status === 'Cancelled' ? 'border-red-500' : 'border-blue-500'}`}
                                onClick={() => navigate(`/priest-book-detail/${order._id}`)}
                            >
                                <div className='flex flex-col items-start justify-between sm:flex-row'>
                                    <div className='flex items-center mb-4'>
                                        <GiSunPriest className='mr-4 text-[3.5rem] text-orange-600' />
                                        <div>
                                            <h2 className='text-xl font-semibold'>{order?.priestData?.fullName || 'Priest Name'}</h2>
                                            <h3>{order?.poojaName}</h3>
                                            <div className='text-sm text-gray-600'>
                                                <div><strong>Booking Date:</strong> {order?.orderDate || 'N/A'}</div>
                                                <div><strong>Booking time:</strong> {order?.orderTime || 'N/A'}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex items-center mb-2 text-sm'>
                                        <h3 className='flex items-center gap-3 mt-3'>
                                            <div className={`ml-[1.2px] ${order?.status === 'Cancelled' && 'bg-red-500'} ${order?.status === 'Booked' && 'bg-orange-500'} ${order?.status === 'Started' && 'bg-yellow-500'} ${order?.status === 'Completed' && 'bg-green-500'} rounded-full size-3`}></div>{order?.status}
                                        </h3>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-between gap-4 sm:items-end sm:flex-row'>
                                    <div>
                                        <div className='flex items-center mb-2 text-sm'>
                                            <FaLocationDot className='mr-2' />
                                            <span><strong>Location:</strong> {order?.location || 'N/A'}</span>
                                        </div>
                                        <div className='flex items-center mb-2 text-sm'>
                                            <MdCall className='mr-2' />
                                            <span><strong>Customer Contact:</strong> {order?.phoneNumber || 'N/A'}</span>
                                        </div>
                                    </div>
                                    <div className='flex mb-[7px] flex-col justify-between '>

                                        {order?.status === 'Booked' && (

                                            <h3 className=''>Start OTP - {order?.startOTP}</h3>
                                        )}
                                        {order?.status === 'Started' && (
                                            <div className='flex items-center mt-1' onClick={(e) => e.stopPropagation()}>
                                                <h3 className='flex items-center gap-2'>End OTP
                                                    <OtpInput
                                                        value={otpValues[order?._id] || ''}
                                                        onChange={(otp) => handleOtpChange(otp, order?._id)}
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
                                                <div className='size-[1.9rem] ml-2 flex items-center rounded justify-center bg-green-500 cursor-pointer text-white' onClick={() => handleVerify(order?._id)}><FaArrowRight /></div>
                                            </div>
                                        )}

                                    </div>

                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default PastPriestOrders;
