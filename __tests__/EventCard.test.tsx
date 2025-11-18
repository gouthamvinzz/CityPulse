import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import EventCard from '../src/molecules/EventCard';
import { CityEvent } from '../src/types';

const mockEvent: CityEvent = {
  id: '1',
  title: 'City Concert',
  city: 'Chennai',
  date: new Date().toISOString(),
  venue: 'Music Hall',
  lat: 13.0827,
  lng: 80.2707,
  description: 'A fun event',
  category: 'Music',
};

describe('EventCard', () => {
  it('renders event details and toggles favorites', () => {
    const toggleFavorite = jest.fn();
    const onPress = jest.fn();

    const { getByText, getByTestId } = render(
      <EventCard
        event={mockEvent}
        onPress={onPress}
        onToggleFavorite={toggleFavorite}
        isFavorite={false}
      />,
    );

    expect(getByText(/City Concert/)).toBeTruthy();
    fireEvent.press(getByText(/City Concert/));
    fireEvent.press(getByTestId('favorite-1'));
    expect(onPress).toHaveBeenCalled();
    expect(toggleFavorite).toHaveBeenCalled();
  });
});

