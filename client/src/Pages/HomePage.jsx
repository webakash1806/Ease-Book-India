import React from 'react'
import HeroSection from '../Components/HeroSection'
import CategorySection from '../Components/CategorySection'

const HomePage = () => {
    return (
        <div className='text-white h-[100vh] w-full bg-black'>
            <HeroSection />
            <CategorySection />
        </div>
    )
}

export default HomePage
