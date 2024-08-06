import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderRevenue } from '../../Redux/Slices/StatsSlice';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BookingTypes = ['Hotel', 'Boat', 'Car', 'Priest', 'Guider'];
const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

const BookingsRevenueChart = () => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    const hotelRevenue = useSelector((state) => state?.stats?.hotelPayments);
    const boatRevenue = useSelector((state) => state?.stats?.boatPayments);
    const carRevenue = useSelector((state) => state?.stats?.carPayments);
    const priestRevenue = useSelector((state) => state?.stats?.priestPayments);
    const guiderRevenue = useSelector((state) => state?.stats?.guiderPayments);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getOrderRevenue());
        };

        fetchData();
    }, [dispatch]);

    useEffect(() => {
        if (hotelRevenue !== undefined && boatRevenue !== undefined && carRevenue !== undefined && priestRevenue !== undefined && guiderRevenue !== undefined) {
            const data = [
                hotelRevenue || 0,
                boatRevenue || 0,
                carRevenue || 0,
                priestRevenue || 0,
                guiderRevenue || 0
            ];

            setChartData({
                labels: BookingTypes,
                datasets: [
                    {
                        label: 'Booking Revenue (in Rs)',
                        data,
                        backgroundColor: colors,
                        borderRadius: 3,
                        hoverBackgroundColor: '#FF4C51',
                        barThickness: 18,
                        minBarLength: 2
                    }
                ]
            });
            setLoading(false);
        }
    }, [hotelRevenue, boatRevenue, carRevenue, priestRevenue, guiderRevenue]);

    if (loading) return <p>Loading...</p>;

    return (
        <div className='h-[21rem] w-full flex flex-col items-center gap-4 mb-4 lg:mb-3 bg-white pb-[3rem] p-3 rounded-md shadow-[0px_0px_18px_-3px_#808080]'>
            <h2 className='ml-8 font-semibold text-[1.1rem] text-[#655CCE]'>Bookings Revenue</h2>
            {chartData && (
                <Bar
                    data={chartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        indexAxis: 'y', // Set to 'y' for horizontal bar chart
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
                                    callback: function (value) {
                                        if (value >= 1000000) {
                                            return Math.floor(value / 1000000) + 'M';
                                        } else if (value >= 1000) {
                                            return Math.floor(value / 1000) + 'k';
                                        } else {
                                            return value;
                                        }
                                    }
                                },
                            },
                            y: {
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
                        },
                    }}
                />
            )}
        </div>
    );
};

export default BookingsRevenueChart;
