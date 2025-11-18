import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { CityEvent } from '../../types';

interface EventsState {
  items: CityEvent[];
  loading: boolean;
  error: string | null;
  query: string;
}

const initialState: EventsState = {
  items: [],
  loading: false,
  error: null,
  query: '',
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    startLoading(state, action: PayloadAction<string | undefined>) {
      state.loading = true;
      state.error = null;
      state.query = action.payload ?? '';
    },
    setEvents(state, action: PayloadAction<CityEvent[]>) {
      state.items = action.payload;
      state.loading = false;
    },
    setEventsError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    resetEvents(state) {
      state.items = [];
      state.loading = false;
      state.error = null;
      state.query = '';
    },
  },
});

export const { startLoading, setEvents, setEventsError, resetEvents } =
  eventsSlice.actions;

export default eventsSlice.reducer;

