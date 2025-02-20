import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import EstimateForm from '../EstimateForm';

describe('EstimateForm Component', () => {
  it('renders the form correctly', () => {
    render(
      <AuthProvider value={{ user: { name: 'John Doe' } }}>
        <MemoryRouter>
          <EstimateForm />
        </MemoryRouter>
      </AuthProvider>
    );

    expect(screen.getByLabelText(/Project Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Size \(sq ft\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Materials/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Location/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create Estimate/i })).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    const mockSubmit = jest.fn();

    render(
      <AuthProvider value={{ user: { name: 'John Doe' } }}>
        <MemoryRouter>
          <EstimateForm onSubmit={mockSubmit} />
        </MemoryRouter>
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/Project Type/i), { target: { value: 'Brick Wall' } });
    fireEvent.change(screen.getByLabelText(/Size \(sq ft\)/i), { target: { value: '300' } });
    fireEvent.change(screen.getByLabelText(/Materials/i), { target: { value: 'Bricks, Mortar' } });
    fireEvent.change(screen.getByLabelText(/Location/i), { target: { value: '123 Main St' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Create Estimate/i }));

    expect(mockSubmit).toHaveBeenCalled();
  });

  it('displays an error message when submission fails', async () => {
    // Mock the fetch call to simulate a failed submission
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Failed to create estimate'))
    );

    render(
      <AuthProvider value={{ user: { name: 'John Doe' } }}>
        <MemoryRouter>
          <EstimateForm />
        </MemoryRouter>
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/Project Type/i), { target: { value: 'Brick Wall' } });
    fireEvent.change(screen.getByLabelText(/Size \(sq ft\)/i), { target: { value: '300' } });
    fireEvent.change(screen.getByLabelText(/Materials/i), { target: { value: 'Bricks, Mortar' } });
    fireEvent.change(screen.getByLabelText(/Location/i), { target: { value: '123 Main St' } });

    fireEvent.click(screen.getByRole('button', { name: /Create Estimate/i }));

    expect(await screen.findByText(/Failed to create estimate. Please try again./i)).toBeInTheDocument();
  });
});
