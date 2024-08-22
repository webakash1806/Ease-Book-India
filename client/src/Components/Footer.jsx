import React, { useEffect } from 'react'
import {
    BsFacebook,
    BsInstagram,
    BsLinkedin,
    BsTwitter,
    BsWhatsapp
} from 'react-icons/bs'

import { MdKeyboardDoubleArrowRight, MdOutlineSmartphone } from "react-icons/md";
import { CiClock1 } from "react-icons/ci";
import { IoMdMail } from "react-icons/io";

import { Link } from 'react-router-dom'
import { FaLocationDot } from 'react-icons/fa6';
import { getGlobalSettingsData } from '../Redux/Slices/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';


const Footer = () => {
    const dispatch = useDispatch()
    const listStyle = "text-[0.98rem] overlock-bold-italic hover:pl-2 flex items-center gap-1 hover:bg-clip-text hover:text-transparent hover:bg-[linear-gradient(to_right,#1557FD,#0197FF)] font-semibold  text-black transition-all duration-300 ease-in-out"
    const contactStyle = "text-[0.98rem] flex overlock-bold-italic items-center gap-1 hover:bg-clip-text hover:text-transparent hover:bg-[linear-gradient(to_right,#1557FD,#FF8900)] font-semibold  text-black "

    const websiteData = useSelector((state) => state?.auth?.globalSettingsData)


    const loadData = () => {
        dispatch(getGlobalSettingsData())
    }

    useEffect(() => {
        loadData()
    }, [])

    console.log(websiteData)


    const year = new Date().getFullYear()


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])


    return (
        <footer className='text-black relative z-[100] bg-gradient-to-b from-[#eaf0fc] to-white'>
            {/* <img src={footerImg} alt="" className='absolute h-full w-[100vw]' /> */}
            <div className='flex  relative flex-col xl:flex-row p-[2.5rem_1rem] md:p-[2.5_5rem] gap-8 xl:justify-around'>
                <div className='flex flex-col gap-2'>
                    <Link to="/" className='mb-3'><img className='h-[1.8rem]' alt="Logo" src={websiteData?.logo?.secure_url} /></Link>
                    <p className='leading-6 xl:w-[23rem] w-full overlock-bold-italic'>{websiteData?.description}</p>
                    <div className='flex gap-4 mt-3'>
                        <a href={websiteData?.linkedin} className='text-[20px]'><BsLinkedin /></a>
                        <Link to={websiteData?.facebook} target='_blank' className='text-[20px]'><BsFacebook /></Link>
                        <Link to={`https://wa.me/${websiteData?.whatsapp}?text=Hello`} target='_blank' className='text-[20px]'><BsWhatsapp /></Link>
                        <Link to={websiteData?.instagram} target='_blank' className='text-[20px]'><BsInstagram /></Link>
                        {/* <a href="" className='text-[20px]'><BsTwitter /></a> */}
                    </div>
                </div>
                <div className='flex flex-col justify-between gap-8 md:gap-6 md:flex-row'>
                    <div className='flex flex-col w-[80vw] md:w-[60%] gap-8 sm:flex-row sm:justify-between md:gap-6 lg:gap-10'>
                        <div className='w-[80vw] sm:w-[50%] md:w-[14rem]'>
                            <div>
                                <p className='text-[1.09rem] lora-700 '>ABOUT US</p>
                                <p className='w-[80vw] sm:w-[80%] md:w-[12rem] lg:w-[15rem] m-[9px_0] h-[3.4px] bg-[linear-gradient(to_right,#1557FD,#0197FF)] rounded-md'></p>
                            </div>
                            <div className='flex flex-col gap-4 mt-6 '>
                                <Link to={'/'} className={listStyle}><MdKeyboardDoubleArrowRight />Our Portfolio</Link>
                                <Link to={'/'} className={listStyle}><MdKeyboardDoubleArrowRight />Company</Link>
                                <Link to='/our-services' className={listStyle}><MdKeyboardDoubleArrowRight />Services</Link>

                                <Link to={'/'} className={listStyle}><MdKeyboardDoubleArrowRight />Blog</Link>
                                <Link to='/contact' className={listStyle}><MdKeyboardDoubleArrowRight />Contact</Link>

                            </div>
                        </div>
                        <div className='w-ful sm:w-[50%] md:w-[14rem] '>
                            <div>
                                <p className='text-[1.09rem] lora-700'>OUR SERVICES</p>
                                <p className='w-[80vw] sm:w-[80%] lg:w-[15rem] md:w-[12rem] m-[9px_0] h-[3.4px] bg-[linear-gradient(to_right,#1557FD,#0197FF)] rounded-md'></p>
                            </div>
                            <div className='flex flex-col gap-4 mt-6 '>
                                <Link to={'/place-list'} className={listStyle}><MdKeyboardDoubleArrowRight />Get a guider</Link>
                                <Link to={'/service9'} className={listStyle}><MdKeyboardDoubleArrowRight />Temple visit</Link>
                                <Link to={'/boat'} className={listStyle}><MdKeyboardDoubleArrowRight />Book boats</Link>
                                <Link to={'/car'} className={listStyle}><MdKeyboardDoubleArrowRight />Book car</Link>
                                <Link to={'/hotels'} className={listStyle}><MdKeyboardDoubleArrowRight />Book hotel</Link>


                            </div>
                        </div>
                    </div>
                    <div className='md:w-[16rem] w-[80vw]'>
                        <div>
                            <p className='text-[1.09rem] lora-700'>CONTACT US</p>
                            <p className='w-[80vw] md:w-[16rem] m-[9px_0] h-[3.4px] bg-[linear-gradient(to_right,#1557FD,#0197FF)] rounded-md'></p>
                        </div>
                        <div className='flex flex-col gap-4 mt-6 '>

                            <Link to={'/'} className={`${contactStyle} items-center`}><MdOutlineSmartphone />+91 {websiteData?.phone1} <br />+91 {websiteData?.phone2}</Link>
                            <Link to={'/'} className={`${contactStyle} items-center`}><IoMdMail />{websiteData?.email2}  <br /> {websiteData?.email1}</Link>
                            <Link to={'/'} className={`${contactStyle} items-center`}><FaLocationDot /> {websiteData?.address}</Link>

                        </div>
                    </div>
                </div>

            </div>
            <div className='text-center text-white text-[1.05rem] font-[600] p-3 bg-gradient-to-r from-[#1557FD]  to-[#0197FF] '><span >&#169;</span> {year} | {websiteData?.name} - All Rights Reserved</div>
        </footer >

    )
}

export default Footer