import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

// import Footer from '../Components/Footer'
// import { logout } from '../Redux/Slices/AuthSlice'

const HomeLayout = ({ children }) => {



    return (
        <>
            <div>
                <div className="drawer">
                    <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                    <div className="flex flex-col drawer-content ">
                        {/* Navbar */}
                        <div className="w-full navbar bg-white text-black">
                            <div className="flex-none lg:hidden ">
                                <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                                </label>
                            </div>
                            <div className="flex-1 absolute right-6 lg:static lg:ml-16"><img className='w-[9rem]' src="" alt="" />LOGO</div>
                            <div className="flex-none hidden lg:block">
                                <ul className="menu menu-horizontal">
                                    {/* Navbar menu content here */}
                                    <li><Link to='/'>Home</Link></li>

                                    <li><Link to='/course'>Course</Link></li>
                                    <li><Link to='/about'>About</Link></li>
                                    <li><Link to='/contact'>Contact</Link></li>

                                    <div className='ml-6'>
                                        {/* {!isLoggedIn ? */}
                                        <div className='flex items-center justify-center gap-2 '>
                                            <Link to='/login'
                                                className='btn bg-[#19b56f] transition-all duration-700 hover:bg-[#FF8900] border-none text-white btn-sm rounded-sm px-6 font-normal text-[1.02rem] tracking-wide'>
                                                Login
                                            </Link>
                                            <Link to='/register'
                                                className='btn bg-[#FF8900] transition-all duration-700 hover:bg-[#19b56f] border-none text-white btn-sm rounded-sm px-6 font-normal text-[1.02rem] tracking-wide'>
                                                Register
                                            </Link>
                                        </div>
                                        {/* :
                                            <div className='flex items-center justify-center gap-4'>
                                                <Link to='/me' >
                                                    <img src={avatar?.secure_url} alt={`${fullName} img`} className='w-[2.3rem] h-[2.3rem] rounded-full object-cover shadow-[0px_0px_5px_#7479FF]' />
                                                </Link>
                                                <Link to='/logout' onClick={handleLogout} className='btn btn-secondary btn-sm rounded-md px-5 text-[1.03rem] tracking-wide'>
                                                    Logout
                                                </Link>
                                            </div>
                                        } */}
                                    </div>
                                </ul>
                            </div>
                        </div>
                        {/* Page content here
                    Content */}
                        {children}

                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="justify-between min-h-screen p-4 menu sm:w-[14rem] w-[12rem] bg-white text-black">
                            {/* Sidebar content here */}
                            <div>
                                <Link to={'/'} className="m-[0_auto] border-b mb-6 pb-2 flex items-center justify-around border-slate-500"><img className='w-full' src="" alt="" />LOGO</Link>
                                <li><Link to='/'>Home</Link></li>

                                <li><Link to='/course'>Course</Link></li>
                                <li><Link to='/about'>About</Link></li>
                                <li><Link to='/contact'>Contact</Link></li>
                            </div>
                            <div className='mb-6'>
                                {/* {!isLoggedIn ? */}
                                <div className='flex items-center justify-center flex-col gap-2 '>
                                    <Link to='/login'
                                        className='btn bg-[#19b56f] transition-all duration-700 hover:bg-[#FF8900] border-none text-white btn-sm rounded-sm w-[97%] font-normal text-[1.02rem] tracking-wide'>
                                        Login
                                    </Link>
                                    <Link to='/register'
                                        className='btn bg-[#FF8900] transition-all duration-700 hover:bg-[#19b56f] border-none text-white btn-sm rounded-sm w-[97%] font-normal text-[1.02rem] tracking-wide'>
                                        Register
                                    </Link>
                                </div>
                                {/* :
                                    <div className='flex flex-col gap-2'>
                                        <Link to='/me' className='flex items-center justify-evenly p-2 gap-4 rounded-md  w-[16.5rem] ml-3 cursor-pointer bg-gray-800 hover:bg-[#0d011c] duration-300'>
                                            <img src={avatar?.secure_url} alt={`${fullName} img`} className='w-[2.3rem] h-[2.3rem] rounded-full object-cover shadow-[0px_0px_6px_#808080]' />
                                            <p className='text-[1.1rem] text-white capitalize'>{fullName}</p>
                                        </Link>
                                        <Link to='/logout' onClick={handleLogout} className='w-[16.5rem] ml-3 btn btn-secondary btn-sm rounded-md px-9 text-[1.03rem] tracking-wide'>
                                            Logout
                                        </Link>
                                    </div>} */}
                            </div>
                        </ul>
                    </div>
                </div>
                {/* <Footer /> */}
            </div>
        </>
    )
}

export default HomeLayout