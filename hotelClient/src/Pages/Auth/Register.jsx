import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createAccount } from '../../Redux/Slices/AuthSlice';

const Register = () => {
    const [loaderActive, setLoaderActive] = useState(false);
    const [file, setFile] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentYear = new Date().getFullYear();
    const yearArray = Array.from({ length: currentYear - 1950 + 1 }, (_, index) => 1950 + index);

    const serviceList = [
        "Wi-Fi",
        "Restaurant",
        "Bar",
        "Gym",
        "Spa",
        "Pool"
    ];

    const [input, setInput] = useState({
        fullName: "",
        hotelName: "",
        address: "",
        description: "",
        estb: "",
        hotelType: "",
        services: [],
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
    });

    function handleUserInput(e) {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value
        });
    }

    function handleServiceInput(e) {
        const { value, checked } = e.target;
        setInput(prevInput => {
            if (checked) {
                return { ...prevInput, services: [...prevInput.services, value] };
            } else {
                return { ...prevInput, services: prevInput.services.filter(service => service !== value) };
            }
        });
    }

    const getFileExtension = (filename) => {
        return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
    }

    const handleFileChange = (e, index) => {
        const selectedFile = e.target.files[0];
        const filename = e.target.id;
        const ext = getFileExtension(selectedFile.name);
        let fileName = `${filename}.${ext}`;
        setFile(prevFiles => {
            const newFiles = [...prevFiles];
            newFiles[index] = new File([selectedFile], fileName, { type: selectedFile.type });
            return newFiles;
        });
    };

    const handleForm = async (e) => {
        e.preventDefault();
        setLoaderActive(true);

        const { fullName, email, password, confirmPassword, hotelName, phoneNumber, address, description, estb, hotelType, services } = input;

        if (!fullName || !email || !password || !confirmPassword || !phoneNumber || !hotelName || !address || !description || !estb || !hotelType || services.length === 0) {
            setLoaderActive(false);
            return toast.error('All fields are required');
        }

        if (password !== confirmPassword) {
            setLoaderActive(false);
            return toast.error('Passwords do not match');
        }

        const formData = new FormData();

        formData.append('fullName', fullName);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('confirmPassword', confirmPassword);
        formData.append('phoneNumber', phoneNumber);
        formData.append('address', address);
        formData.append('description', description);
        formData.append('hotelName', hotelName);
        formData.append('estb', estb);
        formData.append('hotelType', hotelType);
        input.services.forEach(service => {
            formData.append('services', service);
        });

        file.forEach((data) => {
            formData.append('proofFiles', data);
        });

        try {
            const response = await dispatch(createAccount(formData));

            if (response?.payload?.success) {
                navigate('/');
            } else {
                toast.error('Failed to create account');
            }
        } catch (error) {
            toast.error('An error occurred');
        } finally {
            setLoaderActive(false);
        }
    };

    const mainDiv = 'flex flex-col gap-[0.1px]';
    const labelStyle = "text-[0.83rem] tracking-wide text-[#CFCCE4] font-[400] ml-[0.5px]";
    const inputStyle = 'border border-[#685ED4] min-w-[18rem] md:max-w-[20.5rem] max-w-[25.5rem] w-[87vw] sm:w-[24rem] rounded-[3px] h-full px-2 p-[5.5px] outline-none text-[0.95rem] tracking-wide resize-none bg-[#3D4056] text-white';

    return (
        <div className='flex items-center justify-center bg-[#f8f6fc]'>
            <form onSubmit={handleForm} className='sm:p-10 p-6 bg-[#2F3349] text-white rounded-md shadow-[0px_0px_20px_#3D4056] my-12 flex md:items-end md:flex-row flex-col w-fit md:gap-10'>
                <div className='flex flex-col gap-1'>
                    <div className='mb-4'>
                        <h2 className='text-[1.8rem] font-semibold tracking-wide'>Registration Form</h2>
                        <div className='flex items-center mt-2'>
                            <div className='bg-[#685ED4] w-12 h-[5px] rounded-full mr-1'></div>
                            <div className='bg-[#685ED4] w-[12px] h-[5px] rounded-full mr-1'></div>
                            <div className='bg-[#FF4C51] w-[5px] h-[5px] rounded-full'></div>
                        </div>
                    </div>
                    <div className={mainDiv}>
                        <label className={labelStyle} htmlFor="fullName">Full Name</label>
                        <input className={inputStyle} name='fullName' value={input.fullName} onChange={handleUserInput} id='fullName' type="text" />
                    </div>
                    <div className={mainDiv}>
                        <label className={labelStyle} htmlFor="hotelName">Hotel Name</label>
                        <input className={inputStyle} name='hotelName' value={input.hotelName} onChange={handleUserInput} id='hotelName' type="text" />
                    </div>

                    <div className={mainDiv}>
                        <label className={`${labelStyle}`} htmlFor="address">Hotel address</label>
                        <textarea className={`${inputStyle} h-[3.5rem]`} name='address' value={input.address} onChange={handleUserInput} id='address' type="text" ></textarea>
                    </div>
                    <div className={mainDiv}>
                        <label className={labelStyle} htmlFor="email">Email</label>
                        <input className={inputStyle} type="email" name='email' value={input.email} onChange={handleUserInput} id='email' />
                    </div>
                    <div className={mainDiv}>
                        <label className={labelStyle} htmlFor="phoneNumber">Phone Number</label>
                        <input className={inputStyle} type="number" name='phoneNumber' value={input.phoneNumber} onChange={handleUserInput} id='phoneNumber' />
                    </div>
                    <div className={mainDiv}>
                        <label className={labelStyle} htmlFor="password">Password</label>
                        <input className={inputStyle} type="password" name='password' value={input.password} onChange={handleUserInput} id='password' />
                    </div>
                    <div className={mainDiv}>
                        <label className={labelStyle} htmlFor="confirmPassword">Confirm Password</label>
                        <input className={inputStyle} type="password" name='confirmPassword' value={input.confirmPassword} onChange={handleUserInput} id='confirmPassword' />
                    </div>
                    <div className='flex min-w-[18rem] md:max-w-[20.5rem] max-w-[25.5rem] w-[87vw] sm:w-[24rem] justify-between'>
                        <div className={`${mainDiv} w-[48%]`}>
                            <label className={labelStyle} htmlFor="estb">Established Year</label>
                            <select className='border border-[#685ED4] w-full rounded-[3px] h-full px-2 p-[5.5px] outline-none text-[0.95rem] tracking-wide resize-none bg-[#3D4056] text-white' name="estb" onChange={handleUserInput} value={input.estb}>
                                <option value="">Select</option>
                                {yearArray.map((year, index) => (
                                    <option key={index} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>
                        <div className={`${mainDiv} w-[48%]`}>
                            <label className={labelStyle} htmlFor="hotelType">Hotel Type</label>
                            <select className='border border-[#685ED4] w-full rounded-[3px] h-full px-2 p-[5.5px] outline-none text-[0.95rem] tracking-wide resize-none bg-[#3D4056] text-white' name="hotelType" onChange={handleUserInput} value={input.hotelType}>
                                <option value="">Select</option>
                                <option value="LUXURY">Luxury</option>
                                <option value="BUDGET">Budget</option>
                                <option value="BOUTIQUE">Boutique</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-2 mt-2'>

                    <div className={mainDiv}>
                        <label className={`${labelStyle}`} htmlFor="description">Hotel Description</label>
                        <textarea className={`${inputStyle} h-[6.5rem]`} name='description' value={input.description} onChange={handleUserInput} id='description' type="text" ></textarea>
                    </div>
                    <div className={mainDiv}>
                        <label className={labelStyle} htmlFor="services">Services</label>
                        <div className='grid grid-cols-2'>
                            {serviceList.map((service, index) => (
                                <div key={index} className='flex items-center'>
                                    <input type="checkbox" name="services" value={service} onChange={handleServiceInput} id={`service_${index}`} className='mr-2' />
                                    <label htmlFor={`service_${index}`}>{service}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='flex min-w-[18rem] md:max-w-[20.5rem] max-w-[25.5rem] w-[87vw] sm:w-[24rem] justify-between'>
                        <div className={`${mainDiv} w-[48%]`}>
                            <label className={labelStyle} htmlFor="mainHotelImage">Main Hotel Image</label>
                            <input className='border border-[#685ED4] w-full rounded-[3px] h-full px-2 p-[5.5px] outline-none text-[0.95rem] tracking-wide resize-none bg-[#3D4056] text-white' type="file" name="mainHotelImage" id="mainHotelImage" onChange={(e) => handleFileChange(e, 0)} />
                        </div>
                        <div className={`${mainDiv} w-[48%]`}>
                            <label className={labelStyle} htmlFor="hotelImages1">Hotel Image 1</label>
                            <input className='border border-[#685ED4] w-full rounded-[3px] h-full px-2 p-[5.5px] outline-none text-[0.95rem] tracking-wide resize-none bg-[#3D4056] text-white' type="file" name="hotelImages1" id="hotelImages1" onChange={(e) => handleFileChange(e, 1)} />
                        </div>
                    </div>
                    <div className='flex min-w-[18rem] md:max-w-[20.5rem] max-w-[25.5rem] w-[87vw] sm:w-[24rem] justify-between'>
                        <div className={`${mainDiv} w-[48%]`}>
                            <label className={labelStyle} htmlFor="hotelImages2">Hotel Image 2</label>
                            <input className='border border-[#685ED4] w-full rounded-[3px] h-full px-2 p-[5.5px] outline-none text-[0.95rem] tracking-wide resize-none bg-[#3D4056] text-white' type="file" name="hotelImages2" id="hotelImages2" onChange={(e) => handleFileChange(e, 2)} />
                        </div>
                        <div className={`${mainDiv} w-[48%]`}>
                            <label className={labelStyle} htmlFor="hotelImages3">Hotel Image 3</label>
                            <input className='border border-[#685ED4] w-full rounded-[3px] h-full px-2 p-[5.5px] outline-none text-[0.95rem] tracking-wide resize-none bg-[#3D4056] text-white' type="file" name="hotelImages3" id="hotelImages3" onChange={(e) => handleFileChange(e, 3)} />
                        </div>
                    </div>
                    <div className='flex min-w-[18rem] md:max-w-[20.5rem] max-w-[25.5rem] w-[87vw] sm:w-[24rem] justify-between'>
                        <div className={`${mainDiv} w-[48%]`}>
                            <label className={labelStyle} htmlFor="hotelImages4">Hotel Image 4</label>
                            <input className='border border-[#685ED4] w-full rounded-[3px] h-full px-2 p-[5.5px] outline-none text-[0.95rem] tracking-wide resize-none bg-[#3D4056] text-white' type="file" name="hotelImages4" id="hotelImages4" onChange={(e) => handleFileChange(e, 4)} />
                        </div>
                        <div className={`${mainDiv} w-[48%]`}>
                            <label className={labelStyle} htmlFor="hotelLicense">Hotel License</label>
                            <input className='border border-[#685ED4] w-full rounded-[3px] h-full px-2 p-[5.5px] outline-none text-[0.95rem] tracking-wide resize-none bg-[#3D4056] text-white' type="file" name="hotelLicense" id="hotelLicense" onChange={(e) => handleFileChange(e, 5)} />
                        </div>
                    </div>
                    <button type='submit' className='bg-[#685ED4] hover:bg-[#FF4C51] text-white flex items-center justify-center transition-all duration-700 w-full rounded-md p-[6.9px] font-semibold mt-[12px] mb-1'>
                        Sign Up
                        {loaderActive && <div className='ml-4 ease-in-out mt-1 size-[1.25rem] border-[2.4px] border-t-[#46454546] animate-spin rounded-full bottom-0'></div>}
                    </button>
                    <div className='w-full text-center md:mt-3'>
                        <p>Already have an account? <Link to={"/login"} className='text-[#FF4C51] font-semibold underline'>Login</Link></p>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Register;
