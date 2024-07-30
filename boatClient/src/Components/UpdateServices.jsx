import React, { useState, useEffect } from 'react';
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
    console.log(serviceData);

    const [input, setInput] = useState({
        availability: serviceData?.availability,
        fullBoat: serviceData?.fullBoat,
        seatingCap: serviceData?.seatingCap,
        serviceArea: serviceData?.serviceArea,
        fullBoatFare: serviceData?.fullBoatFare,
        seatFare: serviceData?.seatFare
    });

    function handleServiceInput(e) {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: name === "fullBoat" ? (value === "Yes") : value
        });
    }

    const seatNum = Array.from({ length: 50 }, (_, i) => i + 1);

    const avail = ['AVAILABLE', 'BREAK', 'MAINTENANCE', 'ON SERVICE'];

    const boatFull = ["No", "Yes"];

    const handleForm = async (e) => {
        e.preventDefault();

        const { availability, fullBoat, seatingCap, serviceArea, fullBoatFare, seatFare } = input;

        console.log(input);

        if (!availability || !seatingCap || !serviceArea || !fullBoatFare || !seatFare) {
            setLoaderActive(false);
            return toast.error('All fields are required');
        }

        const res = await dispatch(updateServices({
            ...input,
            fullBoat: fullBoat ? "Yes" : "No"
        }));

        if (res?.payload?.success) {
            await dispatch(userProfile());
            toast.success('Updated!');
            setLoaderActive(false);
        }
    };

    const mainDiv = 'flex flex-col gap-[0.1px]';
    const labelStyle = "text-[0.83rem] tracking-wide text-[#CFCCE4] font-[400] ml-[0.5px]";
    const inputStyle = 'border border-[#685ED4] min-w-[18rem] md:max-w-[20.5rem] max-w-[25.5rem] w-[87vw] sm:w-[24rem] rounded-[3px] h-full  px-2 p-[5.5px]  outline-none  text-[0.95rem] tracking-wide resize-none bg-[#3D4056] text-white';

    return (
        <div className='flex items-center justify-center  bg-[#f8f6fc]'>
            <form onSubmit={handleForm} className='sm:p-6 p-4 gap-3  bg-[#2F3349] text-white rounded-md shadow-[0px_0px_20px_#3D4056] my-12 flex flex-col w-fit '>
                <div className='mb-4'>
                    <h2 className='text-[1.8rem] font-semibold tracking-wide '>Update Service</h2>
                    <div className='flex items-center mt-2'>
                        <div className='bg-[#685ED4] w-12 h-[5px] rounded-full mr-1'> </div>
                        <div className='bg-[#685ED4] w-[12px] h-[5px] rounded-full mr-1'></div>
                        <div className='bg-[#FF4C51] w-[5px] h-[5px] rounded-full'></div>
                    </div>
                </div>
                <div className={mainDiv}>
                    <label className={labelStyle} htmlFor="serviceArea">Service area</label>
                    <select className={inputStyle}
                        name='serviceArea'
                        onChange={handleServiceInput}
                        value={input.serviceArea} >
                        <option name="serviceArea" value="" >Select</option>
                        {useArea.map((data, ind) => { return <option key={ind + 1} name="serviceArea" value={data} >{data}</option> })}
                    </select>
                </div>
                <div className='flex  min-w-[18rem] md:max-w-[20.5rem] max-w-[25.5rem] w-[87vw] sm:w-[24rem] justify-between'>

                    <div className={`${mainDiv} w-[48%]`}>
                        <label className={labelStyle} htmlFor="fullBoatFare">Fare/Boat</label>
                        <input className='border border-[#685ED4] w-full rounded-[3px] h-full  px-2 p-[5.5px]  outline-none  text-[0.95rem] tracking-wide resize-none bg-[#3D4056] text-white' type="number" name='fullBoatFare' value={input.fullBoatFare} onChange={handleServiceInput} id='fullBoatFare' />
                    </div>
                    <div className={`${mainDiv} w-[48%]`}>
                        <label className={labelStyle} htmlFor="seatFare">Fare/Seat</label>
                        <input className='border border-[#685ED4] w-full rounded-[3px] h-full  px-2 p-[5.5px]  outline-none  text-[0.95rem] tracking-wide resize-none bg-[#3D4056] text-white' type="number" name='seatFare' value={input.seatFare} onChange={handleServiceInput} id='seatFare' />
                    </div>

                </div>
                <div className='flex  min-w-[18rem] md:max-w-[20.5rem] max-w-[25.5rem] w-[87vw] sm:w-[24rem] justify-between'>
                    <div className={`${mainDiv} w-[23%]`}>
                        <label className={labelStyle} htmlFor="fullBoat">Full boat?</label>
                        <select className='border border-[#685ED4] w-full rounded-[3px] h-full  px-2 p-[5.5px]  outline-none  text-[0.95rem] tracking-wide resize-none bg-[#3D4056] text-white'
                            name='fullBoat'
                            onChange={handleServiceInput}
                            value={input.fullBoat ? "Yes" : "No"} >
                            {boatFull.map((data, ind) => { return <option key={ind + 1} name="fullBoat" value={data} >{data}</option> })}
                        </select>
                    </div>
                    <div className={`${mainDiv} w-[43%]`}>
                        <label className={labelStyle} htmlFor="availability">Availability</label>
                        <select className='border border-[#685ED4] w-full rounded-[3px] h-full  px-2 p-[5.5px]  outline-none  text-[0.95rem] tracking-wide resize-none bg-[#3D4056] text-white'
                            name='availability'
                            onChange={handleServiceInput}
                            value={input.availability} >
                            <option name="availability" value="" >Select</option>
                            {avail.map((data, ind) => { return <option key={ind + 1} name="availability" value={data} >{data}</option> })}
                        </select>
                    </div>
                    <div className={`${mainDiv} w-[28%]`}>
                        <label className={labelStyle} htmlFor="seatingCap">Seating cap.</label>
                        <select className='border border-[#685ED4] w-full rounded-[3px] h-full  px-2 p-[5.5px]  outline-none  text-[0.95rem] tracking-wide resize-none bg-[#3D4056] text-white'
                            name='seatingCap'
                            onChange={handleServiceInput}
                            value={input.seatingCap} >
                            <option name="seatingCap" value="" >Select</option>
                            {seatNum.map((data, ind) => { return <option key={ind + 1} name="seatingCap" value={data} >{data}</option> })}
                        </select>
                    </div>
                </div>
                <button onClick={() => setLoaderActive(true)} className='bg-[#685ED4] hover:bg-[#FF4C51] text-white flex items-center justify-center transition-all duration-700 w-full rounded-md p-[6.9px] font-semibold mt-[12px] mb-1'>Update {loaderActive && <div className='ml-4 ease-in-out mt-1 size-[1.25rem] border-[2.4px] border-t-[#46454546] animate-spin rounded-full bottom-0 '></div>}</button>
            </form>
        </div>
    );
};

export default UpdateServices;
