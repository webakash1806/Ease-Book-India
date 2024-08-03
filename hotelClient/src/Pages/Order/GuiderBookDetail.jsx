import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getGuiderOrderDetail, updateStatus } from '../../Redux/Slices/OrderSlice';
import OtpInput from 'react-otp-input';
import { FaArrowRight, FaArrowRightArrowLeft } from 'react-icons/fa6';
import { MdOutlineAirlineSeatReclineExtra } from 'react-icons/md';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import guiderIcon from "../../assets/guiderIcon.png"

import { TiTick } from 'react-icons/ti';
import { RxCross2 } from 'react-icons/rx';
const GuiderBookDetail = () => {
    const [otpValues, setOtpValues] = useState({});
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const loadData = async () => {
        await dispatch(getGuiderOrderDetail(id));
        setLoading(false);
    };

    const handleOtpChange = (otp, orderId) => {
        setOtpValues(prevState => ({
            ...prevState,
            [orderId]: otp
        }));
    };

    const handleVerify = async (orderId) => {
        const res = await dispatch(updateStatus({ startOTP: otpValues[orderId], id: orderId }));
        if (res?.payload?.success) {
            loadData();
        }
    };

    const bookDetail = useSelector((state) => state?.order?.singleGuiderData);

    useEffect(() => {
        loadData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-6 md:py-16 from-[#ddfcee] bg-gradient-to-b via-[#f7fffb] to-white">
                <div className="overflow-hidden text-black bg-white rounded-lg sm:w-[50vw] w-[58vw] shadow-[0px_0px_5px_#808080] md:w-[98vw] md:max-w-[50rem] lg:w-[58vw] xl:w-[50rem] min-w-[19.7rem]">
                    <div className="flex flex-col md:items-end via-[#dcfced] from-[#d0f7e6] bg-gradient-to-b to-[#f2fef8e7] md:flex-row md:justify-between">
                        <div className="flex flex-col justify-center">
                            <h2 className="my-1 md:mb-5 text-[1.3rem] text-center font-semibold"><Skeleton width={200} /></h2>
                            <Skeleton height={200} width="100%" />
                        </div>
                        <div className='p-2 md:pb-0 md:w-[25rem]'>
                            <Skeleton height={50} width="100%" />
                            <div className='my-3 md:mb-1'>
                                <h3 className="flex justify-between p-2 mb-2 text-xl font-semibold md:mb-1">Driver Information</h3>
                                <p className='flex items-center justify-between p-1 border-t'><Skeleton width={150} /><Skeleton width={150} /></p>
                                <p className='flex items-center justify-between p-1 border-t'><Skeleton width={150} /><Skeleton width={150} /></p>
                                <p className='flex items-center justify-between p-1 border-t'><Skeleton width={150} /><Skeleton width={150} /></p>
                                <p className='flex items-center justify-between p-1 border-t'><Skeleton width={150} /><Skeleton width={150} /></p>
                                <p className='flex items-center justify-between p-1 border-t'><Skeleton width={150} /><Skeleton width={150} /></p>
                            </div>
                        </div>
                    </div>
                    <div className='p-2 bg-[#f9fffb]'>
                        <h3 className="flex items-center justify-between mt-4 mb-2 text-xl font-semibold">Order Information</h3>
                        <div className='flex flex-col md:flex-row md:justify-between'>
                            <div className='md:w-[48%]'>
                                <div className='flex items-center justify-between w-full p-1 border-t'><Skeleton width={150} /><Skeleton width={150} /></div>
                                <div className='flex items-center justify-between w-full p-1 border-t'><Skeleton width={150} /><Skeleton width={150} /></div>
                                <p className='flex items-center justify-between p-1 border-t'><Skeleton width={150} /><Skeleton width={150} /></p>
                                <p className='flex items-center justify-between p-1 border-t'><Skeleton width={150} /><Skeleton width={150} /></p>
                            </div>
                            <div className='md:w-[48%]'>
                                <p className='flex items-center justify-between p-1 border-t'><Skeleton width={150} /><Skeleton width={150} /></p>
                                <p className='flex items-center justify-between p-1 border-t'><Skeleton width={150} /><Skeleton width={150} /></p>
                                <div className='flex items-center justify-between p-1 border-t'><Skeleton width={150} /><Skeleton width={150} /></div>
                                <p className='flex items-center justify-between p-1 border-t'><Skeleton width={150} /><Skeleton width={150} /></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const {
        _id,
        guiderData,
        orderDate,
        orderTime,
        fullName,
        originalPrice,
        totalPrice,
        location,
        phoneNumber,
        alternateNumber,
        placeName,
        dropOTP,
        status
    } = bookDetail;

    console.log(bookDetail)

    const rowStyle = 'flex items-center mb-2 text-sm justify-between ';

    return (
        <div className="flex items-center justify-center py-6 md:py-16 bg-[#efefef]">
            <div
                className={`flex flex-col max-w-[35rem] sm:w-[80vw] w-[95vw]  text-black md:max-w-[45rem] p-1  overflow-hidden bg-white rounded-lg shadow-md border-b-4 ${status === 'Completed' ? 'border-green-500' : status === 'Started' || status === 'Booked' ? 'border-orange-500' : status === 'Cancelled' ? 'border-red-500' : 'border-blue-500'}`}
            >
                <div className="p-2 px-4 bg-gradient-to-r from-green-200 to-green-100">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                        <div className="flex items-center mb-4 md:mb-0">
                            <img className='w-[4rem] mr-6 mx-2' src={guiderIcon} alt="" />
                            <div>
                                <h2 className="text-2xl font-semibold">{guiderData?.fullName || 'Priest Name'}</h2>
                                <h3 className="text-lg">{placeName}</h3>
                            </div>
                        </div>
                        <div className="flex flex-col items-center w-full sm:w-fit md:items-end">
                            {status === 'Started' && (
                                <h3 className='text-[1.1rem]'>End OTP - <strong> {dropOTP}</strong></h3>
                            )}
                            {status === "Booked" && (
                                <div className="flex items-center">
                                    <h3 className="flex items-center gap-2">Start OTP
                                        <OtpInput
                                            value={otpValues[_id] || ''}
                                            onChange={(otp) => handleOtpChange(otp, _id)}
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
                                    <div className="flex items-center justify-center w-8 h-8 ml-2 text-white bg-green-500 rounded-md cursor-pointer" onClick={() => handleVerify(_id)}><FaArrowRight /></div>
                                </div>
                            )}

                        </div>

                    </div>
                </div>

                <div className="flex flex-col justify-between p-4 text-black md:flex-row">

                    <div className="flex md:w-[48%] flex-col">
                        <h3 className="mb-1 text-xl font-semibold">Pandit Ji Information</h3>
                        <p className={rowStyle}><span className="font-semibold">Name:</span> {guiderData?.fullName}</p>
                        <p className={rowStyle}><span className="font-semibold">Phone Number:</span> {guiderData?.phoneNumber}</p>
                        <p className={rowStyle}><span className="font-semibold">Email:</span> {guiderData?.email}</p>
                        <p className={rowStyle}><span className="font-semibold">Age:</span> {guiderData?.age} years</p>
                        <p className={rowStyle}><span className="font-semibold">Experience:</span> {guiderData?.experience} years</p>
                    </div>


                    <div className="flex md:w-[45%] flex-col">
                        <h3 className="mb-1 text-xl font-semibold">Order Information</h3>
                        <div className="flex flex-col">
                            <p className={rowStyle}><span className="font-semibold">Location:</span> {location}</p>
                            <p className={rowStyle}><span className="font-semibold">Order Date:</span> {orderDate}</p>
                            <p className={rowStyle}><span className="font-semibold">Order Time:</span> {orderTime}</p>
                            <p className={rowStyle}><span className="font-semibold">Customer Name:</span> {fullName}</p>
                            <p className={rowStyle}><span className="">{phoneNumber}</span> {alternateNumber}</p>



                        </div>
                    </div>


                </div>
                <div className="p-2 px-4 bg-gradient-to-r from-green-200 to-green-100">
                    <div className='flex justify-between items center'>

                        <div className="py-1">
                            <h3 className="flex items-center text-[1.05rem] font-semibold">
                                <div className={`ml-2 size-3 rounded-full ${status === 'Cancelled' ? 'bg-red-500' : status === 'Booked' ? 'bg-orange-500' : status === 'Picked up' ? 'bg-yellow-500' : status === 'Dropped' ? 'bg-green-500' : ''}`}></div>
                                <span className="ml-2">{status}</span>
                            </h3>
                        </div>
                    </div>
                    <p className='flex items-center justify-between text-[1.15rem] bg-[#f6f6f6ec] p-1 px-3 rounded font-semibold '><span className="">Total Price:</span> <span><strike className="pr-2">{originalPrice}</strike> &#8377; {totalPrice}</span></p>
                </div>

            </div>
        </div>
    );
};

export default GuiderBookDetail;
