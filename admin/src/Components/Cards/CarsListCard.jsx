import React from 'react'
import { FaEye } from 'react-icons/fa'

const CarsListCard = ({ data, index }) => {

    const { age, carName, carNumber, email, experience, fullName, phoneNumber, role, status } = data

    console.log(data)

    return (
        <div className='flex items-center justify-between w-full gap-3 px-3 py-3 text-black bg-white'>
            <div className=' w-fit'>
                <p>{index + 1}.</p>
            </div>
            <div className=' w-[14.5rem] lg:w-[17rem] line-clamp-1'>
                <p>{fullName}</p>
            </div>
            <div className=' w-[14.5rem] lg:w-[17rem] truncate line-clamp-1'>
                <p>{email}</p>
            </div>
            <div className='flex items-center gap-2'>
                <div className='flex items-center justify-center gap-[0.1rem]'>
                    <label htmlFor="" className='font-semibold text-yellow-500'>P:</label>
                    <input type="radio" name={`status${index}`} value='PENDING' className='size-[15px]  accent-yellow-400 ' />
                </div>
                <div className='flex items-center justify-center gap-[0.1rem]'>
                    <label htmlFor="" className='font-semibold text-green-600'>A:</label>

                    <input type="radio" name={`status${index}`} value='ACCEPTED' className='size-[15px] accent-green-400' />
                </div>
                <div className='flex items-center justify-center gap-[0.1rem]'>
                    <label htmlFor="" className='font-semibold text-red-500'>R:</label>

                    <input type="radio" name={`status${index}`} value='REJECTED' className='size-[15px] accent-red-500' />
                </div>
            </div>
            <div className=' w-[6rem] flex items-center justify-center'>
                <FaEye className='text-[1.45rem] cursor-pointer ' />
            </div>
        </div>
    )
}

export default CarsListCard
