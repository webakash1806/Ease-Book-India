import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { FaHome } from "react-icons/fa";
import { HiMiniInformationCircle } from "react-icons/hi2";
import { CgLogOut } from "react-icons/cg";
// import Footer from '../Components/Footer'
import { logout } from '../Redux/Slices/AuthSlice'
import Footer from '../Components/Footer'
import { MdOutlinePermContactCalendar } from 'react-icons/md';

const HomeLayout = ({ children }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn)
    const avatar = useSelector((state) => state?.auth?.data)
    const fullName = useSelector((state) => state?.auth?.data?.fullName)

    const handleLogout = async () => {
        const response = await dispatch(logout())

        if (response?.payload?.success) {
            navigate('/')
        }
    }

    return (
        <>
            <div>
                <div className="drawer">
                    <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                    <div className="flex flex-col drawer-content ">
                        {/* Navbar */}
                        <div className="w-full text-white bg-[#2F3349] navbar">
                            <div className="flex-none lg:hidden ">
                                <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                                </label>
                            </div>
                            <div className="absolute flex-1 right-6 lg:static lg:ml-16"><img className='w-[9rem]' src="" alt="" />LOGO</div>
                            <div className="flex-none hidden lg:block">
                                <ul className="menu menu-horizontal">
                                    {/* Navbar menu content here */}
                                    <li><Link to='/'><FaHome />Home</Link></li>

                                    <li><Link to='/about'><HiMiniInformationCircle /> About</Link></li>
                                    <li><Link to='/contact'><MdOutlinePermContactCalendar /> Contact</Link></li>

                                    <div className='ml-6'>
                                        {!isLoggedIn ?
                                            <div className='flex items-center justify-center gap-2 '>
                                                <Link to='/login'
                                                    className='btn bg-[#685FD5] transition-all duration-700  border-none text-white btn-sm rounded-sm px-6 font-normal text-[1.02rem] tracking-wide'>
                                                    Login
                                                </Link>
                                                <Link to='/register'
                                                    className='btn bg-[#FF4C51] transition-all duration-700 border-none text-white btn-sm rounded-sm px-6 font-normal text-[1.02rem] tracking-wide'>
                                                    Register
                                                </Link>
                                            </div>
                                            :
                                            <div className='flex items-center justify-center gap-4'>
                                                <Link to='/me' >
                                                    <img src={avatar?.proofFiles[2]?.fileUrl} alt={`${fullName} img`} className='w-[2.1rem] h-[2.1rem] rounded-full object-cover shadow-[0px_0px_5px_#7479FF]' />
                                                </Link>
                                                <Link to='/logout' onClick={handleLogout}
                                                    className='btn bg-[#FF4C51] transition-all duration-700 hover:bg-[#685ED4] border-none text-white btn-sm rounded-sm px-6 font-normal text-[1.02rem] tracking-wide'>
                                                    <CgLogOut /> Logout
                                                </Link>
                                            </div>
                                        }
                                    </div>
                                </ul>
                            </div>
                        </div>
                        {/* Page content here
                    Content */}
                        {children}

                    </div>
                    <div className="drawer-side z-[10000]">
                        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="justify-between min-h-screen p-4 menu sm:w-[14rem] w-[14rem] text-white bg-[#2F3349]">
                            {/* Sidebar content here */}
                            <div>
                                <Link to={'/'} className="m-[0_auto] border-b mb-6 pb-2 flex items-center justify-around border-slate-500"><img className='w-full' src="" alt="" />LOGO</Link>
                                <li><Link to='/'><FaHome />Home</Link></li>

                                <li><Link to='/about'><HiMiniInformationCircle /> About</Link></li>
                                <li><Link to='/contact'><MdOutlinePermContactCalendar /> Contact</Link></li>
                            </div>
                            <div className='mb-6'>
                                {!isLoggedIn ?
                                    <div className='flex flex-col items-center justify-center gap-2 '>
                                        <Link to='/login'
                                            className='btn bg-[#FF4C51] transition-all duration-700  border-none text-white btn-sm rounded-sm w-[97%] font-normal text-[1.02rem] tracking-wide'>
                                            Login
                                        </Link>
                                        <Link to='/register'
                                            className='btn bg-[#685ED4] transition-all duration-700 border-none text-white btn-sm rounded-sm w-[97%] font-normal text-[1.02rem] tracking-wide'>
                                            Register
                                        </Link>
                                    </div>
                                    :
                                    <div className='flex flex-col gap-2'>
                                        <Link to='/me' className='flex items-center justify-between p-2 gap-4 rounded-md  w-[99%] cursor-pointer bg-[#3D4056] hover:bg-[#0d011c] duration-300'>
                                            <img src={avatar?.proofFiles[2]?.fileUrl} alt={`${fullName} img`} className='w-[2.3rem] h-[2.3rem] rounded-full object-cover shadow-[0px_0px_6px_#808080] ml-1' />
                                            <p className='text-[0.95rem] w-[7.5rem] truncate text-white capitalize'>{fullName}</p>
                                        </Link>
                                        <Link to='/logout' onClick={handleLogout} className='btn  bg-[#FF4C51] transition-all duration-700 hover:bg-[#685ED4] border-none text-white btn-sm rounded-sm w-[99%] font-normal text-[1.02rem] tracking-wide'>
                                            <CgLogOut className='text-[1.3rem]' /> Logout
                                        </Link>
                                    </div>}
                            </div>
                        </ul>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default HomeLayout