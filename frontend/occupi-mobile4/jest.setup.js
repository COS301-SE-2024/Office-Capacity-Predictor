import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.NativeModules.StatusBarManager = { getHeight: jest.fn() };
  return RN;
});

global.__fbBatchedBridgeConfig = { 
  remoteModuleConfig: [], 
  localModulesConfig: [] 
};

// Add this to your existing jestSetupFile.js
jest.mock('@gluestack-ui/themed', () => ({
  useToast: jest.fn(),
  Toast: 'Toast',
  ToastTitle: 'ToastTitle',
  View: 'View',
  // Add any other components or hooks you're using from @gluestack-ui/themed
}));