import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ProfileInfoProps {
  label: string;
  value?: string;
}

const ProfileInfo = ({ label, value }: ProfileInfoProps) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value ?? '--'}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e2e8f0',
  },
  label: {
    fontSize: 13,
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  value: {
    fontSize: 16,
    color: '#0f172a',
    marginTop: 4,
  },
});

export default ProfileInfo;

