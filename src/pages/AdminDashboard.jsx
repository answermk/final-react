import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserManagement from "./UserManagement";
import TrainManagement from "./TrainManagement";
import "../assets/styles/AdminDashboard.css"; // Create a CSS file for styling

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("users");

    return (
        <div className="admin-dashboard-container">
            <h1>Admin Dashboard</h1>
            <div className="tabs">
                <button
                    className={activeTab === "users" ? "active" : ""}
                    onClick={() => setActiveTab("users")}
                >
                    User Management
                </button>
                <button
                    className={activeTab === "trains" ? "active" : ""}
                    onClick={() => setActiveTab("trains")}
                >
                    Train Management
                </button>
            </div>

            {activeTab === "users" && <UserManagement />}
            {activeTab === "trains" && <TrainManagement />}
        </div>
    );
};

export default AdminDashboard;
