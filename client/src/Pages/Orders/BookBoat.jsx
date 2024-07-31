import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBoatmanData } from '../../Redux/Slices/ServiceSlice';
import { FaLocationDot } from 'react-icons/fa6';
import { FaCar, FaRegUserCircle } from 'react-icons/fa';
import { MdOutlineAirlineSeatReclineExtra } from 'react-icons/md';
import { bookBoat } from '../../Redux/Slices/OrderSlice';
import { toast } from 'react-toastify';
import { getRazorpayId, order, verifyPayment } from '../../Redux/Slices/RazorpaySlice';

const OrderBoat = () => {
    const [loaderActive, setLoaderActive] = useState(false);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userData = useSelector((state) => state?.auth?.data);
    const boatData = useSelector((state) => state?.service?.boatmanData) || [];
    const razorpayKey = useSelector((state) => state?.razorpay?.key);
    const order_id = useSelector((state) => state?.razorpay?.orderId);

    const userId = userData?._id;
    const boatId = boatData?._id;

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
        fareType: 'seat',
        totalPrice: 0,
        originalPrice: 0,
        arrivalTime: '',
    });

    const loadData = async () => {
        await dispatch(getBoatmanData(id));
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        const calculateTotalPrice = () => {
            const fullBoatFare = boatData?.servicesData?.fullBoatFare || 0;
            const seatFare = boatData?.servicesData?.seatFare || 0;
            let originalPrice = 0;
            let discountedPrice = 0;
            const numberOfKms = 1;

            if (formData.fareType === 'boat') {
                originalPrice = numberOfKms * fullBoatFare;
                discountedPrice = originalPrice - originalPrice * 0.10; // 10% discount
            } else {
                const totalPassengers = Number(formData.numberOfMales) + Number(formData.numberOfFemales);
                const childSeats = Number(formData.numberOfChildren) * 0.5;
                originalPrice = (totalPassengers + childSeats) * seatFare;
                discountedPrice = originalPrice - originalPrice * 0.05; // 5% discount
            }

            setFormData(prevState => ({
                ...prevState,
                originalPrice: originalPrice,
                totalPrice: discountedPrice
            }));
        };

        calculateTotalPrice();
    }, [formData.fareType, formData.numberOfMales, formData.numberOfFemales, formData.numberOfChildren]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };


    const paymentDetails = {
        razorpay_payment_id: "",
        razorpay_order_id: "",
        razorpay_signature: ""
    };

    const fetchOrderId = async () => {
        await dispatch(order({ amount: formData.totalPrice }));
    };

    useEffect(() => {
        if (formData.totalPrice > 0) {
            fetchOrderId();
        }
    }, [formData.totalPrice]);

    const getNextBatchTime = (currentTime) => {
        const currentHours = currentTime.getHours();
        const nextBatchHour = Math.ceil(currentHours / 2) * 2;
        return new Date(currentTime.setHours(nextBatchHour, 0, 0, 0));
    };

    const getAvailableTimes = () => {
        const currentHours = new Date().getHours();
        let times = [];

        if (boatData?.servicesData?.serviceArea.toLowerCase().includes('aarti')) {
            times.push('6:00 PM');
        } else {
            for (let hour = currentHours + 1; hour <= 23; hour++) {
                if (hour % 2 === 0) {
                    let time = new Date();
                    time.setHours(hour, 0, 0, 0);
                    times.push(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
                }
            }
        }

        return times;
    };

    const availableTimes = getAvailableTimes();



    const handleSubmit = async (e) => {
        e.preventDefault();

        const nowDate = new Date();
        const currentHours = nowDate.getHours();

        if (boatData?.servicesData?.serviceArea.toLowerCase().includes('aarti') && currentHours >= 18) {
            return toast.error("Aarti time is over, you are late.");
        }

        if (boatData.servicesData.availability !== "AVAILABLE") {
            navigate('/boat');
            return toast.error("Boatman is busy. Try another.");
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

        const { originalPrice, totalPrice, phoneNumber, alternateNumber, fareType, fullName, numberOfChildren, numberOfFemales, numberOfMales, arrivalTime } = formData;

        if (!originalPrice || !totalPrice || !phoneNumber || !alternateNumber || !fareType || !fullName || numberOfChildren === null || numberOfFemales === null || numberOfMales === null || !arrivalTime) {
            setLoaderActive(false);
            return toast.error("All fields are required.");
        }

        if (numberOfChildren === 0 && numberOfMales === 0 && numberOfFemales === 0) {
            setLoaderActive(false);
            return toast.error("Please fill in the number of passengers.");
        }

        if (Number(numberOfChildren) + Number(numberOfFemales) + Number(numberOfMales) > boatData?.servicesData?.seatingCap) {
            if (Number(numberOfChildren) + Number(numberOfFemales) + Number(numberOfMales) === Number(boatData?.servicesData?.seatingCap) + 1) {
                if (Number(numberOfChildren) > 2) {
                    setLoaderActive(false);
                    return toast.error(`Seating capacity is only ${boatData?.servicesData?.seatingCap}`);
                }
            } else if (Number(numberOfChildren) + Number(numberOfFemales) + Number(numberOfMales) >= boatData?.servicesData?.seatingCap) {
                setLoaderActive(false);
                return toast.error(`Seating capacity is only ${boatData?.servicesData?.seatingCap}`);
            }
        }

        const totalPerson = Number(numberOfChildren) + Number(numberOfFemales) + Number(numberOfMales);
        const area = boatData?.servicesData?.serviceArea;

        if (!order_id) {
            setLoaderActive(false);
            return toast.error("Unable to get order ID. Please try again.");
        }

        const options = {
            key: razorpayKey,
            amount: formData?.totalPrice * 100,
            currency: "INR",
            name: "Name",
            description: "",
            image: "",
            order_id: order_id,
            handler: async function (res) {
                paymentDetails.razorpay_payment_id = res.razorpay_payment_id;
                paymentDetails.razorpay_order_id = res.razorpay_order_id;
                paymentDetails.razorpay_signature = res.razorpay_signature;
                const response = await dispatch(verifyPayment(paymentDetails));
                if (response?.payload?.success) {
                    const res = await dispatch(bookBoat({ originalPrice, area, totalPrice, orderTime, phoneNumber, alternateNumber, fareType, fullName, numberOfChildren, numberOfFemales, numberOfMales, totalPerson, orderDate, arrivalTime, userId, boatId }));
                    if (res.payload.success) {
                        setLoaderActive(false);
                        toast.success("Order Placed!");
                    }
                    navigate(`/order/boat-book/${userData?._id}`);
                }
            },
            prefill: {
                name: userData?.fullName,
                email: userData?.email,
                contact: userData?.phoneNumber
            },
            notes: {
                address: "Address"
            },
            theme: {
                color: "#3399cc"
            }
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };


    const proofFileUrl = boatData?.proofFiles?.[3]?.fileUrl;


    const mainDiv = 'flex flex-col gap-[0.1px]'
    const labelStyle = "text-[0.83rem] tracking-wide text-[#000] font-[500] ml-[0.5px]"
    const inputStyle = 'min-w-[18rem] max-w-[20.5rem] w-[87vw] sm:w-[24rem] rounded-[3px] h-full px-2 p-[7px] outline-none text-[0.94rem] tracking-wide resize-none bg-white border-[#808080] border '

    return (
        <div className='from-[#ddfcee] bg-gradient-to-b via-[#f7fffb] to-white py-10 flex flex-col items-center justify-center'>
            <div className='overflow-hidden rounded-xl shadow-[0px_0px_5px_#808080] via-[#ecfff6] from-[#d0f7e6] bg-gradient-to-b to-[#f7fffb]'>
                <div className='flex flex-col w-full overflow-hidden text-black border-b md:items-end md:flex-row md:gap-6 border-[#8080803b]'>
                    <div>
                        {proofFileUrl ? (
                            <img src={proofFileUrl} alt="Proof" className='h-[15rem] w-full md:w-[22rem] object-cover' />
                        ) : (
                            <div className='h-[15rem] w-full bg-gray-200 flex items-center md:w-[22rem] justify-center'>
                                <span>No Image Available</span>
                            </div>
                        )}
                    </div>
                    <div className='p-3 w-full md:w-[20.5rem]'>

                        <div className='flex items-center justify-start my-1'>
                            <h2 className='text-[1.1rem] font-semibold'>{boatData?.servicesData?.serviceArea.toLowerCase().includes('aarti') && "Arrival time: 6:00 PM"}</h2>
                        </div>
                        <div className='flex items-center justify-between my-2'>
                            <h2 className='text-[1.1rem] font-semibold'>{boatData?.boatType}</h2>
                            <h2 className='flex items-center gap-1'><MdOutlineAirlineSeatReclineExtra />{boatData?.servicesData?.seatingCap}/{boatData?.servicesData?.allotedSeat}</h2>
                        </div>
                        <div className='flex items-center justify-between my-2'>
                            <h1 className='flex items-center justify-center gap-2'><FaRegUserCircle />{boatData?.fullName}</h1>
                            <h2>{boatData?.age} years</h2>
                        </div>
                        <div className='flex items-center justify-between my-2'>
                            <h1 className='flex items-center justify-center gap-2'><FaCar />Experience</h1>
                            <h2>{boatData?.experience} years</h2>
                        </div>
                        <div className='flex items-center justify-between my-2'>
                            <h1 className='flex items-center justify-center gap-2'><FaLocationDot />{boatData?.servicesData?.serviceArea}</h1>
                        </div>
                        <div className='flex items-center justify-between pt-3 mt-3 border-t'>
                            {boatData?.servicesData?.allotedSeat === boatData?.servicesData?.seatingCap && <h3>
                                <span className='text-[1.02rem] font-semibold text-[#19B56F]'>Rs.{boatData?.servicesData?.fullBoatFare}</span> / boat
                            </h3>}
                            <h3>
                                <span className='text-[1.02rem] font-semibold text-[#19B56F]'>Rs.{boatData?.servicesData?.seatFare}</span> / seat
                            </h3>
                        </div>
                    </div>
                </div>
                <form className='flex flex-col p-4 text-black sm:p-6 md:items-end md:flex-row w-fit md:gap-6' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-[5px]'>
                        <h3 className='text-[1.1rem] font-semibold mb-2 border-b w-fit border-[#9e9e9e]'>Booking Details</h3>
                        <div className='mb-1'>
                            <label className='block text-sm font-medium text-gray-700'>Arrival Time</label>
                            <select
                                name='arrivalTime'
                                value={formData.arrivalTime}
                                onChange={handleChange}
                                className='border border-[#808080] w-full rounded-[3px] h-full px-2 p-[5.5px] outline-none text-[0.95rem] tracking-wide bg-[#ffffff] text-black'
                                required
                            >
                                <option value=''>Select Arrival Time</option>
                                {availableTimes.map((time, index) => (
                                    <option key={index} value={time}>{time}</option>
                                ))}
                            </select>
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
                                <label className={labelStyle} htmlFor="fareType">Fare Type</label>
                                <select name='fareType' value={formData.fareType} onChange={handleChange} className='border border-[#808080] w-full rounded-[3px] h-full px-2 p-[5.5px] outline-none text-[0.95rem] tracking-wide bg-[#ffffff] text-black'>
                                    <option value='seat'>Seat</option>
                                    {boatData?.servicesData?.allotedSeat === boatData?.servicesData?.seatingCap && <option value='boat'>Boat</option>}
                                </select>
                            </div>
                            <div className={`${mainDiv} w-[48%]`}>
                                <label className={labelStyle} htmlFor="numberOfChildren">No. of Children</label>
                                <input className='border border-[#808080] w-full rounded-[3px] h-full px-2 p-[5.5px] outline-none text-[0.95rem] tracking-wide bg-[#ffffff] text-black' type="number" name='numberOfChildren' value={formData.numberOfChildren} onChange={handleChange} />
                            </div>

                        </div>
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

export default OrderBoat
