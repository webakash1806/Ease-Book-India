import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { cancelPoojaBooking, getPriestOrderDetail, poojaFinishUpdate } from '../../Redux/Slices/OrderSlice';
import OtpInput from 'react-otp-input';
import { FaArrowRight } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { GiSunPriest } from 'react-icons/gi';
import { TiTick } from 'react-icons/ti';
import { RxCross2 } from 'react-icons/rx';
import SocialCard from '../../Components/SocialCard';
import { FaArrowLeft } from 'react-icons/fa6';

const PriestBookDetail = () => {
    const [otpValues, setOtpValues] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const loadData = async () => {
        await dispatch(getPriestOrderDetail(id));
    };

    const handleOtpChange = (otp, orderId) => {
        setOtpValues(prevState => ({
            ...prevState,
            [orderId]: otp
        }));
    };

    const handleVerify = async (orderId) => {
        const res = await dispatch(poojaFinishUpdate({ dropOTP: otpValues[orderId], id: orderId }));
        if (res?.payload?.success) {
            loadData();
        }
    };

    const bookDetail = useSelector((state) => state?.order?.singlePriestData);

    const handleCancel = async () => {
        const res = await dispatch(cancelPoojaBooking(id));
        loadData();
        if (res?.payload?.success) {
            toast.success('Cancelled!');
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    if (!bookDetail) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    const {
        _id,
        priestData,
        orderDate,
        orderTime,
        fullName,
        originalPrice,
        totalPrice,
        location,
        phoneNumber,
        alternateNumber,
        poojaName,
        startOTP,
        dropOTP,
        samagri,
        status
    } = bookDetail;

    const rowStyle = 'flex items-center mb-2 text-sm justify-between ';

    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Pooja Bookings Detail', },
    ];

    return (
        <>
            <div className='relative'>
                <SocialCard item={breadcrumbItems} icon={"priest"} title={"Booking Details"} des={`This is your Pooja booking detail which was booked on ${orderDate} at ${orderTime}.`} />
                <div onClick={() => navigate(-1)} className='absolute top-1 left-1 p-2 bg-[#4960f8] shadow-md rounded w-fit'>
                    <FaArrowLeft onClick={() => navigate(-1)} className='text-white text-[1.1rem]' />
                </div>
            </div>
            <div className='from-[#e7eafd] bg-gradient-to-b via-[#f7f7fb] to-white p-4 py-8 flex flex-wrap items-center justify-center'>
                <div
                    className={`flex flex-col max-w-[32rem] sm:w-[80vw] w-[95vw]  text-black md:max-w-[45rem] p-1  overflow-hidden bg-white rounded-lg shadow-md border-b-4 ${status === 'Completed' ? 'border-green-500' : status === 'Started' || status === 'Booked' ? 'border-orange-500' : status === 'Cancelled' ? 'border-red-500' : 'border-blue-500'}`}
                >
                    <div className="p-2 px-4 bg-gradient-to-r from-green-200 to-green-100">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                            <div className="flex items-center mb-4 md:mb-0">
                                <GiSunPriest className="mr-4 text-4xl text-orange-600" />
                                <div>
                                    <h2 className="text-2xl font-semibold">{priestData?.fullName || 'Priest Name'}</h2>
                                    <h3 className="text-lg">{poojaName}</h3>
                                </div>
                            </div>
                            <div className="flex flex-col items-center w-full sm:w-fit md:items-end">
                                {status === 'Booked' && (
                                    <h3 className='text-[1.1rem]'>Start OTP -  {startOTP}</h3>
                                )}
                                {status === "Started" && (
                                    <div className="flex items-center">
                                        <h3 className="flex items-center gap-2">Drop OTP
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
                                        <div className="flex items-center justify-center w-8 h-8 ml-2 text-white bg-green-500 rounded-full cursor-pointer" onClick={() => handleVerify(_id)}><FaArrowRight /></div>
                                    </div>
                                )}
                                {status === "Booked" && (
                                    <button onClick={handleCancel} className="w-full px-4 py-2 mt-1 text-white bg-red-500 rounded">Cancel Booking</button>
                                )}
                            </div>

                        </div>
                    </div>

                    <div className="flex flex-col justify-between p-4 text-black md:flex-row">

                        <div className="flex md:w-[48%] flex-col">
                            <h3 className="mb-1 text-xl font-semibold">Pandit Ji Information</h3>
                            <p className={rowStyle}><span className="font-semibold">Name:</span> {priestData?.fullName}</p>
                            <p className={rowStyle}><span className="font-semibold">Phone Number:</span> {priestData?.phoneNumber}</p>
                            <p className={rowStyle}><span className="font-semibold">Email:</span> {priestData?.email}</p>
                            <p className={rowStyle}><span className="font-semibold">Age:</span> {priestData?.age} years</p>
                            <p className={rowStyle}><span className="font-semibold">Experience:</span> {priestData?.experience} years</p>
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
                            <div className={rowStyle}>
                                <span className="font-semibold text-[1.1rem]">Samagri:</span>
                                <span>{samagri ? <TiTick className="text-green-500 text-[1.1rem]" /> : <RxCross2 className="text-red-500" />}</span>
                            </div>
                            <div className="px-4 ">
                                <h3 className="flex items-center text-[1.1rem] font-semibold">
                                    <div className={`ml-2 size-3 rounded-full ${status === 'Cancelled' ? 'bg-red-500' : status === 'Booked' ? 'bg-orange-500' : status === 'Picked up' ? 'bg-yellow-500' : status === 'Dropped' ? 'bg-green-500' : ''}`}></div>
                                    <span className="ml-2">{status}</span>
                                </h3>
                            </div>
                        </div>
                        <p className='flex items-center justify-between text-[1.15rem] bg-[#f6f6f6ec] p-1 px-3 rounded font-semibold '><span className="">Total Price:</span> <span><strike className="pr-2">{originalPrice}</strike> &#8377; {totalPrice}</span></p>
                    </div>

                </div>
            </div>
        </>
    );
};

export default PriestBookDetail;
