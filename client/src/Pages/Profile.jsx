import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { editProfile, userProfile } from '../Redux/Slices/AuthSlice';
import userImg from '../assets/Images/user.png';
import profileBg from '../assets/Images/profileBg.jpg';
import { FaCamera, FaBan } from 'react-icons/fa';

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [image, setImage] = useState('');
    const [loaderActive, setLoaderActive] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);

    const data = useSelector((state) => state?.auth?.data);

    const [profileData, setProfileData] = useState({
        userName: data?.userName || "",
        fullName: data?.fullName || "",
        email: data?.email || "",
        avatar: "",
        phoneNumber: data?.phoneNumber || "",
    });

    useEffect(() => {
        const hasChanged =
            profileData.userName !== data?.userName ||
            profileData.fullName !== data?.fullName ||
            profileData.avatar !== '' ||
            profileData.phoneNumber !== data?.phoneNumber;

        setIsUpdated(hasChanged);
    }, [profileData, data]);

    function imgUpload(e) {
        e.preventDefault();
        const uploadedImg = e.target.files[0];

        if (uploadedImg) {
            setProfileData({
                ...profileData,
                avatar: uploadedImg,
            });
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImg);
            fileReader.addEventListener('load', function () {
                setImage(this.result);
            });
        }
    }

    function handleInput(e) {
        const { name, value } = e.target;
        setProfileData({
            ...profileData,
            [name]: value,
        });
    }

    const handleFormInput = async (e) => {
        e.preventDefault();

        const { userName, fullName, email, phoneNumber } = profileData;

        if (!userName || !fullName || !email || !phoneNumber) {
            return toast.error("All fields are required");
        }

        if (!email.match(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)) {
            return toast.error('Email is Invalid!');
        }

        const formData = new FormData();
        formData.append('fullName', fullName);
        formData.append('phoneNumber', phoneNumber);
        formData.append('avatar', profileData.avatar);

        const response = await dispatch(editProfile([data?._id, formData]));

        if (response?.payload?.success) {
            toast.success("Updated!");
            setLoaderActive(false);
            dispatch(userProfile());
        }
    };

    const mainDiv = 'relative w-full max-w-md mt-5';
    const labelStyle = "absolute px-1 z-[1000] text-blue-500 transition-all duration-200 transform scale-75 -translate-y-1/2 tracking-wide bg-white left-1 top-[-0.1px] text-[1.1rem] font-normal peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[22px]";
    const inputStyle = "block px-4 py-[7px] pb-[5px] bg-white border-[0.5px] border-gray-300 rounded min-w-[18rem] w-[90vw] sm:max-w-[28rem] max-w-[25rem] focus:outline-none focus:ring-[0.5px] focus:ring-blue-500 font-semibold focus:border-blue-500 peer";
    const disabledInputStyle = "block px-4 py-[7px] pb-[5px] bg-gray-100 border-[0.5px] font-semibold  border-gray-300 rounded min-w-[18rem] w-[90vw] sm:max-w-[28rem] max-w-[25rem] cursor-not-allowed";

    return (
        <div className='min-h-[90vh] min-w-full flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 py-10 pb-20'>

            <form noValidate onSubmit={handleFormInput} className='flex flex-col items-start justify-center p-3 text-black bg-white rounded-lg'>
                <div className='relative w-full mb-12'>
                    <img className='min-w-full h-[8rem] shadow-[0px_5px_15px_-5px_#808080] rounded object-cover' src={profileBg} alt="profile background" />
                    <div className='absolute bottom-[-1.8rem] left-4'>
                        <label htmlFor="image_uploads" className='cursor-pointer'>
                            {image ? (
                                <img src={image} alt="" className='size-[6.5rem] border-[2px] border-[#FFB827] rounded-full' />
                            ) : (
                                <img src={(!data?.avatar?.secure_url ? userImg : data?.avatar?.secure_url)} alt="" className='size-[6.5rem] border-[3px] bg-white border-white rounded-full shadow-[0px_5px_15px_-5px_#808080]' />
                            )}
                        </label>
                        <div className='relative'>
                            <input onChange={imgUpload} type="file" id='image_uploads' name='image_uploads' className='hidden' accept='.jpg, .jpeg, .png, .svg' />
                            <label htmlFor='image_uploads' className='p-2 bg-[#e6e6e6] rounded-full absolute bottom-1 right-0 w-fit cursor-pointer'>
                                <FaCamera />
                            </label>
                        </div>
                    </div>
                </div>

                <div className='p-1'>
                    <div className={`${mainDiv}`}>
                        <label className={`${labelStyle}`} htmlFor="userName">Username</label>
                        <div className="relative group">
                            <input className={`${disabledInputStyle}`} disabled name='userName' id='userName' type="text" value={profileData.userName} onChange={handleInput} />
                            <div className="absolute hidden transform -translate-y-1/2 top-1/2 right-3 group-hover:flex">
                                <FaBan className="text-red-500" title="This field is disabled" />
                            </div>
                        </div>
                    </div>

                    <div className={mainDiv}>
                        <div className="relative group">
                            <input
                                disabled
                                type="email"
                                name="email"
                                id="email"
                                value={profileData.email}
                                onChange={handleInput}
                                className={disabledInputStyle}
                                placeholder=" "
                            />
                            <label htmlFor="email" className={labelStyle}>
                                Email
                            </label>
                            <div className="absolute hidden transform -translate-y-1/2 top-1/2 right-3 group-hover:flex">
                                <FaBan className="text-red-500" title="This field is disabled" />
                            </div>
                        </div>
                    </div>
                    <div className={`${mainDiv}`}>
                        <label className={`${labelStyle}`} htmlFor="phoneNumber">Phone number</label>
                        <input className={`${inputStyle}`} type="number" name='phoneNumber' id='phoneNumber' value={profileData.phoneNumber} onChange={handleInput} />
                    </div>
                    <div className={`${mainDiv}`}>
                        <label className={`${labelStyle}`} htmlFor="fullName">Full name</label>
                        <input className={`${inputStyle}`} type="text" name='fullName' id='fullName' value={profileData.fullName} onChange={handleInput} />
                    </div>
                    <button type='submit' onClick={() => setLoaderActive(true)} className={`p-2 px-4 mt-5 flex items-center justify-center text-white bg-gradient-to-r w-full from-[#1751fe] via-[#0074f9] transition-all duration-300 to-[#0199ff] lg:px-6 hover:shadow-[1px_1px_6px_-2px#808080] rounded text-[0.9rem] font-semibold ${!isUpdated && 'opacity-50 cursor-not-allowed'}`} disabled={!isUpdated}>
                        Update profile {loaderActive && <div className='ml-4 ease-in-out mt-1 size-[1.2rem] border-[2.4px] border-y-[#57575769] animate-spin rounded-full bottom-0'></div>}
                    </button>
                    <button onClick={() => navigate('/change-password')} className='w-full mt-3 bg-[#FF8900] rounded text-white p-[5px]'>
                        Change Password
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Profile;
