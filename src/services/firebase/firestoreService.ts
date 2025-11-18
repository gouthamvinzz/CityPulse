import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

import { CityEvent, UserProfile } from '../../types';
import { firebaseCollections } from './config';

const usersRef = (): FirebaseFirestoreTypes.CollectionReference<UserProfile> =>
  firestore().collection(firebaseCollections.users) as FirebaseFirestoreTypes.CollectionReference<UserProfile>;

export const saveUserProfile = async (profile: UserProfile) => {
  await usersRef().doc(profile.uid).set(profile, { merge: true });
  return profile;
};

export const getUserProfile = async (uid: string) => {
  const snapshot = await usersRef().doc(uid).get();
  return snapshot.data() ?? null;
};

export const eventsRef = (): FirebaseFirestoreTypes.CollectionReference<CityEvent> =>
  firestore().collection(firebaseCollections.events) as FirebaseFirestoreTypes.CollectionReference<CityEvent>;

