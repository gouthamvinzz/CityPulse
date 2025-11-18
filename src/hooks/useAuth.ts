import { useCallback } from 'react';

import { clearAuth, setAuthError, setAuthLoading, setUser } from '../redux/slices/authSlice';
import { clearFavorites } from '../redux/slices/favoritesSlice';
import { useAppDispatch, useAppSelector } from './useRedux';
import { getUserProfile, saveUserProfile, signInWithEmail, signOut, signUpWithEmail } from '../services/firebase';
import { UserProfile } from '../types';

interface SignUpPayload {
  name: string;
  phone: string;
  email: string;
  password: string;
}

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, status, error } = useAppSelector(state => state.auth);

  const signIn = useCallback(
    async (email: string, password: string) => {
      dispatch(setAuthLoading());
      try {
        const credential = await signInWithEmail(email, password);
        const profile = await getUserProfile(credential.user.uid);

        if (profile) {
          dispatch(setUser(profile));
          return profile;
        }

        const fallbackProfile: UserProfile = {
          uid: credential.user.uid,
          email: credential.user.email ?? email,
          name: credential.user.displayName ?? 'CityPulse user',
          phone: credential.user.phoneNumber ?? '',
        };
        await saveUserProfile(fallbackProfile);
        dispatch(setUser(fallbackProfile));
        return fallbackProfile;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Unable to sign in, try again.';
        dispatch(setAuthError(message));
        throw err;
      }
    },
    [dispatch],
  );

  const signUp = useCallback(
    async ({ email, password, name, phone }: SignUpPayload) => {
      dispatch(setAuthLoading());
      try {
        const credential = await signUpWithEmail(email, password);
        const profile: UserProfile = {
          uid: credential.user.uid,
          email,
          name,
          phone,
        };
        await saveUserProfile(profile);
        dispatch(setUser(profile));
        return profile;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Unable to sign up, try again.';
        dispatch(setAuthError(message));
        throw err;
      }
    },
    [dispatch],
  );

  const logout = useCallback(async () => {
    await signOut();
    dispatch(clearFavorites());
    dispatch(clearAuth());
  }, [dispatch]);

  const fetchUserProfile = useCallback(
    async (uid: string) => {
      const profile = await getUserProfile(uid);
      if (profile) {
        dispatch(setUser(profile));
      }
      return profile;
    },
    [dispatch],
  );

  return {
    user,
    status,
    error,
    signIn,
    signUp,
    logout,
    fetchUserProfile,
  };
};

