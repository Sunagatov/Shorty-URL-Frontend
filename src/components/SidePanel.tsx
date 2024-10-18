// src/components/SidePanel.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import {
    FaBars,
    FaTimes,
    FaTachometerAlt,
    FaUser,
    FaLock,
    FaLink,
    FaSignOutAlt,
} from 'react-icons/fa';

const SidePanel: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        AuthService.logout();
        navigate('/');
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const menuItems = (
        <nav className="flex flex-col space-y-4">
            <Link
                to="/account/dashboard"
                className="flex items-center text-gray-700 hover:text-blue-500 px-3 py-2 border rounded"
                onClick={() => setIsOpen(false)}
            >
                <FaTachometerAlt className="mr-2" /> Dashboard
            </Link>
            <Link
                to="/account/profile"
                className="flex items-center text-gray-700 hover:text-blue-500 px-3 py-2 border rounded"
                onClick={() => setIsOpen(false)}
            >
                <FaUser className="mr-2" /> Profile
            </Link>
            <Link
                to="/account/security"
                className="flex items-center text-gray-700 hover:text-blue-500 px-3 py-2 border rounded"
                onClick={() => setIsOpen(false)}
            >
                <FaLock className="mr-2" /> Security
            </Link>
            <Link
                to="/account/url-mappings"
                className="flex items-center text-gray-700 hover:text-blue-500 px-3 py-2 border rounded"
                onClick={() => setIsOpen(false)}
            >
                <FaLink className="mr-2" /> My URL Mappings
            </Link>
        </nav>
    );

    return (
        <>
            {/* Mobile Header */}
            <div className="md:hidden bg-blue-600 text-white p-4 flex justify-between items-center">
                <button onClick={toggleMenu} className="text-white focus:outline-none">
                    {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
                <span className="text-xl font-bold">Menu</span>
            </div>

            {/* Side Panel */}
            <div
                className={`${
                    isOpen ? 'block' : 'hidden'
                } md:block fixed top-0 left-0 h-full w-64 bg-gray-200 shadow-md z-10`}
            >
                <div className="flex flex-col justify-between h-full p-6 overflow-y-auto">
                    <div>{menuItems}</div>
                    <div className="mt-4">
                        <button
                            onClick={handleLogout}
                            className="flex items-center text-gray-700 hover:text-red-500 px-3 py-2 border rounded w-full"
                        >
                            <FaSignOutAlt className="mr-2" /> Logout
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SidePanel;
