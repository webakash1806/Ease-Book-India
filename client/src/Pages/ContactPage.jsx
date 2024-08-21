// src/Pages/ContactPage.js
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaWhatsapp, FaArrowLeft, FaLinkedin } from 'react-icons/fa';
import SocialCard from '../Components/SocialCard'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getContactSettingsData, getGlobalSettingsData } from '../Redux/Slices/AuthSlice';
import HtmlRenderer from '../Components/HTMLRender';
import { FaXTwitter } from 'react-icons/fa6';
import { Helmet, HelmetProvider } from 'react-helmet-async';
const ContactPage = () => {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Contact us', },
    ];

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const contactData = useSelector((state) => state?.auth?.contactSettingsData)
    const websiteData = useSelector((state) => state?.auth?.globalSettingsData)



    const loadData = () => {
        dispatch(getContactSettingsData())
        dispatch(getGlobalSettingsData())

    }

    useEffect(() => {
        loadData()
    }, [])


    const handleFormSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>{`Contact | ${websiteData?.title}`}</title>
                    <meta name="author" content={websiteData?.author} />
                    <meta name="description" content={websiteData?.description} />
                    <meta name="keywords" content={websiteData?.keywords} />
                    <link rel="icon" href={websiteData?.icon?.secure_url} />
                </Helmet>
            </HelmetProvider>
            <div className='relative'>
                <SocialCard item={breadcrumbItems} icon={"contact"} title={"Contact Us"} des={"We’re here to help. Reach out to us with any questions or comments!"} />
                <div onClick={() => navigate(-1)} className='absolute top-1 left-1 p-2 bg-[#4960f8] shadow-md rounded w-fit'>
                    <FaArrowLeft onClick={() => navigate(-1)} className='text-white text-[1.1rem]' />
                </div>
            </div>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="min-h-screen text-white bg-gradient-to-r from-green-400 to-blue-500"
            >


                <div className="container px-4 py-8 mx-auto">



                    <form action=" "
                        onSubmit={handleFormSubmit}

                    >
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Your Name"
                                className="block w-full p-2 mt-1 transition duration-300 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Your Email"
                                className="block w-full p-2 mt-1 transition duration-300 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                            <textarea
                                id="message"
                                rows="4"
                                placeholder="Your Message"
                                className="block w-full p-2 mt-1 transition duration-300 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white transition duration-300 bg-green-600 rounded-md hover:bg-green-700"
                        >
                            Send Message
                        </button>
                    </form>
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
                        <div className="relative w-full h-64">
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
