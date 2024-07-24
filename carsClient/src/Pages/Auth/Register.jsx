import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const Register = () => {

    const [input, setInput] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        age: "",
        experience: "",
        carNumber: "",
        carName: ""
    })

    const mainDiv = 'flex flex-col gap-[0.1px]'

    const labelStyle = "text-[0.83rem] tracking-wide text-[#CFCCE4] font-[400] ml-[0.5px]"
    const inputStyle = 'border border-[#685ED4] min-w-[18rem] md:max-w-[20.5rem] max-w-[25.5rem] w-[87vw] sm:w-[24rem] rounded-[3px] h-full  px-2 p-[5.5px]  outline-none  text-[0.95rem] tracking-wide resize-none bg-[#3D4056] text-white'
    return (
        <div className='flex items-center justify-center  bg-[#f8f6fc]'>
            <form action="" className='sm:p-10 p-6  bg-[#2F3349] text-white rounded-md shadow-[0px_0px_20px_#3D4056] my-12 flex md:items-end md:flex-row flex-col w-fit md:gap-10'>
                <div className='flex flex-col gap-2'>
                    <div className='mb-4'>
                        <h2 className='text-[1.8rem] font-semibold tracking-wide '>Registration Form</h2>
                        <div className='flex items-center mt-2'>
                            <div className='bg-[#685ED4] w-12 h-[5px] rounded-full mr-1'> </div>
                            <div className='bg-[#685ED4] w-[12px] h-[5px] rounded-full mr-1'></div>
                            <div className='bg-[#FF4C51] w-[5px] h-[5px] rounded-full'></div>
                        </div>
                    </div>
                    <div className={mainDiv}>
                        <label className={labelStyle} htmlFor="">Full Name</label>
                        <input className={inputStyle} type="text" />
                    </div>
                    <div className={mainDiv}>
                        <label className={labelStyle} htmlFor="">Email</label>
                        <input className={inputStyle} type="email" name="" id="" />
                    </div>
                    <div className={mainDiv}>
                        <label className={labelStyle} htmlFor="">Phone Number</label>
                        <input className={inputStyle} type="number" />
                    </div>
                    <div className={mainDiv}>
                        <label className={labelStyle} htmlFor="">Car Name</label>
                        <input className={inputStyle} type="text" />
                    </div>
                    <div className={mainDiv}>
                        <label className={labelStyle} htmlFor="">Car Number</label>
                        <input className={inputStyle} type="text" />
                    </div>

                    <div className={mainDiv}>
                        <label className={labelStyle} htmlFor="">Password</label>
                        <input className={inputStyle} type="password" />
                    </div>
                    <div className={mainDiv}>
                        <label className={labelStyle} htmlFor="">Confirm Password</label>
                        <input className={inputStyle} type="password" />
                    </div>


                </div>

                <div className='flex flex-col gap-2 mt-2 md:mt-20'>
                    <div className='flex  min-w-[18rem] md:max-w-[20.5rem] max-w-[25.5rem] w-[87vw] sm:w-[24rem] justify-between'>

                        <div className={`${mainDiv} w-[48%]`}>
                            <label className={labelStyle} htmlFor="">Age</label>
                            <input className='border border-[#685ED4] w-full rounded-[3px] h-full  px-2 p-[5.5px]  outline-none  text-[0.95rem] tracking-wide resize-none bg-[#3D4056] text-white' type="number" />
                        </div>
                        <div className={`${mainDiv} w-[48%]`}>
                            <label className={labelStyle} htmlFor="">Experience</label>
                            <input className='border border-[#685ED4] w-full rounded-[3px] h-full  px-2 p-[5.5px]  outline-none  text-[0.95rem] tracking-wide resize-none bg-[#3D4056] text-white' type="number" />
                        </div>

                    </div>
                    <div className='flex  min-w-[18rem] md:max-w-[20.5rem] max-w-[25.5rem] w-[87vw] sm:w-[24rem] justify-between'>

                        <div className={`${mainDiv} w-[48%]`}>
                            <label className={labelStyle} htmlFor="">Aadhar Card</label>
                            <input className='border border-[#685ED4] w-full rounded-[3px] h-full  px-2 p-[5.5px]  outline-none  text-[0.95rem] tracking-wide resize-none bg-[#3D4056] text-white' type="file" />
                        </div>
                        <div className={`${mainDiv} w-[48%]`}>
                            <label className={labelStyle} htmlFor="">PAN CARD</label>

                            <input className='border border-[#685ED4] w-full rounded-[3px] h-full  px-2 p-[5.5px]  outline-none  text-[0.95rem] tracking-wide resize-none bg-[#3D4056] text-white' type="file" />
                        </div>

                    </div>
                    <div className={mainDiv}>
                        <label className={labelStyle} htmlFor="">Your photo</label>
                        <input className={inputStyle} type="file" name="" id="" />
                    </div>
                    <div className={mainDiv}>
                        <label className={labelStyle} htmlFor="">Image of Vehicle</label>
                        <input className={inputStyle} type="file" name="" id="" />
                    </div>
                    <div className={mainDiv}>
                        <label className={labelStyle} htmlFor="">PUC Certificate</label>
                        <input className={inputStyle} type="file" name="" id="" />
                    </div>

                    <button className='bg-[#685ED4] hover:bg-[#FF4C51] text-white transition-all duration-700 w-full rounded-md p-[6.9px] font-semibold mt-[12px] mb-1'>Sign Up</button>

                    <div className='w-full text-center'>
                        <p>Already have an account? <Link to={"/login"} className='text-[#FF4C51] font-semibold underline '>Login</Link></p>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Register
