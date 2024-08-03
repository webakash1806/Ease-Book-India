import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const PlacesPage = () => {
    const placeOptions = [
        { name: 'All ghats', price: 2000 },
        { name: 'All Ghats temple', price: 3000 },
        { name: 'Kashi vishwanath temple', price: 1500 },
        { name: 'Sarnath temple', price: 1000 },
        { name: 'Assi ghat - Dasaswamedh ghat', price: 2000 },
        { name: 'Dasaswamedh ghat - Mankikarnika ghat', price: 1500 },
        { name: 'Assi ghat - Mankikarnika ghat', price: 3000 },

    ];

    const navigate = useNavigate();

    return (
        <div className='min-h-[90vh]  text-black bg-gradient-to-r from-gray-100 to-gray-300 py-10 flex flex-wrap justify-center items-start p-4'>
            {placeOptions.map((place, index) => (
                <div key={index} className='flex border-l-[6px] h-[12rem] border-blue-500 flex-col items-center justify-center p-6 sm:m-4 my-4 transition-transform transform bg-[#fefdf7] rounded-lg shadow-md w-80 hover:scale-105'>
                    <h2 className='w-full mb-2 text-2xl font-semibold text-center text-gray-800'>{place.name}</h2>
                    <div className='flex items-center mb-4'>
                        <FaMapMarkerAlt className='mr-2 text-red-500' />
                        <span className='text-lg text-gray-600'>Varanasi</span>
                    </div>
                    <button
                        onClick={() => navigate('/guider-list', { state: { place } })}
                        className='px-6 py-[6px] text-lg border-none font-medium text-white transition-all duration-300 bg-green-500 rounded-md hover:bg-orange-500'
                    >
                        Book Now
                    </button>
                </div>
            ))}
        </div>
    );
}

export default PlacesPage;
