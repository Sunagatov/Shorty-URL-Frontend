// src/App.tsx
import React, {useContext} from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import UrlShortener from './components/UrlShortener';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import {AuthContext} from './context/AuthContext';

const App: React.FC = () => {
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsAuthenticated(false);
        window.location.href = '/';
    };

    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <header className="bg-blue-600 text-white py-4 fixed w-full z-10 shadow-lg">
                    <div className="container mx-auto flex justify-between items-center px-4">
                        <Link to="/" className="text-3xl font-bold">
                            Shorty URL
                        </Link>
                        <div>
                            {isAuthenticated ? (
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Logout
                                </button>
                            ) : (
                                <>
                                    <Link
                                        to="/signin"
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                <main className="flex-grow flex items-center justify-center bg-gray-100 pt-24">
                    <Routes>
                        <Route path="/" element={<UrlShortener/>}/>
                        <Route path="/signin" element={<SignIn/>}/>
                        <Route path="/signup" element={<SignUp/>}/>
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
