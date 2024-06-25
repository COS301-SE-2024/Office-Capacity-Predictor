import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import OtpVerification from '../OtpVerification';

describe('OtpVerification Component', () => {
  it('should render correctly', () => {
    const { getByPlaceholderText } = render(<OtpVerification />);
    expect(getByPlaceholderText('Enter OTP')).toBeTruthy();
  });

  it('should handle OTP submission', () => {
    const mockSubmit = jest.fn();
    const { getByText, getByPlaceholderText } = render(<OtpVerification onSubmit={mockSubmit} />);
    
    fireEvent.changeText(getByPlaceholderText('Enter OTP'), '123456');
    fireEvent.press(getByText('Verify'));

    expect(mockSubmit).toHaveBeenCalledWith('123456');
  });
});
