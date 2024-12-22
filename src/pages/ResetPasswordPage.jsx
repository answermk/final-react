import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/ResetPassword.css"; // Create a CSS file for styling

const ResetPasswordPage = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const storedToken = JSON.parse(localStorage.getItem("resetToken"));

        if (!storedToken) {
            setError("Invalid or expired reset link.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        // Update password for user in localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const updatedUsers = users.map((user) => {
            if (user.email === storedToken.email) {
                return { ...user, password };
            }
            return user;
        });

        localStorage.setItem("users", JSON.stringify(updatedUsers));
        localStorage.removeItem("resetToken");

        setMessage("Password reset successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 3000);
    };

    return (
        <div className="reset-password-container">
            <div className="reset-password-box">
                <h2 className="reset-title">Reset Your Password</h2>
                <p className="reset-subtitle">
                    Enter a new password for your account.
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="password" className="input-label">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-field"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="confirmPassword" className="input-label">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="input-field"
                            required
                        />
                    </div>
                    <button type="submit" className="reset-btn">
                        Reset Password
                    </button>
                </form>

                {error && <p className="error-message">{error}</p>}
                {message && <p className="success-message">{message}</p>}
            </div>
        </div>
    );
};

export default ResetPasswordPage;
