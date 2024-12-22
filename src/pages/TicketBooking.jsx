import React, { useState } from 'react';
import axios from 'axios';

const TicketBooking = () => {
    const [trainId, setTrainId] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [ticketBooked, setTicketBooked] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Send booking request to backend
        axios.post('http://localhost:8083/api/auth/book-ticket', { trainId, userName, userEmail })
            .then((response) => {
                setTicketBooked(true);
                alert('Ticket booked successfully');
            })
            .catch((error) => {
                console.error('Error booking ticket', error);
                alert('Error booking ticket');
            });
    };

    return (
        <div className="ticket-booking-form">
            <h3>Book Ticket</h3>
            <form onSubmit={handleSubmit}>
                <label>Train:</label>
                <select value={trainId} onChange={(e) => setTrainId(e.target.value)}>
                    <option value="">Select Train</option>
                    {/* Dynamically fetch and display train options here */}
                </select>

                <label>Your Name:</label>
                <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />

                <label>Email:</label>
                <input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />

                <button type="submit">Book Ticket</button>
            </form>

            {ticketBooked && (
                <div>
                    <h4>Your ticket has been booked!</h4>
                    <p>You can go to "My Ticket" to view and download it.</p>
                </div>
            )}
        </div>
    );
};

export default TicketBooking;
