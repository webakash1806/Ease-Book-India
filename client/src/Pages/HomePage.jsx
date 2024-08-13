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
            <CategorySection />
            <ExploreSection />
            <TestimonialSection />
        </div>
    )
}

export default HomePage
