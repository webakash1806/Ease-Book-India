import React, { useState } from 'react'
import adminMan from '../../assets/adminMan.png'
import { useSelector } from 'react-redux'
const Approval = () => {

    const [lang, setLang] = useState('en')

    const fullName = useSelector((state) => state?.auth?.data?.fullName)

    const handleLang = (e) => {
        const { value } = e.target
        setLang(value)
    }

    return (
        <div className='bg-[#fff] shadow-[0px_0px_20px_#C9C9CB] w-fit rounded-md relative overflow-hidden text-black flex flex-col md:flex-row items-end md:gap-10'>
            <div>
                <div className='absolute flex items-center justify-center bg-yellow-400 rounded-full animate-ping left-3 size-3 top-3'>
                    <div className='bg-red-500 rounded-full size-1'></div>
                </div>
                <select name='lang' value={lang} onChange={handleLang} className='absolute bg-[#2F3349] text-white top-0 right-0 z-30 p-1 px-3 border-none outline-none'>
                    <option name="lang" value="en">English</option>
                    <option name="lang" value="hn">Hindi</option>
                </select>
            </div>
            {lang === 'en' ?
                <div className='relative flex flex-col gap-2 md:p-10 sm:p-8 p-4 pt-8  md:w-[50vw]'>
                    <h2>Welcome <span className='font-semibold text-[1.1rem] text-[#813DFD]'>{fullName} </span>!🙏</h2>
                    <p>Thank you for registering as a Guider with us. We are excited to have you on board and look forward to working together to provide the best service possible.</p>
                    <div className="pending-info">
                        <p>Your registration is currently <strong className='text-orange-500'>PENDING</strong> for verification.</p>
                        <p>Please allow us 24 to 48 hours to review your information and activate your account.</p>
                    </div>
                    <p>We appreciate your patience and will notify you as soon as your account is activated.</p>
                    <p>If you have any questions or need further assistance, feel free to contact our support team.</p>
                </div> :
                <div className='relative flex flex-col gap-3 md:p-10 sm:p-8 p-4 pt-8 text-[0.95rem] md:w-[50vw]' >
                    <h2>Welcome <span className='font-semibold text-[1.1rem] text-[#813DFD]'>{fullName} </span>!🙏</h2>

                    <p>हमारे साथ मार्गदर्शक  के रूप में पंजीकरण करने के लिए धन्यवाद। हम आपको अपने साथ जोड़कर उत्साहित हैं और सर्वश्रेष्ठ सेवा प्रदान करने के लिए एक साथ काम करने की आशा करते हैं।</p>
                    <div>
                        <p>आपका पंजीकरण वर्तमान में <strong className='text-orange-500'>लंबित</strong> सत्यापन में है।</p>
                        <p>कृपया हमें आपकी जानकारी की समीक्षा करने और आपके खाते को सक्रिय करने के लिए 24 से 48 घंटे दें।</p>
                    </div>
                    <p>हम आपके धैर्य की सराहना करते हैं और जैसे ही आपका खाता सक्रिय होगा, हम आपको सूचित करेंगे।</p>
                    <p>यदि आपके पास कोई प्रश्न हैं या आपको और सहायता की आवश्यकता है, तो कृपया हमारी सहायता टीम से संपर्क करें।</p>
                </div>}
            <img src={adminMan} className='w-[9rem] h-fit mr-20' alt="" />
        </div>
    )
}

export default Approval
