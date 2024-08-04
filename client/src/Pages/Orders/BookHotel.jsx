import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDriverData, getHotelData, getPriestData } from '../../Redux/Slices/ServiceSlice';
import { FaLocationDot } from 'react-icons/fa6';
import { FaCar, FaHotel, FaRegUserCircle, FaUser } from 'react-icons/fa';
import { MdOutlineAirlineSeatReclineExtra, MdOutlineFreeBreakfast } from 'react-icons/md';
import { bookCar, bookPriest } from '../../Redux/Slices/OrderSlice';
import { toast } from 'react-toastify';
import { getRazorpayId, order, verifyPayment } from '../../Redux/Slices/RazorpaySlice';
import { GiSunPriest } from "react-icons/gi";
import { TiCancel } from 'react-icons/ti';
import { IoBed } from 'react-icons/io5';

const BookHotel = () => {
    const [loaderActive, setLoaderActive] = useState(false);
    const { id } = useParams();
    const { roomId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation()
    const [hotelMainImage, setHotelMainImage] = useState('');


    const { state } = location
    console.log(state)
    const userData = useSelector((state) => state?.auth?.data);
    const hotelData = useSelector((state) => state?.service?.hotelData) || [];

    console.log(state)
    console.log(hotelData)

    const roomData = hotelData?.rooms.find((data) => data._id === roomId);

    useEffect(() => {
        if (hotelData?.proofFiles?.length > 0) {
            setHotelMainImage(hotelData.proofFiles[0].fileUrl);
        }
    }, [hotelData]);

    console.log(roomData)

    const userId = userData?._id;

    const [formData, setFormData] = useState({
        location: '',
        samagri: false,
        fullName: userData?.fullName,
        phoneNumber: userData?.phoneNumber,
        alternateNumber: '',
        totalPrice: 0,
        originalPrice: 0,
    });

    const loadData = async () => {
        await dispatch(getHotelData(id));
    };

    const handleHotelImageClick = (image, index) => {
        setHotelMainImage(image);
    };

    useEffect(() => {
        loadData();
    }, []);



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
        await dispatch(order({ amount: formData.totalPrice }));
    };

    useEffect(() => {
        if (formData.totalPrice > 0) {
            fetchOrderId();
        }
    }, [formData.totalPrice]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (hotelData.servicesData.availability !== "AVAILABLE") {
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

        const { originalPrice, totalPrice, location, phoneNumber, alternateNumber, fareType, fullName, samagri, numberOfChildren, numberOfFemales, numberOfMales } = formData;

        if (
            !originalPrice ||
            !totalPrice ||
            !location ||
            !phoneNumber ||
            !alternateNumber ||
            !fullName
        ) {
            setLoaderActive(false);
            return toast.error("All fields are required");
        }

        if (numberOfChildren === 0 && numberOfMales === 0 && numberOfFemales === 0) {
            setLoaderActive(false);

            return toast.error("Please fill no. of passengers")
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
                    const res = await dispatch(bookPriest({ originalPrice, totalPrice, location, poojaName, phoneNumber, alternateNumber, fullName, samagri, orderDate, orderTime, userId, priestId }));
                    if (res.payload.success) {
                        setLoaderActive(false);
                        toast.success("Order Placed!");
                    }
                    navigate(`/order/priest-book/${userData?._id}`)
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

    const proofFileUrl = hotelData?.proofFiles?.[3]?.fileUrl;


    const mainDiv = 'flex flex-col gap-[0.1px]'
    const labelStyle = "text-[0.83rem] tracking-wide text-[#000] font-[500] ml-[0.5px]"
    const inputStyle = 'min-w-[18rem] max-w-[20.5rem] w-[87vw] sm:w-[24rem] rounded-[3px] h-full px-2 p-[7px] outline-none text-[0.94rem] tracking-wide resize-none bg-white border-[#808080] border '

    return (
        <div className='py-10 bg-[#efefef] flex flex-col items-center justify-center'>
            <div
                data-roomtype={roomData.roomType}
                className='bg-white mb-2 flex flex-col md:border-r-[6px] lg:hover:border-r-[0.5px] border-blue-500 sm:flex-row min-w-[19.5rem] text-black max-w-[20rem] sm:max-w-[45rem] md:max-w-[50rem] lg:max-w-[58.5rem] w-[90vw] hover:from-[#f3fbff] cursor-pointer transition-all duration-500 hover:bg-gradient-to-b hover:to-[#f8fafc] rounded-xl shadow-[0px_5px_10px_-6px_#808080] overflow-hidden'
            >
                <div className='w-full sm:w-[19rem]'>
                    <img
                        src={hotelMainImage}
                        alt="Hotel Main"
                        className='h-[11.5rem] sm:h-[13.5rem] sm:min-w-[17rem] lg:min-w-[19rem] w-full object-cover transition-all duration-500 animate-fadeIn'
                    />
                    <div className='flex justify-between bg-[#eeeeef] p-2'>
                        {hotelData?.proofFiles?.slice(0, 2).map((file, index) => (
                            <img
                                key={index}
                                src={file.fileUrl}
                                alt={`Hotel Proof ${index + 1}`}
                                className={`h-[3rem] w-[23%] rounded object-cover cursor-pointer transition-all duration-300 ${hotelMainImage === file.fileUrl ? 'border-2 border-blue-500 shadow-lg transform scale-105' : ''}`}
                                onClick={() => handleHotelImageClick(file.fileUrl, index)}
                            />
                        ))}
                        {roomData?.roomImage?.slice(0, 2).map((file, index) => (
                            <img
                                key={index}
                                src={file.fileUrl}
                                alt={`Hotel Proof ${index + 1}`}
                                className={`h-[3rem] w-[23%] rounded object-cover cursor-pointer transition-all duration-300 ${hotelMainImage === file.fileUrl ? 'border-2 border-blue-500 shadow-lg transform scale-105' : ''}`}
                                onClick={() => handleHotelImageClick(file.fileUrl, index)}
                            />
                        ))}
                    </div>
                </div>
                <div className='flex flex-col justify-between px-3 pb-2 md:gap-4 md:flex-row'>
                    <div className='lg:w-[25rem]'>

                        <div className='flex items-end gap-1 mt-3'>

                            <h2 className='flex text-[1.2rem] items-center gap-2 font-semibold '><FaHotel />{hotelData?.hotelName}</h2>
                        </div>
                        <h2 className='text-[0.9rem] text-[#383838] font-semibold'>Room type - {roomData?.roomType}</h2>
                        <div className='flex items-center justify-between mt-1'>
                            <h1 className='flex text-[0.85rem] lg:text-[0.95rem] font-semibold items-center text-[#555555] justify-center gap-1'><FaLocationDot className='text-black' />{hotelData?.address}</h1>
                        </div>

                        <div className='flex flex-col items-start gap-1 my-1 mt-3 ml-2 sm:flex-wrap lg:flex-col'>
                            <div className='flex items-center justify-center gap-1  text-[#444444] text-[0.9rem] font-semibold'>
                                <IoBed className='text-black-500 text-[1.2rem]' />
                                {roomData.roomType === "PREMIUM_DELUXE" ? "Maharaja Bed" :
                                    roomData?.roomType === "SINGLE" ? "Single Bed" : "Double Bed"}
                            </div>
                            <div className='flex items-center justify-center gap-1  text-[#444444] text-[0.9rem] font-semibold'>
                                <FaUser className='mx-[2.5px] text-black-500' />
                                {roomData.roomType === "PREMIUM_DELUXE" ? `Max ${roomData?.capacity} guests` :
                                    roomData?.roomType === "SINGLE" ? `Max ${roomData?.capacity} guests` : `Max ${roomData?.capacity} guests`}
                            </div>
                            {roomData.courtyardView &&
                                <div className='flex items-center justify-center gap-1  text-[#444444] text-[0.9rem] font-semibold'>
                                    <img src="https://gos3.ibcdn.com/roomViewIcon-1678093525.png" className='w-[1rem] mx-[2px]' alt="" />
                                    Courtyard View
                                </div>}
                            {roomData.amenities.includes("Breakfast") && (
                                <div className='flex items-center justify-center gap-1 text-[#444444] text-[0.9rem] font-semibold'>
                                    <MdOutlineFreeBreakfast className='text-black-500 text-[1.2rem]' />
                                    {roomData.roomType === "PREMIUM_DELUXE" ? "Free Breakfast + 1 meal" :
                                        roomData.roomType === "SINGLE" ? "Free Breakfast" : "Free Breakfast"}
                                </div>
                            )}
                            <div className='flex items-center justify-center gap-1  text-[#444444] text-[0.9rem] font-semibold'>
                                <TiCancel className=' text-[1.3rem] text-black-500' />
                                No cancellation
                            </div>
                        </div>




                    </div>
                    <div className='flex items-center justify-between mt-1 border-t md:py-4 md:pl-2 md:border-t-0 md:border-l md:ml-2 md:w-[8rem] md:flex-col lg:w-[12rem]'>

                        <div className='flex flex-col items-center justify-center relative top-[-6px]'>
                            <p className='text-[0.7rem] flex flex-col top-3 items-center font-semibold text-[#505050] relative'>&#8377;15000
                                <p className='h-[1.15px] w-[2.4rem] rotate-[-8deg] absolute top-2 bg-red-600'></p>
                            </p>
                            <span className='text-[1.2rem] relative top-2 font-semibold text-[#19B56F]'>&#8377; {roomData?.price}</span>
                            <p> <span className='text-[1rem] text-[#515151] font-semibold'>Per night</span></p>
                        </div>
                        <button className='p-2 px-4 text-white bg-gradient-to-r from-[#1751fe] via-[#0074f9] transition-all duration-300 to-[#0199ff] lg:px-6 hover:shadow-[1px_1px_6px_-2px#808080] rounded text-[0.9rem] font-semibold'>Book Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookHotel
