import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  NavigationProp,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import SearchBar from '../../molecules/SearchBar';
import CityEventList from '../../organisms/CityEventList';
import { useEvents } from '../../hooks/useEvents';
import { useFavorites } from '../../hooks/useFavorites';
import { useAuth } from '../../hooks/useAuth';
import { RootStackParamList } from '../../navigation/types';
import { CityEvent } from '../../types';
import { SafeAreaView } from 'react-native-safe-area-context';

const DashboardScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { t } = useTranslation();
  const { events, groupedEvents, loading, error, getEvents, searchEvents } =
    useEvents();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { user } = useAuth();
  const [search, setSearch] = useState('');

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  useEffect(() => {
    if (!search.trim()) {
      getEvents();
    }
  }, [getEvents, search]);

  useFocusEffect(
    useCallback(() => {
      // Refresh events whenever the Dashboard screen gains focus
      getEvents();
    }, [getEvents]),
  );

  const handleSearchChange = useCallback(
    (text: string) => {
      setSearch(text);
      searchEvents(text);
    },
    [searchEvents],
  );

  const handleSearchSubmit = useCallback(() => {
    searchEvents(search);
  }, [search, searchEvents]);

  const handleSelectEvent = useCallback(
    (event: CityEvent) => {
      navigation.navigate('EventDetails', { event });
    },
    [navigation],
  );

  const cities = Object.keys(groupedEvents);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flex}>
        {user?.name ? (
          <Text style={styles.welcome}>Hello {user.name}!</Text>
        ) : null}

        <SearchBar
          value={search}
          onChangeText={handleSearchChange}
          placeholder={t('common.search_placeholder')}
          onSubmit={handleSearchSubmit}
        />

        <ScrollView
          style={styles.flex}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={getEvents} />
          }>
          {loading && !events.length ? (
            <ActivityIndicator style={styles.loader} />
          ) : null}

          {!loading && !events.length ? (
            <Text style={styles.empty}>{t('dashboard.empty_state')}</Text>
          ) : (
            cities.map(city => (
              <CityEventList
                key={city}
                city={city}
                events={groupedEvents[city] ?? []}
                onSelect={handleSelectEvent}
                toggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
              />
            ))
          )}

          {error ? <Text style={styles.error}>{error}</Text> : null}
        </ScrollView>

        <TouchableOpacity
          style={styles.fab}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('AddEvent')}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 16,
  },
  loader: {
    marginTop: 40,
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#94a3b8',
  },
  error: {
    marginTop: 16,
    textAlign: 'center',
    color: '#ef4444',
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  fabText: {
    color: '#fff',
    fontSize: 30,
    lineHeight: 32,
  },
  welcome: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    color: '#0f172a',
  },
});

export default DashboardScreen;

