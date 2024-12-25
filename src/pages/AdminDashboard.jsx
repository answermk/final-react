import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserManagement from "./UserManagement";
import TrainManagement from "./TrainManagement";
import { messages } from "./messages"; // Import the message properties
import "../assets/styles/AdminDashboard.css"; // Create a CSS file for styling

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("users");
    const [language, setLanguage] = useState("English");

    const currentMessages = messages[language]; // Get messages for the selected language

    return (
        <div className="admin-dashboard-container">
            <h1>{currentMessages.dashboardTitle}</h1>

            {/* Language Selector */}
            <div>
                <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option value="English">English</option>
                    <option value="Deutsch">Deutsch</option>
                    <option value="Français">Français</option>
                </select>
            </div>

            <div className="tabs">
                <button
                    className={activeTab === "users" ? "active" : ""}
                    onClick={() => setActiveTab("users")}
                >
                    {currentMessages.userManagementTab}
                </button>
                <button
                    className={activeTab === "trains" ? "active" : ""}
                    onClick={() => setActiveTab("trains")}
                >
                    {currentMessages.trainManagementTab}
                </button>
            </div>

            {/* Tab content */}
            {activeTab === "users" && <UserManagement />}
            {activeTab === "trains" && <TrainManagement />}

            <p>{currentMessages.selectTab}</p>
        </div>
    );
};

export default AdminDashboard;
