import React from 'react';
import { render } from '@testing-library/react-native';
import Welcome from '../Welcome';

describe('Welcome Component', () => {
  it('should render correctly', () => {
    const { getByText } = render(<Welcome />);
    expect(getByText('Welcome to the App')).toBeTruthy();
  });

  it('should display the register button', () => {
    const { getByText } = render(<Welcome />);
    expect(getByText('Register')).toBeTruthy();
  });

  it('should display the login button', () => {
    const { getByText } = render(<Welcome />);
    expect(getByText('Login')).toBeTruthy();
  });
});
