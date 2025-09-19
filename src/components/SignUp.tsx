import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { ApiService } from '../services/ApiService';
import { useAuth } from '../hooks/useAuth';
import { useApi } from '../hooks/useApi';
import { signUpSchema, type SignUpFormData } from '../utils/validation';
import { ROUTES } from '../constants';
import type { User, AuthTokens } from '../types';

const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const { execute, loading, error } = useApi<{ user: User } & AuthTokens>();
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
    });

    const onSubmit = async (data: SignUpFormData) => {
        const result = await execute(() => ApiService.signUp(data));
        if (result) {
            const { user, accessToken, refreshToken } = result;
            login({ accessToken, refreshToken }, user);
            navigate(ROUTES.HOME);
        }
    };

    return (
        <div className="max-w-md w-full px-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <input
                        {...register('firstName')}
                        type="text"
                        placeholder="First Name"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                    {errors.firstName && (
                        <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
                    )}
                </div>

                <div>
                    <input
                        {...register('lastName')}
                        type="text"
                        placeholder="Last Name"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                    {errors.lastName && (
                        <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
                    )}
                </div>

                <div>
                    <input
                        {...register('country')}
                        type="text"
                        placeholder="Country (optional)"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                    {errors.country && (
                        <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>
                    )}
                </div>

                <div>
                    <input
                        {...register('age')}
                        type="number"
                        placeholder="Age"
                        min="1"
                        max="150"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                    {errors.age && (
                        <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>
                    )}
                </div>

                <div>
                    <input
                        {...register('email')}
                        type="email"
                        placeholder="Email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <input
                        {...register('password')}
                        type="password"
                        placeholder="Password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-2 px-4 rounded w-full text-sm md:text-base transition-colors"
                >
                    {loading ? 'Signing Up...' : 'Sign Up'}
                </button>
            </form>

            <div className="text-center text-sm md:text-base mt-4">
                Already have an account?{' '}
                <Link to={ROUTES.SIGNIN} className="text-blue-500 hover:underline">
                    Sign In
                </Link>
            </div>

            {error && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    <p className="text-sm">{error.errorMessage}</p>
                </div>
            )}
        </div>
    );
};

export default SignUp;
