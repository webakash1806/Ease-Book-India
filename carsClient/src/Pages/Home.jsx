import React from 'react'
import { useSelector } from 'react-redux'
import Approval from '../Components/Approval'

const Home = () => {

    const approval = useSelector((state) => state?.auth?.data?.status)

    return (
        <>
            <div className='flex items-center justify-center sm:p-10 p-2 py-10 bg-[#F5F4F7] min-h-[90vh]'>
                {approval === 'PENDING' &&
                    <Approval />}
            </div>
        </>
    )
}

export default Home
