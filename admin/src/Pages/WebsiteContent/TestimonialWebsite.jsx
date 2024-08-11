import React, { useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import HomeLayout from '../../Layouts/HomeLayouts';

const TestimonialWebsite = () => {
    const [loaderActive, setLoaderActive] = useState(false)

    const [formData, setFormData] = useState({
        reviewerImage: null,
        servicesUsed: '',
        reviewText: ''
    });

    const [imagePreview, setImagePreview] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            reviewerImage: file
        });
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log(formData);
    };

    // Define class name variables
    const inputContainerClass = "flex flex-col items-center p-3 border border-gray-300 rounded w-full shadow-sm bg-[#2F3349]";
    const inputClass = "w-full p-2 resize-none border-none bg-white text-black outline-none rounded";
    const submitButtonClass = "px-12 py-2 text-white transition bg-blue-600 rounded shadow-lg hover:bg-blue-700";

    return (
        <HomeLayout>
            <div className="w-[98%] pt-4 px-[2vw] py-6  m-[0_auto] mb-12  my-6 bg-white rounded-md shadow-[0px_0px_15px_-6px_#808080]">
                <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
                    <h1 className='text-[1.5rem] font-semibold text-[#655CCE] text-center mb-8 border-b-[3.5px] rounded-b border-[#655CCE]'>
                        Submit Your Testimonial
                    </h1>

                    <div className='flex flex-col w-full lg:flex-row'>
                        <div className={`${inputContainerClass} lg:w-fit`}>

                            {imagePreview ? (
                                <div onClick={() => document.getElementById('reviewerImage').click()} className="relative cursor-pointer">
                                    <img
                                        src={imagePreview}
                                        alt="Reviewer Preview"
                                        className="size-[9rem] sm:size-[10rem] lg:min-w-[12rem] lg:size-[12rem] border rounded shadow "
                                    />
                                    <div className="absolute flex items-center justify-center p-[0.6rem] text-white bg-black rounded-full bg-opacity-80 right-[-10px] top-[-10px]">
                                        <span className="text-lg"><FaCamera /></span>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => document.getElementById('reviewerImage').click()}
                                    className="flex items-center justify-center size-[9rem] sm:size-[10rem] lg:min-w-[12rem] lg:size-[12rem] p-4 text-white bg-[#2F3349] border rounded shadow cursor-pointer"
                                >
                                    <span className="mr-2 text-[1.3rem]"><FaCamera /></span>
                                    <span>Upload</span>
                                </button>
                            )}
                            <input
                                type="file"
                                id="reviewerImage"
                                name="reviewerImage"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </div>

                        <div className='w-full'>
                            {/* Services Used Dropdown */}
                            <div className={inputContainerClass}>

                                <select
                                    name="servicesUsed"
                                    value={formData.servicesUsed}
                                    onChange={handleChange}
                                    className={inputClass}
                                >
                                    <option value="">Select a Service</option>
                                    <option value="Service 1">Service 1</option>
                                    <option value="Service 2">Service 2</option>
                                    <option value="Service 3">Service 3</option>
                                </select>
                            </div>

                            {/* Review Text Area */}
                            <div className={inputContainerClass}>

                                <textarea
                                    name="reviewText"
                                    placeholder="Write your review here..."
                                    value={formData.reviewText}
                                    onChange={handleChange}
                                    className={`${inputClass} h-32`}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end w-full pt-3">
                        <button onClick={() => setLoaderActive(true)}
                            type="submit"
                            className={'px-6 py-2 flex items-center justify-center gap-8 text-white transition bg-[#655CCE] rounded min-w-[13rem] shadow-lg hover:bg-[#FF4C51]'}
                        >
                            Submit
                            {
                                loaderActive &&
                                <div className='rounded-full border-[3px] border-y-gray-800 animate-spin ease-in-out border-gray-300 size-5'></div>
                            }
                        </button>
                    </div>
                </form>
            </div>
        </HomeLayout>
    );
};

export default TestimonialWebsite;
