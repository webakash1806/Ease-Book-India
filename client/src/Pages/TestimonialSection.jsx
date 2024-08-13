import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Grid } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/grid';
import { motion, useMotionValue, useTransform } from 'framer-motion';
const TestimonialsSwiper = () => {
    const testimonials = [
        // ... (testimonials data)
        {
            name: 'Chirag Arora',
            occupation: 'Student',
            imageUrl: 'https://dgyugonj9a9mu.cloudfront.net/IMG_1560_chirag_arora_bb181b9a5f.jpeg',
            testimonial: 'Best DSA paid Course one could ever come across online. Affordable but got delivered more than that what it costed. Variety of questions top notch. Definitely better than those costing 20-25 K.',
        }, {
            name: 'Chirag Arora',
            occupation: 'Student',
            imageUrl: 'https://dgyugonj9a9mu.cloudfront.net/IMG_1560_chirag_arora_bb181b9a5f.jpeg',
            testimonial: 'Best DSA paid Course one could ever come across online. Affordable but got delivered more than that what it costed. Variety of questions top notch. Definitely better than those costing 20-25 K.',
        }, {
            name: 'Chirag Arora',
            occupation: 'Student',
            imageUrl: 'https://dgyugonj9a9mu.cloudfront.net/IMG_1560_chirag_arora_bb181b9a5f.jpeg',
            testimonial: 'Best DSA paid Course one could ever come across online. Affordable but got delivered more than that what it costed. Variety of questions top notch. Definitely better than those costing 20-25 K.',
        }, {
            name: 'Chirag Arora',
            occupation: 'Student',
            imageUrl: 'https://dgyugonj9a9mu.cloudfront.net/IMG_1560_chirag_arora_bb181b9a5f.jpeg',
            testimonial: 'Best DSA paiest DSA paid Course one couldd Course one could ever come across online. Affordable but got delivered more than that what it costed. Variety of questions top notch. Definitely better than those costing 20-25 K.',
        }, {
            name: 'Chirag Arora',
            occupation: 'Student',
            imageUrl: 'https://dgyugonj9a9mu.cloudfront.net/IMG_1560_chirag_arora_bb181b9a5f.jpeg',
            testimonial: 'Best DSA paid Course one could ever come across online. Affordable but got delivered more than that what it costed. Variety of questions top notch. Definitely better than those costing 20-25 K.',
        }, {
            name: 'Chirag Arora',
            occupation: 'Student',
            imageUrl: 'https://dgyugonj9a9mu.cloudfront.net/IMG_1560_chirag_arora_bb181b9a5f.jpeg',
            testimonial: 'Best DSA paidest DSA paid Course one could est DSA paid Course one couldCourse one could ever come across online. Affordable but got delivered more than that what it costed. Variety of questions top notch. Definitely better than those costing 20-25 K DSA paidest DSA paid Course one could est DSA paid Course one couldCourse one could ever come across online. Affordable but got delivered more than that what it costed. Variety of questions top notch. Definitely better than those costing 20-25 K DSA paidest DSA paid Course one could est DSA paid Course one couldCourse one could ever come across online. Affordable but got delivered more than that what it costed. Variety of questions top notch. Definitely better than those costing 20-25 K.',
        }, {
            name: 'Chirag Arora',
            occupation: 'Student',
            imageUrl: 'https://dgyugonj9a9mu.cloudfront.net/IMG_1560_chirag_arora_bb181b9a5f.jpeg',
            testimonial: 'Best DSA paid Course one could ever come across online. Affordable but got delivered more than that what it costed. Variety of questions top notch. Definitely better than those costing 20-25 K.',
        },
        {
            name: 'Chirag Arora',
            occupation: 'Student',
            imageUrl: 'https://dgyugonj9a9mu.cloudfront.net/IMG_1560_chirag_arora_bb181b9a5f.jpeg',
            testimonial: 'Best DSA paid Course one could ever come across online. Affordable but got delivered more than that what it costed. Variety of questions top notch. Definitely better than those costing 20-25 K.',
        }, {
            name: 'Chirag Arora',
            occupation: 'Student',
            imageUrl: 'https://dgyugonj9a9mu.cloudfront.net/IMG_1560_chirag_arora_bb181b9a5f.jpeg',
            testimonial: 'Best DSA paiest DSA paid Course one couldd Course one could ever come across online. Affordable but got delivered more than that what it costed. Variety of questions top notch. Definitely better than those costing 20-25 K.',
        }, {
            name: 'Chirag Arora',
            occupation: 'Student',
            imageUrl: 'https://dgyugonj9a9mu.cloudfront.net/IMG_1560_chirag_arora_bb181b9a5f.jpeg',
            testimonial: 'Best DSA paid Course one could ever come across online. Affordable but got delivered more than that what it costed. Variety of questions top notch. Definitely better than those costing 20-25 K.',
        }, {
            name: 'Chirag Arora',
            occupation: 'Student',
            imageUrl: 'https://dgyugonj9a9mu.cloudfront.net/IMG_1560_chirag_arora_bb181b9a5f.jpeg',
            testimonial: 'Best DSA paidest DSA paid Course one could est DSA paid Course one couldCourse one could ever come across online. Affordable but got delivered more than that what it costed. Variety of questions top notch. Definitely better than those costing 20-25 K DSA paidest DSA paid Course one could est DSA paid Course one couldCourse one could ever come across online. Affordable but got delivered more than that what it costed. Variety of questions top notch. Definitely better than those costing 20-25 K DSA paidest DSA paid Course one could est DSA paid Course one couldCourse one could ever come across online. Affordable but got delivered more than that what it costed. Variety of questions top notch. Definitely better than those costing 20-25 K.',
        }, {
            name: 'Chirag Arora',
            occupation: 'Student',
            imageUrl: 'https://dgyugonj9a9mu.cloudfront.net/IMG_1560_chirag_arora_bb181b9a5f.jpeg',
            testimonial: 'Best DSA paid Course one could ever come across online. Affordable but got delivered more than that what it costed. Variety of questions top notch. Definitely better than those costing 20-25 K.',
        },
        {
            name: 'Chirag Arora',
            occupation: 'Student',
            imageUrl: 'https://dgyugonj9a9mu.cloudfront.net/IMG_1560_chirag_arora_bb181b9a5f.jpeg',
            testimonial: 'Best DSA paid Course one could ever come across online. Affordable but got delivered more than that what it costed. Variety of questions top notch. Definitely better than those costing 20-25 K.',
        }, {
            name: 'Chirag Arora',
            occupation: 'Student',
            imageUrl: 'https://dgyugonj9a9mu.cloudfront.net/IMG_1560_chirag_arora_bb181b9a5f.jpeg',
            testimonial: 'Best DSA paiest DSA paid Course one couldd Course one could ever come across online. Affordable but got delivered more than that what it costed. Variety of questions top notch. Definitely better than those costing 20-25 K.',
        }, {
            name: 'Chirag Arora',
            occupation: 'Student',
            imageUrl: 'https://dgyugonj9a9mu.cloudfront.net/IMG_1560_chirag_arora_bb181b9a5f.jpeg',
            testimonial: 'Best DSA paid Course one could ever come across online. Affordable but got delivered more than that what it costed. Variety of questions top notch. Definitely better than those costing 20-25 K.',
        }, {
            name: 'Chirag Arora',
            occupation: 'Student',
            imageUrl: 'https://dgyugonj9a9mu.cloudfront.net/IMG_1560_chirag_arora_bb181b9a5f.jpeg',
            testimonial: 'Best DSA paidest DSA paid Course one could est DSA paid Course one couldCourse one could ever come across online. Affordable but got delivered more than that what it costed. Variety of questions top notch. Definitely better than those costing 20-25 K DSA paidest DSA paid Course one could est DSA paid Course one couldCourse one could ever come across online. Affordable but got delivered more than that what it costed. Variety of questions top notch. Definitely better than those costing 20-25 K DSA paidest DSA paid Course one could est DSA paid Course one couldCourse one could ever come across online. Affordable but got delivered more than that what it costed. Variety of questions top notch. Definitely better than those costing 20-25 K.',
        }, {
            name: 'Chirag Arora',
            occupation: 'Student',
            imageUrl: 'https://dgyugonj9a9mu.cloudfront.net/IMG_1560_chirag_arora_bb181b9a5f.jpeg',
            testimonial: 'Best DSA paid Course one could ever come across online. Affordable but got delivered more than that what it costed. Variety of questions top notch. Definitely better than those costing 20-25 K.',
        },
        {
            name: 'Chirag Arora',
            occupation: 'Student',
            imageUrl: 'https://dgyugonj9a9mu.cloudfront.net/IMG_1560_chirag_arora_bb181b9a5f.jpeg',
            testimonial: 'Best DSA paid Course one could ever come across online. Affordable but got delivered more than that what it costed. Variety of questions top notch. Definitely better than those costing 20-25 K.',
        }, {
            name: 'Chirag Arora',
            occupation: 'Student',
            imageUrl: 'https://dgyugonj9a9mu.cloudfront.net/IMG_1560_chirag_arora_bb181b9a5f.jpeg',
            testimonial: 'Best DSA paiest DSA paid Course one couldd Course one could ever come across online. Affordable but got delivered more than that what it costed. Variety of questions top notch. Definitely better than those costing 20-25 K.',
        }, {
            name: 'Chirag Arora',
            occupation: 'Student',
            imageUrl: 'https://dgyugonj9a9mu.cloudfront.net/IMG_1560_chirag_arora_bb181b9a5f.jpeg',
            testimonial: 'Best DSA paid Course one could ever come across online. Affordable but got delivered more than that what it costed. Variety of questions top notch. Definitely better than those costing 20-25 K.',
        }, {
            name: 'Chirag Arora',
            occupation: 'Student',
            imageUrl: 'https://dgyugonj9a9mu.cloudfront.net/IMG_1560_chirag_arora_bb181b9a5f.jpeg',
            testimonial: 'Best DSA paidest DSA paid Course one could est DSA paid Course one couldCourse one could ever come across online. Affordable but got delivered more than that what it costed. Variety of questions top notch. Definitely better than those costing 20-25 K DSA paidest DSA paid Course one could est DSA paid Course one couldCourse one could ever come across online. Affordable but got delivered more than that what it costed. Variety of questions top notch. Definitely better than those costing 20-25 K DSA paidest DSA paid Course one could est DSA paid Course one couldCourse one could ever come across online. Affordable but got delivered more than that what it costed. Variety of questions top notch. Definitely better than those costing 20-25 K.',
        }, {
            name: 'Chirag Arora',
            occupation: 'Student',
            imageUrl: 'https://dgyugonj9a9mu.cloudfront.net/IMG_1560_chirag_arora_bb181b9a5f.jpeg',
            testimonial: 'Best DSA paid Course one could ever come across online. Affordable but got delivered more than that what it costed. Variety of questions top notch. Definitely better than those costing 20-25 K.',
        }, {


            name: 'Chirag Arora',
            occupation: 'Student',
            imageUrl: 'https://dgyugonj9a9mu.cloudfront.net/IMG_1560_chirag_arora_bb181b9a5f.jpeg',
            testimonial: 'Best DSA paid Course one could ever come across online. Affordable but got delivered more than that what it costed. Variety of questions top notch. Definitely better than those costing 20-25 K.',
        }, {
            name: 'Chirag Arora',
            occupation: 'Student',
            imageUrl: 'https://dgyugonj9a9mu.cloudfront.net/IMG_1560_chirag_arora_bb181b9a5f.jpeg',
            testimonial: 'Best DSA paid Course one could ever come across online. Affordable but got delivered more than that what it costed. Variety of questions top notch. Definitely better than those costing 20-25 K.',
        }, {
            name: 'Chirag Arora',
            occupation: 'Student',
            imageUrl: 'https://dgyugonj9a9mu.cloudfront.net/IMG_1560_chirag_arora_bb181b9a5f.jpeg',
            testimonial: 'Best DSA paid Course one could ever come across online. Affordable but got delivered more than that what it costed. Variety of questions top notch. Definitely better than those costing 20-25 K.',
        },
        // ... (more testimonials)
    ];

    return (
        <div className="relative flex flex-col items-center justify-center w-full p-4 pt-10 pb-10  bg-[#fefefe]">
            <div className='flex flex-col items-center justify-center pb-16 my-2 text-[#323232]'>
                <h1 className=' text-[2.1rem] font-bold leading-10 mb-3 text-[#0270F9]'>Hear It From <br /> Our Happy Clients!</h1>
                <p className='font-semibold text-[1.1rem]'>Discover the experiences of those who chose us and see why they’re all smiles!</p>
            </div>
            <Swiper
                direction="vertical"
                slidesPerView={4}
                spaceBetween={10}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                loop={true}

                speed={2000}
                modules={[Autoplay, Grid]}
                className="w-full max-w-screen-xl h-[120vh]  !py-2 swiper-backface-hidden"
                grid={{
                    rows: 1,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 4,
                        grid: {
                            rows: 2,
                        },
                    },
                    1024: {
                        slidesPerView: 6,
                        grid: {
                            rows: 3,
                        },
                    },
                }}
                pagination={false}
            >
                {testimonials.map((testimonial, index) => {
                    // State to store cursor position
                    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

                    // Motion values for tilt effect
                    const x = useMotionValue(0);
                    const y = useMotionValue(0);
                    const rotateX = useTransform(y, [-100, 0, 100], [10, 0, -10]);
                    const rotateY = useTransform(x, [-100, 0, 100], [-10, 0, 10]);

                    const handleMouseMove = (e) => {
                        const { clientX, clientY } = e;
                        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
                        setCursorPosition({
                            x: (clientX - left) / width * 100,
                            y: (clientY - top) / height * 100
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
                        <SwiperSlide key={index} className="!h-fit   sm:mx-2 flex items-center justify-center">
                            <motion.div
                                className="relative flex flex-col items-start p-6 overflow-hidden bg-white border border-gray-200 shadow-inner gap-y-6 rounded-xl"
                                style={{ rotateX, rotateY }}
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            >
                                {/* Gradient Overlay */}
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
                                        src={testimonial.imageUrl}
                                        loading="lazy"
                                    />
                                    <div className="flex flex-col items-start">
                                        <p className=" font-semibold text-[1.1rem] text-neutral-800">{testimonial.name}</p>
                                        <p className="text-sm font-medium text-gray-600">{testimonial.occupation}</p>
                                    </div>
                                </div>
                                <p className="font-normal text-gray-700 ">{testimonial.testimonial}</p>
                            </motion.div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>

            <div className="absolute bottom-0 left-0 right-0 h-[30rem] z-[100] pointer-events-none bg-gradient-to-t from-white via-[#ffffffa8] to-transparent"></div>
        </div>
    );
};

export default TestimonialsSwiper;