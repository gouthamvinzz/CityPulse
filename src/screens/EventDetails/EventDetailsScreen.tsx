import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { useFavorites } from '../../hooks/useFavorites';
import { RootStackParamList } from '../../navigation/types';
import { formatEventDate } from '../../utils/formatDate';

type Props = NativeStackScreenProps<RootStackParamList, 'EventDetails'>;

const EventDetailsScreen = ({ route }: Props) => {
  const { t } = useTranslation();
  const { event } = route.params;
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(event.id);
  const latitude = Number(event.lat) || 13.0827;
  const longitude = Number(event.lng) || 80.2707;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.titleBlock}>
            <Text style={styles.title}>{event.title}</Text>
            <Text style={styles.city}>{event.city}</Text>
          </View>
          <TouchableOpacity
            style={styles.favorite}
            onPress={() => toggleFavorite(event.id)}>
            <FontAwesome
              name={favorite ? 'star' : 'star-o'}
              color={favorite ? '#fbbf24' : '#cbd5f5'}
              size={28}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>{t('events.venue')}:</Text>
          <Text style={styles.metaValue}>{event.venue}</Text>
        </View>

       

        {event.category ? (
          <View style={styles.chip}>
            <Text style={styles.chipText}>{event.category}</Text>
          </View>
        ) : null}

        <MapView
          style={styles.map}
          pointerEvents="none"
          region={{
            latitude,
            longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}>
          <Marker
            coordinate={{ latitude, longitude }}
            title={event.title}
            description={event.venue}
          />
        </MapView>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {t('events.description') ?? 'Description'}
          </Text>
          <Text style={styles.description}>{event.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#0f172a',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleBlock: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#0f172a',
  },
  city: {
    marginTop: 4,
    fontSize: 14,
    color: '#6366f1',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  favorite: {
    padding: 8,
  },
  metaRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  metaLabel: {
    fontWeight: '600',
    color: '#475569',
    marginRight: 4,
  },
  metaValue: {
    color: '#475569',
  },
  chip: {
    alignSelf: 'flex-start',
    marginTop: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#eef2ff',
  },
  chipText: {
    fontSize: 12,
    color: '#4f46e5',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  map: {
    height: 220,
    marginVertical: 20,
    borderRadius: 16,
  },
  section: {
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    color: '#0f172a',
  },
  description: {
    fontSize: 15,
    color: '#334155',
    lineHeight: 22,
  },
});

export default EventDetailsScreen;
