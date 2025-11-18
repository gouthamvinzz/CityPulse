import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { CityEvent } from '../types';

interface EventCardProps {
  event: CityEvent;
  onPress?: () => void;
  onToggleFavorite: () => void;
  isFavorite: boolean;
}

const EventCard = ({
  event,
  onPress,
  onToggleFavorite,
  isFavorite,
}: EventCardProps) => (
  <View style={styles.card}>
    <TouchableOpacity onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.city}>{event.title}</Text>
        <TouchableOpacity
          onPress={onToggleFavorite}
          style={styles.favorite}
          testID={`favorite-${event.id}`}>
          <FontAwesome
            name={isFavorite ? 'star' : 'star-o'}
            color={isFavorite ? '#fbbf24' : '#cbd5f5'}
            size={20}
          />

        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{event.venue}</Text>
      <Text style={styles.meta}>{event.description}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
    borderWidth: 0.5,
    borderColor: '#e2e8f0',
    shadowColor: '#0f172a',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  city: {
    fontSize: 14,
    color: '#6366f1',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  favorite: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 8,
    color: '#0f172a',
  },
  meta: {
    fontSize: 14,
    color: '#475569',
  },
});

export default EventCard;

