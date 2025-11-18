import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const FullScreenLoader = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#2563eb" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FullScreenLoader;

