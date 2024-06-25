import React from 'react';
import { render } from '@testing-library/react-native';
import Onboarding2 from '../Onboarding2';

describe('Onboarding2 Component', () => {
  it('should render correctly', () => {
    const { getByText } = render(<Onboarding2 />);
    expect(getByText('Welcome to Onboarding2')).toBeTruthy();
  });

  it('should handle props correctly', () => {
    const { getByText } = render(<Onboarding2 subtitle="Test Subtitle" />);
    expect(getByText('Test Subtitle')).toBeTruthy();
  });
});
