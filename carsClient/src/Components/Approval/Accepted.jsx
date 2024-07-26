import React, { useEffect, useState } from 'react'
import adminMan from '../../assets/adminMan.png'
import { useSelector } from 'react-redux'
import { toast } from "react-toastify"


const Accepted = () => {

    const [lang, setLang] = useState('en')
    console.log(lang)
    const fullName = useSelector((state) => state?.auth?.data?.fullName)

    const handleLang = (e) => {
        const { value } = e.target
        setLang(value)
    }

    useEffect(() => {
        toast.success(`Welcome ${fullName}!🎉`)
    }, [])

    return (
        <div className='bg-[#fff] shadow-[0px_0px_20px_#C9C9CB] w-fit rounded-md relative overflow-hidden text-black flex flex-row items-end'>
            <div>
                <div className='absolute flex items-center justify-center bg-yellow-400 rounded-full animate-ping left-3 size-3 top-3'>
                    <div className='bg-red-500 rounded-full size-1'></div>
                </div>
            </div>
            <div className='relative flex flex-col gap-2   sm:p-8 p-4 pt-8'>
                <h2 className='text-[1.2rem]'>Welcome <span className='font-semibold text-[1.1rem] text-[#28A745]'>{fullName} </span>! 🎉</h2>
            </div>
            <img src={adminMan} className='w-[4rem] h-fit mr-10' alt="" />
        </div>
    )
}

export default Accepted
