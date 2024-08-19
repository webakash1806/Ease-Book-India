import React, { useState } from 'react'
import { VscEye, VscEyeClosed } from 'react-icons/vsc'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { forgotPassword, loginAccount } from '../Redux/Slices/AuthSlice'
import { IoMdClose } from 'react-icons/io'

const LoginPage = () => {
    const [eye, setEye] = useState(true)
    const [passwordCardActive, setPasswordCardActive] = useState(false)
    const [loaderActive, setLoaderActive] = useState(false);

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

    const handleForgotPassword = async (e) => {
        e.preventDefault()

        const { email } = loginData

        if (!email) {
            setLoaderActive(false)

            return toast.error('Email is required!')
        }

        const response = await dispatch(forgotPassword({ email }))

        if (response?.payload?.success) {
            navigate(-1)
        } else {
            setLoaderActive(false)
        }
    }

    return (
        <div className='min-h-[90vh] min-w-full flex items-start justify-center bg-gradient-to-r from-green-400 to-blue-500'>
            {passwordCardActive &&
                <div className='fixed  flex items-center justify-center z-[101] h-[100vh] top-0 w-full bg-[#070707d5] backdrop-blur-[3px]'>


                    <form onSubmit={handleForgotPassword} className="p-4 bg-[#e8e8ff] text-black shadow-[0px_0px_40px_#000] relative space-y-6 rounded-lg">
                        <div className='absolute top-0 right-0 p-[0.3rem] overflow-hidden transition-all duration-300 hover:bg-red-600 text-white bg-blue-500 rounded-tr-lg text-[1.1rem] cursor-pointer' onClick={() => setPasswordCardActive(false)}>
                            <IoMdClose

                                className=''
                                size={20}
                            />
                        </div>
                        <h2 className="pb-2 text-2xl font-semibold text-center lora-700">Request reset link</h2>

                        <div className={mainDiv}>
                            <label htmlFor="confirmNewPassword" className={labelStyle}>Registered email</label>
                            <input
                                type="email"
                                placeholder='Enter registered email...'
                                name="email"
                                id="email"
                                className={`${inputStyle} w-[20rem]`}

                                value={loginData.email} onChange={handleInput}
                            />
                        </div>
                        <button type='submit' onClick={() => setLoaderActive(true)} className={`p-2 tracking-wide px-4 mt-5 flex items-center justify-center text-white bg-gradient-to-r w-full from-[#1751fe] via-[#0074f9] transition-all duration-300 to-[#0199ff] lg:px-6 hover:shadow-[1px_1px_6px_-2px#808080] rounded text-[0.9rem] font-semibold `} >
                            Send reset link {loaderActive && <div className='ml-4 ease-in-out mt-1 size-[1.2rem] border-[2.4px] border-y-[#57575769] animate-spin rounded-full bottom-0'></div>}
                        </button>
                        <div className='w-full mt-2 text-center'>
                            <p>Don&apos;t have an account? <Link to={"/register"} className='text-[#FF8900] font-semibold underline '>Sign up</Link></p>
                        </div>
                    </form>
                </div>
            }
            <div className='text-black flex items-center justify-center gap-4 mt-12 bg-[#d5f6ea] rounded-lg w-fit'>
                {/* <div className='hidden md:block'>Left</div> */}
                <form noValidate onSubmit={handleFormInput} className='flex flex-col items-start justify-center gap-2 p-4 py-8'>
                    <div className='w-full mt-3 mb-8 text-center '>
                        <h1 className=' text-[1.6rem] lora-700'>Hello Again!</h1>
                        {/* <div className='w-[5rem] h-[3.5px] bg-[#FF8900] rounded-full'></div> */}
                        <p className='mt-2 tracking-wide overlock-bold-italic'>Welcome back <br />You&apos;ve been missed!</p>
                    </div>


                    <div className={`${mainDiv}`}>
                        <label className={`${labelStyle}`} htmlFor="email">Email</label>
                        <input className={`${inputStyle}`} type="email"
                            placeholder='Enter email...'
                            name='email' id='email' value={loginData.email} onChange={handleInput} />
                    </div>

                    <div className={`${mainDiv} relative`}>
                        <label className={`${labelStyle}`} htmlFor="password">
                            Password
                        </label>
                        <input className={`${inputStyle} pr-8`} type={`${eye ? 'password' : 'text'}`}
                            placeholder='Enter password...'

                            name='password' id='password' value={loginData.password} onChange={handleInput} />
                        <div className='absolute bottom-2 right-2' onClick={handleEyeClick}>
                            {eye ? <VscEyeClosed /> :
                                <VscEye />}
                        </div>
                    </div>

                    <div className='w-full my-1 text-end'>
                        <Link onClick={() => setPasswordCardActive(true)} className='text-[#FF8900] text-[0.95rem] font-semibold'>Forgot your Password?</Link>
                    </div>

                    <button type='submit' className='p-2 tracking-wide px-4 mt-5 flex items-center justify-center text-white bg-gradient-to-r w-full from-[#1751fe] via-[#0074f9] transition-all duration-300 to-[#0199ff] lg:px-6 hover:shadow-[1px_1px_6px_-2px#808080] rounded text-[0.9rem] font-semibold '>Login</button>
                    <div className='w-full mt-2 text-center'>
                        <p>Don&apos;t have an account? <Link to={"/register"} className='text-[#FF8900] font-semibold underline '>Sign up</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage
