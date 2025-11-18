import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';

const Card = ({ style, ...rest }: ViewProps) => (
  <View style={[styles.card, style]} {...rest} />
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 12,
  },
});

export default Card;

