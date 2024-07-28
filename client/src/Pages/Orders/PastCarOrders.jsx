import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getOrders } from '../../Redux/Slices/OrderSlice'
import { FaArrowRight, FaArrowRightArrowLeft, FaCar } from 'react-icons/fa6'
import { MdCall } from 'react-icons/md'
import OtpInput from 'react-otp-input';

const PastCarOrders = () => {
    const [otp, setOtp] = useState('');
    const dispatch = useDispatch()

    console.log(otp)

    const { id } = useParams()


    const orderData = useSelector((state) => state?.order?.carsOrderData) || []


    const loadOrder = async () => {
        await dispatch(getOrders(id))
    }


    console.log(orderData)

    useEffect(() => {
        loadOrder()
    }, [])

    return (
        <div className='flex flex-col items-center pt-4 text-black bg-white'>
            {orderData.map((data) => {
                return (
                    <div key={data?._id} className='flex rounded-sm sm:justify-between sm:min-w-[38rem] sm:flex-row shadow-[0px_0px_5px_#808080] overflow-hidden flex-col items-start sm:w-[65vw] w-[90vw] md:w-[63vw] lg:w-[58vw] xl:w-[50rem] min-w-[19.7rem]'>
                        <div className='flex items-center gap-2 md:gap-3 lg:gap-4'>
                            <div>
                                <img className='w-[8.3rem] h-[6.4rem] lg:w-[9rem]   object-cover' src={data?.driverData?.proofFiles[3]?.fileUrl} alt="" />
                            </div>
                            <div className='text-[0.9rem] font-semibold'>
                                <h3 className='flex items-center gap-3'><FaCar />{data?.driverData?.fullName}</h3>
                                <h3 className='flex items-center gap-3'><MdCall />{data?.driverData?.phoneNumber}</h3>
                                <h3 className='flex items-center gap-3 mt-3'><div className='ml-[1.2px] bg-red-500 rounded-full size-3'></div>{data?.status}</h3>
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
                            {
                                data?.status === "On the way" && <div className='flex items-center justify-between w-full p-1 border-t '>
                                    <h3>Pickup OTP - {data?.startOTP}</h3>
                                    <h3>Share with driver</h3>
                                </div>
                            }
                            {data?.status === "Picked up" && <div className='flex items-center justify-between w-full p-1 border-t '>
                                <h3 className='flex items-center gap-2'>Enter drop OTP    <OtpInput
                                    value={otp}
                                    onChange={setOtp}
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
                                        />)}
                                /></h3>
                            </div>}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default PastCarOrders
