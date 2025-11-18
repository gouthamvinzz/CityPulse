import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import ProfileInfo from '../../molecules/ProfileInfo';
import ProfileSettings from '../../organisms/ProfileSettings';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../hooks/useLanguage';
import { useBiometrics } from '../../hooks/useBiometrics';
import { RootStackParamList } from '../../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const { currentLanguage, toggleLanguage, isRTL } = useLanguage();
  const { isBiometricAvailable } = useBiometrics();
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleBiometricsToggle = () => {
    if (!isBiometricAvailable) {
      Alert.alert('Unavailable', 'Biometric authentication is not enabled.');
      return;
    }
    setBiometricsEnabled(previous => !previous);
  };

  const handleLogout = async () => {
    await logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'AuthStack' }],
    });
  };

  const languageLabelText = `${t('profile.language_toggle')}: ${
    currentLanguage === 'en' ? t('common.english') : t('common.arabic')
  }`;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{t('profile.title')}</Text>
        <ProfileInfo label={t('auth.name')} value={user?.name} />
        <ProfileInfo label={t('auth.phone')} value={user?.phone} />
        <ProfileInfo label={t('auth.email')} value={user?.email} />
      </View>
      <ProfileSettings
        isRTL={isRTL}
        languageLabel={languageLabelText}
        onToggleLanguage={toggleLanguage}
        onLogout={handleLogout}
        biometricsEnabled={biometricsEnabled}
        onToggleBiometrics={handleBiometricsToggle}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#0f172a',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
});

export default ProfileScreen;

