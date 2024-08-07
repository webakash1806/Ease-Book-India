import React from 'react'
import { useSelector } from 'react-redux'
import Pending from '../Components/Approval/Pending'
import Rejected from '../Components/Approval/Rejected'
import Accepted from '../Components/Approval/Accepted'
import UpdateServices from '../Components/UpdateServices'
import MonthlyRevenueChart from '../Components/MonthlyRevenueChart'
import MonthlyBookingsChart from '../Components/MonthlyBookingsChart'

const Home = () => {

    const approval = useSelector((state) => state?.auth?.data?.status)

    return (
        <>
            <div className='flex sm:p-10 w-full items-center justify-center p-2 py-10 bg-[#F5F4F7] min-h-[90vh]'>
                {approval === 'PENDING' &&
                    <Pending />}
                {approval === 'REJECTED' &&
                    <Rejected />}

                {approval === 'ACCEPTED' &&
                    <div className='w-full'>
                        <div className='flex flex-col md:gap-4 lg:gap-6 md:flex-row'>
                            <MonthlyRevenueChart />
                            <MonthlyBookingsChart />
                        </div>
                        <Accepted />
                        <UpdateServices />
                    </div>
                }
            </div>
        </>
    )
}

export default Home
