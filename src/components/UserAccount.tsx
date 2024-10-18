// src/components/UserAccount.tsx
import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import SidePanel from './SidePanel';
import { FaEdit } from 'react-icons/fa';

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

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get('/api/v1/users');
                setUserDetails(response.data);
            } catch (error: any) {
                setErrorMessage('Failed to fetch user details.');
            }
        };

        fetchUserDetails();
    }, []);

    const handleEditProfile = () => {
        alert('Edit profile functionality is not implemented yet.');
    };

    if (!userDetails) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>Loading user details...</p>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen">
            <SidePanel />
            <div className="flex-grow md:ml-64 p-8">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-6">Profile</h2>
                    {errorMessage && (
                        <p className="text-red-500 text-sm italic mb-4">{errorMessage}</p>
                    )}
                    <div className="bg-white shadow-lg rounded-lg p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-700 font-bold">First Name</label>
                                <p className="text-gray-800 break-words">{userDetails.firstName}</p>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-bold">Last Name</label>
                                <p className="text-gray-800 break-words">{userDetails.lastName}</p>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-bold">Email</label>
                                <p className="text-gray-800 break-words">{userDetails.email}</p>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-bold">Country</label>
                                <p className="text-gray-800 break-words">{userDetails.country}</p>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-bold">Age</label>
                                <p className="text-gray-800 break-words">{userDetails.age}</p>
                            </div>
                        </div>
                        <div className="mt-8 flex space-x-4">
                            <button
                                onClick={handleEditProfile}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded flex items-center"
                            >
                                <FaEdit className="mr-2" /> Edit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserAccount;
