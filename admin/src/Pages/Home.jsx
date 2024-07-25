import React, { useState } from 'react'
import CalendarCom from '../Components/CalendarCom'
import HomeLayout from '../Layouts/HomeLayouts'


const Home = () => {

    return (
        <HomeLayout>
            <div className='mt-4 text-black'>
                <CalendarCom />
            </div>
        </HomeLayout>
    )
}

export default Home
