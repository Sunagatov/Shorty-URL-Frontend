import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import SidePanel from './SidePanel';
import {
    FaTrash,
    FaInfoCircle,
    FaArrowLeft,
    FaArrowRight,
} from 'react-icons/fa';

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
    const [size] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const fetchUrlMappings = async (pageNumber: number) => {
        try {
            const response = await axios.get(
                `/api/v1/urls?page=${pageNumber}&size=${size}`
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
    }, [page]);

    const handleDelete = async (urlHash: string) => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this URL mapping?'
        );
        if (!confirmDelete) return;

        try {
            await axios.delete(`/api/v1/urls/${urlHash}`);
            setUrlMappings(
                urlMappings.filter((mapping) => mapping.urlHash !== urlHash)
            );
        } catch (error: any) {
            setErrorMessage('Failed to delete URL mapping.');
        }
    };

    const handlePreviousPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        if (page < totalPages - 1) {
            setPage(page + 1);
        }
    };

    return (
        <div className="flex">
            <SidePanel />
            <div className="flex-grow md:ml-64 p-8">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    My URL Mappings
                </h2>
                {errorMessage && (
                    <p className="text-red-500 text-xs italic mt-4">{errorMessage}</p>
                )}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white text-sm md:text-base table-fixed">
                        <thead>
                        <tr>
                            <th className="py-2 px-4 border w-12">#</th>
                            <th className="py-2 px-4 border">Short URL</th>
                            <th className="py-2 px-4 border">Original URL</th>
                            <th className="py-2 px-4 border w-48">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {urlMappings.length > 0 ? (
                            urlMappings.map((mapping, index) => (
                                <tr key={mapping.urlHash} className="text-center">
                                    <td className="border px-4 py-2">
                                        {index + 1 + page * size}
                                    </td>
                                    <td className="border px-4 py-2 truncate">
                                        <a
                                            href={mapping.shortUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline"
                                        >
                                            {mapping.shortUrl}
                                        </a>
                                    </td>
                                    <td className="border px-4 py-2 truncate">
                                        <a
                                            href={mapping.originalUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline"
                                        >
                                            {mapping.originalUrl}
                                        </a>
                                    </td>
                                    <td className="border px-4 py-2 flex justify-center space-x-2">
                                        <button
                                            onClick={() =>
                                                navigate(`/account/url-mappings/${mapping.urlHash}`)
                                            }
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm flex items-center"
                                        >
                                            <FaInfoCircle className="mr-1" /> Learn More
                                        </button>
                                        <button
                                            onClick={() => handleDelete(mapping.urlHash)}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm flex items-center"
                                        >
                                            <FaTrash className="mr-1" /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="border px-4 py-2 text-center text-gray-500"
                                >
                                    No URL mappings found.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-between mt-4">
                    <button
                        onClick={handlePreviousPage}
                        disabled={page === 0}
                        className={`py-2 px-4 rounded ${
                            page === 0
                                ? 'bg-gray-300'
                                : 'bg-blue-500 hover:bg-blue-700 text-white'
                        } flex items-center`}
                    >
                        <FaArrowLeft className="mr-1" /> Previous
                    </button>
                    <button
                        onClick={handleNextPage}
                        disabled={page >= totalPages - 1}
                        className={`py-2 px-4 rounded ${
                            page >= totalPages - 1
                                ? 'bg-gray-300'
                                : 'bg-blue-500 hover:bg-blue-700 text-white'
                        } flex items-center`}
                    >
                        Next <FaArrowRight className="ml-1" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserUrlMappings;
