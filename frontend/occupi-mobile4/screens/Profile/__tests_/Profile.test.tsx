import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Profile from '../Profile';

describe('Profile Component', () => {
  it('should render correctly', () => {
    const { getByText } = render(<Profile />);
    expect(getByText('Profile')).toBeTruthy();
  });

  it('should display user name', () => {
    const { getByText } = render(<Profile userName="John Doe" />);
    expect(getByText('John Doe')).toBeTruthy();
  });

  it('should handle edit profile button press', () => {
    const mockEditProfile = jest.fn();
    const { getByText } = render(<Profile onEditProfile={mockEditProfile} />);
    
    fireEvent.press(getByText('Edit Profile'));
    expect(mockEditProfile).toHaveBeenCalled();
  });
});
