import React, { useState, useEffect, useRef } from 'react';
import { FaHandsHelping, FaAward, FaHeartbeat, FaUsers } from 'react-icons/fa';
import { motion, useAnimation } from 'framer-motion';
import devImg from '../assets/Images/devImg.jpeg';
import { useNavigate } from 'react-router-dom';
import SocialCard from '../Components/SocialCard';
import { FaArrowLeft } from 'react-icons/fa6';

// Custom hook for detecting if an element is in view
const useOnScreen = (options) => {
    const [isIntersecting, setIntersecting] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIntersecting(entry.isIntersecting);
            },
            options
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref, options]);

    return [ref, isIntersecting];
};

const AboutPage = () => {
    const [missionRef, isMissionVisible] = useOnScreen({ threshold: 0.2 });
    const [storyRef, isStoryVisible] = useOnScreen({ threshold: 0.2 });
    const [whyChooseRef, isWhyChooseVisible] = useOnScreen({ threshold: 0.2 });
    const [teamRef, isTeamVisible] = useOnScreen({ threshold: 0.2 });

    const missionControls = useAnimation();
    const storyControls = useAnimation();
    const whyChooseControls = useAnimation();
    const teamControls = useAnimation();

    useEffect(() => {
        if (isMissionVisible) {
            missionControls.start({ opacity: 1, y: 0 });
        }
        if (isStoryVisible) {
            storyControls.start({ opacity: 1, y: 0 });
        }
        if (isWhyChooseVisible) {
            whyChooseControls.start({ opacity: 1, y: 0 });
        }
        if (isTeamVisible) {
            teamControls.start({ opacity: 1, y: 0 });
        }
    }, [isMissionVisible, isStoryVisible, isWhyChooseVisible, isTeamVisible, missionControls, storyControls, whyChooseControls, teamControls]);

    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'About', },
    ];

    const navigate = useNavigate()

    return (
        <>
            <div className='relative'>
                <SocialCard item={breadcrumbItems} icon={"about"} title={"About Us"} des={"Welcome to company ka nam av socha hi nahi hai!"} />
                <div onClick={() => navigate(-1)} className='absolute top-1 left-1 p-2 bg-[#4960f8] shadow-md rounded w-fit'>
                    <FaArrowLeft onClick={() => navigate(-1)} className='text-white text-[1.1rem]' />
                </div>
            </div>
            <div className="min-h-screen p-2 text-white sm:p-8 bg-gradient-to-r from-green-400 to-blue-500">
                <div className="py-4 mx-auto max-w-7xl">

                    <section className="mb-16">
                        <h2 className="mb-4 text-3xl font-semibold text-center">Our Mission</h2>
                        <motion.div
                            ref={missionRef}
                            initial={{ opacity: 0, y: 50 }}
                            animate={missionControls}
                            transition={{ duration: 0.7 }}
                            className="relative flex flex-col items-center gap-8 p-3 text-black bg-white rounded-lg shadow-lg sm:p-8 md:flex-row md:items-start"
                        >
                            <img src="https://via.placeholder.com/400" alt="Mission Visual" className="w-full hidden sm:block sm:w-[17rem] md:w-1/4 rounded-lg shadow-lg" />

                            <div>
                                <p className="mb-4 text-lg leading-relaxed">
                                    At <span className="font-bold">Booking Platform</span>, we are committed to revolutionizing the booking experience for both individuals and businesses. Our mission is to create a seamless connection between users and a wide array of services—from car rentals and hotel reservations to boat bookings and pooja ceremonies—all through an intuitive and user-friendly platform.
                                </p>
                                <p className="mb-4 text-lg leading-relaxed">
                                    We are dedicated to enhancing convenience and accessibility, ensuring that every interaction with our platform is efficient and enjoyable. By leveraging cutting-edge technology and collaborating with trusted service providers, we aim to deliver exceptional value and reliability, transforming the way users explore and book their needs.
                                </p>
                            </div>
                        </motion.div>
                    </section>

                    <section className="mb-16">
                        <h2 className="mb-4 text-3xl font-semibold text-center">Our Story</h2>
                        <motion.div
                            ref={storyRef}
                            initial={{ opacity: 0, y: 50 }}
                            animate={storyControls}
                            transition={{ duration: 0.7 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 flex items-center">
                                <div className="flex-grow border-t-2 border-white"></div>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-12 md:flex-row">
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={storyControls}
                                    transition={{ duration: 0.7, delay: 0.5 }}
                                    className="relative z-10 w-full p-6 text-black bg-white rounded-lg shadow-lg md:w-1/3"
                                >
                                    <h3 className="mb-2 text-2xl font-semibold">2022</h3>
                                    <p className="text-lg leading-relaxed">
                                        Our company was founded with a vision to simplify the booking process for a wide range of services. We started small but with a clear mission to provide a reliable platform for users.
                                    </p>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={storyControls}
                                    transition={{ duration: 0.7, delay: 1 }}
                                    className="relative z-10 w-full p-6 text-black bg-white rounded-lg shadow-lg md:w-1/3"
                                >
                                    <h3 className="mb-2 text-2xl font-semibold">2023</h3>
                                    <p className="text-lg leading-relaxed">
                                        We expanded our services to include boats and hotels, making our platform a one-stop solution for all booking needs. Our user base grew significantly as we continued to innovate and improve.
                                    </p>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={storyControls}
                                    transition={{ duration: 0.7, delay: 1.5 }}
                                    className="relative z-10 w-full p-6 text-black bg-white rounded-lg shadow-lg md:w-1/3"
                                >
                                    <h3 className="mb-2 text-2xl font-semibold">2024</h3>
                                    <p className="text-lg leading-relaxed">
                                        We are continuously working on enhancing our platform with new features and services, striving to deliver exceptional value to our users and making their booking experience seamless.
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </section>

                    <section className="mb-16">
                        <h2 className="mb-4 text-3xl font-semibold text-center">Why Choose Us?</h2>
                        <motion.div
                            ref={whyChooseRef}
                            initial={{ opacity: 0, y: 50 }}
                            animate={whyChooseControls}
                            transition={{ duration: 0.7 }}
                            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
                        >
                            <div className="flex flex-col items-center p-6 text-black transition-transform duration-300 transform bg-white rounded-lg shadow-lg hover:scale-105">
                                <FaHandsHelping className="mb-4 text-6xl text-green-400" />
                                <h3 className="mb-2 text-2xl font-semibold">Reliable Services</h3>
                                <p className="text-center">We connect you with verified and trustworthy service providers to ensure you receive top-notch services every time.</p>
                            </div>
                            <div className="flex flex-col items-center p-6 text-black transition-transform duration-300 transform bg-white rounded-lg shadow-lg hover:scale-105">
                                <FaAward className="mb-4 text-6xl text-blue-400" />
                                <h3 className="mb-2 text-2xl font-semibold text-center">Award-Winning Platform</h3>
                                <p className="text-center">Our dedication to excellence has earned us several industry awards and recognitions.</p>
                            </div>
                            <div className="flex flex-col items-center p-6 text-black transition-transform duration-300 transform bg-white rounded-lg shadow-lg hover:scale-105">
                                <FaHeartbeat className="mb-4 text-6xl text-red-400" />
                                <h3 className="mb-2 text-2xl font-semibold">Customer-Centric</h3>
                                <p className="text-center">Your satisfaction is our priority. We go the extra mile to ensure you have the best experience possible.</p>
                            </div>
                            <div className="flex flex-col items-center p-6 text-black transition-transform duration-300 transform bg-white rounded-lg shadow-lg hover:scale-105">
                                <FaUsers className="mb-4 text-6xl text-yellow-400" />
                                <h3 className="mb-2 text-2xl font-semibold">Community Focused</h3>
                                <p className="text-center">We are committed to fostering a strong community and building long-lasting relationships with our users.</p>
                            </div>
                        </motion.div>
                    </section>

                    <section>
                        <h2 className="mb-4 text-3xl font-semibold text-center">Meet Our Team</h2>
                        <motion.div
                            ref={teamRef}
                            initial={{ opacity: 0, y: 50 }}
                            animate={teamControls}
                            transition={{ duration: 0.7 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 flex items-center">
                                <div className="flex-grow border-t-2 border-white"></div>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-12 md:flex-row">
                                <div className="relative z-10 w-full p-6 text-black bg-white rounded-lg shadow-lg md:w-1/3">
                                    <img src={devImg} alt="Team Member" className="w-32 h-32 mx-auto rounded-full" />
                                    <h3 className="mt-4 text-2xl font-semibold text-center">Akash Kumar Singh</h3>

                                    <p className="text-lg text-center">CEO & Founder</p>
                                </div>
                                <div className="relative z-10 w-full p-6 text-black bg-white rounded-lg shadow-lg md:w-1/3">
                                    <img src={devImg} alt="Team Member" className="w-32 h-32 mx-auto rounded-full" />
                                    <h3 className="mt-4 text-2xl font-semibold text-center">Akash Kumar Singh</h3>

                                    <p className="text-lg text-center">CTO</p>
                                </div>
                                <div className="relative z-10 w-full p-6 text-black bg-white rounded-lg shadow-lg md:w-1/3">
                                    <img src={devImg} alt="Team Member" className="w-32 h-32 mx-auto rounded-full" />
                                    <h3 className="mt-4 text-2xl font-semibold text-center">Akash Kumar Singh</h3>
                                    <p className="text-lg text-center">Lead Designer</p>
                                </div>
                            </div>
                        </motion.div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default AboutPage;
