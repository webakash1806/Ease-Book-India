import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import SocialCard from '../Components/SocialCard';
import { useDispatch, useSelector } from 'react-redux';
import { getTestimonialData } from '../Redux/Slices/AuthSlice';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CustomCarouselTestimonials = () => {
    const dispatch = useDispatch();
    const testimonials = useSelector((state) => state?.auth?.testimonialData) || [];

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        dispatch(getTestimonialData());
        setLoading(false)
    }, [dispatch]);

    const settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 3,
        slidesToScroll: 0.5,
        autoplay: true,
        autoplaySpeed: 5000,
        vertical: true,  // Enable vertical scrolling
        verticalSwiping: true,  // Enable vertical swiping
        pauseOnHover: true,
        arrows: false, // Remove arrows
        rows: 1, // Use only one row for the grid
        slidesPerRow: 3, // 3 columns per row
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesPerRow: 2,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesPerRow: 1,
                },
            },
        ],
    };

    const TestimonialCard = ({ testimonial }) => {
        const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
        const x = useMotionValue(0);
        const y = useMotionValue(0);
        const rotateX = useTransform(y, [-100, 0, 100], [10, 0, -10]);
        const rotateY = useTransform(x, [-100, 0, 100], [-10, 0, 10]);

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
            setCursorPosition({
                x: ((clientX - left) / width) * 100,
                y: ((clientY - top) / height) * 100,
            });
            x.set(((clientX - left) / width - 0.5) * 90);
            y.set(((clientY - top) / height - 0.5) * -90);
        };

        const handleMouseLeave = () => {
            setCursorPosition({ x: 0, y: 0 });
            x.set(0);
            y.set(0);
        };

        return (
            <motion.div
                className="relative flex flex-col items-start w-full p-6 overflow-hidden bg-white border border-gray-200 shadow-inner gap-y-6 rounded-xl"
                style={{ rotateX, rotateY }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                <div
                    className="absolute left-[-10rem] inset-0 pointer-events-none"
                    style={{
                        background: `radial-gradient(circle ${Math.min(window.innerWidth, window.innerHeight) / 1.5}px at ${cursorPosition.x}% ${cursorPosition.y}%, #001eff0e, transparent 60%)`,
                        borderRadius: 'inherit',
                    }}
                />
                <div className="relative z-10 flex items-center gap-3">
                    <img
                        alt="profile"
                        className="object-cover w-[50px] h-[50px] rounded-full"
                        src={testimonial?.reviewerImage?.secure_url}
                        loading="lazy"
                    />
                    <div className="flex flex-col items-start">
                        <p className="font-semibold text-[1.1rem] text-neutral-800">{testimonial?.servicesUsed}</p>
                    </div>
                </div>
                <p className="font-normal text-gray-700">{testimonial?.reviewText}</p>
            </motion.div>
        );
    };

    return (
        <>
            <div className="relative">
                <SocialCard
                    icon="testimonial"
                    title="Hear It From Our Happy Clients!"
                    des="Discover the experiences of those who chose us and see why they’re all smiles!"
                />
            </div>
            <div className="relative flex flex-col h-[110vh] items-center justify-start w-full p-4 pt-10 pb-10 bg-[#fefefe]">
                <Slider {...settings} className="w-full max-w-screen-xl">
                    {loading ? <div>Loading...</div> :
                        testimonials?.map((testimonial, index) => (
                            <div
                                key={index}
                                className="!h-fit flex items-center justify-center px-2 py-1" // Add space between cards
                            >
                                <TestimonialCard testimonial={testimonial} />
                            </div>
                        ))}
                </Slider>
                <div className="absolute bottom-0 left-0 right-0 h-[30rem] z-[100] pointer-events-none bg-gradient-to-t from-white via-[#ffffffa8] to-transparent"></div>
            </div>
        </>
    );
};

export default CustomCarouselTestimonials;
