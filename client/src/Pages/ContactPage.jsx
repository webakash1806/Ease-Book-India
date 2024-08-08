// src/Pages/ContactPage.js
import React from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const ContactPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="min-h-screen text-white bg-gradient-to-r from-green-400 to-blue-500"
        >
            {/* Hero Section */}
            <div className="relative w-full h-64 bg-center bg-cover" style={{ backgroundImage: "url('https://via.placeholder.com/1920x600')" }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative flex flex-col items-center justify-center h-full p-4 text-center">
                    <h1 className="mb-4 text-4xl font-extrabold">Contact Us</h1>
                    <p className="mb-4 text-lg">We’re here to help. Reach out to us with any questions or comments!</p>
                </div>
            </div>

            {/* Contact Information */}
            <div className="container px-4 py-8 mx-auto">


                {/* Contact Form */}
                <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="max-w-lg p-6 mx-auto space-y-4 bg-white rounded-lg shadow-md"
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
                </motion.form>
                <div className="flex flex-col my-8 md:flex-row md:justify-center md:gap-2">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center p-4 mb-4 text-gray-800 bg-white rounded-lg shadow-md cursor-pointer md:mb-0"
                    >
                        <FaPhone className="mr-3 text-2xl text-green-500" />
                        <span className="text-lg">+91 6207234759</span>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="flex items-center p-4 mb-4 text-gray-800 bg-white rounded-lg shadow-md cursor-pointer md:mb-0"
                    >
                        <FaEnvelope className="mr-3 text-2xl text-blue-500" />
                        <span className="text-lg">info@nameindream.com</span>
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
                        <iframe
                            title="Location Map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115408.24588722808!2d82.90870648972621!3d25.320739742068533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2db76febcf4d%3A0x68131710853ff0b5!2sVaranasi%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1723059220667!5m2!1sen!2sin"
                            className="absolute inset-0 w-full h-full border-none"
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>

                {/* Social Media Links */}
                <div className="text-center">
                    <h2 className="mb-4 text-xl font-semibold">Follow Us</h2>
                    <div className="flex justify-center space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-gray-300">
                            <FaFacebook />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-gray-300">
                            <FaTwitter />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-gray-300">
                            <FaInstagram />
                        </a>
                        <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-gray-300">
                            <FaWhatsapp />
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ContactPage;
