import React, { useState } from 'react';
import HomeLayout from '../../Layouts/HomeLayouts';
import { FaArrowLeft, FaArrowRight, FaCamera, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const icons = {
    mission: '🚀',
    story: '📖',
    team: '👥',
};

const AboutContent = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [expandedStory, setExpandedStory] = useState(1);
    const [expandedTeam, setExpandedTeam] = useState(1);

    const [formData, setFormData] = useState({
        missionImage: '',
        missionDescription1: '',
        missionDescription2: '',
        story1: { year: '', description: '' },
        story2: { year: '', description: '' },
        story3: { year: '', description: '' },
        team1: { image: '', name: '', role: '' },
        team2: { image: '', name: '', role: '' },
        team3: { image: '', name: '', role: '' }
    });

    const [missionImagePreview, setMissionImagePreview] = useState(null);
    const [teamImagePreviews, setTeamImagePreviews] = useState({
        team1: null,
        team2: null,
        team3: null
    });

    const handleNext = () => {
        if (currentStep < 3 && validateForm()) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const handleStepClick = (step) => {
        if (validateForm()) {
            setCurrentStep(step);
        }
    };

    const toggleTeam = (teamNumber) => {
        setExpandedTeam(teamNumber === expandedTeam ? 1 : teamNumber);
    };


    const handleChange = (e, section, field) => {
        if (section.startsWith('story') || section.startsWith('team')) {
            setFormData({
                ...formData,
                [section]: {
                    ...formData[section],
                    [field]: e.target.value
                }
            });

            // Handle team image preview
            if (section.startsWith('team') && field === 'image') {
                const file = e.target.files[0];
                setFormData({
                    ...formData,
                    [section]: {
                        ...formData[section],
                        image: file
                    }
                });
                setTeamImagePreviews({
                    ...teamImagePreviews,
                    [section]: URL.createObjectURL(file)
                });
            }
        } else if (section === 'missionImage') {
            const file = e.target.files[0];
            setFormData({
                ...formData,
                missionImage: file
            });
            setMissionImagePreview(URL.createObjectURL(file));
        } else {
            setFormData({
                ...formData,
                [section]: e.target.value
            });
        }
    };

    const validateForm = () => {
        // Add validation logic here as needed
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log(formData);
            // Submit form data to backend
        }
        console.log(1)
    };

    const triggerFileInput = (inputId) => {
        document.getElementById(inputId).click();
    };

    const toggleStory = (storyNumber) => {
        setExpandedStory(storyNumber === expandedStory ? 1 : storyNumber);
    };

    return (
        <HomeLayout>
            <div className="w-[98%] p-4 pt-2 mx-auto bg-white my-6 shadow-[0px_0px_8px_-3px_#808080] rounded-md">
                {/* Step Navigation with Icons and Numbers */}
                <div className="flex justify-around mb-4">
                    {[
                        { label: 'Our Mission', icon: icons.mission },
                        { label: 'Our Story', icon: icons.story },
                        { label: 'Our Team', icon: icons.team }
                    ].map((step, index) => {
                        const stepNumber = index + 1;
                        return (
                            <button
                                key={index}
                                onClick={() => handleStepClick(stepNumber)}
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
                        <div className="space-y-4">
                            <div className="flex flex-col items-center justify-center p-4 mb-2 bg-[#655CCE] shadow-[0px_0px_25px_-10px_#000_inset] rounded sm:flex-row">
                                {missionImagePreview ? (
                                    <div onClick={() => triggerFileInput('missionImageInput')} className="relative cursor-pointer">
                                        <img
                                            src={missionImagePreview}
                                            alt="Mission Preview"
                                            className="size-[9rem] sm:size-[10rem] md:size-[11rem] lg:size-[13rem] border rounded shadow "
                                        />
                                        <div className="absolute flex items-center justify-center p-[0.6rem] text-white bg-black rounded-full bg-opacity-80 right-[-10px] top-[-10px]">
                                            <span className="text-lg"><FaCamera /></span>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => triggerFileInput('missionImageInput')}
                                        className="flex items-center justify-center size-[9rem] sm:size-[10rem] md:size-[11rem] lg:size-[13rem] p-4 text-white bg-[#2F3349] border rounded shadow cursor-pointer "
                                    >
                                        <span className="mr-2 text-[1.3rem]"><FaCamera /></span>
                                        <span className=''>Upload</span>
                                    </button>
                                )}
                                <input
                                    id="missionImageInput"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleChange(e, 'missionImage')}
                                />
                            </div>
                            <div className="space-y-2">
                                <textarea
                                    className="block w-full p-2 bg-gray-100 border border-[#8681c6] rounded outline-none h-[6rem] resize-none"
                                    placeholder="Mission Description 1"
                                    value={formData.missionDescription1}
                                    onChange={(e) => handleChange(e, 'missionDescription1')}
                                />
                                <textarea
                                    className="block w-full p-2 bg-gray-100 border border-[#8681c6] rounded outline-none h-[6rem] resize-none"
                                    placeholder="Mission Description 2"
                                    value={formData.missionDescription2}
                                    onChange={(e) => handleChange(e, 'missionDescription2')}
                                />
                            </div>
                        </div>
                    )}
                    {currentStep === 2 && (
                        <div className="space-y-4">
                            {[1, 2, 3].map((num) => (
                                <div key={num} className="flex flex-col gap-2 bg-white rounded-lg shadow">
                                    <div
                                        onClick={() => toggleStory(num)}
                                        className={`flex text-white items-center transition-all duration-300 hover:bg-[#3D4056] justify-between p-4 py-3 rounded border-b cursor-pointer ${expandedStory === num ? 'bg-[#2F3349]' : 'bg-[#655CCE] text-white'}`}
                                    >
                                        <span className="font-semibold">{`Story ${num}`}</span>
                                        {expandedStory === num ? <FaChevronUp /> : <FaChevronDown />}
                                    </div>
                                    {expandedStory === num && (
                                        <div className="p-4 space-y-2">
                                            <input
                                                type="text"
                                                className="block w-full p-2 bg-gray-100 border border-[#8681c6] rounded outline-none"
                                                placeholder={`Year ${num}`}
                                                value={formData[`story${num}`].year}
                                                onChange={(e) => handleChange(e, `story${num}`, 'year')}
                                            />
                                            <textarea
                                                className="block w-full p-2 bg-gray-100 border border-[#8681c6] rounded outline-none h-[6rem] resize-none"
                                                placeholder={`Story ${num}`}
                                                value={formData[`story${num}`].description}
                                                onChange={(e) => handleChange(e, `story${num}`, 'description')}
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                    {currentStep === 3 && (
                        <div className="space-y-2">
                            {[1, 2, 3].map((num) => (
                                <div key={num} className="space-y-2 bg-white rounded-lg shadow ">
                                    <div
                                        onClick={() => toggleTeam(num)}
                                        className={`flex items-center justify-between p-4 py-3 rounded border-b cursor-pointer ${expandedTeam === num ? 'bg-[#2F3349] text-white' : 'bg-[#655CCE] text-white'}`}
                                    >
                                        <span className="font-semibold">{`Team Member ${num}`}</span>
                                        {expandedTeam === num ? <FaChevronUp /> : <FaChevronDown />}
                                    </div>
                                    {expandedTeam === num && (
                                        <div className="px-4 pb-4 space-y-2 ">
                                            <div className="flex bg-[#655CCE] shadow-[0px_0px_25px_-10px_#000_inset] p-4 rounded flex-col items-center justify-center">
                                                {teamImagePreviews[`team${num}`] ? (
                                                    <div onClick={() => triggerFileInput(`teamImageInput${num}`)} className="relative cursor-pointer">
                                                        <img
                                                            src={teamImagePreviews[`team${num}`]}
                                                            alt={`Team ${num} Preview`}
                                                            className="size-[7rem] sm:size-[8rem] md:size-[9rem] lg:size-[10rem] border rounded shadow"
                                                        />
                                                        <div className="absolute flex items-center justify-center p-[0.6rem] text-white bg-black rounded-full bg-opacity-80 right-[-10px] top-[-10px]">
                                                            <span className="text-lg"><FaCamera /></span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={() => triggerFileInput(`teamImageInput${num}`)}
                                                        className="flex items-center justify-center size-[7rem] sm:size-[8rem] md:size-[9rem] lg:size-[10rem]  p-4 text-white bg-[#2F3349] border rounded shadow cursor-pointer"
                                                    >
                                                        <span className="mr-2 text-[1.3rem]"><FaCamera /></span>
                                                        <span className=''>Upload</span>
                                                    </button>
                                                )}
                                                <input
                                                    id={`teamImageInput${num}`}
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={(e) => handleChange(e, `team${num}`, 'image')}
                                                />
                                            </div>
                                            <input
                                                type="text"
                                                className="block w-full p-2 bg-gray-100 border border-[#8681c6] rounded outline-none"

                                                placeholder={`Team Name ${num}`}
                                                value={formData[`team${num}`].name}
                                                onChange={(e) => handleChange(e, `team${num}`, 'name')}
                                            />
                                            <input
                                                type="text"
                                                className="block w-full p-2 bg-gray-100 border border-[#8681c6] rounded outline-none"

                                                placeholder={`Team Role ${num}`}
                                                value={formData[`team${num}`].role}
                                                onChange={(e) => handleChange(e, `team${num}`, 'role')}
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-6">
                        <button onClick={handleBack} disabled={currentStep === 1} className="flex items-center justify-center gap-3 px-6 py-2 text-white bg-gray-500 rounded shadow">
                            <FaArrowLeft /> Back
                        </button>
                        {currentStep === 3 ? (
                            <button type="submit" className="px-4 py-2 text-white bg-[#655CCE] rounded shadow">
                                Submit
                            </button>
                        ) : (
                            <button onClick={handleNext} disabled={currentStep === 3} className="flex items-center justify-center gap-3 px-6 py-2 text-white bg-[#655CCE] rounded shadow">
                                Next <FaArrowRight />
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </HomeLayout>
    );
};

export default AboutContent;
