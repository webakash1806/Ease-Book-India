import React, { useState } from 'react'

const Register = () => {

    const [input, setInput] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        age: "",
        experience: "",
        carNumber: ""
    })

    const mainDiv = 'flex flex-col gap-[0.1px]'

    const labelStyle = "text-[0.83rem] tracking-wide text-[#000] font-[500] ml-[0.5px]"
    const inputStyle = 'border min-w-[18rem] max-w-[20.5rem] w-[87vw] sm:w-[24rem] rounded-[3px] h-full  px-2 p-[5.5px]  outline-none  text-[0.95rem] tracking-wide resize-none bg-white text-black'
    return (
        <div className='flex items-center justify-center text-black bg-[#f8f6fc]'>
            <form action="" className='sm:p-10 p-4  bg-white rounded-md shadow-[0px_0px_10px_#bfbbc7] my-12 flex md:flex-row flex-col w-fit md:gap-10'>
                <div className=''>
                    <div className='mb-4'>
                        <h2 className='text-[1.8rem] font-semibold tracking-wide '>Registration Form</h2>
                        <div className='flex items-center'>
                            <div className='bg-[#685ED4] w-8 h-[5px] rounded-full mr-1'> </div>
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
                        <label className={labelStyle} htmlFor="">Experience</label>
                        <input className={inputStyle} type="number" />
                    </div>
                    <div className={mainDiv}>
                        <label className={labelStyle} htmlFor="">Age</label>
                        <input className={inputStyle} type="number" />
                    </div>
                </div>

                <div className=''>
                    <div className={mainDiv}>
                        <label className={labelStyle} htmlFor="">Your photo</label>
                        <input className={inputStyle} type="file" name="" id="" />
                    </div>
                    <div className={mainDiv}>
                        <label className={labelStyle} htmlFor="">Aadhar Card</label>
                        <input className={inputStyle} type="file" name="" id="" />
                    </div>
                    <div className={mainDiv}>
                        <label className={labelStyle} htmlFor="">PAN CARD</label>
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
                    <div className={mainDiv}>
                        <label className={labelStyle} htmlFor="">Password</label>
                        <input className={inputStyle} type="password" />
                    </div>
                    <div className={mainDiv}>
                        <label className={labelStyle} htmlFor="">Confirm Password</label>
                        <input className={inputStyle} type="password" />
                    </div>
                    <button className='bg-[#685ED4] hover:bg-[#FF4C51] text-white transition-all duration-700 w-full rounded-md p-2 font-semibold'>Sign Up</button>
                </div>
            </form>
        </div>
    )
}

export default Register
