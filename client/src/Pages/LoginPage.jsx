import React, { useState } from 'react'
import { VscEye, VscEyeClosed } from 'react-icons/vsc'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginAccount } from '../Redux/Slices/AuthSlice'

const LoginPage = () => {
    const [eye, setEye] = useState(true)
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleEyeClick = () => {
        setEye(!eye)
    }

    const handleInput = (e) => {
        const { name, value } = e.target
        setLoginData({
            ...loginData,
            [name]: value
        })
    }

    const handleFormInput = async (e) => {
        e.preventDefault()

        const { email, password } = loginData

        if (!email || !password) {
            return toast.error('All fields are required')
        }

        const response = await dispatch(loginAccount(loginData))

        if (response?.payload?.success) {
            navigate(-1)
        }
    }

    const mainDiv = 'flex flex-col gap-[0.1px]'
    const labelStyle = "text-[0.83rem] tracking-wide text-[#000] font-[500] ml-[0.5px]"
    const inputStyle = ' min-w-[18rem] max-w-[20.5rem] w-[87vw] sm:w-[24rem] rounded-[3px] h-full  px-2 p-[7.5px]  outline-none  text-[0.95rem] tracking-wide resize-none bg-white text-black'

    return (
        <div className='min-h-[90vh] min-w-full flex items-start justify-center bg-[#1EC28B]'>
            <div className='text-black flex items-center justify-center gap-4 mt-12 bg-[#d5f6ea] rounded-lg w-fit'>
                {/* <div className='hidden md:block'>Left</div> */}
                <form noValidate onSubmit={handleFormInput} className='p-4 py-8 flex flex-col items-start justify-center gap-2'>
                    <div className=' mb-10 mt-3 w-full text-center'>
                        <h1 className=' text-[1.5rem] font-semibold'>Hello Again!</h1>
                        {/* <div className='w-[5rem] h-[3.5px] bg-[#FF8900] rounded-full'></div> */}
                        <p className='mt-4 tracking-wide'>Welcome back <br />You&apos;ve been missed!</p>
                    </div>


                    <div className={`${mainDiv}`}>
                        <label className={`${labelStyle}`} htmlFor="email">Email</label>
                        <input className={`${inputStyle}`} type="email"
                            name='email' id='email' value={loginData.email} onChange={handleInput} />
                    </div>

                    <div className={`${mainDiv} relative`}>
                        <label className={`${labelStyle}`} htmlFor="password">
                            Password
                        </label>
                        <input className={`${inputStyle} pr-8`} type={`${eye ? 'password' : 'text'}`} name='password' id='password' value={loginData.password} onChange={handleInput} />
                        <div className='absolute bottom-2 right-2' onClick={handleEyeClick}>
                            {eye ? <VscEyeClosed /> :
                                <VscEye />}
                        </div>
                    </div>

                    <div className='w-full text-end my-1'>
                        <Link className='text-[#FF8900] text-[0.95rem] font-semibold'>Forgot your Password?</Link>
                    </div>

                    <button type='submit' className='w-full mt-3 bg-[#FF8900] rounded text-white p-[5px]'>Login</button>
                    <div className='w-full text-center mt-2'>
                        <p>Don&apos;t have an account? <Link to={"/register"} className='text-[#FF8900] font-semibold underline '>Sign up</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage
