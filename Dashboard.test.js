import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import Dashboard from '../Dashboard';

jest.mock('../../services/apiService', () => ({
  get: jest.fn(() => Promise.resolve([
    { id: '1', projectDetails: { type: 'Brick Wall' }, estimatedCost: 1500 },
    { id: '2', projectDetails: { type: 'Stone Patio' }, estimatedCost: 2500 }
  ]))
}));

describe('Dashboard Component', () => {
  it('renders the welcome message with user name', async () => {
    const mockUser = { name: 'John Doe' };

    render(
      <AuthProvider value={{ user: mockUser }}>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </AuthProvider>
    );

    expect(await screen.findByText(/Welcome, John Doe/i)).toBeInTheDocument();
  });

  it('displays recent estimates', async () => {
    render(
      <AuthProvider value={{ user: { name: 'John Doe' } }}>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </AuthProvider>
    );

    expect(await screen.findByText(/Brick Wall - \$1500/i)).toBeInTheDocument();
    expect(await screen.findByText(/Stone Patio - \$2500/i)).toBeInTheDocument();
  });

  it('shows "No recent estimates" if there are no estimates', async () => {
    jest.mock('../../services/apiService', () => ({
      get: jest.fn(() => Promise.resolve([]))
    }));

    render(
      <AuthProvider value={{ user: { name: 'John Doe' } }}>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </AuthProvider>
    );

    expect(await screen.findByText(/No recent estimates/i)).toBeInTheDocument();
  });
});
