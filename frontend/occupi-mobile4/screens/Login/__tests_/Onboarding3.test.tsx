import React from 'react';
import { render } from '@testing-library/react-native';
import Onboarding3 from '../Onboarding3';

describe('Onboarding3 Component', () => {
  it('should render correctly', () => {
    const { getByText } = render(<Onboarding3 />);
    expect(getByText('Welcome to Onboarding3')).toBeTruthy();
  });

  it('should handle props correctly', () => {
    const { getByText } = render(<Onboarding3 description="Test Description" />);
    expect(getByText('Test Description')).toBeTruthy();
  });
});
