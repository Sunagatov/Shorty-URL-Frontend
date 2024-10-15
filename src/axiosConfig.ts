// src/axiosConfig.ts
import axios from 'axios';

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
            error.response.status === 401 &&
            !originalRequest._retry &&
            refreshToken
        ) {
            originalRequest._retry = true;
            try {
                const response = await axios.post(`${backendRestApiUrl}/api/v1/auth/refresh-token`, {
                    refreshToken,
                });
                const newAccessToken = response.data.accessToken;
                localStorage.setItem('accessToken', newAccessToken);
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/signin';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
