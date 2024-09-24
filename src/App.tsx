import React from 'react';
import UrlShortener from './components/UrlShortener';

const App: React.FC = () => {
  return (
      <div className="flex flex-col min-h-screen">
        <header className="bg-blue-600 text-white py-4 fixed w-full z-10 shadow-lg">
          <div className="container mx-auto flex justify-between items-center px-4">
            <h1 className="text-3xl font-bold">Shorty URL</h1>
          </div>
        </header>

        <main className="flex-grow flex items-center justify-center bg-gray-100 pt-24">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full">
            <UrlShortener />
          </div>
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

export default App;
