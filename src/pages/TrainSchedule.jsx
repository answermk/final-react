import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TrainSchedule = () => {
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        // Fetch the train schedule from the backend
        axios.get('http://localhost:8083/api/auth/train-schedule', { withCredentials: true })
            .then((response) => {
                setSchedule(response.data);
            })
            .catch((error) => {
                console.error('Error fetching train schedule', error);
            });
    }, []);

    return (
        <div className="train-schedule">
            <h3>Train Schedule</h3>
            <table>
                <thead>
                <tr>
                    <th>Train Name</th>
                    <th>Departure</th>
                    <th>Arrival</th>
                    <th>Seats Available</th>
                </tr>
                </thead>
                <tbody>
                {schedule.map((train) => (
                    <tr key={train.id}>
                        <td>{train.name}</td>
                        <td>{train.departureTime}</td>
                        <td>{train.arrivalTime}</td>
                        <td>{train.seatsAvailable}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TrainSchedule;
