import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import Button from '../../../atoms/Button';
import Input from '../../../atoms/Input';
import { useAuth } from '../../../hooks/useAuth';
import { useBiometrics } from '../../../hooks/useBiometrics';
import { AuthStackParamList } from '../../../navigation/types';

type SignInNavigation = NativeStackNavigationProp<AuthStackParamList, 'SignIn'>;

const SignInScreen = () => {
  const navigation = useNavigation<SignInNavigation>();
  const { t } = useTranslation();
  const { signIn, status } = useAuth();
  const { isBiometricAvailable, promptBiometric } = useBiometrics();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      await signIn(email.trim(), password);
      navigation
        .getParent()
        ?.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  const handleBiometricLogin = async () => {
    const success = await promptBiometric(t('auth.biometric_prompt'));
    if (success) {
      if (email && password) {
        handleSubmit();
      } else {
        Alert.alert('Info', 'Enter your email and password once to save.');
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.content}>
        <Text style={styles.title}>{t('auth.sign_in')}</Text>
        <Input
          label={t('auth.email')}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input
          label={t('auth.password')}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button
          label={t('auth.continue')}
          onPress={handleSubmit}
          loading={status === 'loading'}
        />
        {isBiometricAvailable && (
          <TouchableOpacity
            style={styles.biometrics}
            onPress={handleBiometricLogin}>
            <Text style={styles.biometricsText}>
              {t('auth.use_biometrics')}
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.switchText}>
            {t('auth.no_account')} {t('auth.sign_up')}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  content: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 20,
    elevation: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
    color: '#0f172a',
  },
  switchText: {
    marginTop: 16,
    textAlign: 'center',
    color: '#2563eb',
  },
  biometrics: {
    alignItems: 'center',
    marginVertical: 16,
  },
  biometricsText: {
    color: '#2563eb',
    fontWeight: '600',
  },
});

export default SignInScreen;

