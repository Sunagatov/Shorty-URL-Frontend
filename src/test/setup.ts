import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.stubEnv('REACT_APP_BACKEND_REST_API_URL', 'http://localhost:8080');
