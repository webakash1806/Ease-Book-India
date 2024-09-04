import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGuiderData } from '../../Redux/Slices/ServiceSlice';
import { FaArrowLeft } from 'react-icons/fa6';
import { bookGuider } from '../../Redux/Slices/OrderSlice';
import { toast } from 'react-toastify';
import { order, verifyPayment } from '../../Redux/Slices/RazorpaySlice';
import guiderIcon from "../../assets/Images/guiderIcon.png"
import SocialCard from '../../Components/SocialCard';

const BookGuider = () => {
    const [loaderActive, setLoaderActive] = useState(false);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation()

    const { state } = location
    console.log(state)
    const userData = useSelector((state) => state?.auth?.data);
    const guiderData = useSelector((state) => state?.service?.guiderData) || [];

    console.log(guiderData)

    const userId = userData?._id;
    const guiderId = guiderData?._id;

    const [formData, setFormData] = useState({
        location: '',
        fullName: userData?.fullName,
        phoneNumber: userData?.phoneNumber,
        alternateNumber: '',
        totalPrice: 0,
        originalPrice: 0,
    });

    const loadData = async () => {
        await dispatch(getGuiderData(id));
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        const calculateTotalPrice = () => {
            const price = Number(state.state.place.price) + Number(guiderData?.servicesData?.fare)


            let originalPrice = price;
            let discountedPrice = originalPrice - originalPrice * 0.10; // 10% discount

            setFormData(prevState => ({
                ...prevState,
                originalPrice: originalPrice,
                totalPrice: discountedPrice
            }));
        };

        calculateTotalPrice();
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
        await dispatch(order({ amount: formData.totalPrice, id: guiderId, forName: "GUIDER" }));
    };

    useEffect(() => {
        if (formData.totalPrice > 0) {
            fetchOrderId();
        }
    }, [formData.totalPrice]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (guiderData.servicesData.availability !== "AVAILABLE") {
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

        const { originalPrice, totalPrice, location, phoneNumber, alternateNumber, fullName } = formData;

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


        const placeName = state.state.place.name

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
                    const res = await dispatch(bookGuider({ originalPrice, totalPrice, location, placeName, phoneNumber, alternateNumber, fullName, orderDate, orderTime, userId, guiderId }));
                    if (res.payload.success) {
                        setLoaderActive(false);
                        toast.success("Order Placed!");
                    }
                    navigate(`/order/guider-book/${userData?._id}`)
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


    const mainDiv = 'flex flex-col gap-[0.1px]'
    const labelStyle = "text-[0.83rem] tracking-wide text-[#000] font-[500] ml-[0.5px]"
    const inputStyle = 'min-w-[18rem] max-w-[20.5rem] w-[87vw] sm:w-[24rem] rounded-[3px] h-full px-2 p-[7px] outline-none text-[0.94rem] tracking-wide resize-none bg-white border-[#808080] border '

    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Guider place', href: '/place-list' },
        { label: 'Book', },
    ];

    return (
        <>
            <div className='relative'>
                <SocialCard item={breadcrumbItems} icon={"guider"} title={"Book Guider"} des={"Confirm your booking by submitting booking details."} />

            </div>
            <div className='from-[#e7eafd] bg-gradient-to-b via-[#f7f7fb] to-white p-4 py-8 flex flex-wrap items-center justify-center'>
                <div className='overflow-hidden rounded-xl shadow-[3px_6px_15px_-8px#808080] '>
                    <div className='flex py-3 via-[#ecfff6] from-[#d0f7e6] bg-gradient-to-b to-[#f7fffb] w-full overflow-hidden text-black  items-center justify-center '>

                        <img className='w-[4rem] mr-4' src={guiderIcon} alt="" />
                        <div>
                            <h2 className='text-xl font-semibold'>{guiderData?.fullName || 'Priest Name'}</h2>
                            <h3>{state.state.place.name}</h3>
                            <div className='text-sm text-gray-600'>
                                <div><strong>Pooja cost : </strong> {Number(state.state.place.price) + Number(guiderData?.servicesData?.fare) || 'N/A'}</div>

                            </div>
                        </div>
                    </div>
                    <form className='flex flex-col p-4 pt-2 text-black bg-white w-fit ' onSubmit={handleSubmit}>
                        <h3 className='text-[1.1rem] font-semibold mb-2 border-b w-fit border-[#9e9e9e]'>Booking Details</h3>
                        <div className={mainDiv}>
                            <label className={labelStyle}>Location to start</label>
                            <input type='text' name='location' value={formData?.location} onChange={handleChange} className={inputStyle} />
                        </div>
                        <div className={mainDiv}>
                            <label className={labelStyle}>Full Name</label>
                            <input type='text' name='fullName' value={formData?.fullName} onChange={handleChange} className={inputStyle} />
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

                        <div className='flex flex-col gap-2 mt-4'>

                            <h3 className='text-[1.04rem] font-semibold'>
                                Total Price: <span className='line-through'>Rs.{formData?.originalPrice}</span> Rs.{formData?.totalPrice.toFixed(2)}
                            </h3>
                        </div>
                        <button onClick={() => setLoaderActive(true)} className='bg-[#685ED4] hover:bg-[#FF4C51] text-white flex items-center justify-center transition-all duration-700 w-full rounded-md p-[6px] font-semibold mt-[10px]'>
                            Book {loaderActive && <div className='ml-4 ease-in-out mt-1 size-[1.25rem] border-[2.4px] border-t-[#46454546] animate-spin rounded-full bottom-0'></div>}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default BookGuider
