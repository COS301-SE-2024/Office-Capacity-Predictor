import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CreatePassword from '../CreatePassword';

describe('CreatePassword Component', () => {
  it('should render correctly', () => {
    const { getByPlaceholderText } = render(<CreatePassword />);
    expect(getByPlaceholderText('New Password')).toBeTruthy();
    expect(getByPlaceholderText('Confirm Password')).toBeTruthy();
  });

  it('should handle form submission', () => {
    const mockSubmit = jest.fn();
    const { getByText, getByPlaceholderText } = render(<CreatePassword onSubmit={mockSubmit} />);
    
    fireEvent.changeText(getByPlaceholderText('New Password'), 'newpassword');
    fireEvent.changeText(getByPlaceholderText('Confirm Password'), 'newpassword');
    fireEvent.press(getByText('Create Password'));

    expect(mockSubmit).toHaveBeenCalledWith({
      newPassword: 'newpassword',
      confirmPassword: 'newpassword',
    });
  });
});
