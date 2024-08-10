import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LuView } from "react-icons/lu";

const WebsiteContentCard = ({ data }) => {
    const { name, link, icon, color, list } = data
    const navigate = useNavigate()

    return (
        <div className={`flex flex-col relative z-[100] h-[14rem] justify-between items-center p-8 pb-4 border border-gray-300 rounded-xl shadow-lg hover:shadow-xl transform transition-all hover:-translate-y-1 hover:scale-102 ${color} backdrop-blur-lg `}>
            <div className='text-[3rem] mt-2 text-white flex items-center gap-4'>
                {icon}
                <h1 className='text-[2.2rem]  text-white'>
                    {name}
                </h1>
            </div>
            <h2 className='text-[0.9rem] font-semibold text-[#ffffff]'>{list}</h2>
            <button
                className='px-16 mt-6 py-3 text-[1.1rem] font-normal text-white transition-transform transform bg-[#2F3349] rounded-md shadow-md hover:bg-[#3D4056] hover:-translate-y-1 flex items-center justify-center gap-3'
                onClick={() => navigate(link)}>
                <LuView className='text-[1.5rem]' />
                View Now
            </button>
        </div>
    )
}

export default WebsiteContentCard
