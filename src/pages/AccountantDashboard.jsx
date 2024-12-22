// src/components/AccountantDashboard.js
import React, { useState } from 'react';
import ManageTicketPrice from './ManageTicketPrice';
import TicketSales from './TicketSales';
import RevenueReport from './RevenueReport';
import TransactionHistory from './TransactionHistory';

const AccountantDashboard = () => {
    const [activeTab, setActiveTab] = useState('manage-ticket-price');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="dashboard">
            <h1>Accountant Dashboard</h1>
            <div className="tabs">
                <button onClick={() => handleTabChange('manage-ticket-price')}>Manage Ticket Price</button>
                <button onClick={() => handleTabChange('ticket-sales')}>View Ticket Sales</button>
                <button onClick={() => handleTabChange('revenue-report')}>Generate Revenue Report</button>
                <button onClick={() => handleTabChange('transaction-history')}>Transaction History</button>
            </div>

            <div className="tab-content">
                {activeTab === 'manage-ticket-price' && <ManageTicketPrice />}
                {activeTab === 'ticket-sales' && <TicketSales />}
                {activeTab === 'revenue-report' && <RevenueReport />}
                {activeTab === 'transaction-history' && <TransactionHistory />}
            </div>
        </div>
    );
};

export default AccountantDashboard;
