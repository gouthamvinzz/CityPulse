import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('@react-native-firebase/app', () => ({
  firebase: {
    apps: [],
    initializeApp: jest.fn(),
    app: jest.fn(() => ({})),
  },
}));

jest.mock('@react-native-firebase/auth', () => {
  return () => ({
    signInWithEmailAndPassword: jest.fn(() =>
      Promise.resolve({ user: { uid: '1' } }),
    ),
    createUserWithEmailAndPassword: jest.fn(() =>
      Promise.resolve({ user: { uid: '1' } }),
    ),
    signOut: jest.fn(() => Promise.resolve()),
    currentUser: { uid: '1' },
    onAuthStateChanged: jest.fn(),
  });
});

jest.mock('@react-native-firebase/firestore', () => {
  const collectionMock = () => ({
    doc: () => ({
      set: jest.fn(() => Promise.resolve()),
      get: jest.fn(() => Promise.resolve({ exists: true, data: () => ({}) })),
    }),
    orderBy: () => collectionMock(),
    get: jest.fn(() => Promise.resolve({ docs: [] })),
    where: () => collectionMock(),
    startAt: () => collectionMock(),
    endAt: () => collectionMock(),
  });
  return () => ({
    collection: collectionMock,
  });
});

