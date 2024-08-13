import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import SocialCard from '../Components/SocialCard';

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
        <div>
            <div>
                <SocialCard />
            </div>
            <div className='from-[#e7eafd] bg-gradient-to-b via-[#f7f7fb] to-white p-4 py-8 flex flex-wrap items-center justify-center'>

                {poojaOptions.map((pooja, index) => (
                    <div key={index} className='flex border-l-[6px] border-orange-500 flex-col h-fit items-center justify-center p-6 m-4 transition-transform transform bg-[#ffffff] rounded-lg shadow-md w-80 hover:scale-105'>
                        <h2 className='mb-2 text-2xl font-semibold text-gray-800'>{pooja.name}</h2>
                        <div className='flex items-center mb-4'>
                            <FaMapMarkerAlt className='mr-2 text-red-500' />
                            <span className='text-lg text-gray-600'>Varanasi</span>
                        </div>
                        <button
                            onClick={() => navigate('/priest-list', { state: { pooja } })}
                            className='h-10 from-[#1751fe] via-[#0074f9] hover:bg-gradient-to-bl bg-gradient-to-tr to-[#0199ff] transition-all duration-300 border-none text-white btn-sm rounded-md px-8 font-normal text-[1.02rem] tracking-wide'

                        >
                            Book Now
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PoojaList;
