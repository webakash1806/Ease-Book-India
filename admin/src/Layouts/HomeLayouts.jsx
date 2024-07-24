import React, { Children, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaCar, FaHamburger, FaHome, FaHotel } from "react-icons/fa";
import { HiMiniInformationCircle, HiOutlineXMark } from "react-icons/hi2";
import { CgLogOut } from "react-icons/cg";
// import Footer from '../Components/Footer'
import { logout } from '../Redux/Slices/AuthSlice'
import Footer from '../Components/Footer'
import { MdContentPaste, MdOutlinePermContactCalendar, MdOutlineSettings } from 'react-icons/md';
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineDashboard } from "react-icons/md";
import { RiGalleryFill, RiUserLocationFill } from "react-icons/ri";
import { GiSunPriest } from "react-icons/gi";
import { PiUserList } from "react-icons/pi";
import { FaPersonCircleQuestion, FaSailboat } from "react-icons/fa6";

const HomeLayout = ({ children }) => {

    const [active, setActive] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn)
    const avatar = useSelector((state) => state?.auth?.data)
    const fullName = useSelector((state) => state?.auth?.data?.fullName)
    console.log(avatar)
    const handleLogout = async () => {
        const response = await dispatch(logout())

        if (response?.payload?.success) {
            navigate('/')
        }
    }
    const [time, setTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
            const hours = istTime.getHours();
            const minutes = istTime.getMinutes();
            const seconds = istTime.getSeconds();
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



    const listStyle = 'flex items-center justify-start gap-2 pl-4 p-2 m-[0.4rem] ml-0 mr-3 md:mr-4 rounded-r bg-[#3D4056] hover:bg-[#655CCE] hover:text-white transition-all duration-300 text-[#CBC8E0] font-semibold tracking-wide text-[1.02rem]'

    return (
        <>
            <div className='items-start md:flex md:flex-row-reverse'>
                <div className='p-3 md:w-full md:p-4 md:px-6 '>
                    <header className='flex items-center justify-between  px-3 bg-white rounded-md p-2 md:w-full text-black shadow-[0px_0px_15px_#8080807e]'>
                        <div className='p-2 cursor-pointer md:hidden' onClick={() => setActive(true)}><RxHamburgerMenu className='text-[#535162fa] text-[1.5rem]' /></div>
                        <div className='hidden md:block'></div>
                        <p className=''>{time}</p>
                        <Link to={'/me'} className='size-[2.6rem] rounded-full overflow-hidden pt-1 bg-[#b0aaf7fa] border-[0.15rem] border-[#8e85f3a3]'>
                            <img src={avatar?.proofFiles[2]?.fileUrl} className='w-[2.6rem]' alt="" />
                        </Link>
                    </header>
                    {
                        children
                    }
                </div>
                <NavLink className={`min-h-[100vh] max-w-[15rem] min-w-[15rem] md:max-w-[16rem] md:min-w-[15.9rem] bg-[#2F3349] absolute md:static top-0 ${active ? 'left-0' : 'left-[-25rem]'} transition-all duration-500`}>
                    <ul>
                        <li className='flex items-center justify-between p-3 border-b border-[#4f47a9a3] text-[#CBC8E0]'>
                            <Link to={'/'}>LOGO</Link>
                            <div className='p-[7px] md:hidden' onClick={() => setActive(false)}>
                                <HiOutlineXMark className='text-[1.5rem]' />
                            </div>
                        </li>
                        <li className='mt-4'>
                            <Link to={'/'} className={listStyle}>
                                <MdOutlineDashboard />
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to={'/'} className={listStyle}>
                                <MdOutlineSettings />
                                Global settings
                            </Link>
                        </li>
                        <li>
                            <Link to={'/'} className={listStyle}>
                                <MdContentPaste />
                                Website content
                            </Link>
                        </li>
                        <li>
                            <Link to={'/'} className={listStyle}>
                                <RiGalleryFill />
                                Gallery
                            </Link>
                        </li>
                        <li>
                            <Link to={'/'} className={listStyle}>
                                <FaCar />
                                Car drivers
                            </Link>
                        </li>
                        <li>
                            <Link to={'/'} className={listStyle}>
                                <GiSunPriest />
                                Priest list
                            </Link>
                        </li>
                        <li>
                            <Link to={'/'} className={listStyle}>
                                <FaHotel />
                                Hotels list
                            </Link>
                        </li>
                        <li>
                            <Link to={'/'} className={listStyle}>
                                <RiUserLocationFill />
                                Guider list
                            </Link>
                        </li>
                        <li>
                            <Link to={'/'} className={listStyle}>
                                <PiUserList />
                                Users list
                            </Link>
                        </li>
                        <li>
                            <Link to={'/'} className={listStyle}>
                                <FaSailboat />
                                Boatman list
                            </Link>
                        </li>
                        <li>
                            <Link to={'/'} className={listStyle}>
                                <FaPersonCircleQuestion />
                                Enquiry
                            </Link>
                        </li>
                    </ul>
                    <Link to='/logout' onClick={handleLogout} className=' bg-[#FF4C51] transition-all duration-700 hover:bg-[#685ED4] border-none text-white flex items-center gap-2 pl-4 p-2 m-[0.4rem] ml-0 mr-3 rounded-r md:mr-4 font-semibold text-[1.02rem] tracking-wide'>
                        <CgLogOut className='text-[1.3rem] font-semibold' /> Logout
                    </Link>
                </NavLink>
            </div>
        </>
    )
}

export default HomeLayout