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
import { AuthStackParamList } from '../../../navigation/types';

type SignUpNavigation = NativeStackNavigationProp<AuthStackParamList, 'SignUp'>;

const SignUpScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<SignUpNavigation>();
  const { signUp, status } = useAuth();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      await signUp({ name, phone, email: email.trim(), password });
      navigation
        .getParent()
        ?.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.content}>
        <Text style={styles.title}>{t('auth.sign_up')}</Text>
        <Input label={t('auth.name')} value={name} onChangeText={setName} />
        <Input
          label={t('auth.phone')}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <Input
          label={t('auth.email')}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
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
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.switchText}>
            {t('auth.have_account')} {t('auth.sign_in')}
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
});

export default SignUpScreen;

