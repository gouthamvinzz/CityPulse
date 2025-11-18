import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

const CPText = ({ style, ...rest }: TextProps) => (
  <Text {...rest} style={[styles.text, style]} />
);

const styles = StyleSheet.create({
  text: {
    color: '#0f172a',
    fontSize: 16,
  },
});

export default CPText;

