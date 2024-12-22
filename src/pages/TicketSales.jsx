// src/components/TicketSales.js
import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';

const TicketSales = () => {
    const [salesData, setSalesData] = useState([]);

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const response = await axios.get('/revenue');
                setSalesData(response.data);
            } catch (error) {
                console.error('Error fetching ticket sales data', error);
            }
        };
        fetchSalesData();
    }, []);

    return (
        <div className="ticket-sales">
            <h2>Ticket Sales</h2>
            <table>
                <thead>
                <tr>
                    <th>Train ID</th>
                    <th>Train Class</th>
                    <th>Tickets Sold</th>
                    <th>Revenue</th>
                </tr>
                </thead>
                <tbody>
                {salesData.map((sale) => (
                    <tr key={sale.trainId}>
                        <td>{sale.trainId}</td>
                        <td>{sale.trainClass}</td>
                        <td>{sale.ticketsSold}</td>
                        <td>{sale.revenue}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TicketSales;
