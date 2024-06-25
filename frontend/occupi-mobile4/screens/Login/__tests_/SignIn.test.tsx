import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SignIn from '../SignIn';

describe('SignIn Component', () => {
  it('should render correctly', () => {
    const { getByPlaceholderText } = render(<SignIn />);
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
  });

  it('should handle form submission', () => {
    const mockSubmit = jest.fn();
    const { getByText, getByPlaceholderText } = render(<SignIn onSubmit={mockSubmit} />);
    
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password');
    fireEvent.press(getByText('Sign In'));

    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
    });
  });
});
