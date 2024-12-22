// src/components/RevenueReport.js
import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';

const RevenueReport = () => {
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [revenueByTrain, setRevenueByTrain] = useState([]);

    useEffect(() => {
        const fetchRevenueData = async () => {
            try {
                const totalResponse = await axios.get('/revenue');
                setTotalRevenue(totalResponse.data);

                const byTrainResponse = await axios.get('/revenue/{trainId}');
                setRevenueByTrain(byTrainResponse.data);
            } catch (error) {
                console.error('Error fetching revenue report data', error);
            }
        };

        fetchRevenueData();
    }, []);

    return (
        <div className="revenue-report">
            <h2>Revenue Report</h2>
            <p>Total Revenue: {totalRevenue}</p>
            <h3>Revenue by Train</h3>
            <ul>
                {revenueByTrain.map((train) => (
                    <li key={train.trainId}>
                        Train ID: {train.trainId} - Revenue: {train.revenue}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RevenueReport;
