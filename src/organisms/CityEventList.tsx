import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import EventCard from '../molecules/EventCard';
import { CityEvent } from '../types';

interface CityEventListProps {
  city: string;
  events: CityEvent[];
  onSelect: (event: CityEvent) => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const CityEventList = ({
  city,
  events,
  onSelect,
  toggleFavorite,
  isFavorite,
}: CityEventListProps) => (
  <View style={styles.container}>
    <Text style={styles.city}>{city}</Text>
    {events?.map(event => (
      <EventCard
        key={event.id}
        event={event}
        onPress={() => onSelect(event)}
        onToggleFavorite={() => toggleFavorite(event.id)}
        isFavorite={isFavorite(event.id)}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  city: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    color: '#0f172a',
  },
});

export default CityEventList;

