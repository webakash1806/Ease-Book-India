import React, { useState } from 'react'
import adminMan from '../../assets/adminMan.png'
import { useSelector } from 'react-redux'
const Approval = () => {

    const [lang, setLang] = useState('en')
    console.log(lang)
    const fullName = useSelector((state) => state?.auth?.data?.fullName)

    const handleLang = (e) => {
        const { value } = e.target
        setLang(value)
    }

    return (
        <div className='bg-[#fff] shadow-[0px_0px_20px_#C9C9CB] w-fit rounded-md relative overflow-hidden text-black flex flex-col md:flex-row items-end md:gap-10'>
            <div>
                <div className='absolute flex items-center justify-center bg-red-200 rounded-full animate-ping left-3 size-3 top-3'>
                    <div className='bg-red-500 rounded-full size-1'></div>
                </div>
                <select name='lang' value={lang} onChange={handleLang} className='absolute bg-[#2F3349] text-white top-0 right-0 z-30 p-1 px-3 border-none outline-none'>
                    <option name="lang" value="en">English</option>
                    <option name="lang" value="hn">Hindi</option>
                </select>
            </div>
            {lang === 'en' ?
                <div className='relative flex flex-col gap-2 md:p-10 sm:p-8 p-4 pt-8 md:w-[50vw]'>
                    <h2 className='text-[1rem] font-semibold'>Sorry <span className='font-semibold text-[1.1rem] text-[#813DFD]'>{fullName}</span>!😞</h2>
                    <p>Thank you for registering as a boatman with us. We appreciate your interest in working together to provide the best service possible.</p>
                    <div className="rejected-info">
                        <p>We regret to inform you that your registration has been <strong className='text-red-500'>REJECTED</strong>.</p>
                        <p>If you have any questions or need further clarification regarding the rejection, feel free to contact our support team.</p>
                    </div>
                    <p>We appreciate your understanding and hope to assist you with any queries you may have.</p>
                </div>
                :
                <div className='relative flex flex-col gap-2 md:p-10 sm:p-8 p-4 text-[0.95rem] pt-8 md:w-[50vw]'>
                    <h2 className='text-[1rem] font-semibold'>Sorry <span className='font-semibold text-[1.1rem] text-[#813DFD]'>{fullName}</span>!🙏</h2>
                    <p>हमारे साथ नाववाला के रूप में पंजीकरण करने के लिए धन्यवाद। हमारे साथ मिलकर सबसे अच्छी सेवा प्रदान करने के लिए आपके रुचि की हम सराहना करते हैं।</p>
                    <div className="rejected-info">
                        <p>हमें आपको यह बताते हुए खेद हो रहा है कि आपका पंजीकरण <strong className='text-red-500'>अस्वीकृत</strong> हो गया है।</p>
                        <p>अगर आपके पास कोई प्रश्न है या अस्वीकृति के बारे में अधिक जानकारी चाहिए, तो हमारी सहायता टीम से संपर्क करने में संकोच न करें।</p>
                    </div>
                    <p>हम आपके समझ और सहयोग की सराहना करते हैं और आपके किसी भी प्रश्न में आपकी सहायता करने की उम्मीद करते हैं।</p>
                </div>
            }
            <img src={adminMan} className='w-[9rem] h-fit mr-20' alt="" />
        </div>
    )
}

export default Approval
