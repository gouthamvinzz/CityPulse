import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { SupportedLanguage } from '../../types';

interface LanguageState {
  current: SupportedLanguage;
  isRTL: boolean;
}

const initialState: LanguageState = {
  current: 'en',
  isRTL: false,
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<SupportedLanguage>) {
      state.current = action.payload;
      state.isRTL = action.payload === 'ar';
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;

