import React, { useEffect, useRef } from 'react';

const SocialCard = () => {

    return (
        <div
            className="relative p-6 md:h-[10rem] overflow-hidden shadow-lg cursor-pointer bg-gradient-to-r from-[#08014c] to-[#0022ff]"
        >
            <div
                className="absolute inset-0  bg-[repeating-linear-gradient(45deg,_#ffffff,_#f3f4f5_10px,_#808000_10px,_#fff45a_20px)] opacity-20"
            ></div>
            <div className="relative z-10">
                <h2 className="text-xl font-bold text-white">Diagonal Stripes Card</h2>
                <p className="mt-2 text-white">This card has a cool diagonal stripe pattern in the background.</p>
            </div>
        </div>
    );
};

export default SocialCard;
