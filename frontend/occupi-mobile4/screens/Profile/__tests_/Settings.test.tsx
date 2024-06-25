import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Settings from '../Settings';

describe('Settings Component', () => {
  it('should render correctly', () => {
    const { getByText } = render(<Settings />);
    expect(getByText('Settings')).toBeTruthy();
  });

  it('should display notifications toggle', () => {
    const { getByText } = render(<Settings />);
    expect(getByText('Notifications')).toBeTruthy();
  });

  it('should handle notifications toggle', () => {
    const mockToggleNotifications = jest.fn();
    const { getByTestId } = render(<Settings onToggleNotifications={mockToggleNotifications} />);
    
    fireEvent.press(getByTestId('toggle-notifications'));
    expect(mockToggleNotifications).toHaveBeenCalled();
  });
});
