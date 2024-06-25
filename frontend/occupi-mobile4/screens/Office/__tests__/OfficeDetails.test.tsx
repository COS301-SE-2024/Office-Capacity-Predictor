import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import OfficeDetails from '../OfficeDetails';

describe('OfficeDetails Component', () => {
  it('should render correctly', () => {
    const { getByText } = render(<OfficeDetails />);
    expect(getByText('Office Details')).toBeTruthy();
  });

  it('should display office name', () => {
    const { getByText } = render(<OfficeDetails officeName="Main Office" />);
    expect(getByText('Main Office')).toBeTruthy();
  });

  it('should handle button press', () => {
    const mockNavigate = jest.fn();
    const { getByText } = render(<OfficeDetails onNavigate={mockNavigate} />);
    
    fireEvent.press(getByText('Navigate'));
    expect(mockNavigate).toHaveBeenCalled();
  });
});
