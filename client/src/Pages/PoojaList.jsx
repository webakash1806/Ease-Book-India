import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const PoojaList = () => {
    const poojaOptions = [
        { name: 'Rudra Havan', price: "1500" },
        { name: 'Maha mrityunjay jap', price: "2000" },
        { name: 'Vishnu yagna', price: "1800" },
        { name: 'Kaal Sarp yog', price: "3300" },
        { name: 'Bhagwat katha', price: "3000" },
        { name: 'Vastu shanti', price: "2000" },
        { name: 'Naw grah shanti', price: "1500" },
        { name: 'Nakshastra shanti', price: "3000" },
        { name: 'Rudra abhishekh', price: "5000" },
    ];

    const navigate = useNavigate();

    return (
        <div className='min-h-[90vh]  text-black bg-gradient-to-r from-gray-100 to-gray-300 py-10 flex flex-wrap justify-center items-start p-4'>
            {poojaOptions.map((pooja, index) => (
                <div key={index} className='flex border-l-[6px] border-orange-500 flex-col items-center justify-center p-6 m-4 transition-transform transform bg-[#fefdf7] rounded-lg shadow-md w-80 hover:scale-105'>
                    <h2 className='mb-2 text-2xl font-semibold text-gray-800'>{pooja.name}</h2>
                    <div className='flex items-center mb-4'>
                        <FaMapMarkerAlt className='mr-2 text-red-500' />
                        <span className='text-lg text-gray-600'>Varanasi</span>
                    </div>
                    <button
                        onClick={() => navigate('/priest-list', { state: { pooja } })}
                        className='px-6 py-[6px] text-lg border-none font-medium text-white transition-all duration-300 bg-green-500 rounded-md hover:bg-orange-500'
                    >
                        Book Now
                    </button>
                </div>
            ))}
        </div>
    );
}

export default PoojaList;
