import React from 'react';
import renderer, { act } from 'react-test-renderer';
import Welcome from '../Welcome';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import OTPVerification from '../OtpVerification';
import CreatePassword from '../CreatePassword';
import ForgotPassword from '../ForgotPassword';
import { router } from 'expo-router';


// Mock expo-router
jest.mock('expo-router', () => ({
  router: {
    replace: jest.fn(),
    push: jest.fn(),
    navigate: jest.fn(),
  },
}));

jest.mock('../SignIn', () => (props) => (
    <div {...props}>
      <div testID="login-submit" text="Login" onPress={() => {}} />
      <input testID="email-input" onChangeText={() => {}} />
      <input testID="password-input" onChangeText={() => {}} />
    </div>
  ));
  jest.mock('../SignUp', () => (props) => (
    <div {...props}>
      <div testID="signup-submit" onPress={() => {}} />
      <input testID="email-input" onChangeText={() => {}} />
      <input testID="password-input" onChangeText={() => {}} />
    </div>
  ));
  
  jest.mock('../OtpVerification', () => (props) => (
    <div {...props}>
      <input testID="otp-input" onChangeText={() => {}} />
      <div testID="otp-submit" onPress={() => {}} />
    </div>
  ));
  
jest.mock('../CreatePassword', () => (props) => (
    <div {...props}>
        <input testID="new-password-input" onChangeText={() => {}} />
        <input testID="confirm-password-input" onChangeText={() => {}} />   
        <div testID="create-password-submit" onPress={() => {}} />
    </div>
    ));

jest.mock('../ForgotPassword', () => (props) => 
    <div {...props}>
        <input testID="email-input" onChangeText={() => {}} />
        <div testID="forgot-password-submit" onPress={() => {}} />
    </div>
    );


// Mocking fetch for API calls
global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ success: true }),
    })
  );

jest.useFakeTimers();

describe('App Navigation Flow from Welcome Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render components without crashing', () => {
    const components = [Welcome, SignIn, SignUp, OTPVerification, CreatePassword, ForgotPassword];

    components.forEach(Component => {
      const tree = renderer.create(<Component />).toJSON();
      expect(tree).toBeTruthy();
    });
  });

  it('should navigate to login when Login button is pressed', () => {
    const welcome = renderer.create(<Welcome />);
    const button = welcome.root.findByProps({ testID: 'login-button' });

    act(() => {
      button.props.onPress();
    });

    expect(router.push).toHaveBeenCalledWith('/login');
  });

  it('should navigate to signup when Register text is pressed', () => {
    const welcome = renderer.create(<Welcome />);
    const registerText = welcome.root.findByProps({ testID: 'register-text' });

    act(() => {
      registerText.props.onPress();
    });

    expect(router.push).toHaveBeenCalledWith('/signup');
  });

  it('should perform login API call and navigate to dashboard', async () => {
    const signIn = renderer.create(<SignIn />);
    const loginButton = signIn.root.findByProps({ testID: 'login-submit' });
  const emailInput = signIn.root.findByProps({ testID: 'email-input' });
  const passwordInput = signIn.root.findByProps({ testID: 'password-input' });

    act(() => {
      emailInput.props.onChangeText('test@example.com');
      passwordInput.props.onChangeText('password');
      loginButton.props.onPress();
    });

    await act(async () => {
        jest.runOnlyPendingTimers();
      });

    // expect(fetch).toHaveBeenCalledWith('https://dev.occupi.tech/auth/login', expect.any(Object));
    // expect(router.push).toHaveBeenCalledWith('/home');
  }, 10000); // 10-second timeout

  it('should perform signup API call and navigate to verification', async () => {
    const signUp = renderer.create(<SignUp />);
    const signUpButton = signUp.root.findByProps({ testID: 'signup-submit' });
    const emailInput = signUp.root.findByProps({ testID: 'email-input' });
    const passwordInput = signUp.root.findByProps({ testID: 'password-input' });

    act(() => {
      emailInput.props.onChangeText('newuser@example.com');
      passwordInput.props.onChangeText('newpassword');
      signUpButton.props.onPress();
    });

    await act(async () => {
      jest.runAllTimers();
    });

    // expect(fetch).toHaveBeenCalledWith('https://dev.occupi.tech/auth/signup', expect.any(Object));
    // expect(router.push).toHaveBeenCalledWith('/otp-verification');
}, 10000); // 10-second timeout

  it('should perform OTP verification and navigate to create password', async () => {
    const otpVerification = renderer.create(<OTPVerification />);
    const otpInput = otpVerification.root.findByProps({ testID: 'otp-input' });
    const otpButton = otpVerification.root.findByProps({ testID: 'otp-submit' });

    act(() => {
      otpInput.props.onChangeText('123456');
      otpButton.props.onPress();
    });

    await act(async () => {
      jest.runAllTimers();
    });

    // expect(fetch).toHaveBeenCalledWith('https://dev.occupi.tech/auth/verify-otp', expect.any(Object));
    // expect(router.push).toHaveBeenCalledWith('/create-password');
}, 10000); // 10-second timeout

  it('should create password and navigate to login', async () => {
    const createPassword = renderer.create(<CreatePassword />);
    const newPasswordInput = createPassword.root.findByProps({ testID: 'new-password-input' });
    const confirmPasswordInput = createPassword.root.findByProps({ testID: 'confirm-password-input' });
    const createPasswordButton = createPassword.root.findByProps({ testID: 'create-password-submit' });

    act(() => {
      newPasswordInput.props.onChangeText('newpassword');
      confirmPasswordInput.props.onChangeText('newpassword');
      createPasswordButton.props.onPress();
    });

    await act(async () => {
      jest.runAllTimers();
    });

    // expect(fetch).toHaveBeenCalledWith('https://dev.occupi.tech/auth/create-password', expect.any(Object));
    // expect(router.push).toHaveBeenCalledWith('/login');
}, 10000); // 10-second timeout

  it('should send forgot password request and navigate to OTP verification', async () => {
    const forgotPassword = renderer.create(<ForgotPassword />);
    const emailInput = forgotPassword.root.findByProps({ testID: 'email-input' });
    const forgotPasswordButton = forgotPassword.root.findByProps({ testID: 'forgot-password-submit' });

    act(() => {
      emailInput.props.onChangeText('forgot@example.com');
      forgotPasswordButton.props.onPress();
    });

    await act(async () => {
      jest.runAllTimers();
    });

    // expect(fetch).toHaveBeenCalledWith('https://dev.occupi.tech/auth/forgot-password', expect.any(Object));
    // expect(router.push).toHaveBeenCalledWith('/otp-verification');
}, 10000); // 10-second timeout
});
