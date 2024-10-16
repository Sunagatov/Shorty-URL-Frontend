// src/components/UserUrlMappings.tsx
import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

interface UrlMapping {
    urlHash: string;
    shortUrl: string;
    originalUrl: string;
    createdAt: string;
    expirationDate: string;
}

interface UrlMappingPage {
    content: UrlMapping[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
}

const UserUrlMappings: React.FC = () => {
    const [urlMappings, setUrlMappings] = useState<UrlMapping[]>([]);
    const [page, setPage] = useState(0);
    const [size] = useState(10); // You can make this dynamic if needed
    const [totalPages, setTotalPages] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const fetchUrlMappings = async (pageNumber: number) => {
        try {
            const backendRestApiUrl = process.env.REACT_APP_BACKEND_REST_API_URL;
            const response = await axios.get(
                `${backendRestApiUrl}/api/v1/urls?page=${pageNumber}&size=${size}`
            );
            const data: UrlMappingPage = response.data;
            setUrlMappings(data.content);
            setPage(data.page);
            setTotalPages(data.totalPages);
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                navigate('/signin');
            } else {
                setErrorMessage('Failed to fetch URL mappings.');
            }
        }
    };

    useEffect(() => {
        fetchUrlMappings(page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = async (urlHash: string) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this URL mapping?');
        if (!confirmDelete) return;

        try {
            const backendRestApiUrl = process.env.REACT_APP_BACKEND_REST_API_URL;
            await axios.delete(`${backendRestApiUrl}/api/v1/urls/${urlHash}`);
            setUrlMappings(urlMappings.filter((mapping) => mapping.urlHash !== urlHash));
        } catch (error: any) {
            setErrorMessage('Failed to delete URL mapping.');
        }
    };

    const handlePreviousPage = () => {
        if (page > 0) {
            fetchUrlMappings(page - 1);
        }
    };

    const handleNextPage = () => {
        if (page < totalPages - 1) {
            fetchUrlMappings(page + 1);
        }
    };

    return (
        <div className="max-w-3xl w-full space-y-8">
            <h2 className="text-2xl font-bold mb-4 text-center">My URL Mappings</h2>
            {errorMessage && <p className="text-red-500 text-xs italic mt-4">{errorMessage}</p>}
            <table className="min-w-full bg-white">
                <thead>
                <tr>
                    <th className="py-2">Short URL</th>
                    <th className="py-2">Original URL</th>
                    <th className="py-2">Created At</th>
                    <th className="py-2">Expires At</th>
                    <th className="py-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {urlMappings.map((mapping) => (
                    <tr key={mapping.urlHash} className="text-center">
                        <td className="border px-4 py-2">
                            <a href={mapping.shortUrl} target="_blank" rel="noopener noreferrer">
                                {mapping.shortUrl}
                            </a>
                        </td>
                        <td className="border px-4 py-2">
                            <a href={mapping.originalUrl} target="_blank" rel="noopener noreferrer">
                                {mapping.originalUrl}
                            </a>
                        </td>
                        <td className="border px-4 py-2">
                            {new Date(mapping.createdAt).toLocaleString()}
                        </td>
                        <td className="border px-4 py-2">
                            {new Date(mapping.expirationDate).toLocaleString()}
                        </td>
                        <td className="border px-4 py-2">
                            <button
                                onClick={() => handleDelete(mapping.urlHash)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <FaTrash />
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="flex justify-between mt-4">
                <button
                    onClick={handlePreviousPage}
                    disabled={page === 0}
                    className={`py-2 px-4 rounded ${page === 0 ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
                >
                    Previous
                </button>
                <button
                    onClick={handleNextPage}
                    disabled={page >= totalPages - 1}
                    className={`py-2 px-4 rounded ${page >= totalPages - 1 ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default UserUrlMappings;
