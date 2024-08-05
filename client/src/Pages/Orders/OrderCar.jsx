import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDriverData } from '../../Redux/Slices/ServiceSlice';
import { FaLocationDot } from 'react-icons/fa6';
import { FaCar, FaRegUserCircle } from 'react-icons/fa';
import { MdOutlineAirlineSeatReclineExtra } from 'react-icons/md';
import { bookCar } from '../../Redux/Slices/OrderSlice';
import { toast } from 'react-toastify';
import { getRazorpayId, order, verifyPayment } from '../../Redux/Slices/RazorpaySlice';

const OrderCar = () => {
    const [loaderActive, setLoaderActive] = useState(false);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userData = useSelector((state) => state?.auth?.data);
    const driverData = useSelector((state) => state?.service?.driverData) || [];

    console.log(driverData)

    const userId = userData?._id;
    const driverId = driverData?._id;

    const [formData, setFormData] = useState({
        pickLocation: '',
        dropLocation: '',
        returnTrip: false,
        fullName: userData?.fullName,
        phoneNumber: userData?.phoneNumber,
        alternateNumber: '',
        numberOfMales: 0,
        numberOfFemales: 0,
        numberOfChildren: 0,
        fareType: 'km',
        totalPrice: 0,
        originalPrice: 0,
    });

    const loadData = async () => {
        await dispatch(getDriverData(id));
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        const calculateTotalPrice = () => {
            const kmFare = driverData?.servicesData?.kmFare || 0;
            const hrFare = driverData?.servicesData?.hrFare || 0;
            let originalPrice = 0;
            let discountedPrice = 0;
            const numberOfKms = 1;
            const numberOfHours = 1;

            if (formData.fareType === 'km') {
                originalPrice = numberOfKms * kmFare;
                discountedPrice = originalPrice - originalPrice * 0.05; // 5% discount
            } else {
                originalPrice = numberOfHours * hrFare;
                discountedPrice = originalPrice - originalPrice * 0.10; // 10% discount
            }

            if (formData.returnTrip) {
                originalPrice *= 2;
                discountedPrice *= 2;
            }

            setFormData(prevState => ({
                ...prevState,
                originalPrice: originalPrice,
                totalPrice: discountedPrice
            }));
        };

        calculateTotalPrice();
    }, [formData.fareType, formData.pickLocation, formData.numberOfHours, formData.returnTrip, formData.originalPrice]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const razorpayKey = useSelector((state) => state?.razorpay?.key);
    const order_id = useSelector((state) => state?.razorpay?.orderId);

    const paymentDetails = {
        razorpay_payment_id: "",
        razorpay_order_id: "",
        razorpay_signature: ""
    };

    const fetchOrderId = async () => {
        await dispatch(order({ amount: formData.totalPrice, id: driverId, forName: "CAR" }));
    };

    useEffect(() => {
        fetchOrderId();
    }, [formData]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (driverData.servicesData.availability !== "AVAILABLE") {
            navigate('/car')
            return toast.error("Driver is busy Try another")
        }

        const date = new Date().getDate();
        const today = new Date();
        const month = today.toLocaleString('default', { month: 'short' });
        const year = new Date().getFullYear();

        const orderDate = `${date} ${month},${year}`;

        const now = new Date();
        const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
        const hours = istTime.getHours();
        const minutes = istTime.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12; // Convert 24 hour format to 12 hour format
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        const orderTime = `${formattedHours}:${formattedMinutes} ${ampm}`;

        const { originalPrice, totalPrice, pickLocation, dropLocation, phoneNumber, alternateNumber, fareType, fullName, returnTrip, numberOfChildren, numberOfFemales, numberOfMales } = formData;

        if (
            !originalPrice ||
            !totalPrice ||
            !pickLocation ||
            !dropLocation ||
            !phoneNumber ||
            !alternateNumber ||
            !fareType ||
            !fullName ||
            numberOfChildren === null ||
            numberOfFemales === null ||
            numberOfMales === null
        ) {
            setLoaderActive(false);
            return toast.error("All fields are required");
        }

        if (numberOfChildren === 0 && numberOfMales === 0 && numberOfFemales === 0) {
            setLoaderActive(false);

            return toast.error("Please fill no. of passengers")
        }

        if (Number(numberOfChildren) + Number(numberOfFemales) + Number(numberOfMales) > driverData?.servicesData?.seatingCap) {
            if (Number(numberOfChildren) + Number(numberOfFemales) + Number(numberOfMales) === Number(driverData?.servicesData?.seatingCap) + 1) {
                if (Number(numberOfChildren) > 2) {
                    setLoaderActive(false);

                    return toast.error(`Seating capacity is only ${driverData?.servicesData?.seatingCap}`)
                }
            } else if (Number(numberOfChildren) + Number(numberOfFemales) + Number(numberOfMales) >= driverData?.servicesData?.seatingCap) {
                setLoaderActive(false);

                return toast.error(`Seating capacity is only ${driverData?.servicesData?.seatingCap}`)
            }
        }

        if (!order_id) {
            setLoaderActive(false);
            return toast.error("Unable to get order ID. Please try again.");
        }

        const options = {
            key: razorpayKey, // Enter the Key ID generated from the Dashboard
            amount: formData?.totalPrice * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "....", //your business name
            description: "",
            image: "",
            order_id: order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            handler: async function (res) {
                paymentDetails.razorpay_payment_id = res.razorpay_payment_id;
                paymentDetails.razorpay_order_id = res.razorpay_order_id;
                paymentDetails.razorpay_signature = res.razorpay_signature;
                console.log(paymentDetails);
                const response = await dispatch(verifyPayment(paymentDetails));
                if (response?.payload?.success) {
                    const res = await dispatch(bookCar({ originalPrice, totalPrice, pickLocation, dropLocation, phoneNumber, alternateNumber, fareType, fullName, returnTrip, numberOfChildren, numberOfFemales, numberOfMales, orderDate, orderTime, userId, driverId }));
                    if (res.payload.success) {
                        setLoaderActive(false);
                        toast.success("Order Placed!");
                    }
                    navigate(`/order/car-book/${userData?._id}`)
                } else {
                    navigate('/order/fail')
                    setLoaderActive(false);
                }
            },
            prefill: {
                "name": userData?.fullName, //your customer's name
                "email": userData?.email,
                "contact": userData?.phoneNumber  //Provide the customer's phone number for better conversion rates 
            },
            notes: {
                "address": "Office"
            },
            theme: {
                "color": "#FC683E"
            }
        };

        const razor = new window.Razorpay(options);
        razor.open();
    };

    const proofFileUrl = driverData?.proofFiles?.[3]?.fileUrl;


    const mainDiv = 'flex flex-col gap-[0.1px]'
    const labelStyle = "text-[0.83rem] tracking-wide text-[#000] font-[500] ml-[0.5px]"
    const inputStyle = 'min-w-[18rem] max-w-[20.5rem] w-[87vw] sm:w-[24rem] rounded-[3px] h-full px-2 p-[7px] outline-none text-[0.94rem] tracking-wide resize-none bg-white border-[#808080] border '

    return (
        <div className='from-[#ddfcee] bg-gradient-to-b via-[#f7fffb] to-white py-10 flex flex-col items-center justify-center'>
            <div className='overflow-hidden rounded-xl shadow-[0px_0px_5px_#808080] via-[#ecfff6] from-[#d0f7e6] bg-gradient-to-b to-[#f7fffb]'>
                <div className='flex flex-col w-full overflow-hidden text-black border-b md:items-end md:flex-row md:gap-6 border-[#8080803b]'>
                    <div>
                        {proofFileUrl ? (
                            <img src={proofFileUrl} alt="Proof" className='h-[14rem] w-full md:w-[22rem] object-cover' />
                        ) : (
                            <div className='h-[14rem] w-full bg-gray-200 flex items-center md:w-[22rem] justify-center'>
                                <span>No Image Available</span>
                            </div>
                        )}
                    </div>
                    <div className='p-3 w-full md:w-[20.5rem]'>
                        <div className='flex items-center justify-between my-2'>
                            <h2 className='text-[1.1rem] font-semibold'>{driverData?.carName}</h2>
                            <h2 className='flex items-center gap-1'><MdOutlineAirlineSeatReclineExtra />{driverData?.servicesData?.seatingCap}</h2>
                        </div>
                        <div className='flex items-center justify-between my-2'>
                            <h1 className='flex items-center justify-center gap-2'><FaRegUserCircle />{driverData?.fullName}</h1>
                            <h2>{driverData?.age} years</h2>
                        </div>
                        <div className='flex items-center justify-between my-2'>
                            <h1 className='flex items-center justify-center gap-2'><FaCar />Experience</h1>
                            <h2>{driverData?.experience} years</h2>
                        </div>
                        <div className='flex items-center justify-between my-2'>
                            <h1 className='flex items-center justify-center gap-2'><FaLocationDot />{driverData?.servicesData?.serviceArea}</h1>
                        </div>
                        <div className='flex items-center justify-between pt-3 mt-3 border-t'>
                            <h3>
                                <span className='text-[1.02rem] font-semibold text-[#19B56F]'>Rs.{driverData?.servicesData?.kmFare}</span> / Km
                            </h3>
                            <h3>
                                <span className='text-[1.02rem] font-semibold text-[#19B56F]'>Rs.{driverData?.servicesData?.hrFare}</span> / hr
                            </h3>
                        </div>
                    </div>
                </div>
                <form className='flex flex-col p-4 text-black sm:p-6 md:items-end md:flex-row w-fit md:gap-6' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-[5px]'>
                        <h3 className='text-[1.1rem] font-semibold mb-2 border-b w-fit border-[#9e9e9e]'>Booking Details</h3>
                        <div className={mainDiv}>
                            <label className={labelStyle}>Pick Location</label>
                            <input type='text' name='pickLocation' value={formData.pickLocation} onChange={handleChange} className={inputStyle} />
                        </div>
                        <div className={mainDiv}>
                            <label className={labelStyle}>Drop Location</label>
                            <input type='text' name='dropLocation' value={formData.dropLocation} onChange={handleChange} className={inputStyle} />
                        </div>
                        <div className={mainDiv}>
                            <label className={labelStyle}>Full Name</label>
                            <input type='text' name='fullName' value={formData.fullName} onChange={handleChange} className={inputStyle} />
                        </div>
                        <div className='flex min-w-[18rem] max-w-[20.5rem] w-[87vw] sm:w-[24rem] justify-between'>
                            <div className={`${mainDiv} w-[48%]`}>
                                <label className={labelStyle} htmlFor="phoneNumber">Phone Number</label>
                                <input className='border border-[#808080] w-full rounded-[3px] h-full px-2 p-[5.5px] outline-none text-[0.95rem] tracking-wide bg-[#ffffff] text-black' type="text" name='phoneNumber' value={formData.phoneNumber} onChange={handleChange} />
                            </div>
                            <div className={`${mainDiv} w-[48%]`}>
                                <label className={labelStyle} htmlFor="alternateNumber">Alternate Number</label>
                                <input className='border border-[#808080] w-full rounded-[3px] h-full px-2 p-[5.5px] outline-none text-[0.95rem] tracking-wide bg-[#ffffff] text-black' type="text" name='alternateNumber' value={formData.alternateNumber} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-[6px]'>
                        <div className='flex min-w-[18rem] max-w-[20.5rem] w-[87vw] sm:w-[24rem] justify-between'>
                            <div className={`${mainDiv} w-[48%]`}>
                                <label className={labelStyle} htmlFor="numberOfMales">No. of Males</label>
                                <input className='border border-[#808080] w-full rounded-[3px] h-full px-2 p-[5.5px] outline-none text-[0.95rem] tracking-wide bg-[#ffffff] text-black' type="number" name='numberOfMales' value={formData.numberOfMales} onChange={handleChange} />
                            </div>
                            <div className={`${mainDiv} w-[48%]`}>
                                <label className={labelStyle} htmlFor="numberOfFemales">No. of Females</label>
                                <input className='border border-[#808080] w-full rounded-[3px] h-full px-2 p-[5.5px] outline-none text-[0.95rem] tracking-wide bg-[#ffffff] text-black' type="number" name='numberOfFemales' value={formData.numberOfFemales} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='flex min-w-[18rem] max-w-[20.5rem] w-[87vw] sm:w-[24rem] justify-between'>
                            <div className={`${mainDiv} w-[48%]`}>
                                <label className={labelStyle} htmlFor="numberOfChildren">No. of Children</label>
                                <input className='border border-[#808080] w-full rounded-[3px] h-full px-2 p-[5.5px] outline-none text-[0.95rem] tracking-wide bg-[#ffffff] text-black' type="number" name='numberOfChildren' value={formData.numberOfChildren} onChange={handleChange} />
                            </div>
                            <div className={`${mainDiv} w-[48%]`}>
                                <label className={labelStyle} htmlFor="fareType">Fare Type</label>
                                <select name='fareType' value={formData.fareType} onChange={handleChange} className='border border-[#808080] w-full rounded-[3px] h-full px-2 p-[5.5px] outline-none text-[0.95rem] tracking-wide bg-[#ffffff] text-black'>
                                    <option value='km'>Km</option>
                                    <option value='hr'>Hour</option>
                                </select>
                            </div>
                        </div>
                        <div className='flex items-center gap-3 mt-[10px]'>
                            <input type='checkbox' name='returnTrip' className='accent-green-500' checked={formData.returnTrip} onChange={handleChange} />
                            <label className={labelStyle}>Book Return Trip</label>
                        </div>
                        <div className='flex flex-col gap-2 mt-4'>

                            <h3 className='text-[1.04rem] font-semibold'>
                                Total Price: <span className='line-through'>Rs.{formData.originalPrice.toFixed(2)}</span> Rs.{formData.totalPrice.toFixed(2)}
                            </h3>
                        </div>
                        <button onClick={() => setLoaderActive(true)} className='bg-[#685ED4] hover:bg-[#FF4C51] text-white flex items-center justify-center transition-all duration-700 w-full rounded-md p-[6px] font-semibold mt-[10px]'>
                            Book {loaderActive && <div className='ml-4 ease-in-out mt-1 size-[1.25rem] border-[2.4px] border-t-[#46454546] animate-spin rounded-full bottom-0'></div>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default OrderCar
