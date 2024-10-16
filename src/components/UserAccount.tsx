// src/components/UserAccount.tsx
import React, { useEffect, useState, useContext } from 'react';
import axios from '../axiosConfig';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface UserDetails {
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    age: number;
}

const UserAccount: React.FC = () => {
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsAuthenticated(false);
        navigate('/');
    };

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get('/api/v1/users');
                setUserDetails(response.data);
            } catch (error: any) {
                if (error.response && error.response.status === 401) {
                    navigate('/signin');
                } else {
                    setErrorMessage('Failed to fetch user details.');
                }
            }
        };

        fetchUserDetails();
    }, [navigate]);

    if (!userDetails) {
        return <p>Loading user details...</p>;
    }

    return (
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row">
            {/* Side Panel */}
            <div className="w-full md:w-1/4 mb-8 md:mb-0">
                <div className="bg-gray-200 shadow-md rounded p-4">
                    <nav className="flex flex-col space-y-2">
                        <Link
                            to="/account/url-mappings"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-center text-sm"
                        >
                            My URL Mappings
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded text-center text-sm"
                        >
                            Logout
                        </button>
                    </nav>
                </div>
            </div>

            {/* User Details */}
            <div className="w-full md:w-3/4 md:pl-8">
                <h2 className="text-2xl font-bold mb-4">User Account</h2>
                {errorMessage && <p className="text-red-500 text-xs italic mt-4">{errorMessage}</p>}
                <div className="bg-white shadow-md rounded p-6">
                    <p className="mb-2">
                        <strong>First Name:</strong> {userDetails.firstName}
                    </p>
                    <p className="mb-2">
                        <strong>Last Name:</strong> {userDetails.lastName}
                    </p>
                    <p className="mb-2">
                        <strong>Email:</strong> {userDetails.email}
                    </p>
                    <p className="mb-2">
                        <strong>Country:</strong> {userDetails.country}
                    </p>
                    <p className="mb-2">
                        <strong>Age:</strong> {userDetails.age}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserAccount;
