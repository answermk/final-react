import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring"; // For animations

const WelcomePage = () => {
    const [message, setMessage] = useState("");
    const [fullName, setFullName] = useState("");
    const [language, setLanguage] = useState("English");
    const [statusMessage, setStatusMessage] = useState(""); // State for feedback message
    const [statusColor, setStatusColor] = useState(""); // State for feedback color (green/red)

    // Animation for fade-in effect
    const fadeIn = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        config: { duration: 1000 },
    });
    const handleFullNameChange = (e) => {
        setFullName(e.target.value);
    };

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate fullName
        if (!fullName.trim()) {
            setStatusMessage("Please enter your full name");
            setStatusColor("red");
            return;
        }

        try {
            const response = await fetch('http://localhost:8083/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: message,
                    language: language,
                    fullName: fullName, // Add fullName to the request
                }),
            });

            if (response.ok) {
                setMessage('');
                setFullName(''); // Clear fullName after successful submission
                setStatusMessage("Message sent successfully!");
                setStatusColor("green");
            } else {
                setStatusMessage("Failed to send message. Please try again.");
                setStatusColor("red");
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setStatusMessage("Error sending message. Please try again.");
            setStatusColor("red");
        }
    };

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };


    return (
        <div
            className="landing"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column", // Align content vertically
                height: "100vh", // Full page height
                textAlign: "center",
                padding: "1rem", // Reduced padding
                backgroundColor: "#8cd6f1",
                color: "#333",
                fontFamily: "'Arial', sans-serif",
                position: "relative", // For positioning the language selector
            }}
        >
            {/* Language Selector at the top */}
            <div
                style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    backgroundColor: "#fff",
                    padding: "0.5rem 1rem",
                    borderRadius: "5px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    zIndex: 10,
                }}
            >
                <select value={language} onChange={handleLanguageChange} style={{ fontSize: "1rem", cursor: "pointer" }}>
                    <option value="English">English</option>
                    <option value="Deutsch">Deutsch</option>
                    <option value="Français">Français</option>
                </select>
            </div>

            <animated.h1 style={{ ...fadeIn, color: "#2c3e50", fontSize: "2.5rem", marginBottom: "0.8rem" }}>
                Embark on a smarter journey with SmartRail
            </animated.h1>

            <animated.p style={{ ...fadeIn, fontSize: "1rem", marginBottom: "1rem" }}>
                Your gateway to easy and fast train travel booking.
            </animated.p>

            {/* Vision and Mission in Columns */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    maxWidth: "1100px", // Slightly reduced max width
                    marginBottom: "1.5rem",
                    marginTop: "1.5rem", // Adjusted spacing
                }}
            >
                {/* Vision Column */}
                <div style={{ width: "48%", textAlign: "left" }}>
                    <animated.h2 style={{ ...fadeIn, fontSize: "1.2rem", color: "#2c3e50" }}>Our Vision</animated.h2>
                    <animated.p style={{ ...fadeIn, fontSize: "0.9rem", color: "#333" }}>
                        To revolutionize train travel with advanced technology, providing easy access,
                        efficiency, and comfort to travelers everywhere.
                    </animated.p>

                    {/* Register and Login Buttons under Vision */}
                    <div style={{ marginTop: "1.5rem" }}>
                        <Link
                            to="/register"
                            style={{
                                padding: "0.6rem 1.2rem", // Reduced padding
                                margin: "0 1rem",
                                textDecoration: "none",
                                fontWeight: "bold",
                                color: "#fff",
                                backgroundColor: "#8af4e4",
                                borderRadius: "5px",
                            }}
                        >
                            Register
                        </Link>
                        <Link
                            to="/login"
                            style={{
                                padding: "0.6rem 1.2rem", // Reduced padding
                                margin: "0 1rem",
                                textDecoration: "none",
                                fontWeight: "bold",
                                color: "#fff",
                                backgroundColor: "#205793",
                                borderRadius: "5px",
                            }}
                        >
                            Log In
                        </Link>
                    </div>
                </div>

                {/* Mission Column */}
                <div style={{ width: "48%", textAlign: "left" }}>
                    <animated.h2 style={{ ...fadeIn, fontSize: "1.2rem", color: "#2c3e50" }}>Our Mission</animated.h2>
                    <animated.p style={{ ...fadeIn, fontSize: "0.9rem", color: "#333" }}>
                        To create an intuitive, seamless, and sustainable train travel experience by offering
                        users the tools they need to plan, book, and manage their journeys effortlessly.
                    </animated.p>
                </div>
            </div>

            {/* Contact Us and Message Box */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    maxWidth: "1100px", // Slightly reduced max width
                    marginTop: "2.5rem", // Adjusted spacing
                }}
            >
                {/* Contact Us Section */}
                <div
                    style={{
                        width: "45%",
                        textAlign: "left",
                        padding: "0.8rem", // Reduced padding
                        backgroundColor: "#bab8b8",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <h2 style={{ color: "#2c3e50" }}>Contact Us</h2>
                    <p>If you have any questions or need assistance, feel free to reach out to us!</p>
                    <p>Email: info@smartrail.com</p>
                    <p>Phone: +250 786 7890</p>
                    <p>Address: KK563ST34, Kigali City, Rwanda</p>
                </div>
                {/* Feedback Message */}
                {statusMessage && (
                    <p style={{ color: statusColor, fontWeight: "bold", fontSize: "1.1rem" }}>
                        {statusMessage}
                    </p>
                )}
                {/* Message Box */}
                <div style={{
                    width: "45%",
                    padding: "0.8rem",
                    backgroundColor: "#bab8b8",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}>
                    <h2 style={{color: "#2c3e50"}}>Send Us a Message</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Add Full Name input field */}
                        <input
                            type="text"
                            value={fullName}
                            onChange={handleFullNameChange}
                            placeholder="Enter your full name..."
                            style={{
                                width: "100%",
                                padding: "0.6rem",
                                fontSize: "0.9rem",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                marginBottom: "1rem",
                            }}
                        />

                        <textarea
                            value={message}
                            onChange={handleMessageChange}
                            placeholder="Type your message here..."
                            rows="5"
                            style={{
                                width: "100%",
                                padding: "0.6rem",
                                fontSize: "0.9rem",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                marginBottom: "1rem",
                                resize: "none",
                            }}
                        ></textarea>
                        <div>
                            <button
                                type="submit"
                                style={{
                                    padding: "0.6rem 1.2rem",
                                    margin: "0 1rem",
                                    textDecoration: "none",
                                    fontWeight: "bold",
                                    color: "#fff",
                                    backgroundColor: "#131313",
                                    borderRadius: "5px",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;
