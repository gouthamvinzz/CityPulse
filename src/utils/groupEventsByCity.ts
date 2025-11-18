import { CityEvent } from '../types';

export const groupEventsByCity = (events: CityEvent[]) =>
  events.reduce<Record<string, CityEvent[]>>((acc, event) => {
    if (!acc[event.city]) {
      acc[event.city] = [];
    }
    acc[event.city].push(event);
    return acc;
  }, {});

