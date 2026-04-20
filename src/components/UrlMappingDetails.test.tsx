import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from '../axiosConfig';
import UrlMappingDetails from './UrlMappingDetails';

vi.mock('../axiosConfig', () => ({
  default: {
    get: vi.fn(),
    delete: vi.fn(),
  },
}));

vi.mock('./SidePanel', () => ({
  default: () => <aside>Side Panel</aside>,
}));

const mockAxiosGet = vi.mocked(axios.get);

describe('UrlMappingDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders expiration dates from expiresAt', async () => {
    mockAxiosGet.mockResolvedValue({
      data: {
        id: 'url-1',
        urlHash: 'abc123',
        shortUrl: 'https://sho.rt/abc123',
        originalUrl: 'https://example.com/a-long-url',
        createdAt: '2024-01-01T00:00:00.000Z',
        expiresAt: '2024-02-01T00:00:00.000Z',
        clickCount: 0,
        isActive: true,
      },
    });

    render(
      <MemoryRouter initialEntries={['/account/url-mappings/abc123']}>
        <Routes>
          <Route path="/account/url-mappings/:urlHash" element={<UrlMappingDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText(/February 1, 2024/i)).toBeInTheDocument();
  });

  it('shows not found state when the route parameter is missing', async () => {
    render(
      <MemoryRouter initialEntries={['/account/url-mappings']}>
        <Routes>
          <Route path="/account/url-mappings" element={<UrlMappingDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText(/url not found/i)).toBeInTheDocument();
    expect(screen.getByText(/requested url mapping could not be found/i)).toBeInTheDocument();
    expect(mockAxiosGet).not.toHaveBeenCalled();
  });
});
