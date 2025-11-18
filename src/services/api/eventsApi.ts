import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

import { CityEvent } from '../../types';
import { eventsRef } from '../firebase';

const serializeSnapshot = (snapshot: FirebaseFirestoreTypes.QuerySnapshot<CityEvent>) =>
  snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CityEvent));

export const fetchEvents = async () => {
  const snapshot = await eventsRef().orderBy('date', 'asc').get();
  return serializeSnapshot(snapshot);
};

export const searchEventsByCity = async (city: string) => {
  const snapshot = await eventsRef().where('city', '==', city).get();
  return serializeSnapshot(snapshot);
};

export const searchEventsByName = async (name: string) => {
  const snapshot = await eventsRef()
    .orderBy('title')
    .startAt(name)
    .endAt(`${name}\uf8ff`)
    .get();
  return serializeSnapshot(snapshot);
};

export const getEventById = async (id: string) => {
  const doc = await eventsRef().doc(id).get();
  return doc.exists ? ({ id: doc.id, ...doc.data() } as CityEvent) : null;
};


export const createEvent = async (data: any) => {
  const { id, ...rest } = data as CityEvent;
  const docRef = await eventsRef().add(rest as CityEvent);
  const doc = await docRef.get();
  return { id: doc.id, ...(doc.data() as CityEvent) } as CityEvent;
};


