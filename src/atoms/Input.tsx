import React, { forwardRef } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

const Input = forwardRef<TextInput, InputProps>(
  ({ label, error, style, ...rest }, ref) => (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        ref={ref}
        style={[styles.input, error && styles.inputError, style]}
        placeholderTextColor="#94a3b8"
        {...rest}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  ),
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 12,
  },
  label: {
    marginBottom: 6,
    color: '#0f172a',
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5f5',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    fontSize: 16,
    color: '#0f172a',
  },
  inputError: {
    borderColor: '#f87171',
  },
  error: {
    marginTop: 4,
    color: '#ef4444',
    fontSize: 12,
  },
});

export default Input;

