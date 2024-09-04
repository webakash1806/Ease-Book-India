// src/Pages/ContactPage.js
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaWhatsapp, FaArrowLeft, FaLinkedin } from 'react-icons/fa';
import SocialCard from '../Components/SocialCard'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getContactSettingsData } from '../Redux/Slices/AuthSlice';
import HtmlRenderer from '../Components/HTMLRender';
import { FaXTwitter } from 'react-icons/fa6';
const ContactPage = () => {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Contact us', },
    ];

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const contactData = useSelector((state) => state?.auth?.contactSettingsData)

    const loadData = () => {
        dispatch(getContactSettingsData())
    }

    useEffect(() => {
        if (!contactData) {
            loadData()
        }
    }, [dispatch, contactData])


    const handleFormSubmit = (e) => {
        e.preventDefault()
    }

    const mainDiv = 'relative w-full max-w-md mt-2';

    const inputStyle = "block px-2 py-[7px]  pb-[5px] bg-white border-[0.5px] border-gray-300 rounded min-w-[18rem] w-[90vw] sm:max-w-[28rem] max-w-[25rem] focus:outline-none focus:ring-[0.5px] focus:ring-blue-500 font-semibold text-black focus:border-blue-500 peer";

    return (
        <>

            <div className='relative'>
                <SocialCard item={breadcrumbItems} icon={"contact"} title={"Contact Us"} des={"We’re here to help. Reach out to us with any questions or comments!"} />

            </div>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="min-h-screen text-white bg-gradient-to-b from-green-300 from-[10%] to-blue-600"
            >

                <div className="container px-4 py-8 mx-auto">

                    <div className='flex items-center justify-center w-full'>
                        <form action=" "
                            onSubmit={handleFormSubmit}
                            className=''
                        >
                            <div className={mainDiv}>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-900">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Your Name"
                                    className={inputStyle}
                                />
                            </div>
                            <div className={mainDiv}>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Your Email"
                                    className={inputStyle}

                                />
                            </div>
                            <div className={mainDiv}>

                                <label htmlFor="message" className="block text-sm font-medium text-gray-900">Message</label>
                                <textarea
                                    id="message"
                                    rows="5"

                                    placeholder="Your Message"
                                    className={`${inputStyle} resize-none`}

                                ></textarea>
                            </div>
                            <button type='submit' className='p-2 px-4 text-white bg-gradient-to-r min-w-[18rem] w-[90vw] sm:max-w-[28rem] max-w-[25rem] from-[#1751fe] via-[#0074f9] transition-all duration-300 to-[#0199ff] lg:px-6 hover:shadow-[1px_1px_6px_-2px#808080] mt-4 rounded text-[0.9rem] font-semibold'>Send message...</button>

                        </form>
                    </div>
                    <div className="flex flex-col my-8 md:flex-row md:justify-center md:gap-2">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center p-4 mb-4 text-gray-800 bg-white rounded-lg shadow-md cursor-pointer md:mb-0"
                        >
                            <FaPhone className="mr-3 text-2xl text-green-500" />
                            <div>
                                <Link to={""}>+91 {contactData?.phone1}</Link>
                                <br />
                                <Link to={""}>+91 {contactData?.phone2}</Link>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="flex items-center p-4 mb-4 text-gray-800 bg-white rounded-lg shadow-md cursor-pointer md:mb-0"
                        >
                            <FaEnvelope className="mr-3 text-2xl text-blue-500" />
                            <div>
                                <Link to={""}>{contactData?.email1}</Link>
                                <br />
                                <Link to={""}>{contactData?.email2}</Link>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex items-center p-4 mb-4 text-gray-800 bg-white rounded-lg shadow-md cursor-pointer md:mb-0"
                        >
                            <FaMapMarkerAlt className="mr-3 text-2xl text-red-500" />
                            <span className="text-lg">Varanasi, India</span>
                        </motion.div>
                    </div>
                    {/* Map Integration */}
                    <div className="my-8">
                        <h2 className="mb-4 text-2xl font-semibold">Find Us</h2>
                        <div className="relative h-64 min-w-full">
                            <HtmlRenderer htmlContent={contactData?.googleMapIframe} />
                        </div>
                    </div>

                    {/* Social Media Links */}
                    <div className="text-center">
                        <h2 className="mb-4 text-xl font-semibold">Follow Us</h2>
                        <div className="flex justify-center space-x-4">
                            <a href={contactData?.facebook} target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-gray-300">
                                <FaFacebook />
                            </a>
                            <a href={contactData?.twitter} target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-gray-300">
                                <FaXTwitter />
                            </a>
                            <a href={contactData?.instagram} target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-gray-300">
                                <FaInstagram />
                            </a>
                            <a href={contactData?.linkedin} target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-gray-300">
                                <FaLinkedin />
                            </a>
                            <a href={`https://wa.me/${contactData?.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-gray-300">
                                <FaWhatsapp />
                            </a>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default ContactPage;
