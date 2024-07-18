import React, { useEffect, useState } from 'react'
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createAccount } from '../Redux/Slices/AuthSlice';

const RegisterPage = () => {

    const [eye, setEye] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [registerData, setRegisterData] = useState({
        userName: "",
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: ""
    })

    function handleInput(e) {
        const { name, value } = e.target
        setRegisterData({
            ...registerData,
            [name]: value
        })
    }

    const handleEyeClick = () => {
        setEye(!eye)
    }


    const handleFormInput = async (e) => {
        e.preventDefault()

        const { userName, fullName, email, phoneNumber, password, confirmPassword } = registerData

        if (!userName || !fullName || !email || !phoneNumber || !password || !confirmPassword) {
            return toast.error("All fields are required")
        }

        if (!email.match(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)) {
            return toast.error('Email is Invalid!')
        }

        const response = await dispatch(createAccount(registerData))

        if (response?.payload?.success) {
            navigate(-1)
            setRegisterData({
                userName: "",
                fullName: "",
                email: "",
                phoneNumber: "",
                password: "",
                confirmPassword: ""
            })
        }
    }


    const mainDiv = 'flex flex-col gap-[0.1px]'
    const labelStyle = "text-[0.83rem] tracking-wide text-[#000] font-[500] ml-[0.5px]"
    const inputStyle = ' min-w-[18rem] max-w-[21rem] w-[87vw] sm:w-[24rem] rounded-[3px] h-full  px-2 p-[5.5px]  outline-none  text-[0.95rem] tracking-wide resize-none bg-white text-black'

    return (
        <div className='min-h-[90vh] min-w-full flex items-start justify-center bg-[#1EC28B]'>
            <div className='text-black flex items-center justify-center gap-4 mt-6 md:mt-10 lg:mt-12 bg-[#d5f6ea] rounded-lg w-fit'>
                <div className='hidden md:block'>Left</div>
                <form noValidate onSubmit={handleFormInput} className='p-4 flex flex-col items-start justify-center gap-1'>
                    <div className=' mb-3'>
                        <h1 className=' text-[1.4rem] font-semibold'>Create an account</h1>
                        <div className='w-[5rem] h-[3.5px] bg-[#FF8900] rounded-full'></div>
                    </div>
                    <div className={`${mainDiv}`}>
                        <label className={`${labelStyle}`} htmlFor="userName">Username</label>
                        <input className={`${inputStyle}`} name='userName' id='userName' type="text" value={registerData.userName} onChange={handleInput} />
                    </div>
                    <div className={`${mainDiv}`}>
                        <label className={`${labelStyle}`} htmlFor="fullName">Full name</label>
                        <input className={`${inputStyle}`} type="text"
                            name='fullName' id='fullName' value={registerData.fullName} onChange={handleInput} />
                    </div>
                    <div className={`${mainDiv}`}>
                        <label className={`${labelStyle}`} htmlFor="email">Email</label>
                        <input className={`${inputStyle}`} type="email"
                            name='email' id='email' value={registerData.email} onChange={handleInput} />
                    </div>
                    <div className={`${mainDiv}`}>
                        <label className={`${labelStyle}`} htmlFor="phoneNumber">Phone number</label>
                        <input className={`${inputStyle}`} type="number"
                            name='phoneNumber' id='phoneNumber' value={registerData.phoneNumber} onChange={handleInput} />
                    </div>
                    <div className={`${mainDiv} relative`}>
                        <label className={`${labelStyle}`} htmlFor="password">
                            Password
                        </label>
                        <input className={`${inputStyle} pr-8`} type={`${eye ? 'password' : 'text'}`} name='password' id='password' value={registerData.password} onChange={handleInput} />
                        <div className='absolute bottom-2 right-2' onClick={handleEyeClick}>
                            {eye ? <VscEyeClosed /> :
                                <VscEye />}
                        </div>
                    </div>
                    <div className={`${mainDiv}`}>
                        <label className={`${labelStyle}`} htmlFor="confirmPassword">Confirm password</label>
                        <input className={`${inputStyle}`} type="password"
                            name='confirmPassword' id='confirmPassword' value={registerData.confirmPassword} onChange={handleInput} />
                    </div>
                    <button type='submit' className='w-full mt-3 bg-[#FF8900] rounded text-white p-[5px]'>Sign up</button>
                    <div className='w-full text-center mt-2'>
                        <p>Already have an account? <Link to={"/login"} className='text-[#FF8900] font-semibold underline '>Login</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage
