import React from 'react'

const Register = () => {
    const mainDiv = 'flex flex-col gap-[0.1px]'

    const labelStyle = "text-[0.83rem] tracking-wide text-[#000] font-[500] ml-[0.5px]"
    const inputStyle = 'border min-w-[18rem] max-w-[20.5rem] w-[87vw] sm:w-[24rem] rounded-[3px] h-full  px-2 p-[5.5px]  outline-none  text-[0.95rem] tracking-wide resize-none bg-white text-black'
    return (
        <div className='text-black bg-white'>
            <form action="">
                <div>
                    <h2>Registration form</h2>
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
                        <label className={labelStyle} htmlFor="">Experience</label>
                        <input className={inputStyle} type="number" />
                    </div>
                    <div className={mainDiv}>
                        <label className={labelStyle} htmlFor="">Age</label>
                        <input className={inputStyle} type="number" />
                    </div>
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
                    <button>Sign Up</button>
                </div>
            </form>
        </div>
    )
}

export default Register
