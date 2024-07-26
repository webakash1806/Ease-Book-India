import React from 'react'
import { useSelector } from 'react-redux'
import Pending from '../Components/Approval/Pending'
import Rejected from '../Components/Approval/Rejected'

const Home = () => {

    const approval = useSelector((state) => state?.auth?.data?.status)

    return (
        <>
            <div className='flex items-center justify-center sm:p-10 p-2 py-10 bg-[#F5F4F7] min-h-[90vh]'>
                {approval === 'PENDING' &&
                    <Pending />}
                {approval === 'REJECTED' &&
                    <Rejected />}
            </div>
        </>
    )
}

export default Home
