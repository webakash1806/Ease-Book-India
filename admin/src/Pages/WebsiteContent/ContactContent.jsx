import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaClock } from 'react-icons/fa';
import HomeLayout from '../../Layouts/HomeLayouts';
import { FaXTwitter } from 'react-icons/fa6';

const ContactContent = () => {
    const [loaderActive, setLoaderActive] = useState(false)
    const [formData, setFormData] = useState({
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: '',
        phone1: '',
        phone2: '',
        whatsapp: '',
        email1: '',
        email2: '',
        googleMapIframe: '',
        serviceTime: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log(formData);
    };

    // Define class name variables
    const inputContainerClass = "flex items-center  p-1 pl-4 border border-gray-300 rounded min-w-[17.5rem] max-w-[30rem] md:max-w-[25rem] w-[85vw] sm:w-[30rem] lg:max-w-[20rem] shadow-sm bg-[#2F3349]";
    const inputClass = "w-full rounded p-2 resize-none border-none bg-white text-black outline-none";
    const iconClass = "mr-4 text-white text-xl";


    return (
        <HomeLayout>
            <div className=" w-fit pt-2 px-[2vw] py-4 sm:p-8 m-[0_auto] mb-12 my-6 bg-white rounded-md shadow-[0px_0px_15px_-6px_#808080]">

                <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center space-y-2">
                    <h1 className='text-[1.5rem] font-semibold text-black text-center mb-3 border-b-4 rounded-b  border-black'>Contact Details</h1>
                    {/* Social Media Links */}
                    <div className='flex flex-col gap-2 lg:gap-4 lg:flex-row'>
                        <div className="space-y-2">
                            <div className={inputContainerClass}>
                                <FaFacebook className={`${iconClass} `} />
                                <input
                                    type="text"
                                    name="facebook"
                                    placeholder="Facebook URL"
                                    value={formData.facebook}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>
                            <div className={inputContainerClass}>
                                <FaXTwitter className={`${iconClass} `} />
                                <input
                                    type="text"
                                    name="twitter"
                                    placeholder="Twitter URL"
                                    value={formData.twitter}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>
                            <div className={inputContainerClass}>
                                <FaInstagram className={`${iconClass} `} />
                                <input
                                    type="text"
                                    name="instagram"
                                    placeholder="Instagram URL"
                                    value={formData.instagram}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>
                            <div className={inputContainerClass}>
                                <FaLinkedin className={`${iconClass} `} />
                                <input
                                    type="text"
                                    name="linkedin"
                                    placeholder="LinkedIn URL"
                                    value={formData.linkedin}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>
                            <div className={inputContainerClass}>
                                <FaWhatsapp className={`${iconClass} `} />
                                <input
                                    type="text"
                                    name="whatsapp"
                                    placeholder="WhatsApp Number"
                                    value={formData.whatsapp}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        {/* Phone Numbers */}
                        <div className="space-y-2">
                            <div className={inputContainerClass}>
                                <FaPhoneAlt className={`${iconClass} `} />
                                <input
                                    type="text"
                                    name="phone1"
                                    placeholder="Phone Number 1"
                                    value={formData.phone1}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>
                            <div className={inputContainerClass}>
                                <FaPhoneAlt className={`${iconClass} `} />
                                <input
                                    type="text"
                                    name="phone2"
                                    placeholder="Phone Number 2"
                                    value={formData.phone2}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>

                            <div className={inputContainerClass}>
                                <FaEnvelope className={`${iconClass}`} />
                                <input
                                    type="email"
                                    name="email1"
                                    placeholder="Email Address 1"
                                    value={formData.email1}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>
                            <div className={inputContainerClass}>
                                <FaEnvelope className={`${iconClass}`} />
                                <input
                                    type="email"
                                    name="email2"
                                    placeholder="Email Address 2"
                                    value={formData.email2}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>
                            <div className={inputContainerClass}>
                                <FaClock className={`${iconClass}`} />
                                <input
                                    type="text"
                                    name="serviceTime"
                                    placeholder="Service Time"
                                    value={formData.serviceTime}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>
                        </div>

                    </div>
                    {/* Google Maps Iframe */}
                    <div className="space-y-2">
                        <div className={`${inputContainerClass} lg:min-w-[41rem]`}>
                            <FaMapMarkerAlt className={`${iconClass} `} />
                            <textarea
                                name="googleMapIframe"
                                placeholder="Google Maps Iframe URL"
                                value={formData.googleMapIframe}
                                onChange={handleChange}
                                className={`${inputClass} `}
                                rows={3}

                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end w-full pt-3">
                        <button
                            type="submit"
                            className={'px-6 py-2 flex items-center justify-center gap-4 text-white transition bg-[#655CCE] rounded min-w-[13rem] shadow-lg hover:bg-[#FF4C51]'}
                        >
                            Submit
                            {
                                loaderActive &&
                                <div className='rounded-full border-[3px] border-y-gray-800 animate-spin ease-in-out border-gray-300 size-5'></div>
                            }
                        </button>
                    </div>
                </form>
            </div>
        </HomeLayout>
    );
};

export default ContactContent;
