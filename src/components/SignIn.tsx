// src/components/SignIn.tsx
import React, { useState, useContext } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const SignIn: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const { setIsAuthenticated } = useContext(AuthContext);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const backendRestApiUrl = process.env.REACT_APP_BACKEND_REST_API_URL;
            const response = await axios.post(`${backendRestApiUrl}/api/v1/auth/signin`, {
                email,
                password,
            });

            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);

            setIsAuthenticated(true);
            setErrorMessage('');
            navigate('/');
        } catch (error: any) {
            if (error.response) {
                setErrorMessage(error.response.data.errorMessage || 'Error signing in.');
            } else if (error.request) {
                setErrorMessage('No response from the server. Please try again later.');
            } else {
                setErrorMessage('Error: ' + error.message);
            }
        }
    };

    return (
        <div className="max-w-md w-full space-y-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
            <form onSubmit={handleSignIn}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4"
                />
                <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-4 rounded w-full"
                >
                    Sign In
                </button>
            </form>
            {errorMessage && <p className="text-red-500 text-xs italic mt-4">{errorMessage}</p>}
        </div>
    );
};

export default SignIn;
