import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import AuthService from './services/AuthService';
import { storage } from './utils/storage';
import { API_ENDPOINTS } from './constants';

const backendRestApiUrl = import.meta.env.REACT_APP_BACKEND_REST_API_URL;

if (!backendRestApiUrl) {
    throw new Error('REACT_APP_BACKEND_REST_API_URL environment variable is not set');
}

// Create an instance of axios
const axiosInstance = axios.create({
    baseURL: backendRestApiUrl,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add access token to headers
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const accessToken = storage.getAccessToken();
        if (accessToken && config.headers) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
        const refreshToken = storage.getRefreshToken();

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            refreshToken &&
            originalRequest
        ) {
            originalRequest._retry = true;
            
            try {
                // Use a new axios instance without interceptors to avoid infinite loops
                const response = await axios.create().post(
                    `${backendRestApiUrl}${API_ENDPOINTS.AUTH.REFRESH}`,
                    { refreshToken }
                );
                
                const { accessToken: newAccessToken } = response.data;
                storage.setAccessToken(newAccessToken);

                // Update the Authorization header for the original request
                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                }

                // Retry the original request with the new access token
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // Refresh token failed, log out the user
                AuthService.logout();
                
                // Redirect to main page only if not already there
                if (window.location.pathname !== '/') {
                    window.location.href = '/';
                }
                
                return Promise.reject(refreshError);
            }
        }
        
        return Promise.reject(error);
    }
);

export default axiosInstance;
