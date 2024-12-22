import React from 'react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
    return (
        <div className="dashboard-container">
            <h2>User Dashboard</h2>

            <div className="tabs">
                <ul>
                    <li>
                        <Link to="/ticket-booking">Book Ticket</Link>
                    </li>
                    <li>
                        <Link to="/ticket-details">My Ticket</Link>
                    </li>
                    <li>
                        <Link to="/train-schedule">Train Schedule</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default UserDashboard;
