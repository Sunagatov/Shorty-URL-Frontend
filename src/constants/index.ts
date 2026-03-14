export const API_ENDPOINTS = {
  AUTH: {
    SIGNIN: '/v1/auth/signin',
    SIGNUP: '/v1/auth/signup',
    REFRESH: '/v1/auth/refresh-token',
    LOGOUT: '/v1/auth/logout',
  },
  URLS: {
    CREATE: '/v1/urls',
    LIST: '/v1/urls',
    DETAILS: (hash: string) => `/v1/urls/${hash}`,
    DELETE: (hash: string) => `/v1/urls/${hash}`,
  },
  USER: {
    PROFILE: '/v1/user/profile',
    UPDATE: '/v1/user/profile',
  },
} as const;

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER: 'user',
} as const;

export const ROUTES = {
  HOME: '/',
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  DASHBOARD: '/account/dashboard',
  PROFILE: '/account/profile',
  SECURITY: '/account/security',
  URL_MAPPINGS: '/account/url-mappings',
  URL_DETAILS: (hash: string) => `/account/url-mappings/${hash}`,
} as const;

export const VALIDATION_RULES = {
  EMAIL: {
    REQUIRED: 'Email is required',
    INVALID: 'Please enter a valid email address',
  },
  PASSWORD: {
    REQUIRED: 'Password is required',
    MIN_LENGTH: 'Password must be at least 8 characters',
  },
  URL: {
    REQUIRED: 'URL is required',
    INVALID: 'Please enter a valid URL',
  },
} as const;