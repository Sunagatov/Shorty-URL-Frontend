// src/components/UserAccount.tsx
import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import SidePanel from './SidePanel';
import { FaEdit, FaUser, FaEnvelope, FaGlobe, FaCalendarAlt } from 'react-icons/fa';

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
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get('/api/v1/users');
                setUserDetails(response.data);
            } catch (error: any) {
                setErrorMessage('Failed to fetch user details.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    const handleEditProfile = () => {
        alert('Edit profile functionality is not implemented yet.');
    };

    const getInitials = (firstName: string, lastName: string) => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    };

    if (isLoading) {
        return (
            <div className="flex min-h-screen">
                <SidePanel />
                <div className="flex-grow md:ml-72 p-8">
                    <div className="flex items-center justify-center h-96">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!userDetails) {
        return (
            <div className="flex min-h-screen">
                <SidePanel />
                <div className="flex-grow md:ml-72 p-8">
                    <div className="flex items-center justify-center h-96">
                        <p className="text-gray-500">Unable to load user details</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <SidePanel />
            <div className="flex-grow md:ml-72 p-4 md:p-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
                        <p className="text-gray-600">Manage your personal information and preferences</p>
                    </div>

                    {errorMessage && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-600 text-sm">{errorMessage}</p>
                        </div>
                    )}

                    {/* Profile Card */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        {/* Header with gradient */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-12 relative">
                            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                                {/* Avatar */}
                                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/30">
                                    <span className="text-2xl font-bold text-white">
                                        {getInitials(userDetails.firstName, userDetails.lastName)}
                                    </span>
                                </div>
                                
                                {/* User Info */}
                                <div className="text-center md:text-left">
                                    <h2 className="text-3xl font-bold text-white mb-2">
                                        {userDetails.firstName} {userDetails.lastName}
                                    </h2>
                                    <p className="text-blue-100 text-lg">{userDetails.email}</p>
                                </div>
                            </div>
                            
                            {/* Edit Button */}
                            <button
                                onClick={handleEditProfile}
                                className="absolute top-6 right-6 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 border border-white/30 hover:border-white/50"
                            >
                                <FaEdit className="w-4 h-4" />
                                <span className="hidden sm:inline">Edit Profile</span>
                            </button>
                        </div>

                        {/* Profile Details */}
                        <div className="p-8">
                            <h3 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* First Name */}
                                <div className="group">
                                    <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <FaUser className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 mb-1">First Name</p>
                                            <p className="text-lg font-semibold text-gray-900">{userDetails.firstName}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Last Name */}
                                <div className="group">
                                    <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                            <FaUser className="w-4 h-4 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 mb-1">Last Name</p>
                                            <p className="text-lg font-semibold text-gray-900">{userDetails.lastName}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="group">
                                    <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                            <FaEnvelope className="w-4 h-4 text-purple-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 mb-1">Email Address</p>
                                            <p className="text-lg font-semibold text-gray-900 break-all">{userDetails.email}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Country */}
                                <div className="group">
                                    <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                            <FaGlobe className="w-4 h-4 text-orange-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 mb-1">Country</p>
                                            <p className="text-lg font-semibold text-gray-900">{userDetails.country}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Age */}
                                <div className="group md:col-span-2">
                                    <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200 max-w-md">
                                        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                                            <FaCalendarAlt className="w-4 h-4 text-indigo-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 mb-1">Age</p>
                                            <p className="text-lg font-semibold text-gray-900">{userDetails.age} years old</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <button
                                    onClick={handleEditProfile}
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
                                >
                                    <FaEdit className="w-4 h-4" />
                                    <span>Edit Profile</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserAccount;
