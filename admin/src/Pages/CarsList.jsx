import React, { useEffect } from 'react'
import HomeLayout from '../Layouts/HomeLayouts'
import { useDispatch, useSelector } from 'react-redux'
import { getDriverList } from '../Redux/Slices/ListSlice'
import CarsListCard from '../Components/Cards/CarsListCard'
const CarsList = () => {
    const dispatch = useDispatch()
    const list = useSelector((state) => state?.list?.driverList)

    console.log(list)

    const loadData = () => {
        dispatch(getDriverList())
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <>
            <HomeLayout>
                <div className='flex flex-col items-center justify-center gap-[2.5px] mt-2'>
                    {list.map((data, ind) => <CarsListCard key={data?.id} data={data} index={ind} />)}
                </div>
            </HomeLayout>
        </>
    )
}

export default CarsList
