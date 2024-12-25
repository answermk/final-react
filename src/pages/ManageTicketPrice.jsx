// src/components/ManageTicketPrice.js
import React, { useState } from 'react';
import axios from '../utils/axios';
import { messages } from './messages';  // Import your messages
import { useLocale } from '../locales'; // Import your custom i18n hook
//import { Button } from 'react-bootstrap';  // Assume you have a context for locale

const ManageTicketPrice = () => {
    const [trainId, setTrainId] = useState('');
    const [trainClass, setTrainClass] = useState('');
    const [price, setPrice] = useState('');

    // Assume useLocale returns the current language
    const { locale } = useLocale();

    // Get messages for the current locale
    const t = messages[locale] || messages.en;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/ticket-price', {
                trainId,
                trainClass,
                price
            });
            alert(t.successMessage);  // Use localized success message
        } catch (error) {
            console.error('Error updating ticket price', error);
            alert(t.errorMessage);  // Use localized error message
        }
    };

    return (
        <div className="manage-ticket-price">
            <h2>{t.manageTicketPrice}</h2>  {/* Use localized title */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>{t.trainId}</label>  {/* Use localized label */}
                    <input
                        type="number"
                        value={trainId}
                        onChange={(e) => setTrainId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>{t.trainClass}</label>  {/* Use localized label */}
                    <input
                        type="text"
                        value={trainClass}
                        onChange={(e) => setTrainClass(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>{t.ticketPrice}</label>  {/* Use localized label */}
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">{t.updatePrice}</button>  {/* Use localized button text */}
            </form>
        </div>
    );
};

export default ManageTicketPrice;
