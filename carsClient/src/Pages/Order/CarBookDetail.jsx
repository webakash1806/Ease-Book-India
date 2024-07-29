import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getCarOrderDetail, updatePickup } from '../../Redux/Slices/OrderSlice';
import OtpInput from 'react-otp-input';
import { FaArrowRight, FaArrowRightArrowLeft } from 'react-icons/fa6';
import { MdOutlineAirlineSeatReclineExtra } from 'react-icons/md';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CarBookDetail = () => {
    const [otpValues, setOtpValues] = useState({});
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const loadData = async () => {
        await dispatch(getCarOrderDetail(id));
        setLoading(false);
    };

    const handleOtpChange = (otp, orderId) => {
        setOtpValues(prevState => ({
            ...prevState,
            [orderId]: otp
        }));
    };

    const handleVerify = async (orderId) => {
        const res = await dispatch(updatePickup({ startOTP: otpValues[orderId], id: orderId }));
        if (res?.payload?.success) {
            loadData();
        }
    };

    const bookDetail = useSelector((state) => state?.order?.singleCarData);

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
        carName,
        carNumber,
        driverData,
        orderDate,
        orderTime,
        fullName,
        originalPrice,
        totalPrice,
        pickLocation,
        dropLocation,
        fareType,
        phoneNumber,
        alternateNumber,
        numberOfMales,
        numberOfFemales,
        startOTP,
        dropOTP,
        numberOfChildren,
        returnTrip,
        status
    } = bookDetail;

    const vehicleImage = driverData.proofFiles[3]?.fileUrl || ''; // Ensure it doesn't break if proofFiles is missing

    const rowStyle = 'flex items-center justify-between p-1 border-t';

    return (
        <div className="flex items-center justify-center py-6 md:py-16 from-[#ddfcee] bg-gradient-to-b via-[#f7fffb] to-white">
            <div className="overflow-hidden text-black bg-white rounded-lg sm:w-[50vw] w-[58vw] shadow-[0px_0px_5px_#808080] md:w-[98vw] md:max-w-[50rem] lg:w-[58vw] xl:w-[50rem] min-w-[19.7rem]">
                <div className="flex flex-col md:items-end via-[#dcfced] from-[#d0f7e6] bg-gradient-to-b to-[#f2fef8e7] md:flex-row md:justify-between">
                    <div className="flex flex-col justify-center">
                        <h2 className="my-1 md:mb-5 text-[1.3rem] text-center font-semibold">{driverData.carName} ({driverData.carNumber})</h2>
                        <img src={vehicleImage} alt="Vehicle" className="object-cover w-full md:w-[22rem] md:h-[12.8rem] md:rounded-l-none md:rounded-r-lg rounded-lg rounded-b-none" />
                    </div>
                    <div className='p-2 md:pb-0 md:w-[25rem]'>
                        {status === "Picked up" && (
                            <div className='flex items-center justify-between w-full md:pl-8'>
                                <h3>Drop OTP - {dropOTP}</h3>
                            </div>
                        )}
                        {status === "On the way" && (
                            <div className='flex items-center justify-between w-full p-1 '>
                                <h3 className='flex items-center gap-2'>Drop OTP
                                    <OtpInput
                                        value={otpValues[_id] || ''}
                                        onChange={(otp) => handleOtpChange(otp, _id)}
                                        numInputs={4}
                                        renderSeparator={<span className="font-semibold text-[0.95rem]">-</span>}
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
                                <div className='size-[1.9rem] flex items-center rounded justify-center bg-green-500 cursor-pointer text-white' onClick={() => handleVerify(_id)}><FaArrowRight /></div>
                            </div>
                        )}
                        <div className='my-3 md:mb-1'>
                            <h3 className="flex justify-between p-2 mb-2 text-xl font-semibold md:mb-1">Driver Information
                                <h2 className='flex items-center gap-1'><MdOutlineAirlineSeatReclineExtra />{driverData?.servicesData?.seatingCap}</h2>
                            </h3>
                            <p className={rowStyle}><span className="font-semibold text-[0.95rem]">Name:</span> {driverData.fullName}</p>
                            <p className={rowStyle}><span className="font-semibold text-[0.95rem]">Phone Number:</span> {driverData.phoneNumber}</p>
                            <p className={rowStyle}><span className="font-semibold text-[0.95rem]">Email:</span> {driverData.email}</p>
                            <p className={rowStyle}><span className="font-semibold text-[0.95rem]">Age:</span> {driverData.age} years</p>
                            <p className={rowStyle}><span className="font-semibold text-[0.95rem]">Experience:</span> {driverData.experience} years</p>
                        </div>
                    </div>
                </div>
                <div className='p-2 bg-[#f9fffb]'>
                    <h3 className="flex items-center justify-between mt-4 mb-2 text-xl font-semibold">Order Information
                        <div className='flex items-center gap-1 text-[0.95rem] font-normal'>
                            <div className={`ml-[1.2px] ${status === "Cancelled" && 'bg-red-500'} ${status === "On the way" && 'bg-orange-500'} ${status === "Picked up" && 'bg-yellow-500'} ${status === "Dropped" && 'bg-green-500'} rounded-full size-3`}></div>{status}
                        </div>
                    </h3>
                    <div className='flex flex-col md:flex-row md:justify-between'>
                        <div className='md:w-[48%]'>
                            <div className='flex items-center justify-between w-full p-1 border-t '>
                                <h3>{pickLocation}</h3>
                                {returnTrip ? <FaArrowRightArrowLeft /> : <FaArrowRight />}
                                <h3>{dropLocation}</h3>
                            </div>
                            <div className='flex items-center justify-between w-full p-1 border-t '>
                                <h3>{orderDate}</h3>
                                <h3>{orderTime}</h3>
                            </div>
                            <p className={rowStyle}><span className="font-semibold text-[0.95rem]">Customer Name:</span> {fullName}</p>
                            <p className={rowStyle}><span className="font-semibold text-[0.95rem]">Phone Number:</span> {phoneNumber}</p>
                        </div>
                        <div className='md:w-[48%]'>
                            <p className={rowStyle}><span className="font-semibold text-[0.95rem]">Alternate Number:</span> {alternateNumber}</p>
                            <p className={rowStyle}><span className="font-semibold text-[0.95rem]">Fare Type:</span> {fareType}</p>
                            <div className={rowStyle}><p><span className="font-semibold text-[0.95rem]">No. of Males:</span> {numberOfMales}</p>
                                <p><span className="font-semibold text-[0.95rem]">Females:</span> {numberOfFemales}</p>
                                <p><span className="font-semibold text-[0.95rem]">Children:</span> {numberOfChildren}</p>
                            </div>
                            <p className={rowStyle}><span className="font-semibold text-[0.95rem]">Total Price:</span> <p><strike className="pr-2">{originalPrice}</strike> &#8377; {totalPrice} </p></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarBookDetail;
