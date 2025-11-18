import { getApp, getApps, initializeApp } from '@react-native-firebase/app';

export const firebaseCollections = {
  events: 'events',
  users: 'users',
} as const;

export type FirebaseCollection =
  (typeof firebaseCollections)[keyof typeof firebaseCollections];

const env =
  typeof process !== 'undefined' && process.env ? process.env : ({} as Record<string, string>);

const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY ?? 'AIzaSyDFtDZWPzS-CzbIh5uOr25km_h6qT6sjSQ',
  appId: env.FIREBASE_APP_ID ?? '1:725053475776:ios:485bd1e5ad62e4e5c8d625',
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID ?? '725053475776',
  projectId: env.FIREBASE_PROJECT_ID ?? 'citypulse-2c3bd',
  storageBucket: env.FIREBASE_STORAGE_BUCKET ?? 'citypulse-2c3bd.firebasestorage.app',
};

const fallbackConfig = {
  ...firebaseConfig,
  apiKey: firebaseConfig.apiKey || 'demo-key',
  appId: firebaseConfig.appId || '1:demo:app',
};

export const ensureFirebaseApp = () => {
  if (getApps().length) {
    return getApp();
  }

  const configToUse =
    firebaseConfig.apiKey && firebaseConfig.appId ? firebaseConfig : fallbackConfig;

  return initializeApp(configToUse);
};

