import { render, screen } from '@testing-library/react';
import { ApiService } from '../services/ApiService';
import UserAccount from './UserAccount';

vi.mock('../services/ApiService', () => ({
  ApiService: {
    getUserProfile: vi.fn(),
  },
}));

vi.mock('./SidePanel', () => ({
  default: () => <aside>Side Panel</aside>,
}));

const mockGetUserProfile = vi.mocked(ApiService.getUserProfile);

describe('UserAccount', () => {
  it('renders profile details from the central API service', async () => {
    mockGetUserProfile.mockResolvedValue({
      id: 'user-1',
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      country: 'United States',
      age: 25,
      createdAt: '2024-01-15T12:00:00.000Z',
    });

    render(<UserAccount />);

    expect(await screen.findByText('Test User')).toBeInTheDocument();
    expect(screen.getAllByText('test@example.com')[0]).toBeInTheDocument();
    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('25 years old')).toBeInTheDocument();
    expect(screen.getAllByText(/Jan 15, 2024/i)[0]).toBeInTheDocument();
    expect(mockGetUserProfile).toHaveBeenCalledTimes(1);
  });

  it('shows an error when the profile request fails', async () => {
    mockGetUserProfile.mockRejectedValue(new Error('Request failed'));

    render(<UserAccount />);

    expect(await screen.findByText(/failed to fetch user details/i)).toBeInTheDocument();
  });
});
