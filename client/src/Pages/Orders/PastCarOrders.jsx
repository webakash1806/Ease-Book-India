import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getOrders, updateDrop } from '../../Redux/Slices/OrderSlice'
import { FaArrowRight, FaArrowRightArrowLeft, FaCar } from 'react-icons/fa6'
import { MdCall } from 'react-icons/md'
import OtpInput from 'react-otp-input';

const PastCarOrders = () => {
    const [otpValues, setOtpValues] = useState({});
    const dispatch = useDispatch()
    const { id } = useParams()
    const orderData = useSelector((state) => state?.order?.carsOrderData) || []

    const loadOrder = async () => {
        await dispatch(getOrders(id))
    }

    const handleVerify = async (orderId) => {
        const res = await dispatch(updateDrop({ dropOTP: otpValues[orderId], id: orderId }))
        if (res?.payload?.success) {
            loadOrder()
        }
    }

    useEffect(() => {
        loadOrder()
    }, [])

    const handleOtpChange = (otp, orderId) => {
        setOtpValues(prevState => ({
            ...prevState,
            [orderId]: otp
        }));
    };

    const sortedOrderData = orderData.slice().reverse().sort((a, b) => {
        if (a.status === "Dropped" && (b.status === "Picked up" || b.status === "On the way")) {
            return 1;
        }
        if ((a.status === "Picked up" || a.status === "On the way") && b.status === "Dropped") {
            return -1;
        }
        return 0;
    });

    return (
        <div className='flex flex-col items-center gap-6 py-4 text-black bg-white'>
            {(!sortedOrderData || sortedOrderData.length === 0) ? (
                <div>No orders till now</div>
            ) : (
                sortedOrderData.map((data) => (
                    <div key={data?._id} className='flex cursor-pointer rounded-sm sm:justify-between sm:min-w-[38rem] sm:flex-row shadow-[0px_0px_5px_#808080] overflow-hidden flex-col items-start sm:w-[65vw] w-[90vw] md:w-[63vw] lg:w-[58vw] xl:w-[50rem] min-w-[19.7rem]'>
                        <div className='flex items-center gap-2 md:gap-3 lg:gap-4'>
                            <div>
                                <img className='w-[8.3rem] h-[6.4rem] lg:w-[9rem] object-cover' src={data?.driverData?.proofFiles[3]?.fileUrl} alt="" />
                            </div>
                            <div className='text-[0.9rem] font-semibold'>
                                <h3 className='flex items-center gap-3'><FaCar />{data?.driverData?.fullName}</h3>
                                <h3 className='flex items-center gap-3'><MdCall />{data?.driverData?.phoneNumber}</h3>
                                <h3 className='flex items-center gap-3 mt-3'>
                                    <div className={`ml-[1.2px] ${data?.status === "Cancelled" && 'bg-red-500'} ${data?.status === "On the way" && 'bg-orange-500'} ${data?.status === "Picked up" && 'bg-yellow-500'} ${data?.status === "Dropped" && 'bg-green-500'} rounded-full size-3`}></div>{data?.status}
                                </h3>
                            </div>
                        </div>
                        <div className='w-full text-[0.95rem] sm:w-[17.5rem] md:w-[18.5rem] xl:w-[23rem] sm:pr-2'>
                            <div className='flex items-center justify-between w-full p-1 border-t '>
                                <h3>{data?.pickLocation}</h3>
                                {data?.returnTrip ? <FaArrowRightArrowLeft /> : <FaArrowRight />}
                                <h3>{data?.dropLocation}</h3>
                            </div>
                            <div className='flex items-center justify-between w-full p-1 border-t '>
                                <h3>{data?.orderDate}</h3>
                                <h3>{data?.orderTime}</h3>
                            </div>
                            {data?.status === "On the way" && (
                                <div className='flex items-center justify-between w-full p-1 border-t '>
                                    <h3>Pickup OTP - {data?.startOTP}</h3>
                                    <h3>Share with driver</h3>
                                </div>
                            )}
                            {data?.status === "Picked up" && (
                                <div className='flex items-center justify-between w-full p-1 border-t '>
                                    <h3 className='flex items-center gap-2'>Drop OTP
                                        <OtpInput
                                            value={otpValues[data?._id] || ''}
                                            onChange={(otp) => handleOtpChange(otp, data?._id)}
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
                                    <div className='size-[1.9rem] flex items-center rounded justify-center bg-green-500 cursor-pointer text-white' onClick={() => handleVerify(data?._id)}><FaArrowRight /></div>
                                </div>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default PastCarOrders
