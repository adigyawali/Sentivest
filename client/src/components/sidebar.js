// components/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import { X, Home, BarChart3, User, LogOut } from "lucide-react";
import "./Sidebar.css";

function Sidebar({ isOpen, onClose, username, onLogout }) {
    return (
        <>
            {/* Overlay */}
            {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
            
            {/* Sidebar */}
            <div className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
                <div className="sidebar-header">
                    <h3>Menu</h3>
                    <button className="close-button" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>
                
                <div className="sidebar-content">
                    <div className="user-info">
                        <User size={20} />
                        <span>Welcome, {username}</span>
                    </div>
                    
                    <nav className="sidebar-nav">
                        <Link to="/" className="sidebar-link" onClick={onClose}>
                            <Home size={18} />
                            <span>Home</span>
                        </Link>
                        
                        <Link to="/dashboard" className="sidebar-link" onClick={onClose}>
                            <BarChart3 size={18} />
                            <span>Dashboard</span>
                        </Link>
                    </nav>
                    
                    <div className="sidebar-footer">
                        <button className="logout-button" onClick={onLogout}>
                            <LogOut size={18} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sidebar;