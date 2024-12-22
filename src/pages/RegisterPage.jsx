import React, {useEffect, useState} from "react";
import "../assets/styles/Register.css"; // Create a separate CSS file and copy the styles from the provided HTML

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        phonenumber: "",
        email: "",
        role: "ROLE_USER",
        dob: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        // First Name Validation
        if (!formData.firstname.trim()) {
            newErrors.firstname = "First Name is required";
        }

        // Last Name Validation
        if (!formData.lastname.trim()) {
            newErrors.lastname = "Last Name is required";
        }

        // Phone Number Validation
        const phoneRegex = /^[0-9]{10}$/;
        if (!formData.phonenumber.match(phoneRegex)) {
            newErrors.phonenumber = "Please enter a valid 10-digit phone number";
        }

        // Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.match(emailRegex)) {
            newErrors.email = "Please enter a valid email address";
        }

        // Password Validation
        if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        // Date of Birth Validation
        const currentDate = new Date();
        const dobDate = new Date(formData.dob);
        const age = currentDate.getFullYear() - dobDate.getFullYear();
        if (age < 18) {
            newErrors.dob = "You must be at least 18 years old";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setIsSubmitting(true);

        if (validateForm()) {
            try {
                const response = await fetch('http://localhost:8083/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        firstname: formData.firstname,
                        lastname: formData.lastname,
                        phonenumber: formData.phonenumber,
                        email: formData.email,
                        role: formData.role,
                        dob: formData.dob,
                        password: formData.password
                    })
                });

                // Log the full response for debugging
                console.log('Response status:', response.status);
                const responseData = await response.json();
                console.log('Response data:', responseData);

                if (response.ok) {
                    alert('Registration successful!');
                    window.location.href = '/login';
                } else {
                    setErrors({
                        submit: responseData.error || 'Registration failed'
                    });
                }
            } catch (error) {
                // Log the full error details
                console.error('Full registration error:', error);
                setErrors({
                    submit: `Network error: ${error.message}. Please try again.`
                });
            }
            finally {
                setIsSubmitting(false);
            }
        } else {
            setIsSubmitting(false);
        }
    };



    return (
        <div className="registration-container">
            <div className="registration-image">
                <h1>SmartRail</h1>
                <p>
                    Embark on a journey of seamless travel and innovative transportation.
                    Join our community and experience the future of rail technology.
                </p>
            </div>

            <div className="registration-form">
                <div className="form-title">
                    <h2>Create Your Account</h2>
                </div>

                {errors.submit && <div className="text-danger">{errors.submit}</div>}


                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label>
                                First Name<span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                Last Name<span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>
                                Phone Number<span className="text-danger">*</span>
                            </label>
                            <input
                                type="tel"
                                name="phonenumber"
                                value={formData.phonenumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                Email<span className="text-danger">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>
                                Select Role<span className="text-danger">*</span>
                            </label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                required
                            >
                                <option value="ROLE_USER">User</option>
                                <option value="ROLE_ADMIN">Admin</option>
                                <option value="ROLE_ACCOUNTANT">Accountant</option>
                                <option value="ROLE_MANAGER">Manager</option>
                                <option value="ROLE_STAFF">Staff</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>
                                Birth Date<span className="text-danger">*</span>
                            </label>
                            <input
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>
                                Password<span className="text-danger">*</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                Confirm Password<span className="text-danger">*</span>
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="submit-btn">
                        Create Account
                    </button>

                    <div className="login-link">
                        <span>Already have an account? </span>
                        <a href="/login">Log In</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
