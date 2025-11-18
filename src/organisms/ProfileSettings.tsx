import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

import Button from '../atoms/Button';

interface ProfileSettingsProps {
  isRTL: boolean;
  languageLabel: string;
  onToggleLanguage: () => void;
  onLogout: () => void;
  biometricsEnabled: boolean;
  onToggleBiometrics: () => void;
}

const ProfileSettings = ({
  isRTL,
  languageLabel,
  onToggleLanguage,
  onLogout,
  biometricsEnabled,
  onToggleBiometrics,
}: ProfileSettingsProps) => (
  <View style={styles.container}>
    <View style={styles.row}>
      <Text style={styles.label}>{languageLabel}</Text>
      <Switch value={isRTL} onValueChange={onToggleLanguage} />
    </View>

    <View style={styles.row}>
      <Text style={styles.label}>Biometrics</Text>
      <Switch value={biometricsEnabled} onValueChange={onToggleBiometrics} />
    </View>

    <Button label="Logout" onPress={onLogout} style={styles.logout} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e2e8f0',
  },
  label: {
    fontSize: 16,
    color: '#0f172a',
  },
  logout: {
    marginTop: 24,
  },
});

export default ProfileSettings;

