import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useArea } from '../Hooks/useArea';
import { toast } from 'react-toastify';
import { updateServices, userProfile } from '../Redux/Slices/AuthSlice';

const UpdateServices = () => {
    const [loaderActive, setLoaderActive] = useState(false);

    const serviceData = useSelector((state) => state?.auth?.data?.servicesData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const poojaOptions = [
        { name: 'Rudra Havan', price: 1500 },
        { name: 'Maha mrityunjay jap', price: 2000 },
        { name: 'Vishnu yagna', price: 1800 },
        { name: 'Kaal Sarp yog', price: 3300 },
        { name: 'Bhagwat katha', price: 3000 },
        { name: 'Vastu shanti', price: 2000 },
        { name: 'Naw grah shanti', price: 1500 },
        { name: 'Nakshastra shanti', price: 3000 },
        { name: 'Rudra abhishekh', price: 5000 },
    ];

    const [input, setInput] = useState({
        availability: serviceData?.availability,
        fare: serviceData?.fare,
        poojaList: serviceData?.poojaList,
        serviceArea: serviceData?.serviceArea
    });

    function handleServiceInput(e) {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value
        });
    }

    console.log(input)

    const handlePoojaListChange = (e, pooja) => {
        const { checked } = e.target;
        setInput((prevState) => {
            const newPoojaList = checked
                ? [...prevState.poojaList, pooja]
                : prevState.poojaList.filter((p) => p.name !== pooja.name);

            return {
                ...prevState,
                poojaList: newPoojaList
            };
        });
    };

    const avail = ['AVAILABLE', 'BREAK', 'MAINTENANCE', 'ON SERVICE'];

    const handleForm = async (e) => {
        e.preventDefault();

        const { availability, fare, poojaList, serviceArea } = input;

        if (!availability || !fare || poojaList.length === 0 || !serviceArea) {
            setLoaderActive(false);
            return toast.error('All fields are required');
        }

        const res = await dispatch(updateServices(input));

        if (res?.payload?.success) {
            await dispatch(userProfile());
            toast.success('Updated!');
            setLoaderActive(false);
        }
    };

    const mainDiv = 'flex flex-col gap-[0.1px]';
    const labelStyle = 'text-[0.83rem] tracking-wide text-[#CFCCE4] font-[400] ml-[0.5px]';
    const inputStyle = 'border border-[#685ED4] min-w-[18rem] md:max-w-[20.5rem] max-w-[25.5rem] w-[87vw] sm:w-[24rem] rounded-[3px] h-full px-2 p-[5.5px] outline-none text-[0.95rem] tracking-wide resize-none bg-[#3D4056] text-white';

    return (
        <div className='flex items-center justify-center bg-[#f8f6fc]'>
            <form onSubmit={handleForm} className='sm:p-6 p-4 bg-[#2F3349] text-white rounded-md shadow-[0px_0px_20px_#3D4056] my-12 flex flex-col w-fit'>
                <div className='mb-4'>
                    <h2 className='text-[1.8rem] font-semibold tracking-wide'>Update Service</h2>
                    <div className='flex items-center mt-2'>
                        <div className='bg-[#685ED4] w-12 h-[5px] rounded-full mr-1'></div>
                        <div className='bg-[#685ED4] w-[12px] h-[5px] rounded-full mr-1'></div>
                        <div className='bg-[#FF4C51] w-[5px] h-[5px] rounded-full'></div>
                    </div>
                </div>
                <div className={mainDiv}>
                    <label className={labelStyle} htmlFor='serviceArea'>Service area</label>
                    <select className={inputStyle} name='serviceArea' onChange={handleServiceInput} value={input.serviceArea}>
                        <option value=''>Select</option>
                        {useArea.map((data, ind) => (
                            <option key={ind} value={data}>{data}</option>
                        ))}
                    </select>
                </div>

                <div className='flex flex-col gap-2 mt-4'>
                    <label className={labelStyle} htmlFor='poojaList'>Pooja list</label>
                    {poojaOptions.map((pooja, index) => (
                        <div key={index} className='flex items-center gap-2'>
                            <input
                                type='checkbox'
                                id={`pooja-${index}`}
                                checked={input.poojaList.some((p) => p.name === pooja.name)}
                                onChange={(e) => handlePoojaListChange(e, pooja)}
                            />
                            <label htmlFor={`pooja-${index}`} className='flex justify-between w-full'>
                                <span>{pooja.name}</span>
                                <span>&#8377;{`${pooja.price}`}</span>
                            </label>
                        </div>
                    ))}
                </div>


                <div className='flex  min-w-[18rem] md:max-w-[20.5rem] max-w-[25.5rem] w-[87vw] sm:w-[24rem] justify-between'>
                    <div className={`${mainDiv} w-[48%]`}>
                        <label className={labelStyle} htmlFor='fare'>Fare</label>
                        <input
                            className='border border-[#685ED4] w-full rounded-[3px] h-full  px-2 p-[5.5px]  outline-none  text-[0.95rem] tracking-wide resize-none bg-[#3D4056] text-white'
                            type='number'
                            name='fare'
                            value={input.fare}
                            onChange={handleServiceInput}
                            id='fare'
                        />
                    </div>
                    <div className={`${mainDiv} w-[48%]`}>
                        <label className={labelStyle} htmlFor='availability'>Availability</label>
                        <select
                            className='border border-[#685ED4] w-full rounded-[3px] h-full  px-2 p-[5.5px]  outline-none  text-[0.95rem] tracking-wide resize-none bg-[#3D4056] text-white'
                            name='availability'
                            onChange={handleServiceInput}
                            value={input.availability}
                        >
                            <option value=''>Select</option>
                            {avail.map((data, ind) => (
                                <option key={ind} value={data}>{data}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <button onClick={() => setLoaderActive(true)} className='bg-[#685ED4] hover:bg-[#FF4C51] text-white flex items-center justify-center transition-all duration-700 w-full rounded-md p-[6.9px] font-semibold mt-[12px] mb-1'>
                    Update {loaderActive && <div className='ml-4 ease-in-out mt-1 size-[1.25rem] border-[2.4px] border-t-[#46454546] animate-spin rounded-full bottom-0'></div>}
                </button>
            </form>
        </div>
    );
};

export default UpdateServices;
