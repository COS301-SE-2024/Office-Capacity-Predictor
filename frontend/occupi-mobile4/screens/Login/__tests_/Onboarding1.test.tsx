import React from 'react';
import { render } from '@testing-library/react-native';
import Onboarding1 from '../Onboarding1';

describe('Onboarding1 Component', () => {
  it('should render correctly', () => {
    const { getByText } = render(<Onboarding1 />);
    expect(getByText('Welcome to Onboarding1')).toBeTruthy();
  });

  it('should handle props correctly', () => {
    const { getByText } = render(<Onboarding1 title="Test Title" />);
    expect(getByText('Test Title')).toBeTruthy();
  });
});
