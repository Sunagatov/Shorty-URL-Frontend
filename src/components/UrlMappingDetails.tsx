// src/components/UrlMappingDetails.tsx
import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';

interface UrlMapping {
    urlHash: string;
    shortUrl: string;
    originalUrl: string;
    createdAt: string;
    expirationDate: string;
}

const UrlMappingDetails: React.FC = () => {
    const { urlHash } = useParams<{ urlHash: string }>();
    const [urlMapping, setUrlMapping] = useState<UrlMapping | null>(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUrlMapping = async () => {
            try {
                const response = await axios.get(`/api/v1/urls/${urlHash}`);
                setUrlMapping(response.data);
            } catch (error: any) {
                if (error.response && error.response.status === 401) {
                    navigate('/signin');
                } else {
                    setErrorMessage('Failed to fetch URL mapping details.');
                }
            }
        };

        fetchUrlMapping();
    }, [navigate, urlHash]);

    if (!urlMapping) {
        return <p>Loading URL mapping details...</p>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">URL Mapping Details</h2>
            {errorMessage && <p className="text-red-500 text-xs italic mt-4">{errorMessage}</p>}
            <div className="bg-white shadow-md rounded p-6">
                <p className="mb-2">
                    <strong>Short URL:</strong>{' '}
                    <a href={urlMapping.shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                        {urlMapping.shortUrl}
                    </a>
                </p>
                <p className="mb-2">
                    <strong>Original URL:</strong>{' '}
                    <a href={urlMapping.originalUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                        {urlMapping.originalUrl}
                    </a>
                </p>
                <p className="mb-2">
                    <strong>Created At:</strong>{' '}
                    {new Date(urlMapping.createdAt).toLocaleString()}
                </p>
                <p className="mb-2">
                    <strong>Expiration Date:</strong>{' '}
                    {new Date(urlMapping.expirationDate).toLocaleString()}
                </p>
            </div>
        </div>
    );
};

export default UrlMappingDetails;
