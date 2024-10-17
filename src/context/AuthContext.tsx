// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect } from 'react';
import AuthService from '../services/AuthService';

interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    setIsAuthenticated: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(AuthService.isAuthenticated);

    useEffect(() => {
        const handleAuthChange = () => {
            setIsAuthenticated(AuthService.isAuthenticated);
        };

        AuthService.addListener(handleAuthChange);

        return () => {
            AuthService.removeListener(handleAuthChange);
        };
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated: AuthService.setAuthenticated.bind(AuthService),
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
