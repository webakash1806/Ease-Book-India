import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getHotelData } from '../../Redux/Slices/ServiceSlice';
import { FaLocationDot } from 'react-icons/fa6';
import { FaHotel, FaUser } from 'react-icons/fa';
import { MdOutlineFreeBreakfast } from 'react-icons/md';
import { bookHotel, bookPriest } from '../../Redux/Slices/OrderSlice';
import { toast } from 'react-toastify';
import { getRazorpayId, order, verifyPayment } from '../../Redux/Slices/RazorpaySlice';
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
    const [totalNight, setTotalNight] = useState(1)

    const { state } = location

    const hotelId = id
    console.log(state)
    const userData = useSelector((state) => state?.auth?.data);
    const hotelData = useSelector((state) => state?.service?.hotelData) || [];

    const roomData = hotelData?.rooms.find((data) => data._id === roomId);

    useEffect(() => {
        if (hotelData?.proofFiles?.length > 0) {
            setHotelMainImage(hotelData.proofFiles[0].fileUrl);
        }
    }, [hotelData]);

    const userId = userData?._id;

    const [formData, setFormData] = useState({
        fullName: userData?.fullName || '',
        phoneNumber: userData?.phoneNumber || '',
        alternateNumber: '',
        adults: 0,
        children: 0,
        checkIn: "",
        checkOut: "",
        totalRoom: 1,
        food: "",
        discount: 0,
        priceBeforeDis: 0,
        priceAfterDis: 0,
        tax: 0,
        totalAmt: 0,
    });


    console.log(formData)
    useEffect(() => {
        const calculateTotalPrice = () => {
            const inDate = formData.checkIn === "" ? new Date() : new Date(formData.checkIn)
            const outDate = formData.checkOut === "" ? new Date() : new Date(formData.checkOut)
            const checkInDate = inDate;
            const checkOutDate = outDate;
            const nights = (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24);

            let nightsToCharge = nights < 1 ? 1 : nights;

            setTotalNight(nightsToCharge)

            let roomCost = roomData.price * formData.totalRoom * nightsToCharge;

            if (formData.food === "Meal") {
                roomCost += 300 * nightsToCharge;
            } else if (formData.food === "Breakfast") {
                roomCost += 200 * nightsToCharge;
            } else if (formData.food === "Breakfast + Meal") {
                roomCost += 500 * nightsToCharge;
            }

            const discount = roomCost * 0.25
            console.log(discount)
            const priceAfterDis = roomCost - discount;
            const tax = priceAfterDis * 0.12;
            const totalAmt = priceAfterDis + tax;



            setFormData({
                ...formData,
                priceBeforeDis: roomCost,
                priceAfterDis,
                tax: tax,
                totalAmt,
                discount: discount
            });


        };



        calculateTotalPrice();
    }, [formData.checkIn, formData.checkOut, formData.food, formData.totalRoom])



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    };


    const handleChangeCheck = (e) => {
        const { name, value, type, checked } = e.target;

        if (checked) {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: "" }));
        }
    };


    const loadData = async () => {
        await dispatch(getHotelData(id));
    };

    const handleHotelImageClick = (image, index) => {
        setHotelMainImage(image);
    };

    useEffect(() => {
        loadData();
    }, []);



    const razorpayKey = useSelector((state) => state?.razorpay?.key);
    const order_id = useSelector((state) => state?.razorpay?.orderId);

    const paymentDetails = {
        razorpay_payment_id: "",
        razorpay_order_id: "",
        razorpay_signature: ""
    };

    const fetchOrderId = async () => {
        await dispatch(order({ amount: formData.totalAmt, id: hotelId, forName: "HOTEL" }));
    };

    useEffect(() => {
        if (formData.totalAmt > 0) {
            fetchOrderId();
        }
    }, [formData.totalAmt]);

    const handleSubmit = async (e) => {
        e.preventDefault();



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

        const { adults, fullName, phoneNumber, alternateNumber, children, food, totalRoom, totalAmt, checkIn, priceBeforeDis, checkOut } = formData;

        if (
            !fullName ||
            !phoneNumber ||
            !alternateNumber ||
            !totalRoom ||
            !totalAmt ||
            !checkIn ||
            !checkOut
        ) {
            setLoaderActive(false);
            return toast.error("All fields are required");
        }

        if (children == 0 && adults == 0) {
            setLoaderActive(false);

            return toast.error("Please fill no. of guests")
        }

        if (!order_id) {
            setLoaderActive(false);
            return toast.error("Unable to get order ID. Please try again.");
        }

        const data = { adults, fullName, phoneNumber, alternateNumber, totalNight, checkIn, checkOut, children, food, totalAmt, totalRoom, userId, roomId, hotelId, orderDate, orderTime, priceBeforeDis }


        const options = {
            key: razorpayKey, // Enter the Key ID generated from the Dashboard
            amount: formData?.totalAmt * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
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
                    const res = await dispatch(bookHotel(data));
                    if (res.payload.success) {
                        setLoaderActive(false);
                        toast.success("Order Placed!");
                    }
                    navigate(`/order/hotel-book/${userData?._id}`)
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



    const inputStyle = "block w-full px-2 py-1 border border-gray-300 rounded shadow-sm text-black  focus:outline-none focus:ring-primary focus:border-primary sm:text-[0.95rem] bg-[white]"

    return (
        <div className='py-10 bg-[#f7f7f7] flex flex-col items-center justify-center'>
            <div className='flex flex-col items-center justify-center gap-2'>
                <div className='flex flex-wrap items-center justify-center gap-1'>
                    <div
                        className='bg-white lg:h-[28rem]  pb-2 h-[27rem] flex flex-col md:border-b-[6px] lg:hover:border-b-[0.5px] border-blue-500  min-w-[19.5rem] text-black max-w-[21rem] w-[90vw] hover:from-[#f3fbff] cursor-pointer transition-all duration-500 hover:bg-gradient-to-b hover:to-[#f8fafc] rounded-xl shadow-[0px_5px_10px_-6px_#808080] overflow-hidden'
                    >
                        <div className='w-full'>
                            <img
                                src={hotelMainImage}
                                alt="Hotel Main"
                                className='h-[12rem]  w-full object-cover transition-all duration-500 animate-fadeIn'
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
                        <div className='flex flex-col justify-between px-3 md:gap-4 md:flex-row'>
                            <div className='lg:w-[25rem]'>

                                <div className='flex items-end gap-1 mt-3'>

                                    <h2 className='flex text-[1.2rem] items-center gap-2 font-semibold '><FaHotel />{hotelData?.hotelName}</h2>
                                </div>
                                <h2 className='text-[0.9rem] text-[#383838] font-semibold'>Room type - {roomData?.roomType}</h2>
                                <div className='flex items-center justify-between mt-1'>
                                    <h1 className='flex text-[0.85rem] lg:text-[0.95rem] font-semibold items-center text-[#555555] justify-center gap-1'><FaLocationDot className='text-black' />{hotelData?.address}</h1>
                                </div>

                                <div className='flex flex-wrap items-start gap-1 mt-2 ml-2 '>
                                    <div className='flex items-center justify-center gap-1 mr-6  text-[#444444] text-[0.9rem] font-semibold'>
                                        <IoBed className='text-black-500 text-[1.2rem]' />
                                        {roomData.roomType === "PREMIUM_DELUXE" ? "Maharaja Bed" :
                                            roomData?.roomType === "SINGLE" ? "Single Bed" : "Double Bed"}
                                    </div>
                                    <div className='flex items-center justify-center gap-1  mr-4 text-[#444444] text-[0.9rem] font-semibold'>
                                        <FaUser className='mx-[2.5px] text-black-500' />
                                        {roomData.roomType === "PREMIUM_DELUXE" ? `Max ${roomData?.capacity} guests` :
                                            roomData?.roomType === "SINGLE" ? `Max ${roomData?.capacity} guests` : `Max ${roomData?.capacity} guests`}
                                    </div>

                                    {roomData.amenities.includes("Breakfast") && (
                                        <div className='flex items-center justify-center gap-1 text-[#444444] text-[0.9rem] font-semibold'>
                                            <MdOutlineFreeBreakfast className='text-black-500 text-[1.2rem]' />
                                            {roomData.roomType === "PREMIUM_DELUXE" ? "Free Breakfast + 1 meal" :
                                                roomData.roomType === "SINGLE" ? "Free Breakfast" : "Free Breakfast"}
                                        </div>
                                    )}
                                    {roomData.courtyardView &&
                                        <div className='flex items-center justify-center gap-1  mr-6 text-[#444444] text-[0.9rem] font-semibold'>
                                            <img src="https://gos3.ibcdn.com/roomViewIcon-1678093525.png" className='w-[1rem] mx-[2px]' alt="" />
                                            Courtyard View
                                        </div>}
                                    <div className='flex items-center justify-center gap-1  text-[#444444] text-[0.9rem] font-semibold'>
                                        <TiCancel className=' text-[1.3rem] text-black-500' />
                                        No cancellation
                                    </div>
                                </div>




                            </div>

                        </div>
                    </div>
                    <div
                        className='h-[27rem] lg:h-[28rem]  flex flex-col md:border-b-[6px] lg:hover:border-b-[0.5px] bg-[#f5f5f5] border-blue-500  min-w-[19.5rem] text-black max-w-[21rem] w-[90vw]  cursor-pointer transition-all duration-500 hover:bg-gradient-to-b  rounded-xl shadow-[0px_5px_10px_-6px_#808080] overflow-hidden'
                    >
                        <form action="" className="flex flex-col gap-1 p-3">
                            <h1 className="text-2xl font-bold ">Enter details</h1>
                            <div className='flex items-center gap-1 mb-2'>
                                <div>
                                    <div className='w-[2.5rem] h-[5px] rounded-full bg-black'></div>
                                </div>
                                <div>
                                    <div className='w-[1.2rem] h-[5px] rounded-full bg-black'></div>
                                </div>
                                <div>
                                    <div className='size-[5px] rounded-full bg-black'></div>
                                </div>
                            </div>
                            <div className=''>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input type="text" id="fullName" className={inputStyle}
                                    name='fullName'
                                    value={formData.fullName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='flex justify-between gap-4 '>
                                <div className='w-1/2'>
                                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                    <input type="number" id="phoneNumber"
                                        name='phoneNumber'
                                        className={inputStyle}
                                        value={formData.phoneNumber}
                                        onChange={handleChange} />
                                </div>
                                <div className='w-1/2'>
                                    <label htmlFor="alternateNumber" className="block text-sm font-medium text-gray-700">Alternate Number</label>
                                    <input type="number" id="alternateNumber"
                                        name='alternateNumber'
                                        className={inputStyle}
                                        value={formData.alternateNumber}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className='flex justify-between gap-4 '>
                                <div className='w-1/2'>
                                    <label htmlFor="adults" className="block text-sm font-medium text-gray-700">No. of Adults</label>
                                    <input type="number" id="adults" className={inputStyle}
                                        name='adults'

                                        value={formData.adults}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='w-1/2'>
                                    <label htmlFor="children" className="block text-sm font-medium text-gray-700">No. of Children</label>
                                    <input type="number"
                                        name='children'

                                        id="children" className={inputStyle}
                                        value={formData.children}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className='flex justify-between gap-4 '>
                                <div className='w-[47.5%]'>
                                    <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700">Check-in</label>
                                    <input type="date" id="checkIn"
                                        name='checkIn'
                                        className={inputStyle}
                                        value={formData.checkIn}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='w-[47.5%]'>
                                    <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700">Check-out</label>
                                    <input type="date" id="checkOut" className={inputStyle}
                                        name='checkOut'

                                        value={formData.checkOut}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className=''>
                                <label htmlFor="totalRoom" className="block text-sm font-medium text-gray-700">No of rooms</label>
                                <select id="totalRoom"
                                    value={formData.totalRoom}
                                    onChange={handleChange}
                                    name='totalRoom'
                                    className={inputStyle}>
                                    {Array.from({ length: roomData.totalRoom }, (_, i) => (
                                        <option key={i} value={i + 1}>{i + 1}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='pt-1'>
                                {roomData?.roomType !== "PREMIUM_DELUXE" && (
                                    roomData.amenities.includes("Breakfast") ? (
                                        <div className='flex items-center gap-2'>
                                            <input
                                                type="checkbox"
                                                name="food"
                                                value="Meal"
                                                checked={formData.food === "Meal"}
                                                onChange={handleChangeCheck}
                                            />
                                            <label htmlFor="food" className="text-sm font-medium text-gray-700">
                                                Include Meal?
                                            </label>
                                        </div>
                                    ) : (
                                        <>
                                            <div className='flex items-center gap-2'>
                                                <input
                                                    type="checkbox"
                                                    name="food"
                                                    value="Breakfast"
                                                    checked={formData.food === "Breakfast"}
                                                    onChange={handleChangeCheck}
                                                />
                                                <label htmlFor="food" className="text-sm font-medium text-gray-700">
                                                    Include Breakfast?
                                                </label>
                                            </div>
                                            <div className='flex items-center gap-2'>
                                                <input
                                                    type="checkbox"
                                                    name="food"
                                                    value="Meal"
                                                    checked={formData.food === "Meal"}
                                                    onChange={handleChangeCheck}
                                                />
                                                <label htmlFor="food" className="text-sm font-medium text-gray-700">
                                                    Include Meal?
                                                </label>
                                            </div>
                                            <div className='flex items-center gap-2'>
                                                <input
                                                    type="checkbox"
                                                    name="food"
                                                    value="Breakfast + Meal"
                                                    checked={formData.food === "Breakfast + Meal"}
                                                    onChange={handleChangeCheck}
                                                />
                                                <label htmlFor="food" className="text-sm font-medium text-gray-700">
                                                    Include Meal + Breakfast?
                                                </label>
                                            </div>
                                        </>
                                    )
                                )}
                            </div>

                        </form>

                    </div>
                </div>

                <div
                    className=' p-3 gap-2 flex flex-col md:border-b-[6px] lg:hover:border-b-[0.5px] bg-[white] border-blue-500  min-w-[19.5rem] text-black sm:max-w-[42rem] max-w-[21rem] w-[90vw] sm:w-[100vw] justify-start cursor-pointer transition-all duration-500 hover:bg-gradient-to-b  rounded-xl shadow-[0px_5px_10px_-6px_#808080] overflow-hidden'
                >
                    <h1 className="text-2xl font-bold ">Price Breakup</h1>
                    <div className='flex items-center gap-1 mb-2'>
                        <div>
                            <div className='w-[2.5rem] h-[5px] rounded-full bg-black'></div>
                        </div>
                        <div>
                            <div className='w-[1.2rem] h-[5px] rounded-full bg-black'></div>
                        </div>
                        <div>
                            <div className='size-[5px] rounded-full bg-black'></div>
                        </div>
                    </div>
                    <div className='flex flex-col justify-between gap-2 sm:items-end sm:flex-row'>
                        <div className='flex flex-col sm:gap-[12.5px] gap-2 sm:w-[45%]'>

                            <div className='flex justify-between pb-1 border-b'>
                                <h3>{formData.totalRoom} Room * {totalNight} Nights</h3>
                                <p className='font-semibold '>Rs. {formData.priceBeforeDis}</p>
                            </div>
                            <div className='flex justify-between pb-1 border-b'>

                                <h3>Total Discount</h3>
                                <p className='font-semibold '>Rs. {formData.discount}</p>
                            </div>

                            <div className='flex justify-between pb-1'>

                                <h3>Price after Discount</h3>
                                <p className='font-semibold '>Rs.{formData.priceAfterDis}</p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 sm:w-[48%]'>

                            <div className='flex justify-between pb-1 border-b'>
                                <h3>Taxes & Service Fess</h3>
                                <p className='font-semibold '>Rs. {formData.tax}</p>
                            </div>

                            <div className='flex justify-between pb-1 border-b'>

                                <h3>Amount to be paid</h3>
                                <p className='font-semibold '>Rs.{formData.totalAmt}</p>
                            </div>
                            <button onClick={handleSubmit} className='p-2 px-4 text-white bg-gradient-to-r w-full from-[#1751fe] via-[#0074f9] transition-all duration-300 to-[#0199ff] lg:px-6 hover:shadow-[1px_1px_6px_-2px#808080] rounded text-[0.9rem] font-semibold'>Book Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default BookHotel
