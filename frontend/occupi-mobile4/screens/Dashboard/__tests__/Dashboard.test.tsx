import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Dashboard from '../Dashboard';

describe('Dashboard Component', () => {
  it('should render correctly', () => {
    const { getByText } = render(<Dashboard />);
    expect(getByText('Dashboard')).toBeTruthy();
  });

  it('should display user name', () => {
    const { getByText } = render(<Dashboard userName="Jane Doe" />);
    expect(getByText('Jane Doe')).toBeTruthy();
  });

  it('should handle logout button press', () => {
    const mockLogout = jest.fn();
    const { getByText } = render(<Dashboard onLogout={mockLogout} />);
    
    fireEvent.press(getByText('Logout'));
    expect(mockLogout).toHaveBeenCalled();
  });

  it('should display office occupancy data', () => {
    const officeData = {
      totalOffices: 5,
      occupied: 3,
      available: 2,
    };
    const { getByText } = render(<Dashboard officeData={officeData} />);
    expect(getByText('Total Offices: 5')).toBeTruthy();
    expect(getByText('Occupied: 3')).toBeTruthy();
    expect(getByText('Available: 2')).toBeTruthy();
  });
});
