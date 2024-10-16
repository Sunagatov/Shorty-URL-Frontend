// src/App.tsx
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UrlShortener from './components/UrlShortener';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import UserAccount from './components/UserAccount';
import UserUrlMappings from './components/UserUrlMappings';
import UrlMappingDetails from './components/UrlMappingDetails';
import { AuthContext } from './context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';

const App: React.FC = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <header className="bg-blue-600 text-white py-4 fixed w-full z-10 shadow-lg">
                    <div className="container mx-auto flex justify-between items-center px-4">
                        <Link to="/" className="text-3xl font-bold">
                            Shorty URL
                        </Link>
                        <div className="flex items-center">
                            {isAuthenticated ? (
                                <Link to="/account" className="text-white text-2xl">
                                    <FaUserCircle />
                                </Link>
                            ) : (
                                <Link
                                    to="/signin"
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded mr-2 text-sm md:text-base"
                                >
                                    Sign In
                                </Link>
                            )}
                        </div>
                    </div>
                </header>

                <main className="flex-grow flex items-center justify-center bg-gray-100 pt-24 overflow-hidden">
                    <Routes>
                        <Route path="/" element={<UrlShortener />} />
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/account" element={<UserAccount />} />
                        <Route path="/account/url-mappings" element={<UserUrlMappings />} />
                        <Route path="/account/url-mappings/:urlHash" element={<UrlMappingDetails />} />
                    </Routes>
                </main>

                <footer className="bg-gray-800 text-white py-4 text-center">
                    <p>© 2024 Shorty URL - All rights reserved</p>
                    <p>
                        <a
                            href="https://github.com/Sunagatov/URL-Shortener"
                            className="text-blue-400 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub
                        </a>
                        {' | '}
                        <a
                            href="https://t.me/zufarexplained"
                            className="text-blue-400 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Telegram
                        </a>
                        {' | '}
                        <a
                            href="https://www.linkedin.com/in/zufar-sunagatov/"
                            className="text-blue-400 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            LinkedIn
                        </a>
                    </p>
                </footer>
            </div>
        </Router>
    );
};

export default App;
