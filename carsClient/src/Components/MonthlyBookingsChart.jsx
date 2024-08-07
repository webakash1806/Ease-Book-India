import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton'; // Import Skeleton component
import 'react-loading-skeleton/dist/skeleton.css'; // Import skeleton styles
import { getTotalMonthlyBooking } from '../Redux/Slices/AuthSlice';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const MonthlyBookingsChart = () => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const { monthlyBooking, totalBooking, data } = useSelector((state) => state?.auth);

    console.log(data?._id)

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getTotalMonthlyBooking(data?._id));
            } catch (error) {
                console.error('Error fetching boat bookings data:', error);
                setError('Error fetching boat bookings data');
            }
        };

        fetchData();
    }, [dispatch, data]);

    useEffect(() => {
        if (Array.isArray(monthlyBooking)) {
            // Initialize data array with 0s
            const data = new Array(12).fill(0);

            // Populate data array with bookings
            monthlyBooking.forEach(({ month, count }) => {
                const monthIndex = monthNames.indexOf(month.substring(0, 3)); // Assuming month is in abbreviated form
                if (monthIndex !== -1) {
                    data[monthIndex] = count;
                }
            });

            setChartData({
                labels: monthNames,
                datasets: [
                    {
                        label: 'Monthly Boat Bookings',
                        data,
                        backgroundColor: '#FF4C51',
                        borderRadius: 3,
                        hoverBackgroundColor: '#FF4C51',
                        barThickness: 18,
                        minBarLength: 1
                    }
                ]
            });
            setLoading(false);
        }
    }, [monthlyBooking]);

    if (loading) return (
        <div className='h-[22rem] pl-0 w-full flex flex-col items-center gap-4 mb-6 bg-white pb-[3rem] p-3 rounded-md shadow-[0px_0px_18px_-3px_#808080]'>
            <h2 className='ml-8 font-semibold text-[1.1rem] text-[#655CCE]'>Monthly Boat Bookings</h2>
            <Skeleton height={300} />
        </div>
    );

    if (error) return <p>{error}</p>;

    return (
        <div className='h-[20rem] pl-0 w-full flex flex-col items-center gap-1 mb-6 bg-white pb-[3rem] p-3 rounded-md shadow-[0px_0px_18px_-3px_#808080]'>
            <h2 className='ml-8 font-semibold text-[1.1rem] text-[#655CCE]'>Lifetime Booking - {totalBooking}</h2>
            {chartData && (
                <Bar
                    data={chartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        aspectRatio: 2 / 2,
                        plugins: {
                            legend: {
                                position: 'top',
                                labels: {
                                    font: {
                                        size: 14,
                                        family: "'Arial', sans-serif",
                                    },
                                    color: '#333',
                                },
                            },
                        },
                        scales: {
                            x: {
                                grid: {
                                    display: false,
                                },
                                ticks: {
                                    font: {
                                        size: 14,
                                        family: "'Arial', sans-serif",
                                    },
                                    color: '#333',
                                },
                            },
                            y: {
                                grid: {
                                    display: false,
                                },
                                ticks: {
                                    z: 1,
                                    stepSize: 1,
                                    mirror: true,
                                    minTicksLimit: 5,
                                    maxTicksLimit: 8,
                                    beginAtZero: true,
                                    font: {
                                        size: 14,
                                        family: "'Arial', sans-serif",
                                    },
                                    color: '#333',
                                    callback: function (value) {
                                        if (value >= 1000000) {
                                            return Math.floor(value / 1000000) + 'M';
                                        } else if (value >= 1000) {
                                            return Math.floor(value / 1000) + 'k';
                                        } else {
                                            return value;
                                        }
                                    },
                                    padding: 5,
                                },
                                position: 'left',
                            },
                        },
                    }}
                />
            )}
        </div>
    );
};

export default MonthlyBookingsChart;
