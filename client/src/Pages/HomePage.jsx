import React from 'react'
import HeroSection from '../Components/HeroSection'
import CategorySection from '../Components/CategorySection'
import ExploreSection from '../Components/ExploreSection'
import HomeLayout from '../Layout/HomeLayout'

const HomePage = () => {
    return (
        <div className='text-white w-full bg-black'>
            <HeroSection />
            <CategorySection />
            <ExploreSection />
        </div>
    )
}

export default HomePage
