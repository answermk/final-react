// src/components/TransactionHistory.js
import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('/transactions/{ticketId}');
                setTransactions(response.data);
            } catch (error) {
                console.error('Error fetching transaction data', error);
            }
        };
        fetchTransactions();
    }, []);

    return (
        <div className="transaction-history">
            <h2>Transaction History</h2>
            <table>
                <thead>
                <tr>
                    <th>Transaction ID</th>
                    <th>Ticket ID</th>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                        <td>{transaction.id}</td>
                        <td>{transaction.ticketId}</td>
                        <td>{transaction.amount}</td>
                        <td>{transaction.type}</td>
                        <td>{new Date(transaction.transactionDate).toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionHistory;
