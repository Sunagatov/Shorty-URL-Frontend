import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../constants';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-600 text-white py-4 fixed w-full z-10 shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-4">
          <Link to={ROUTES.HOME} className="text-3xl font-bold">
            Shorty URL
          </Link>
          <div className="flex items-center">
            {isAuthenticated ? (
              <Link to={ROUTES.DASHBOARD} className="text-white text-2xl">
                <FaUserCircle />
              </Link>
            ) : (
              <Link
                to={ROUTES.SIGNIN}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded mr-2 text-sm md:text-base transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center bg-gray-100 pt-24 overflow-hidden">
        {children}
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
  );
};