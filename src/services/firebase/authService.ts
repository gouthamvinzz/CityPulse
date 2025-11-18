import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

export const signInWithEmail = (email: string, password: string) =>
  auth().signInWithEmailAndPassword(email, password);

export const signUpWithEmail = (email: string, password: string) =>
  auth().createUserWithEmailAndPassword(email, password);

export const signOut = () => auth().signOut();

export const onAuthChanged = (
  handler: (user: FirebaseAuthTypes.User | null) => void,
) => auth().onAuthStateChanged(handler);

export const getCurrentUser = () => auth().currentUser;

