import React, { useState } from 'react';
import '../assets/styles/Login.css';
import 'font-awesome/css/font-awesome.min.css';
import { messages } from './messages'; // Import the message properties

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [language, setLanguage] = useState('English'); // Default language is English

    const currentMessages = messages[language]; // Get messages for the selected language

    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:8083/api/auth/google'; // Redirect to backend for Google OAuth
    };

    const handleFacebookLogin = () => {
        window.location.href = 'http://localhost:8083/api/auth/facebook'; // Redirect to backend for Facebook OAuth
    };

    const handleTwitterLogin = () => {
        window.location.href = 'http://localhost:8083/api/auth/twitter'; // Redirect to backend for Twitter OAuth
    };

    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError(currentMessages.errorEmail);
            return false;
        }
        if (formData.password.length < 8) {
            setError(currentMessages.errorPassword);
            return false;
        }
        return true;
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8083/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(formData),
            });

            const responseData = await response.json();

            if (response.ok) {
                const userData = responseData.user;
                const userRole = userData?.role || 'ROLE_USER';

                localStorage.setItem('user', JSON.stringify(userData));

                switch (userRole) {
                    case 'ROLE_ADMIN':
                        window.location.href = '/admin-dashboard';
                        break;
                    case 'ROLE_MANAGER':
                        window.location.href = '/manager-dashboard';
                        break;
                    case 'ROLE_STAFF':
                        window.location.href = '/staff-dashboard';
                        break;
                    case 'ROLE_ACCOUNTANT':
                        window.location.href = '/accountant-dashboard';
                        break;
                    default:
                        window.location.href = '/user-dashboard';
                }
            } else {
                const errorMessage = responseData.error || responseData.message || currentMessages.errorNetwork;
                setError(errorMessage);
            }
        } catch (err) {
            setError(currentMessages.errorNetwork);
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <div className="railway-lights"></div>
            <div className="train-track"></div>
            <div className="moving-train">
                🚂
                <span className="smoke" style={{ top: '-20px', left: '-10px' }}>💨</span>
                <span className="smoke" style={{ top: '-30px', left: '-20px' }}>💨</span>
            </div>

            <div className="container">
                <div className="login-container">
                    <div className="login-image">
                        <h1 className="mb-4">{currentMessages.welcomeTitle}</h1>
                        <p className="text-center">{currentMessages.journeyStarts}</p>
                    </div>

                    <div className="login-form">
                        <h2 className="form-title">{currentMessages.loginTitle}</h2>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder={currentMessages.emailPlaceholder}
                                    required
                                />
                            </div>

                            <div className="form-group position-relative">
                                <label htmlFor="password">Password</label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-control"
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder={currentMessages.passwordPlaceholder}
                                    required
                                />
                                <i
                                    className={`password-toggle fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                                    onClick={togglePasswordVisibility}
                                    title="Toggle password visibility"
                                ></i>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                                disabled={isLoading}
                            >
                                {isLoading ? currentMessages.loggingIn : currentMessages.loginButton}
                            </button>
                        </form>

                        <div className="social-login-section">
                            <p className="social-login-text">{currentMessages.socialLoginText}</p>
                            <div className="social-login">
                                <button onClick={handleGoogleLogin} className="social-btn google">
                                    {currentMessages.googleLogin}
                                </button>
                                <button onClick={handleFacebookLogin} className="social-btn facebook">
                                    {currentMessages.facebookLogin}
                                </button>
                                <button onClick={handleTwitterLogin} className="social-btn twitter">
                                    {currentMessages.twitterLogin}
                                </button>
                            </div>
                        </div>
                        <div className="links">
                            <a href="/forgot-password">{currentMessages.forgotPassword}</a> | <a href="/register">{currentMessages.signUp}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
