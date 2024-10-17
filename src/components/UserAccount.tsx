import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import SidePanel from './SidePanel';
import { FaEdit, FaUserTimes } from 'react-icons/fa';

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

    const handleDeactivateAccount = () => {
        const confirmDeactivate = window.confirm(
            'Are you sure you want to deactivate your account?'
        );
        if (!confirmDeactivate) return;

        alert('Account deactivation is not implemented yet.');
    };

    if (!userDetails) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>Loading user details...</p>
            </div>
        );
    }

    return (
        <div className="flex">
            <SidePanel />
            <div className="flex-grow md:ml-64 p-8">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4">Profile</h2>
                    {errorMessage && (
                        <p className="text-red-500 text-xs italic mt-4">{errorMessage}</p>
                    )}
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                            <div>
                                <label className="block text-gray-1500 font-bold">First Name</label>
                                <p className="text-gray-800">{userDetails.firstName}</p>
                            </div>
                            <div>
                                <label className="block text-gray-1500 font-bold">Last Name</label>
                                <p className="text-gray-800">{userDetails.lastName}</p>
                            </div>
                            <div>
                                <label className="block text-gray-1500 font-bold">Email</label>
                                <p className="text-gray-800">{userDetails.email}</p>
                            </div>
                            <div>
                                <label className="block text-gray-1500 font-bold">Country</label>
                                <p className="text-gray-800">{userDetails.country}</p>
                            </div>
                            <div>
                                <label className="block text-gray-1500 font-bold">Age</label>
                                <p className="text-gray-800">{userDetails.age}</p>
                            </div>
                        </div>
                        <div className="mt-6 flex space-x-4">
                            <button
                                onClick={handleEditProfile}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
                            >
                                <FaEdit className="mr-2" /> Edit
                            </button>
                            {/*<button*/}
                            {/*    onClick={handleDeactivateAccount}*/}
                            {/*    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded flex items-center"*/}
                            {/*>*/}
                            {/*    <FaUserTimes className="mr-2" /> Deactivate Account*/}
                            {/*</button>*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserAccount;
