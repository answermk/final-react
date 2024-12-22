// src/components/ManageTicketPrice.js
import React, { useState } from 'react';
import axios from '../utils/axios';

const ManageTicketPrice = () => {
    const [trainId, setTrainId] = useState('');
    const [trainClass, setTrainClass] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/ticket-price', {
                trainId,
                trainClass,
                price
            });
            alert('Ticket price updated successfully');
        } catch (error) {
            console.error('Error updating ticket price', error);
            alert('Failed to update ticket price');
        }
    };

    return (
        <div className="manage-ticket-price">
            <h2>Manage Ticket Price</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Train ID:</label>
                    <input
                        type="number"
                        value={trainId}
                        onChange={(e) => setTrainId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Train Class:</label>
                    <input
                        type="text"
                        value={trainClass}
                        onChange={(e) => setTrainClass(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Ticket Price:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Update Price</button>
            </form>
        </div>
    );
};

export default ManageTicketPrice;
