import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrders, updateStatus } from '../../Redux/Slices/OrderSlice';
import OtpInput from 'react-otp-input';
import { FaArrowRight, FaLocationDot } from 'react-icons/fa6';
import { MdCall, MdFilterList } from 'react-icons/md';
import dayjs from 'dayjs';
import { GiSunPriest } from 'react-icons/gi';

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

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const orderData = useSelector((state) => state?.order?.orderData) || [];

    const loadData = async () => {
        setLoading(true);
        await dispatch(getOrders(id));
        setLoading(false);
    };

    const handleVerify = async (orderId) => {
        const res = await dispatch(updateStatus({ startOTP: otpValues[orderId], id: orderId }));
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
                    filteredOrderData.map(order => (
                        <div
                            key={order._id}
                            className={`flex flex-col w-full md:max-w-[45rem] p-4 bg-white rounded-lg shadow-md border-l-4 ${order.status === 'Completed' ? 'border-green-500' : order.status === 'Started' || order.status === 'Booked' ? 'border-orange-500' : order.status === 'Cancelled' ? 'border-red-500' : 'border-blue-500'}`}
                            onClick={() => navigate(`/book-detail/${order._id}`)}
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
                                    {order?.status === 'Started' && (
                                        <h3 className=''>End OTP - {order.dropOTP}</h3>
                                    )}
                                    {order?.status === 'Booked' && (
                                        <div className='flex items-center mt-1' onClick={(e) => e.stopPropagation()}>
                                            <h3 className='flex items-center gap-2'>Start OTP
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
                ) : (
                    <div>No orders found.</div>
                )}
            </div>
        </div>
    );
}

export default PastOrder;
