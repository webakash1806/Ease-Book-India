import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGuiderList } from '../Redux/Slices/ServiceSlice';
import { FaArrowLeft, FaRegUserCircle } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FaLocationDot } from 'react-icons/fa6';
import { GiSunPriest } from 'react-icons/gi';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import SocialCard from '../Components/SocialCard';

const GuiderList = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const serviceList = useSelector((state) => state?.service?.guiderListData) || [];
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12; // Adjust as needed

    const { state } = location;

    const filterWithPlace = serviceList.filter((data) =>
        data?.servicesData?.placesList?.some(place => place.name === state.place.name)
    );

    const availableList = filterWithPlace.filter((data) => data?.servicesData?.availability === "AVAILABLE");

    console.log(availableList)

    // Get current items for pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = availableList.slice(indexOfFirstItem, indexOfLastItem);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Pagination controls with ellipsis
    const renderPageNumbers = () => {
        const pageNumbers = [];
        const totalPages = Math.ceil(availableList.length / itemsPerPage);
        const pageNeighbours = 2; // Number of pages to show around the current page

        const startPage = Math.max(2, currentPage - pageNeighbours);
        const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

        // Add the first page
        pageNumbers.push(
            <button
                key={1}
                onClick={() => handlePageChange(1)}
                className={`px-3 py-1 mx-1 border rounded ${currentPage === 1 ? 'bg-green-500 text-white' : 'bg-white'}`}
            >
                1
            </button>
        );

        // Add ellipsis if needed
        if (startPage > 2) {
            pageNumbers.push(<span key="start-ellipsis" className="px-3 py-1 mx-1">...</span>);
        }

        // Add page numbers between startPage and endPage
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-3 py-1 mx-1 border rounded ${currentPage === i ? 'bg-green-500 text-white' : 'bg-white'}`}
                >
                    {i}
                </button>
            );
        }

        // Add ellipsis if needed
        if (endPage < totalPages - 1) {
            pageNumbers.push(<span key="end-ellipsis" className="px-3 py-1 mx-1">...</span>);
        }

        // Add the last page
        pageNumbers.push(
            <button
                key={totalPages}
                onClick={() => handlePageChange(totalPages)}
                className={`px-3 py-1 mx-1 border rounded ${currentPage === totalPages ? 'bg-green-500 text-white' : 'bg-white'}`}
            >
                {totalPages}
            </button>
        );

        return (
            <div className="flex items-center space-x-2">
                {currentPage > 1 && (
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="px-3 py-1 bg-white border rounded hover:bg-green-500 hover:text-white"
                    >
                        <FaAngleLeft />
                    </button>
                )}
                {pageNumbers}
                {currentPage < totalPages && (
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="px-3 py-1 bg-white border rounded hover:bg-green-500 hover:text-white"
                    >
                        <FaAngleRight />
                    </button>
                )}
            </div>
        );
    };

    const loadData = async () => {
        await dispatch(getGuiderList());
        setLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Guiders place', href: '/place-list' },
        { label: 'Book Guider' },
    ];


    return (
        <>
            <div className='relative'>
                <SocialCard item={breadcrumbItems} icon={"guider"} title={"Book Guider"} des={"Secure a knowledgeable guide for your next adventure. Explore new destinations with an expert who can provide valuable insights and enhance your experience with local knowledge and personalized tours."} />

                <div onClick={() => navigate(-1)} className='absolute top-1 left-1 p-2 bg-[#4960f8] shadow-md rounded w-fit'>
                    <FaArrowLeft onClick={() => navigate(-1)} className='text-white text-[1.1rem]' />
                </div>
            </div>
            <div className='from-[#e7eafd] bg-gradient-to-b via-[#f7f7fb] to-white p-4 py-8 flex flex-wrap items-center justify-center'>
                {loading ? (
                    <div className='flex flex-wrap items-center justify-center gap-4'>
                        {Array.from({ length: 8 }).map((_, index) => (
                            <div key={index} className='bg-white text-black max-w-[20rem] w-[90vw] rounded-xl shadow-[0px_0px_5px_#808080] overflow-hidden'>
                                <Skeleton height={200} />
                                <div className='p-3'>
                                    <Skeleton height={25} width={160} />
                                    <div className='flex items-center justify-between my-2'>
                                        <Skeleton height={24} width={100} />
                                        <Skeleton height={24} width={60} />
                                    </div>
                                    <div className='flex items-center justify-between my-2'>
                                        <Skeleton height={24} width={100} />
                                        <Skeleton height={24} width={60} />
                                    </div>
                                    <div className='flex items-center justify-between my-2'>
                                        <Skeleton height={24} width={100} />
                                        <Skeleton height={24} width={60} />
                                    </div>
                                    <div className='flex items-center justify-between my-2'>
                                        <Skeleton height={24} width={100} />
                                        <Skeleton height={24} width={100} />
                                    </div>
                                    <div className='flex items-center justify-between pt-3 mt-3 border-t'>
                                        <Skeleton height={28} width={80} />
                                        <Skeleton height={40} width={120} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='flex flex-col w-full gap-20 p-4'>
                        <div className='flex flex-wrap items-center justify-center w-full gap-8'>
                            {currentItems.map((data, key) => (
                                <div key={key + 1} className='bg-white border-l-4 border-blue-500 text-black max-w-[20rem] sm:max-w-[22rem] w-[90vw] hover:from-[#d0f7e6] transition-all duration-300 hover:bg-gradient-to-b hover:to-[#f7fffbf0] rounded-xl shadow-[0px_4px_12px_-6px_#808080] overflow-hidden'>
                                    <div className='p-3'>
                                        <h2 className='text-[1.3rem] text-orange-500 mb-4 text-center font-semibold'>{state.place.name}</h2>
                                        <div className='flex items-center justify-between my-2'>
                                            <h1 className='flex items-center justify-center gap-2'><FaRegUserCircle />{data?.fullName}</h1>
                                            <h2>{data?.age} years</h2>
                                        </div>
                                        <div className='flex items-center justify-between my-2'>
                                            <h1 className='flex items-center justify-center gap-2'><GiSunPriest />Experience</h1>
                                            <h2>{data?.experience} years</h2>
                                        </div>
                                        <div className='flex items-center justify-between my-2'>
                                            <h1 className='flex items-center justify-center gap-2'><FaLocationDot />{state.place.name}</h1>
                                        </div>
                                        <div className='flex items-center justify-between pt-3 mt-3 border-t'>
                                            <h3>
                                                <span className='text-[1.02rem] font-semibold text-[#19B56F]'>Rs.{data?.servicesData?.fare + Number(state.place.price)}</span>
                                            </h3>
                                            <button onClick={() => navigate(`/guider-book/${data?._id}`, { state: { state } })} className='border p-2 px-4 rounded-full border-[#19B56F] hover:bg-[#19B56F] transition-all duration-500 hover:text-white text-[#19B56F] font-semibold'>BOOK NOW</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='flex justify-center mt-4'>
                            {renderPageNumbers()}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default GuiderList;
