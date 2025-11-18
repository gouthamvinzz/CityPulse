import React, { useCallback, useMemo, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Button from '../../atoms/Button';
import { RootStackParamList } from '../../navigation/types';
import { createEvent } from '../../services/api/eventsApi';

type Props = NativeStackScreenProps<RootStackParamList, 'AddEvent'>;

const AddEventScreen = ({ navigation }: Props) => {
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [venue, setVenue] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const isValid = useMemo(() => {
    if (
      !title.trim() ||
      !city.trim() ||
      !date.trim() ||
      !venue.trim() ||
      !lat.trim() ||
      !lng.trim() ||
      !description.trim()
    ) {
      return false;
    }

    const latNum = Number(lat);
    const lngNum = Number(lng);
    return Number.isFinite(latNum) && Number.isFinite(lngNum);
  }, [title, city, date, venue, lat, lng, description]);

  const handleSubmit = useCallback(async () => {
    if (!isValid || submitting) {
      return;
    }

    try {
      setSubmitting(true);

      await createEvent({
        title: title.trim(),
        city: city.trim(),
        date: new Date(date.trim()),
        venue: venue.trim(),
        createdAt: new Date(),
        updatedAt: new Date(),
        lat: Number(lat),
        lng: Number(lng),
        description: description.trim(),
        category: category.trim() || '',
      });

      navigation.navigate('MainTabs', { screen: 'Dashboard' });
    } catch (error) {
      Alert.alert('Error', 'Unable to create event. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }, [
    category,
    city,
    date,
    description,
    isValid,
    lat,
    lng,
    navigation,
    submitting,
    title,
    venue,
  ]);

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Add Event</Text>

        <View style={styles.field}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Event title"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            value={city}
            onChangeText={setCity}
            placeholder="City"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Date</Text>
          <TextInput
            style={styles.input}
            value={date}
            onChangeText={setDate}
            placeholder="YYYY-MM-DD"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Venue</Text>
          <TextInput
            style={styles.input}
            value={venue}
            onChangeText={setVenue}
            placeholder="Venue"
          />
        </View>

        <View style={styles.inlineRow}>
          <View style={[styles.field, styles.inlineField]}>
            <Text style={styles.label}>Latitude</Text>
            <TextInput
              style={styles.input}
              value={lat}
              onChangeText={setLat}
              placeholder="e.g. 13.0827"
              keyboardType="numeric"
            />
          </View>
          <View style={[styles.field, styles.inlineField]}>
            <Text style={styles.label}>Longitude</Text>
            <TextInput
              style={styles.input}
              value={lng}
              onChangeText={setLng}
              placeholder="e.g. 80.2707"
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Category (optional)</Text>
          <TextInput
            style={styles.input}
            value={category}
            onChangeText={setCategory}
            placeholder="Music, Food, etc."
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.multiline]}
            value={description}
            onChangeText={setDescription}
            placeholder="Describe the event"
            multiline
            numberOfLines={4}
          />
        </View>

        <Button
          label={submitting ? 'Submitting...' : 'Create Event'}
          onPress={handleSubmit}
          disabled={!isValid || submitting}
          style={styles.submitButton}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    color: '#0f172a',
  },
  field: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    color: '#64748b',
  },
  input: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#f1f5f9',
    fontSize: 16,
    color: '#0f172a',
  },
  multiline: {
    height: 100,
    textAlignVertical: 'top',
  },
  inlineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inlineField: {
    flex: 1,
  },
  submitButton: {
    marginTop: 16,
  },
});

export default AddEventScreen;


