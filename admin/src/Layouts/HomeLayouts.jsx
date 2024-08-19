import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaCar, FaHotel, FaArrowDown, FaArrowRight } from "react-icons/fa";
import { HiOutlineXMark } from "react-icons/hi2";
import { CgLogOut } from "react-icons/cg";
import { logout } from '../Redux/Slices/AuthSlice';
import { MdContentPaste, MdOutlineSettings, MdOutlineDashboard } from 'react-icons/md';
import { RxHamburgerMenu } from "react-icons/rx";
import { RiGalleryFill, RiUserLocationFill } from "react-icons/ri";
import userImg from '../assets/user.png';
import { GiSunPriest } from "react-icons/gi";
import { PiUserList } from "react-icons/pi";
import { FaSailboat, FaCircle, FaPersonCircleQuestion } from "react-icons/fa6";
import { RiArrowRightSLine, RiArrowDownSLine } from "react-icons/ri";
import { LuShoppingBag } from "react-icons/lu";

const HomeLayout = ({ children }) => {
    const [active, setActive] = useState(false);
    const [dropdownActive, setDropdownActive] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
    const avatar = useSelector((state) => state?.auth?.data?.avatar);
    const fullName = useSelector((state) => state?.auth?.data?.fullName);

    const handleLogout = async () => {
        const response = await dispatch(logout());

        if (response?.payload?.success) {
            navigate('/');
        }
    };

    const [time, setTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
            const hours = istTime.getHours();
            const minutes = istTime.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 || 12; // Convert 24 hour format to 12 hour format
            const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
            const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;
            setTime(formattedTime);
        };

        updateTime();
        const intervalId = setInterval(updateTime, 1000); // Update time every second

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);

    const listStyle = 'flex items-center justify-start gap-2 pl-4 p-2 m-[0.4rem] ml-0 mr-3 md:mr-4 rounded-r bg-[#3D4056] hover:bg-[#655CCE] hover:text-white transition-all duration-300 text-[#CBC8E0] font-semibold tracking-wide text-[1.02rem]';
    const activeListStyle = `${listStyle} bg-[#655CCE] text-white`;

    return (
        <>
            <div className='items-start h-[100vh] overflow-hidden md:flex md:flex-row-reverse bg-[#F7F6F9]'>
                <div className='p-3 md:w-full md:p-4 md:px-6 '>
                    <header className='flex items-center justify-between backdrop-blur-3xl relative z-[1000000] px-3 bg-[#ffffff] rounded-md p-2 md:w-full text-black shadow-[0px_0px_15px_#8080807e]'>
                        <div className='p-2 cursor-pointer md:hidden' onClick={() => setActive(true)}><RxHamburgerMenu className='text-[#535162fa] text-[1.5rem]' /></div>
                        <div className='hidden md:block'></div>
                        <p className=''>{time}</p>
                        <Link to={`/profile/${fullName}`} className='size-[2.6rem] rounded-full overflow-hidden bg-[#b0aaf7fa] border-[0.13rem] border-[#8e85f3a3]'>
                            <img src={avatar?.secure_url || userImg} className='w-[2.6rem]' alt="User Avatar" />
                        </Link>
                    </header>
                    <div className='h-[90vh] bg-[#F7F6F9] w-custom scrollbar scrollbar-none overflow-y-scroll'>
                        {children}
                    </div>
                </div>
                <NavLink className={`z-[100000000] h-[100vh] overflow-hidden max-w-[15rem] min-w-[15rem] md:max-w-[16rem] md:min-w-[15.9rem]  bg-[#2f3349] absolute md:static top-0 ${active ? 'left-0' : 'left-[-35rem]'} transition-all duration-500`}>
                    <ul>
                        <li className='flex items-center justify-between p-3 border-b border-[#4f47a9a3] text-[#CBC8E0]'>
                            <Link to={'/'}>LOGO</Link>
                            <div className='p-[7px] md:hidden' onClick={() => setActive(false)}>
                                <HiOutlineXMark className='text-[1.5rem]' />
                            </div>
                        </li>
                        <div className='h-[82vh] overflow-y-scroll scrollbar scrollbar-none'>
                            <li className='mt-4'>
                                <NavLink to={'/'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                    <MdOutlineDashboard />
                                    Dashboard
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/global-settings'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                    <MdOutlineSettings />
                                    Global settings
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/website-content'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                    <MdContentPaste />
                                    Website content
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/gallery'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                    <RiGalleryFill />
                                    Gallery
                                </NavLink>
                            </li>
                            <li className='relative'>
                                <div onClick={() => setDropdownActive(!dropdownActive)} className={`${listStyle} cursor-pointer flex items-center justify-between`}>
                                    <div className='flex items-center justify-start gap-2'>
                                        <LuShoppingBag />    <span>Booking List</span>
                                    </div>
                                    {dropdownActive ? <RiArrowDownSLine className='text-[1.5rem] font-bold' /> : <RiArrowRightSLine className='text-[1.5rem] font-bold' />}
                                </div>
                                {dropdownActive && (
                                    <ul className='mt-2 ml-4'>
                                        <li>
                                            <NavLink to={'/car-booking'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                                <FaCar />
                                                Car Booking
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/boat-booking'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                                <FaHotel />
                                                Boat Booking
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/priest-booking'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                                <GiSunPriest />
                                                Priest Booking
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/guider-booking'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                                <FaHotel />
                                                Guider Booking
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/hotel-booking'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                                <FaHotel />
                                                Hotel Booking
                                            </NavLink>
                                        </li>
                                    </ul>
                                )}
                            </li>
                            <li>
                                <NavLink to={'/car-list'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                    <FaCar />
                                    Car drivers
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/priest-list'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                    <GiSunPriest />
                                    Priest list
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/hotels-list'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                    <FaHotel />
                                    Hotels list
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/guider-list'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                    <RiUserLocationFill />
                                    Guider list
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/users-list'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                    <PiUserList />
                                    Users list
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/boatman-list'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                    <FaSailboat />
                                    Boatman list
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/enquiry'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                    <FaPersonCircleQuestion />
                                    Enquiry
                                </NavLink>
                            </li>

                        </div>
                    </ul>
                    <Link onClick={handleLogout} className='bg-[#FF4C51] transition-all duration-700 hover:bg-[#685ED4] border-none text-white flex items-center gap-2 pl-4 p-2 m-[0.4rem] ml-0 mr-3 rounded-r md:mr-4 font-semibold text-[1.02rem] tracking-wide'>
                        <CgLogOut className='text-[1.3rem] font-semibold' /> Logout
                    </Link>
                </NavLink>
            </div>
        </>
    );
};

export default HomeLayout;
