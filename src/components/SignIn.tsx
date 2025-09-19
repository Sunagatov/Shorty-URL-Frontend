import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { ApiService } from '../services/ApiService';
import { useAuth } from '../hooks/useAuth';
import { useApi } from '../hooks/useApi';
import { signInSchema, type SignInFormData } from '../utils/validation';
import { ROUTES } from '../constants';
import type { User, AuthTokens } from '../types';

const SignIn: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const { execute, loading, error } = useApi<{ user: User } & AuthTokens>();
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
    });

    const onSubmit = async (data: SignInFormData) => {
        const result = await execute(() => ApiService.signIn(data));
        if (result) {
            const { user, accessToken, refreshToken } = result;
            login({ accessToken, refreshToken }, user);
            navigate(ROUTES.HOME);
        }
    };

    return (
        <div className="max-w-md w-full px-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                    className="bg-green-500 hover:bg-green-700 disabled:bg-green-300 text-white font-bold py-2 px-4 rounded w-full text-sm md:text-base transition-colors"
                >
                    {loading ? 'Signing In...' : 'Sign In'}
                </button>
            </form>

            <div className="text-center text-sm md:text-base mt-4">
                Don't have an account?{' '}
                <Link to={ROUTES.SIGNUP} className="text-blue-500 hover:underline">
                    Sign Up
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

export default SignIn;
