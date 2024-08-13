import React from 'react';
import { FaArrowLeft, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import SocialCard from '../Components/SocialCard';

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

    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Guiders place' },
    ];

    const navigate = useNavigate();

    return (
        <>
            <div className='relative'>
                <SocialCard item={breadcrumbItems} icon={"guider"} title={"Book Guider"} des={"Secure a knowledgeable guide for your next adventure. Explore new destinations with an expert who can provide valuable insights and enhance your experience with local knowledge and personalized tours."} />

                <div onClick={() => navigate(-1)} className='absolute top-1 left-1 p-2 bg-[#4960f8] shadow-md rounded w-fit'>
                    <FaArrowLeft onClick={() => navigate(-1)} className='text-white text-[1.1rem]' />
                </div>
            </div>
            <div className='from-[#e7eafd] bg-gradient-to-b via-[#f7f7fb] to-white p-4 py-8 flex flex-wrap items-center justify-center'>      {placeOptions.map((place, index) => (
                <div key={index} className='flex border-l-[6px] h-[12rem] border-blue-500 flex-col items-center justify-center p-6 sm:m-4 my-4 transition-transform transform bg-[#ffffff] rounded-lg shadow-md w-80 hover:scale-105'>
                    <h2 className='w-full mb-2 text-2xl font-semibold text-center text-gray-800'>{place.name}</h2>
                    <div className='flex items-center mb-4'>
                        <FaMapMarkerAlt className='mr-2 text-red-500' />
                        <span className='text-lg text-gray-600'>Varanasi</span>
                    </div>
                    <button
                        onClick={() => navigate('/guider-list', { state: { place } })}
                        className='h-10 from-[#1751fe] via-[#0074f9] hover:bg-gradient-to-bl bg-gradient-to-tr to-[#0199ff] transition-all duration-300 border-none text-white btn-sm rounded-md px-8 font-normal text-[1.02rem] tracking-wide'
                    >
                        Book Now
                    </button>
                </div>
            ))}
            </div>
        </>
    );
}

export default PlacesPage;
