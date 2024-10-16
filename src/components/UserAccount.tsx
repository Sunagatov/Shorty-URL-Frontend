// src/components/UserAccount.tsx
import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate, Link } from 'react-router-dom';

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

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/');
    };

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get('/api/v1/users');
                setUserDetails(response.data);
            } catch (error: any) {
                if (error.response && error.response.status === 401) {
                    // Unauthorized, redirect to signin
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
        <div className="max-w-md w-full space-y-8">
            <h2 className="text-2xl font-bold mb-4 text-center">User Account</h2>
            {errorMessage && <p className="text-red-500 text-xs italic mt-4">{errorMessage}</p>}
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <p><strong>First Name:</strong> {userDetails.firstName}</p>
                <p><strong>Last Name:</strong> {userDetails.lastName}</p>
                <p><strong>Email:</strong> {userDetails.email}</p>
                <p><strong>Country:</strong> {userDetails.country}</p>
                <p><strong>Age:</strong> {userDetails.age}</p>
            </div>
            <div className="flex justify-between">
                <Link
                    to="/account/url-mappings"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    My URL Mappings
                </Link>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default UserAccount;
