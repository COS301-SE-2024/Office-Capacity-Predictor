import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SignUp from '../SignUp';

describe('SignUp Component', () => {
  it('should render correctly', () => {
    const { getByPlaceholderText } = render(<SignUp />);
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByPlaceholderText('Confirm Password')).toBeTruthy();
  });

  it('should handle form submission', () => {
    const mockSubmit = jest.fn();
    const { getByText, getByPlaceholderText } = render(<SignUp onSubmit={mockSubmit} />);
    
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password');
    fireEvent.changeText(getByPlaceholderText('Confirm Password'), 'password');
    fireEvent.press(getByText('Sign Up'));

    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
      confirmPassword: 'password',
    });
  });
});
