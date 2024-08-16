import React from 'react'
import HeroSection from '../Components/HeroSection'
import CategorySection from '../Components/CategorySection'
import ExploreSection from '../Components/ExploreSection'
import HomeLayout from '../Layout/HomeLayout'
import TestimonialSection from './TestimonialSection'
import SocialCard from '../Components/SocialCard'

const HomePage = () => {
    return (
        <div className='w-full text-white bg-black'>
            <div className='shadow-[0px_8px_20px_-5px_#000]  relative z-[10]'>


                <HeroSection />
            </div>
            {/* <div className='flex items-center justify-center'>
                <div className='p-2 max-w-[25rem] flex gap-2 flex-col items-center justify-center text-center'>

                    <h1 className='text-[1.1rem]'>
                        Hello <span>${"user.fullName"}</span>,

                    </h1>


                    <p className='font-normal'>
                        It seems you’ve requested to reset your password. Let’s get you back on track! Click the button below to securely reset your password:
                    </p>


                    <a className='from-[#1751fe] via-[#0074f9] hover:bg-gradient-to-bl bg-gradient-to-tr to-[#0199ff] transition-all duration-300 border-none text-white rounded-sm px-4 py-2 font-normal text-[1.02rem] my-3 tracking-wide' href="${resetPasswordURL}">
                        Reset My Password
                    </a>

                    <p className='font-normal'>
                        If you did not request a password reset, no worries—just ignore this email, and your password will remain unchanged.
                    </p>

                    <div>
                        <p>
                            Stay safe,
                        </p>
                        <p>Ease Book India</p>
                        Support Team
                    </div>

                </div>
            </div> */}
            <CategorySection />
            <ExploreSection />
            <TestimonialSection />
        </div>
    )
}

export default HomePage
