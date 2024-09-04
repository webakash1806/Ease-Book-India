import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getHotelData } from '../../Redux/Slices/ServiceSlice';
import { MdOutlineFreeBreakfast, MdRestaurantMenu } from 'react-icons/md';
import { FaHotel, FaParking, FaSwimmingPool, FaUser, FaWifi } from 'react-icons/fa';
import { FaArrowLeft, FaLocationDot } from 'react-icons/fa6';
import { IoBed } from "react-icons/io5";
import { GrLounge } from "react-icons/gr";
import { CgGym } from "react-icons/cg";
import { TiCancel } from "react-icons/ti";
import SocialCard from '../../Components/SocialCard';

const roomTypes = {
    SINGLE: 'Single',
    DOUBLE: 'Double',
    DELUXE_DOUBLE: 'Deluxe Double',
    PREMIUM_DELUXE: 'Premium Deluxe',
};

const HotelsWithRoom = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const hotelData = useSelector((state) => state?.service?.hotelData) || [];
    const [hotelMainImage, setHotelMainImage] = useState('');
    const [selectedRoomType, setSelectedRoomType] = useState('SINGLE');
    const navigate = useNavigate()
    const [roomImages, setRoomImages] = useState({});
    const [activeImageIndices, setActiveImageIndices] = useState({});

    const roomRefs = useRef({});

    const loadData = async () => {
        await dispatch(getHotelData(id));
    };

    useEffect(() => {
        loadData();
    }, [id]);

    useEffect(() => {
        if (hotelData?.proofFiles?.length > 0) {
            setHotelMainImage(hotelData.proofFiles[0].fileUrl);
        }
    }, [hotelData]);

    useEffect(() => {
        if (hotelData?.rooms?.length > 0) {
            const roomImagesState = {};
            const activeIndicesState = {};
            hotelData.rooms.forEach((room) => {
                if (room.roomImage.length > 0) {
                    roomImagesState[room.roomType] = room.roomImage[0].fileUrl;
                    activeIndicesState[room.roomType] = 0;
                }
            });
            setRoomImages(roomImagesState);
            setActiveImageIndices(activeIndicesState);
        }
    }, [hotelData]);

    const handleHotelImageClick = (image, index) => {
        setHotelMainImage(image);
    };

    const handleRoomImageClick = (roomType, image, index) => {
        setRoomImages((prev) => ({ ...prev, [roomType]: image }));
        setActiveImageIndices((prev) => ({ ...prev, [roomType]: index }));
    };

    const handleRoomTypeClick = (roomType) => {
        setSelectedRoomType(roomType);
        // Scroll to the room section with margin at the top
        const roomSection = roomRefs.current[roomType];
        if (roomSection) {
            window.scrollTo({
                top: roomSection.offsetTop - 120,
                behavior: 'smooth'
            });
        }
    };
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setSelectedRoomType(entry.target.dataset.roomtype);
                    }
                });
            },
            {
                root: null,
                rootMargin: '-50% 0px -50% 0px',
                threshold: 0,
            }
        );

        Object.values(roomRefs.current).forEach((section) => {
            if (section) {
                observer.observe(section);
            }
        });

        return () => {
            Object.values(roomRefs.current).forEach((section) => {
                if (section) {
                    observer.unobserve(section);
                }
            });
        };
    }, [hotelData]);


    const [selectedAmenities, setSelectedAmenities] = useState({});

    // ... other functions ...

    const handleAmenityChange = (roomType, amenity) => {
        setSelectedAmenities((prev) => {
            if (prev[roomType] === amenity) {
                return { ...prev, [roomType]: "" };
            } else {
                return { ...prev, [roomType]: amenity };
            }
        });
    };

    const handleBookBtn = (id, roomId) => {
        console.log(`/hotel-book/hotel/${id}/room/${roomId}`)
        navigate(`/hotel-book/hotel/${id}/room/${roomId}`, { state: selectedAmenities })
    }


    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Hotels', href: '/hotels' },
        { label: 'Select room', },
    ];

    return (
        <>
            <div className='relative'>
                <SocialCard item={breadcrumbItems} icon={"hotel"} title={"Book Hotel"} des={"Select room of your best choice to proceed further bookings."} />

            </div>
            <div className='from-[#e7eafd] bg-gradient-to-b via-[#f7f7fb] to-white p-4 py-8 flex flex-wrap items-center justify-center'>
                {/* Hotel Details Section */}
                <div className='bg-white flex flex-col md:border-r-[6px] lg:hover:border-r-[0.5px] border-blue-500 sm:flex-row min-w-[19.5rem] text-black max-w-[20rem] sm:max-w-[45rem] md:max-w-[50rem] lg:max-w-[58.5rem] w-[90vw] hover:from-[#f3fbff] cursor-pointer transition-all duration-500 hover:bg-gradient-to-b hover:to-[#f8fafc] rounded-xl shadow-[0px_5px_10px_-6px_#808080] overflow-hidden mb-1'>
                    <div className='w-full sm:w-[19rem]'>
                        <img
                            src={hotelMainImage}
                            alt="Hotel Main"
                            className='h-[11.5rem] sm:h-[13.5rem] sm:min-w-[17rem] lg:min-w-[19rem] w-full object-cover transition-all duration-500 animate-fadeIn'
                        />
                        <div className='flex justify-between bg-[#eeeeef] p-2'>
                            {hotelData?.proofFiles?.slice(0, 4).map((file, index) => (
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
                    <div className='flex flex-col justify-between px-3 pb-2 lg:gap-4 lg:flex-row'>
                        <div className='lg:w-[25rem]'>
                            <div className='flex items-center justify-between mt-3'>
                                <h2 className='text-[1.2rem] lg:text-[1.45rem] font-semibold'>{hotelData?.hotelName}</h2>
                                <h2 className='flex items-center gap-1 '><FaHotel />{hotelData?.servicesData?.roomType}</h2>
                            </div>
                            <div className='flex items-center justify-between mt-1'>
                                <h1 className='flex text-[0.85rem] lg:text-[0.95rem] font-semibold items-center text-[#555555] justify-center gap-1'><FaLocationDot className='text-black' />{hotelData?.address}</h1>
                            </div>
                            <div className='flex items-center justify-between my-1 '>
                                <p className='text-[0.8rem] lg:text-[0.87rem] '>{hotelData?.description}</p>
                            </div>
                            <div className='flex flex-wrap'>
                                <div className='flex items-center mr-4 justify-center gap-1 text-[0.87rem] text-[#6e6d6d] font-semibold'>
                                    <FaWifi className='' />
                                    Free Wifi
                                </div>
                                <div className='flex items-center mr-4  justify-center gap-1 text-[0.87rem] text-[#6e6d6d] font-semibold'>
                                    <FaSwimmingPool className='' />
                                    <p>Swimming Pool</p>
                                </div>
                                <div className='flex items-center mr-4  justify-center gap-1 text-[0.87rem] text-[#6e6d6d] font-semibold'>
                                    <FaParking className='' />
                                    <p>Free Parking</p>
                                </div>
                                <div className='flex items-center mr-4  justify-center gap-1 text-[0.87rem] text-[#6e6d6d] font-semibold'>
                                    <MdRestaurantMenu className='' />
                                    <p>Restaurant</p>
                                </div>
                                <div className='flex items-center mr-4  justify-center gap-1 text-[0.87rem] text-[#6e6d6d] font-semibold'>
                                    <GrLounge className='' />
                                    <p>Lounge</p>
                                </div>
                                <div className='flex items-center mr-4  justify-center gap-1 text-[0.87rem] text-[#6e6d6d] font-semibold'>
                                    <CgGym className='' />
                                    <p>Gym</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center justify-between mt-1 border-t lg:py-4 lg:pl-4 lg:border-t-0 lg:border-l lg:ml-6 lg:w-[10rem] lg:flex-col'>
                            <button className='p-2 px-3 text-white bg-gradient-to-r from-[#1751fe] via-[#0074f9] transition-all duration-300 to-[#0199ff] lg:px-4 hover:shadow-[1px_1px_6px_-2px#808080] rounded text-[0.9rem] font-semibold'>4 Room Types</button>
                            <div className='flex flex-col items-center justify-center relative top-[-6px]'>
                                <p className='text-[0.7rem] flex flex-col top-3 items-center font-semibold text-[#505050] relative'>&#8377;15000
                                    <p className='h-[1.15px] w-[2.4rem] rotate-[-8deg] absolute top-2 bg-red-600'></p>
                                </p>
                                <span className='text-[1.2rem] relative top-2 font-semibold text-[#19B56F]'>&#8377; 1500</span>
                                <p> <span className='text-[1rem] text-[#515151] font-semibold'>Per night</span></p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='bg-[#ffffff80] backdrop-blur-lg mb-2 flex flex-col sm:flex-row min-w-[19.5rem] text-black max-w-[20rem] sm:max-w-[45rem] md:max-w-[50rem] lg:max-w-[58.5rem] w-[90vw]  sticky top-[4.1rem] z-[10] p-2 cursor-pointer transition-all duration-500 hover:bg-gradient-to-b  rounded shadow-[0px_5px_10px_-6px_#808080] overflow-hidden gap-2 sm:items-center justify-start sm:px-4 md:px-6 '>
                    <p className='font-semibold md:text-[1.1rem]'>Room type : </p>
                    <div className='flex flex-wrap gap-1 '>
                        {Object.entries(roomTypes).map(([key, label]) => (
                            <button
                                key={key}
                                className={`px-1 py-1 font-semibold rounded border border-gray-300 sm:px-2 md:px-3 flex items-center sm:text-[0.84rem] md:text-[0.95rem] text-[0.783rem] lg:text-[1rem] justify-center transition-all duration-300 ${selectedRoomType === key ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
                                onClick={() => handleRoomTypeClick(key)}
                            >
                                <span className=''>{label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Room Details Section */}
                {hotelData?.rooms?.map((room, index) => (
                    <div
                        key={index}
                        ref={(el) => (roomRefs.current[room.roomType] = el)}
                        data-roomtype={room.roomType}
                        className='bg-white mb-2 flex flex-col md:border-r-[6px] lg:hover:border-r-[0.5px] border-blue-500 sm:flex-row min-w-[19.5rem] text-black max-w-[20rem] sm:max-w-[45rem] md:max-w-[50rem] lg:max-w-[58.5rem] w-[90vw] hover:from-[#f3fbff] cursor-pointer transition-all duration-500 hover:bg-gradient-to-b hover:to-[#f8fafc] rounded-xl shadow-[0px_5px_10px_-6px_#808080] overflow-hidden'
                    >
                        <div className='w-full sm:w-[19rem]'>
                            <img
                                src={roomImages[room.roomType]}
                                alt="Room Main"
                                className='h-[11.5rem] sm:h-[13.5rem] lg:min-w-[19rem] sm:min-w-[17rem] w-full object-cover transition-all duration-500 animate-fadeIn'
                            />
                            <div className='flex justify-between bg-[#eeeeef] p-2'>
                                {room.roomImage.slice(0, 4).map((image, imageIndex) => (
                                    <img
                                        key={image.fileUrl}
                                        src={image.fileUrl}
                                        alt={`Room Proof ${imageIndex + 1}`}
                                        className={`h-[3rem] w-[23%] rounded object-cover cursor-pointer transition-all duration-300 ${activeImageIndices[room.roomType] === imageIndex ? 'border-2 border-blue-500 shadow-lg transform scale-105' : ''}`}
                                        onClick={() => handleRoomImageClick(room.roomType, image.fileUrl, imageIndex)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className='flex flex-col justify-between px-3 pb-2 md:gap-4 md:flex-row'>
                            <div className='lg:w-[25rem]'>

                                <div className='flex items-center justify-between mt-3'>

                                    <h2 className='flex text-[1.1rem] items-center gap-2 font-semibold '><FaHotel />{room?.roomType}</h2>
                                </div>
                                <div className='flex items-center justify-between mt-1'>
                                    <h1 className='flex text-[0.85rem] lg:text-[0.95rem] font-semibold items-center text-[#555555] justify-center gap-1'><FaLocationDot className='text-black' />{hotelData?.address}</h1>
                                </div>

                                <div className='flex flex-col items-start gap-1 my-1 mt-3 ml-2 sm:flex-wrap lg:flex-col'>
                                    <div className='flex items-center justify-center gap-1  text-[#444444] text-[0.9rem] font-semibold'>
                                        <IoBed className='text-black-500 text-[1.2rem]' />
                                        {room.roomType === "PREMIUM_DELUXE" ? "Maharaja Bed" :
                                            room?.roomType === "SINGLE" ? "Single Bed" : "Double Bed"}
                                    </div>
                                    <div className='flex items-center justify-center gap-1  text-[#444444] text-[0.9rem] font-semibold'>
                                        <FaUser className='mx-[2.5px] text-black-500' />
                                        {room.roomType === "PREMIUM_DELUXE" ? `Max ${room?.capacity} guests` :
                                            room?.roomType === "SINGLE" ? `Max ${room?.capacity} guests` : `Max ${room?.capacity} guests`}
                                    </div>
                                    {room.courtyardView &&
                                        <div className='flex items-center justify-center gap-1  text-[#444444] text-[0.9rem] font-semibold'>
                                            <img src="https://gos3.ibcdn.com/roomViewIcon-1678093525.png" className='w-[1rem] mx-[2px]' alt="" />
                                            Courtyard View
                                        </div>}
                                    {room.amenities.includes("Breakfast") && (
                                        <div className='flex items-center justify-center gap-1 text-[#444444] text-[0.9rem] font-semibold'>
                                            <MdOutlineFreeBreakfast className='text-black-500 text-[1.2rem]' />
                                            {room.roomType === "PREMIUM_DELUXE" ? "Free Breakfast + 1 meal" :
                                                room.roomType === "SINGLE" ? "Free Breakfast" : "Free Breakfast"}
                                        </div>
                                    )}
                                    <div className='flex items-center justify-center gap-1  text-[#444444] text-[0.9rem] font-semibold'>
                                        <TiCancel className=' text-[1.3rem] text-black-500' />
                                        No cancellation
                                    </div>
                                </div>
                                <div className='pt-3 mt-3 border-t'>
                                    {room?.roomType !== "PREMIUM_DELUXE" && (
                                        room.amenities.includes("Breakfast") ? (
                                            <div className='flex items-center gap-2'>
                                                <input type="checkbox" name={`amenity-${room.roomType}`} id={`meal-${room.roomType}`} value="Meal" checked={selectedAmenities[room.roomType] === "Meal"} onChange={() => handleAmenityChange(room.roomType, "Meal")} />
                                                <label htmlFor={`meal-${room.roomType}`}>with Meal?</label>
                                            </div>
                                        ) : (
                                            <>
                                                <div className='flex items-center gap-2'>
                                                    <input type="checkbox" name={`amenity-${room.roomType}`} id={`breakfast-${room.roomType}`} value="Breakfast" checked={selectedAmenities[room.roomType] === "Breakfast"} onChange={() => handleAmenityChange(room.roomType, "Breakfast")} />
                                                    <label htmlFor={`breakfast-${room.roomType}`}>with Breakfast?</label>
                                                </div>
                                                <div className='flex items-center gap-2'>
                                                    <input type="checkbox" name={`amenity-${room.roomType}`} id={`meal-${room.roomType}`} value="Meal" checked={selectedAmenities[room.roomType] === "Meal"} onChange={() => handleAmenityChange(room.roomType, "Meal")} />
                                                    <label htmlFor={`meal-${room.roomType}`}>with Meal?</label>
                                                </div>
                                                <div className='flex items-center gap-2'>
                                                    <input type="checkbox" name={`amenity-${room.roomType}`} id={`breakfast-meal-${room.roomType}`} value="Breakfast + Meal" checked={selectedAmenities[room.roomType] === "Breakfast + Meal"} onChange={() => handleAmenityChange(room.roomType, "Breakfast + Meal")} />
                                                    <label htmlFor={`breakfast-meal-${room.roomType}`}>with Breakfast + Meal?</label>

                                                </div>
                                            </>
                                        )
                                    )}
                                </div>



                            </div>
                            <div className='flex items-center justify-between mt-1 border-t md:py-4 md:pl-2 md:border-t-0 md:border-l md:ml-2 md:w-[8rem] md:flex-col lg:w-[12rem]'>

                                <div className='flex flex-col items-center justify-center relative top-[-6px]'>
                                    <p className='text-[0.7rem] flex flex-col top-3 items-center font-semibold text-[#505050] relative'>&#8377;15000
                                        <p className='h-[1.15px] w-[2.4rem] rotate-[-8deg] absolute top-2 bg-red-600'></p>
                                    </p>
                                    <span className='text-[1.2rem] relative top-2 font-semibold text-[#19B56F]'>&#8377; {room?.price}</span>
                                    <p> <span className='text-[1rem] text-[#515151] font-semibold'>Per night</span></p>
                                </div>
                                <button onClick={() => handleBookBtn(hotelData?._id, room?._id)} className='p-2 px-4 text-white bg-gradient-to-r from-[#1751fe] via-[#0074f9] transition-all duration-300 to-[#0199ff] lg:px-6 hover:shadow-[1px_1px_6px_-2px#808080] rounded text-[0.9rem] font-semibold'>Book Now</button>
                            </div>
                        </div>
                    </div>
                ))
                }
            </div >
        </>
    );
};

export default HotelsWithRoom;
