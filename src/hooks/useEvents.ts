import { useCallback, useMemo } from 'react';

import {
  setEvents,
  setEventsError,
  startLoading,
} from '../redux/slices/eventsSlice';
import { useAppDispatch, useAppSelector } from './useRedux';
import { fetchEvents } from '../services/api/eventsApi';
import { groupEventsByCity } from '../utils/groupEventsByCity';

export const useEvents = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error, query } = useAppSelector(
    state => state.events,
  );
  const getEvents = useCallback(async () => {
    dispatch(startLoading(undefined));
    try {
      const result = await fetchEvents();
      dispatch(setEvents(result));
      return result;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'unable to load events';
      dispatch(setEventsError(message));
      throw err;
    }
  }, [dispatch]);

  const searchEvents = useCallback(
    async (term: string) => {
      const sanitized = term.trim();
      if (!sanitized) {
        return getEvents();
      }

      dispatch(startLoading(sanitized));
      try {
        const allEvents = await fetchEvents();
        const lower = sanitized.toLowerCase();

        const payload = allEvents.filter(event => {
          const city = event.city.toLowerCase();
          const title = event.title.toLowerCase();
          const venue = event.venue.toLowerCase();
          const desc = event.description.toLowerCase();
          return city.includes(lower) || title.includes(lower) || venue.includes(lower) || desc.includes(lower);
        });

        dispatch(setEvents(payload));
        return payload;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'unable to search events';
        dispatch(setEventsError(message));
        throw err;
      }
    },
    [dispatch, getEvents],
  );

  const groupedEvents = useMemo(
    () => groupEventsByCity(items),
    [items],
  );

  return {
    events: items,
    groupedEvents,
    loading,
    error,
    query,
    getEvents,
    searchEvents,
  };
};

