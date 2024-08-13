import React from 'react';
import { FaArrowLeft, FaHotel } from 'react-icons/fa';
import AnimatedText from './AnimatedText';
import { FaAlignLeft } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowRight } from 'react-icons/md';

const SocialCard = ({ title, des, icon, item }) => {
    const renderIcon = () => {
        switch (icon) {
            case 'hotel':
                return (
                    <FaHotel className='text-white  text-[2rem]' />
                );
            case 'food':
                return (
                    <svg
                        className="w-10 h-10 text-white animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m-6 0l3-3m3-3H9" />
                    </svg>
                );
            // Add more SVGs/icons as needed
            default:
                return null;
        }
    };

    return (
        <div className={`${icon === "testimonial" && 'min-h-[12rem] py-10 pt-6'} relative pt-0 p-6  lg:px-[12rem] xl:px-[17rem] md:px-20 h-fit pb-2 overflow-hidden shadow-lg cursor-pointer bg-gradient-to-r from-[#08014c] to-[#0022ff]`}>
            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,_#ffffff,_#f3f4f5_10px,_#808000_10px,_#fff45a_20px)] opacity-20"></div>

            <div className="relative z-10 flex flex-col items-center justify-center">
                <div className='flex items-center justify-center gap-3'>
                    {renderIcon()}
                    <h2 className="text-[2rem] font-bold mt-4 text-white ">
                        <AnimatedText text3={title} />
                    </h2>
                    {renderIcon()}

                </div>
                <p className=" text-center leading-6 font-semibold text-[#fff]">
                    <AnimatedText text1={des} />
                </p>
                {icon !== "testimonial" && <nav className="flex items-center   backdrop-blur-[5px] bg-[#1b1b1b58] justify-center w-full p-1 mx-auto space-x-2 text-gray-300  border border-blue-900 rounded">
                    {item?.map((item, index) => (
                        <React.Fragment key={index}>
                            {index > 0 && <span className="text-white"><MdKeyboardArrowRight className='text-[1.5rem] mt-[0.2rem]' /></span>}
                            {item.href ? (
                                <Link
                                    to={item.href}
                                    className="hover:text-white"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span className="font-semibold text-white">{item.label}</span>
                            )}
                        </React.Fragment>
                    ))}
                </nav>}
            </div>

        </div>
    );
};

export default SocialCard;
