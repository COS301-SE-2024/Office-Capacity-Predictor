import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ForgotPassword from '../ForgotPassword';

describe('ForgotPassword Component', () => {
  it('should render correctly', () => {
    const { getByPlaceholderText } = render(<ForgotPassword />);
    expect(getByPlaceholderText('Email')).toBeTruthy();
  });

  it('should handle form submission', () => {
    const mockSubmit = jest.fn();
    const { getByText, getByPlaceholderText } = render(<ForgotPassword onSubmit={mockSubmit} />);
    
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.press(getByText('Reset Password'));

    expect(mockSubmit).toHaveBeenCalledWith('test@example.com');
  });
});
