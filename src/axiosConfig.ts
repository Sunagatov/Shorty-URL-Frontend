// src/axiosConfig.ts
import axios from 'axios';
import AuthService from './services/AuthService';

const backendRestApiUrl = process.env.REACT_APP_BACKEND_REST_API_URL;

// Create an instance of axios
const axiosInstance = axios.create({
    baseURL: backendRestApiUrl,
});

// Request interceptor to add access token to headers
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken && config.headers) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const refreshToken = localStorage.getItem('refreshToken');

        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry &&
            refreshToken
        ) {
            originalRequest._retry = true;
            try {
                // Use a new axios instance without interceptors to avoid infinite loops
                const response = await axios.create().post(`${backendRestApiUrl}/api/v1/auth/refresh-token`, {
                    refreshToken,
                });
                const newAccessToken = response.data.accessToken;
                localStorage.setItem('accessToken', newAccessToken);

                // Update the Authorization header for the original request
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                // Retry the original request with the new access token
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // Refresh token failed, log out the user
                AuthService.logout();

                // Redirect to main page
                window.location.href = '/';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
