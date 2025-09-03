// pages/Dashboard/dashboard.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./dashboard.css";

function Dashboard({ isLoggedIn, username }) {
    const navigate = useNavigate();

    // Redirect to login if not logged in
    React.useEffect(() => {
        const token = localStorage.getItem("token");
        
        // Send the user back immediatly if there isn't a token in local storage
        if (!token || !isLoggedIn){
            navigate("/login");
            return;
        }

        axios.get("http://localhost:5000/dashboard", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            console.log(res.data.message);
        })
        .catch((err) => {
            console.error(err);
            navigate("/login"); // Token is invalid or expired
        });

    }, [isLoggedIn, navigate]);


    return (
        <div className="dashboard-container">
            <div className="dashboard-content">
                <h1>Dashboard</h1>
                <p>Welcome to your dashboard, {username}!</p>
                
                <div className="dashboard-grid">
                    <div className="dashboard-card">
                        <h3>Portfolio Overview</h3>
                        <p>Your stock portfolio summary will appear here.</p>
                    </div>
                    
                    <div className="dashboard-card">
                        <h3>Recent Searches</h3>
                        <p>Your recent ticker searches will be displayed here.</p>
                    </div>
                    
                    <div className="dashboard-card">
                        <h3>Market Trends</h3>
                        <p>Real-time market data and trends will be shown here.</p>
                    </div>
                    
                    <div className="dashboard-card">
                        <h3>Watchlist</h3>
                        <p>Your saved stocks for monitoring will appear here.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;