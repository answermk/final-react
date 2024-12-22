import React, { useState, useEffect } from "react";

const TrainManagement = () => {
    const [trains, setTrains] = useState([]);
    const [newTrain, setNewTrain] = useState({ trainName: "", departure: "", destination: "" });

    useEffect(() => {
        // Fetch existing trains from the database or local storage
        const storedTrains = JSON.parse(localStorage.getItem("trains")) || [];
        setTrains(storedTrains);
    }, []);

    const handleAddTrain = () => {
        const updatedTrains = [...trains, { ...newTrain }];
        localStorage.setItem("trains", JSON.stringify(updatedTrains));
        setTrains(updatedTrains);
        setNewTrain({ trainName: "", departure: "", destination: "" });
    };

    const handleDeleteTrain = (trainName) => {
        const updatedTrains = trains.filter((train) => train.trainName !== trainName);
        localStorage.setItem("trains", JSON.stringify(updatedTrains));
        setTrains(updatedTrains);
    };

    return (
        <div>
            <h2>Train Management</h2>
            <div>
                <h3>Add New Train</h3>
                <input
                    type="text"
                    placeholder="Train Name"
                    value={newTrain.trainName}
                    onChange={(e) => setNewTrain({ ...newTrain, trainName: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Departure"
                    value={newTrain.departure}
                    onChange={(e) => setNewTrain({ ...newTrain, departure: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Destination"
                    value={newTrain.destination}
                    onChange={(e) => setNewTrain({ ...newTrain, destination: e.target.value })}
                />
                <button onClick={handleAddTrain}>Add Train</button>
            </div>

            <h3>Existing Trains</h3>
            <table>
                <thead>
                <tr>
                    <th>Train Name</th>
                    <th>Departure</th>
                    <th>Destination</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {trains.map((train) => (
                    <tr key={train.trainName}>
                        <td>{train.trainName}</td>
                        <td>{train.departure}</td>
                        <td>{train.destination}</td>
                        <td>
                            <button onClick={() => handleDeleteTrain(train.trainName)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TrainManagement;
