import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import AccountantDashboard from './pages/AccountantDashboard';
import TrainSchedule from './pages/TrainSchedule';
import TicketDetails from './pages/TicketDetails';
import TicketBooking from './pages/TicketBooking';


function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/train-schedule" element={<TrainSchedule />} />
            <Route path="/ticket-details" element={<TicketDetails />} />
            <Route path="/ticket-booking" element={<TicketBooking />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/accountant-dashboard" element={<AccountantDashboard />} />
        </Routes>
      </Router>
  );
}

export default App;
