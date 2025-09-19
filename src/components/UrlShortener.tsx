import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApiService } from '../services/ApiService';
import { useApi } from '../hooks/useApi';
import { createUrlSchema, type CreateUrlFormData } from '../utils/validation';
import type { UrlMapping } from '../types';

const UrlShortener: React.FC = () => {
    const { execute, loading, error } = useApi<UrlMapping>();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateUrlFormData>({
        resolver: zodResolver(createUrlSchema),
    });

    const [shortUrl, setShortUrl] = React.useState<string>('');

    const onSubmit = async (data: CreateUrlFormData) => {
        const result = await execute(() => ApiService.createUrl(data));
        if (result) {
            setShortUrl(result.shortUrl);
        }
    };

    const handleClear = () => {
        reset();
        setShortUrl('');
    };

    return (
        <div className="max-w-md w-full px-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Create Short URL</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <input
                        {...register('originalUrl')}
                        type="url"
                        placeholder="Enter the URL to shorten"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                    {errors.originalUrl && (
                        <p className="text-red-500 text-xs mt-1">{errors.originalUrl.message}</p>
                    )}
                </div>

                <div className="flex gap-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-500 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-2 px-4 rounded flex-1 text-sm md:text-base transition-colors"
                    >
                        {loading ? 'Shortening...' : 'Shorten URL'}
                    </button>
                    <button
                        type="button"
                        onClick={handleClear}
                        disabled={loading}
                        className="bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-black font-bold py-2 px-4 rounded flex-1 text-sm md:text-base transition-colors"
                    >
                        Clear
                    </button>
                </div>
            </form>

            {error && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    <p className="text-sm">{error.errorMessage}</p>
                </div>
            )}

            {shortUrl && (
                <div className="mt-6 p-4 bg-green-100 border border-green-400 rounded">
                    <p className="text-green-700 text-lg font-semibold mb-2">Short URL Created!</p>
                    <div className="flex items-center gap-2">
                        <a
                            href={shortUrl}
                            className="text-blue-600 hover:text-blue-800 underline break-all"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {shortUrl}
                        </a>
                        <button
                            onClick={() => navigator.clipboard.writeText(shortUrl)}
                            className="bg-blue-500 hover:bg-blue-700 text-white text-xs px-2 py-1 rounded transition-colors"
                            title="Copy to clipboard"
                        >
                            Copy
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UrlShortener;
