import React, { useEffect, useState } from 'react';
import HomeLayout from '../../Layouts/HomeLayouts';
import { FaArrowLeft, FaArrowRight, FaCamera, FaPlus, FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addPlaces, getAboutSettingsData } from '../../Redux/Slices/AuthSlice';
import { toast } from 'react-toastify';

const icons = {
    mission: '🚀',
    story: '📖',
    team: '👥',
};

const PlaceContent = () => {
    const [file, setFile] = useState('')

    const [currentStep, setCurrentStep] = useState(1);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [keyHighlightsArray, setKeyHighlightsArray] = useState([]);
    const [festivalsEvents, setFestivalsEvents] = useState([{ eventName: '', eventDescription: '', date: '' }]);
    const dispatch = useDispatch();

    const loadData = () => {
        dispatch(getAboutSettingsData());
    };

    useEffect(() => {
        loadData();
    }, []);

    const [formData, setFormData] = useState({
        title: '',
        shortDescription: '',
        keyHighlights: '',
        festivalsEvents: '',
        mapFrame: '',
        images: ''
    });

    const handleChange = (e, field, index) => {
        if (field === 'keyHighlights') {
            const highlights = e.target.value.split(',').map(highlight => highlight.trim());
            setFormData(prevFormData => ({
                ...prevFormData,
                keyHighlights: e.target.value
            }));
            setKeyHighlightsArray(highlights);
        } else if (field === 'eventName' || field === 'eventDescription' || field === 'date') {
            const updatedFestivalsEvents = [...festivalsEvents];
            updatedFestivalsEvents[index] = {
                ...updatedFestivalsEvents[index],
                [field]: e.target.value
            };
            setFestivalsEvents(updatedFestivalsEvents);
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                [field]: e.target.value
            }));
        }
    };

    const addFestivalEvent = () => {
        setFestivalsEvents([...festivalsEvents, { eventName: '', eventDescription: '', date: '' }]);
    };

    const removeFestivalEvent = (index) => {
        const updatedFestivalsEvents = festivalsEvents.filter((_, i) => i !== index);
        setFestivalsEvents(updatedFestivalsEvents);
    };


    const getFileExtension = (filename) => {
        return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2)
    }

    const handleFileChange = (e, index) => {
        const files = Array.from(e.target.files).slice(0, 6); // Limit to 6 files

        setImagePreviews(prevPreviews => {
            const newPreviews = [...prevPreviews];
            newPreviews[index] = URL.createObjectURL(files[0]); // Replace the preview at the specific index
            return newPreviews;
        });
        const selectedFile = e.target.files[0];
        const filename = e.target.id;
        const ext = getFileExtension(selectedFile.name)
        let fileName = `${filename}.${ext}`
        setFile(prevFiles => {
            const newFiles = [...prevFiles];
            newFiles[index] = new File([selectedFile], fileName, { type: selectedFile.type });
            return newFiles;
        });
    };


    const validateFields = () => {
        const { title, shortDescription, keyHighlights } = formData;
        if (currentStep === 1 && (!title || !shortDescription)) {
            toast.error('All fields are required in this step.');
            return false;
        }
        if (currentStep === 2 && (!keyHighlights || festivalsEvents.some(event => !event.eventName || !event.eventDescription || !event.date))) {
            toast.error('All fields are required in this step.');
            return false;
        }
        if (currentStep === 3 && (!file.length || !formData.mapFrame)) {
            toast.error('All fields are required in this step.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        const formDataToSend = new FormData();
        console.log(festivalsEvents)
        // Form Data
        formDataToSend.append('title', formData.title);
        formDataToSend.append('shortDescription', formData.shortDescription);
        formDataToSend.append('keyHighlights', JSON.stringify(keyHighlightsArray));
        formDataToSend.append('festivalsEvents', JSON.stringify(festivalsEvents));
        formDataToSend.append('mapFrame', formData.mapFrame);

        // Images
        file.forEach((data, index) => {
            formDataToSend.append(`images`, data);
            console.log(data)
        });

        console.log(formData)

        try {
            const response = await dispatch(addPlaces(formDataToSend));

            if (response?.payload?.success) {
                loadData();
                if (currentStep === 3) {
                    toast.success('Form submitted successfully!');
                }
            }
        } catch (error) {
            toast.error('Error submitting form, please try again.');
        }
    };

    const triggerFileInput = (inputId) => {
        document.getElementById(inputId).click();
    };

    const handleImagePreview = (index) => {
        return imagePreviews[index] ? (
            <div onClick={() => triggerFileInput(`imagesInput${index}`)} className="relative cursor-pointer w-fit">
                <img
                    src={imagePreviews[index]}
                    alt={`Image Preview ${index + 1}`}
                    className="size-[5.8rem] border rounded shadow"
                />
                <div className="absolute flex items-center justify-center p-[0.6rem] text-white bg-black rounded-full bg-opacity-80 right-[-5px] top-[-5px]">
                    <span className="text-[0.8rem]"><FaCamera /></span>
                </div>
            </div>
        ) : (
            <button
                type="button"
                onClick={() => triggerFileInput(`imagesInput${index}`)}
                className="flex items-center justify-center size-[5.8rem] p-4 text-white bg-[#2F3349] border rounded shadow cursor-pointer"
            >
                <span className="mr-2 text-[0.9rem]"><FaCamera /></span>
                <span className='text-[0.85rem] font-semibold'>Upload</span>
            </button>
        );
    };

    const handleNext = () => {
        if (validateFields()) {
            setCurrentStep(currentStep + 1);
        }
    };

    return (
        <HomeLayout>
            <div className="w-[98%] p-4 pt-2 mx-auto bg-white my-6 shadow-[0px_0px_8px_-3px_#808080] rounded-md">
                {/* Step Navigation with Icons and Numbers */}
                <div className="flex justify-around mb-4">
                    {[
                        { label: 'Place Details', icon: icons.mission },
                        { label: 'Key Highlights & Events', icon: icons.story },
                        { label: 'Images & Map', icon: icons.team }
                    ].map((step, index) => {
                        const stepNumber = index + 1;
                        return (
                            <button
                                key={index}
                                className={`flex flex-col items-center px-4 py-2 font-semibold border-b-4 rounded-b ${currentStep === stepNumber ? 'border-[#655CCE] text-[#655CCE]' : 'border-transparent'
                                    }`}
                            >
                                <span className="text-[1.3rem]">{step.icon}</span>
                                <span>{`${stepNumber}. ${step.label}`}</span>
                            </button>
                        );
                    })}
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Step Content */}
                    {currentStep === 1 && (
                        <div className="space-y-4 text-black">
                            <input
                                type="text"
                                className="block w-full p-2 bg-gray-100 border border-[#8681c6] rounded outline-none"
                                placeholder="Title"
                                value={formData.title}
                                onChange={(e) => handleChange(e, 'title')}
                            />
                            <textarea
                                className="block w-full p-2 bg-gray-100 border border-[#8681c6] rounded outline-none h-[14rem] resize-none"
                                placeholder="Short Description"
                                value={formData.shortDescription}
                                onChange={(e) => handleChange(e, 'shortDescription')}
                            />
                        </div>
                    )}
                    {currentStep === 2 && (
                        <div className="space-y-4 text-black">
                            <div className="relative">
                                <textarea
                                    className="block w-full p-2 bg-gray-100 border border-[#8681c6] rounded outline-none h-[5rem] resize-none"
                                    placeholder="Key Highlights (separate with commas)"
                                    value={formData.keyHighlights}
                                    onChange={(e) => handleChange(e, 'keyHighlights')}
                                />
                                <div className="flex flex-wrap gap-1 mt-1 ">
                                    {keyHighlightsArray.map((highlight, index) => (
                                        <div
                                            key={index}
                                            className="px-2 py-1 text-white bg-blue-600 rounded"
                                        >
                                            {highlight}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-lg font-medium">Festivals & Events</h4>
                                {festivalsEvents.map((event, index) => (
                                    <div key={index} className="relative p-4 border border-[#8681c6] rounded">
                                        <button
                                            type="button"
                                            className="absolute top-0 right-0 p-1 mt-1 mr-1 text-white bg-red-500 rounded-full hover:bg-red-600"
                                            onClick={() => removeFestivalEvent(index)}
                                        >
                                            <FaTrash />
                                        </button>
                                        <input
                                            type="text"
                                            className="block w-full p-2 mb-2 bg-gray-100 border border-[#8681c6] rounded outline-none"
                                            placeholder="Event Name"
                                            value={event.eventName || ''}
                                            onChange={(e) => handleChange(e, 'eventName', index)}
                                        />
                                        <textarea
                                            className="block w-full p-2 mb-2 bg-gray-100 border border-[#8681c6] rounded outline-none resize-none"
                                            placeholder="Event Description"
                                            value={event.eventDescription || ''}
                                            onChange={(e) => handleChange(e, 'eventDescription', index)}
                                        />
                                        <input
                                            type="text"
                                            className="block w-full p-2 bg-gray-100 border border-[#8681c6] rounded outline-none"
                                            placeholder="Date"
                                            value={event.date || ''}
                                            onChange={(e) => handleChange(e, 'date', index)}
                                        />
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className="flex items-center px-3 py-2 text-white bg-green-600 rounded hover:bg-green-700"
                                    onClick={addFestivalEvent}
                                >
                                    <FaPlus className="mr-1" />
                                    Add Another Event
                                </button>
                            </div>
                        </div>
                    )}
                    {currentStep === 3 && (
                        <div className="space-y-4 text-black">
                            <div className="grid grid-cols-2 gap-4">
                                {[...Array(6)].map((_, index) => (
                                    <div key={index} className="relative">
                                        <input
                                            id={`imagesInput${index}`}
                                            name={`imagesInput${index}`}
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => handleFileChange(e, index)}
                                        />
                                        {handleImagePreview(index)}
                                    </div>
                                ))}
                            </div>
                            <textarea
                                className="block w-full p-2 bg-gray-100 border border-[#8681c6] rounded outline-none h-[6rem] resize-none"
                                placeholder="Map Frame"
                                value={formData.mapFrame}
                                onChange={(e) => handleChange(e, 'mapFrame')}
                            />
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8">
                        {currentStep > 1 && (
                            <button
                                type="button"
                                onClick={() => setCurrentStep(currentStep - 1)}
                                className="flex items-center px-4 py-2 font-semibold text-white bg-gray-600 rounded shadow hover:bg-gray-700"
                            >
                                <FaArrowLeft className="mr-2" />
                                Previous
                            </button>
                        )}
                        {currentStep < 3 && (
                            <button
                                type="button"
                                onClick={handleNext}
                                className="flex items-center px-4 py-2 ml-auto font-semibold text-white bg-[#655CCE] rounded shadow hover:bg-[#4d45a4]"
                            >
                                Next
                                <FaArrowRight className="ml-2" />
                            </button>
                        )}
                        {currentStep === 3 && (
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="flex items-center px-4 py-2 ml-auto font-semibold text-white bg-[#655CCE] rounded shadow hover:bg-[#4d45a4]"
                            >
                                Submit
                                <FaArrowRight className="ml-2" />
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </HomeLayout>
    );
};

export default PlaceContent;
