import React, { useState } from 'react';
import axios from 'axios';

function UrlShortener() {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleUrlSubmit = async (e) => {
        e.preventDefault();

        try {
            const backendRestApiUrl = process.env.BACKEND_REST_API_URL;
            const response = await axios.post(backendRestApiUrl, {
                originalUrl
            });
            setShortUrl(response.data.shortUrl);
            setErrorMessage('');
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.errorMessage || 'Error shortening the URL.');
            } else if (error.request) {
                setErrorMessage('No response from the server. Please try again later.');
            } else {
                setErrorMessage('Error: ' + error.message);
            }
        }
    };

    const handleClear = () => {
        setOriginalUrl('');
        setShortUrl('');
        setErrorMessage('');
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-center">Create Short URL</h2>
            <form onSubmit={handleUrlSubmit}>
                <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter the URL to shorten"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Shorten URL
                </button>
                <button
                    type="button"
                    onClick={handleClear}
                    className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 mt-4 ml-2 rounded focus:outline-none focus:shadow-outline"
                >
                    Clear
                </button>
            </form>

            {errorMessage && <p className="text-red-500 text-xs italic mt-4">{errorMessage}</p>}

            {shortUrl && (
                <div className="mt-6 text-center">
                    <p className="text-green-500 text-lg">Short URL Created!</p>
                    <a href={shortUrl} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                        {shortUrl}
                    </a>
                </div>
            )}
        </div>
    );
}

export default UrlShortener;
