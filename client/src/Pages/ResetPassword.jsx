import React, { useState } from 'react'
import { VscEye, VscEyeClosed } from 'react-icons/vsc'
import { toast } from 'react-toastify';
import { resetPasswords } from '../Redux/Slices/AuthSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const ResetPassword = () => {
    const [loaderActive, setLoaderActive] = useState(false);
    const [eye, setEye] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { resetToken } = useParams()

    const [resetData, setResetData] = useState({
        password: "",
        confirmPassword: ""
    })

    const handleInput = (e) => {
        const { name, value } = e.target
        setResetData({
            ...resetData,
            [name]: value
        })
    }

    const handleEyeClick = () => {
        setEye(!eye)
    }

    const handleResetPassword = async (e) => {
        e.preventDefault()

        const { password, confirmPassword } = resetData

        if (!password || !confirmPassword) {
            setLoaderActive(false)
            return toast.error("All fields are required")
        }

        if (password !== confirmPassword) {
            setLoaderActive(false)
            return toast.error("New Password and confirm password must be same")
        }

        const response = await dispatch(resetPasswords([resetToken, { password }]))

        if (response?.payload?.success) {
            navigate('/login')
        } else {
            setLoaderActive(false)
        }

    }

    const mainDiv = 'flex flex-col gap-[0.1px]'
    const labelStyle = "text-[0.83rem] tracking-wide text-[#000] font-[500] ml-[0.5px]"
    const inputStyle = ' min-w-[18rem] max-w-[20.5rem] w-[87vw] sm:w-[24rem] rounded-[3px] h-full  px-2 p-[7.5px]  outline-none  text-[0.95rem] tracking-wide resize-none bg-white text-black'

    return (
        <div className='min-h-[90vh]'>
            <div className='fixed  flex items-center justify-center z-[101] h-[100vh] top-0 w-full bg-[#070707d5] backdrop-blur-[3px]'>


                <form onSubmit={handleResetPassword} className="p-4 bg-[#e8e8ff] text-black shadow-[0px_0px_40px_#000] relative flex flex-col gap-2 rounded-lg">

                    <h2 className="pb-2 mb-6 text-2xl font-semibold text-center lora-700">Set New Password</h2>
                    <div className={`${mainDiv} relative`}>
                        <label className={`${labelStyle}`} htmlFor="password">
                            New Password
                        </label>
                        <input className={`${inputStyle} pr-8`} type={`${eye ? 'password' : 'text'}`} name='password' id='password' value={resetData.password} onChange={handleInput} />
                        <div className='absolute bottom-2 right-2' onClick={handleEyeClick}>
                            {eye ? <VscEyeClosed /> :
                                <VscEye />}
                        </div>
                    </div>
                    <div className={`${mainDiv}`}>
                        <label className={`${labelStyle}`} htmlFor="confirmPassword">Confirm password</label>
                        <input className={`${inputStyle}`} type="password"
                            name='confirmPassword' id='confirmPassword' value={resetData.confirmPassword} onChange={handleInput} />
                    </div>
                    <button type='submit' onClick={() => setLoaderActive(true)} className={`p-2 my-2 tracking-wide px-4 mt-5 flex items-center justify-center text-white bg-gradient-to-r w-full from-[#1751fe] via-[#0074f9] transition-all duration-300 to-[#0199ff] lg:px-6 hover:shadow-[1px_1px_6px_-2px#808080] rounded text-[0.9rem] font-semibold `} >
                        Change Password {loaderActive && <div className='ml-4 ease-in-out mt-1 size-[1.2rem] border-[2.4px] border-y-[#57575769] animate-spin rounded-full bottom-0'></div>}
                    </button>

                </form>
            </div>
        </div>
    )
}

export default ResetPassword
