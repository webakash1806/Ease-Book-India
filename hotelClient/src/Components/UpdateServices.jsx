import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateServices, userProfile } from '../Redux/Slices/AuthSlice';

const roomTypes = ['SINGLE', 'DOUBLE', 'DELUXE_DOUBLE', 'PREMIUM_DELUXE'];
const avail = ['AVAILABLE', 'OCCUPIED', 'UNDER_MAINTENANCE'];
const amenitiesList = ['Wifi', 'TV', 'Air Conditioning', 'Breakfast', 'Parking'];

const UpdateServices = () => {
    const [loaderActive, setLoaderActive] = useState(false);
    const [file, setFile] = useState(Array(5).fill(null));

    const serviceData = useSelector((state) => state?.auth?.data?.servicesData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [input, setInput] = useState({
        totalRoom: 0,
        roomType: '',
        courtyardView: false,
        capacity: 0,
        amenities: [],
        price: 0,
        availability: ''
    });

    console.log(input)

    function handleInputChange(e) {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox' && name === 'amenities') {
            setInput({
                ...input,
                amenities: checked
                    ? [...input.amenities, value]
                    : input.amenities.filter((amenity) => amenity !== value)
            });
        } else if (type === 'checkbox') {
            setInput({
                ...input,
                [name]: checked
            });
        } else {
            setInput({
                ...input,
                [name]: value
            });
        }
    }

    const getFileExtension = (filename) => {
        return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
    }

    console.log(file)

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

        const { totalRoom, roomType, courtyardView, capacity, amenities, price, availability } = input;

        if (!totalRoom || !roomType || capacity === 0 || amenities.length === 0 || price === 0 || !availability) {
            setLoaderActive(false);
            return toast.error('All fields are required');
        }

        const formData = new FormData();

        formData.append('totalRoom', totalRoom);
        formData.append('roomType', roomType);
        formData.append('courtyardView', courtyardView);
        formData.append('capacity', capacity);
        formData.append('price', price);
        formData.append('availability', availability);
        input.amenities.forEach(service => {
            formData.append('amenities', service);
        });

        console.log(file)

        file.forEach((data) => {
            console.log(data)
            formData.append('roomImage', data);
        });

        const res = await dispatch(updateServices(formData));

        if (res?.payload?.success) {
            await dispatch(userProfile());
            toast.success('Updated!');
            setLoaderActive(false);
        } else {
            setLoaderActive(false);
            toast.error('Update failed');
        }
    };

    const mainDiv = 'flex flex-col gap-[0.1px]';
    const labelStyle = 'text-[0.83rem] tracking-wide text-[#CFCCE4] font-[400] ml-[0.5px]';
    const inputStyle = 'border border-[#685ED4] w-full rounded-[3px] h-full px-2 p-[5.5px] outline-none text-[0.95rem] tracking-wide resize-none bg-[#3D4056] text-white';

    return (
        <div className='flex items-center justify-center '>
            <form onSubmit={handleForm} className='sm:p-6 p-4 bg-[#2F3349] text-white rounded-md shadow-[0px_0px_20px_#3D4056] my-12 flex flex-col gap-1 w-fit'>
                <div className='mb-4'>
                    <h2 className='text-[1.8rem] font-semibold tracking-wide'>Update Rooms</h2>
                    <div className='flex items-center mt-2'>
                        <div className='bg-[#685ED4] w-12 h-[5px] rounded-full mr-1'></div>
                        <div className='bg-[#685ED4] w-[12px] h-[5px] rounded-full mr-1'></div>
                        <div className='bg-[#FF4C51] w-[5px] h-[5px] rounded-full'></div>
                    </div>
                </div>
                <div className={mainDiv}>
                    <label className={labelStyle} htmlFor='roomType'>Room Type</label>
                    <select className={inputStyle} name='roomType' onChange={handleInputChange} value={input.roomType}>
                        <option value=''>Select</option>
                        {roomTypes.map((type, ind) => (
                            <option key={ind} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                <div className='flex min-w-[18rem] md:max-w-[20.5rem] max-w-[25.5rem] w-[87vw] sm:w-[24rem] justify-between'>
                    <div className={`${mainDiv} w-[48%]`}>
                        <label className={labelStyle} htmlFor='totalRoom'>Total Rooms</label>
                        <input
                            className={inputStyle}
                            type='number'
                            name='totalRoom'
                            value={input.totalRoom}
                            onChange={handleInputChange}
                            id='totalRoom'
                        />
                    </div>
                    <div className={`${mainDiv} w-[48%]`}>
                        <label className={labelStyle} htmlFor='capacity'>Capacity</label>
                        <input
                            className={inputStyle}
                            type='number'
                            name='capacity'
                            value={input.capacity}
                            onChange={handleInputChange}
                            id='capacity'
                        />
                    </div>
                </div>
                <div className='flex min-w-[18rem] md:max-w-[20.5rem] max-w-[25.5rem] w-[87vw] sm:w-[24rem] justify-between'>
                    <div className={`${mainDiv} w-[48%]`}>
                        <label className={labelStyle} htmlFor='price'>Price</label>
                        <input
                            className={inputStyle}
                            type='number'
                            name='price'
                            value={input.price}
                            onChange={handleInputChange}
                            id='price'
                        />
                    </div>
                    <div className={`${mainDiv} w-[48%]`}>
                        <label className={labelStyle} htmlFor='availability'>Availability</label>
                        <select className={inputStyle} name='availability' onChange={handleInputChange} value={input.availability}>
                            <option value=''>Select</option>
                            {avail.map((status, ind) => (
                                <option key={ind} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='flex min-w-[18rem] md:max-w-[20.5rem] max-w-[25.5rem] w-[87vw] sm:w-[24rem] justify-between'>
                    <div className={`${mainDiv} w-[48%]`}>
                        <label className={labelStyle} htmlFor="image1">Image 1</label>
                        <input className='border border-[#685ED4] w-full rounded-[3px] h-full px-2 p-[5.5px] outline-none text-[0.95rem] tracking-wide resize-none bg-[#3D4056] text-white' type="file" name="image1" id="image1" onChange={(e) => handleFileChange(e, 0)} />
                    </div>
                    <div className={`${mainDiv} w-[48%]`}>
                        <label className={labelStyle} htmlFor="image2">Image 2</label>
                        <input className='border border-[#685ED4] w-full rounded-[3px] h-full px-2 p-[5.5px] outline-none text-[0.95rem] tracking-wide resize-none bg-[#3D4056] text-white' type="file" name="image2" id="image2" onChange={(e) => handleFileChange(e, 1)} />
                    </div>
                </div>
                <div className='flex min-w-[18rem] md:max-w-[20.5rem] max-w-[25.5rem] w-[87vw] sm:w-[24rem] justify-between'>
                    <div className={`${mainDiv} w-[48%]`}>
                        <label className={labelStyle} htmlFor="image3">Image 3</label>
                        <input className='border border-[#685ED4] w-full rounded-[3px] h-full px-2 p-[5.5px] outline-none text-[0.95rem] tracking-wide resize-none bg-[#3D4056] text-white' type="file" name="image3" id="image3" onChange={(e) => handleFileChange(e, 2)} />
                    </div>
                    <div className={`${mainDiv} w-[48%]`}>
                        <label className={labelStyle} htmlFor="image4">Image 4</label>
                        <input className='border border-[#685ED4] w-full rounded-[3px] h-full px-2 p-[5.5px] outline-none text-[0.95rem] tracking-wide resize-none bg-[#3D4056] text-white' type="file" name="image4" id="image4" onChange={(e) => handleFileChange(e, 3)} />
                    </div>
                </div>
                <div className={mainDiv}>
                    <label className={labelStyle}>Amenities</label>
                    <div className='grid grid-cols-2'>
                        {amenitiesList.map((amenity, ind) => (
                            <label key={ind}>
                                <input
                                    className='mr-2'
                                    type='checkbox'
                                    name='amenities'
                                    value={amenity}
                                    checked={input.amenities.includes(amenity)}
                                    onChange={handleInputChange}
                                />
                                {amenity}
                            </label>
                        ))}
                    </div>
                </div>
                <div className="flex gap-2 mt-2">
                    <input
                        type='checkbox'
                        name='courtyardView'
                        checked={input.courtyardView}
                        onChange={handleInputChange}
                        id='courtyardView'
                    />
                    <label className={labelStyle} htmlFor='courtyardView'>Courtyard View?</label>
                </div>
                <button onClick={() => setLoaderActive(true)} className='bg-[#685ED4] hover:bg-[#FF4C51] text-white flex items-center justify-center transition-all duration-700 w-full rounded-md p-[6.9px] font-semibold mt-[12px] mb-1'>
                    Update {loaderActive && <div className='ml-4 ease-in-out mt-1 size-[1.25rem] border-[2.4px] border-y-[#46454546] animate-spin rounded-full bottom-0'></div>}
                </button>
            </form>
        </div>
    );
};

export default UpdateServices;
