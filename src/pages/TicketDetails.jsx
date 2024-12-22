import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TicketDetails = () => {
    const [ticket, setTicket] = useState(null);

    useEffect(() => {
        // Fetch the booked ticket details for the user
        axios.get('http://localhost:8083/api/auth/my-ticket', { withCredentials: true })
            .then((response) => {
                setTicket(response.data);
            })
            .catch((error) => {
                console.error('Error fetching ticket details', error);
            });
    }, []);

    const downloadTicket = () => {
        // Download logic here (e.g., generate PDF, or show as printable)
        window.print(); // Simple way to "download" as a printable format
    };

    if (!ticket) {
        return <div>No ticket found.</div>;
    }

    return (
        <div className="ticket-details">
            <h3>Your Ticket Details</h3>
            <p>Train: {ticket.trainName}</p>
            <p>Departure: {ticket.departureTime}</p>
            <p>Arrival: {ticket.arrivalTime}</p>
            <p>Seat: {ticket.seat}</p>
            <p>Email: {ticket.email}</p>

            <button onClick={downloadTicket}>Download Ticket</button>
        </div>
    );
};

export default TicketDetails;
