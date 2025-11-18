import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface FavoritesState {
  ids: Record<string, true>;
}

const initialState: FavoritesState = {
  ids: {},
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavoriteId(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (state.ids[id]) {
        delete state.ids[id];
      } else {
        state.ids[id] = true;
      }
    },
    clearFavorites(state) {
      state.ids = {};
    },
  },
});

export const { toggleFavoriteId, clearFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;

