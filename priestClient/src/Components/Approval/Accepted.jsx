import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getOrders, updateStatus } from '../../Redux/Slices/OrderSlice';
import OtpInput from 'react-otp-input';
import { FaArrowRight, FaArrowRightArrowLeft, FaCar, FaLocationDot } from 'react-icons/fa6';
import { MdCall } from 'react-icons/md';
import { GiSunPriest } from 'react-icons/gi';

const Accepted = () => {
    const [otpValues, setOtpValues] = useState({});


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const orderData = useSelector((state) => state?.order?.orderData) || [];
    const id = useSelector((state) => state?.auth?.data?._id);

    const loadData = async () => {
        await dispatch(getOrders(id));
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

    const filteredOrderData = orderData.filter(order => order.status === "Ordered" || order.status === "Started").slice().reverse();

    console.log(filteredOrderData[0])

    return (
        <div
            key={filteredOrderData[0]._id}
            className={`flex flex-col w-[95vw] text-black md:max-w-[45rem] p-4 bg-white rounded-lg shadow-md border-l-4 ${filteredOrderData[0].status === 'Completed' ? 'border-green-500' : filteredOrderData[0].status === 'Started' || filteredOrderData[0].status === 'Booked' ? 'border-orange-500' : filteredOrderData[0].status === 'Cancelled' ? 'border-red-500' : 'border-blue-500'}`}
            onClick={() => navigate(`/book-detail/${filteredOrderData[0]._id}`)}
        >
            <div className='flex flex-col items-start justify-between sm:flex-row'>
                <div className='flex items-center mb-4'>
                    <GiSunPriest className='mr-4 text-[3.5rem] text-orange-600' />
                    <div>
                        <h2 className='text-xl font-semibold'>{filteredOrderData[0]?.priestData?.fullName || 'Priest Name'}</h2>
                        <h3>{filteredOrderData[0]?.poojaName}</h3>
                        <div className='text-sm text-gray-600'>
                            <div><strong>Booking Date:</strong> {filteredOrderData[0]?.orderDate || 'N/A'}</div>
                            <div><strong>Booking time:</strong> {filteredOrderData[0]?.orderTime || 'N/A'}</div>
                        </div>
                    </div>
                </div>
                <div className='flex items-center mb-2 text-sm'>
                    <h3 className='flex items-center gap-3 mt-3'>
                        <div className={`ml-[1.2px] ${filteredOrderData[0]?.status === 'Cancelled' && 'bg-red-500'} ${filteredOrderData[0]?.status === 'Booked' && 'bg-orange-500'} ${filteredOrderData[0]?.status === 'Started' && 'bg-yellow-500'} ${filteredOrderData[0]?.status === 'Completed' && 'bg-green-500'} rounded-full size-3`}></div>{filteredOrderData[0]?.status}
                    </h3>
                </div>
            </div>
            <div className='flex flex-col justify-between gap-4 sm:items-end sm:flex-row'>
                <div>
                    <div className='flex items-center mb-2 text-sm'>
                        <FaLocationDot className='mr-2' />
                        <span><strong>Location:</strong> {filteredOrderData[0]?.location || 'N/A'}</span>
                    </div>
                    <div className='flex items-center mb-2 text-sm'>
                        <MdCall className='mr-2' />
                        <span><strong>Customer Contact:</strong> {filteredOrderData[0]?.phoneNumber || 'N/A'}</span>
                    </div>
                </div>
                <div className='flex mb-[7px] flex-col justify-between '>
                    {filteredOrderData[0]?.status === 'Started' && (
                        <h3 className=''>End OTP - {filteredOrderData[0].dropOTP}</h3>
                    )}
                    {filteredOrderData[0]?.status === 'Booked' && (
                        <div className='flex items-center mt-1' onClick={(e) => e.stopPropagation()}>
                            <h3 className='flex items-center gap-2'>Start OTP
                                <OtpInput
                                    value={otpValues[filteredOrderData[0]?._id] || ''}
                                    onChange={(otp) => handleOtpChange(otp, filteredOrderData[0]?._id)}
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
                            <div className='size-[1.9rem] ml-2 flex items-center rounded justify-center bg-green-500 cursor-pointer text-white' onClick={() => handleVerify(filteredOrderData[0]?._id)}><FaArrowRight /></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Accepted;
