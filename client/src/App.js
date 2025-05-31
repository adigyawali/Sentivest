// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home/home";
import Login from "./pages/Login/login";
import Dashboard from "./pages/Dashboard/dashboard";
import Signup from "./pages/Login/signup";
import "./index.css";

function AppContent() {
    const location = useLocation();

    return (
        <>
            <header className="app-header">
                <div className="logo-area">
                    <Link to="/" id="homePageLogo">Quantify</Link>
                </div>

                {location.pathname === "/" && (
                    <div className="auth-area">
                        <Link to="/login" id="login">Login/Signup</Link>
                    </div>
                )}
            </header>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;
