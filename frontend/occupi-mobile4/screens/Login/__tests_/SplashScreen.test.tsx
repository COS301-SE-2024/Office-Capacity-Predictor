import React from 'react';
import { render } from '@testing-library/react-native';
import SplashScreen from '../SplashScreen';

describe('SplashScreen Component', () => {
  it('should render correctly', () => {
    const { getByText } = render(<SplashScreen />);
    expect(getByText('Loading...')).toBeTruthy();
  });

  it('should display the splash screen image', () => {
    const { getByTestId } = render(<SplashScreen />);
    expect(getByTestId('splash-image')).toBeTruthy();
  });
});
