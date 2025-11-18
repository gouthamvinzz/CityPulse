import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useAppSelector } from '../../hooks/useRedux';
import { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export const SplashScreen = ({ navigation }: Props) => {
  const { user } = useAppSelector(state => state.auth);

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace(user ? 'MainTabs' : 'AuthStack');
    }, 400);
    return () => clearTimeout(timeout);
  }, [navigation, user]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#2563eb" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f172a',
  },
});

