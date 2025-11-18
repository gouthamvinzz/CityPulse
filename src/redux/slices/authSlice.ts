import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { UserProfile } from '../../types';

export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'error';

interface AuthState {
  user: UserProfile | null;
  status: AuthStatus;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthLoading(state) {
      state.status = 'loading';
      state.error = null;
    },
    setAuthError(state, action: PayloadAction<string | null>) {
      state.status = 'error';
      state.error = action.payload;
    },
    setUser(state, action: PayloadAction<UserProfile | null>) {
      state.user = action.payload;
      state.status = action.payload ? 'authenticated' : 'idle';
      state.error = null;
    },
    clearAuth(state) {
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
  },
});

export const { setAuthLoading, setAuthError, setUser, clearAuth } =
  authSlice.actions;

export default authSlice.reducer;

