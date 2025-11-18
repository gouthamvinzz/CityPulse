import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

interface SearchBarProps extends Pick<TextInputProps, 'value' | 'onChangeText' | 'placeholder'> {
  onSubmit?: () => void;
}

const SearchBar = ({ value, onChangeText, placeholder, onSubmit }: SearchBarProps) => (
  <View style={styles.container}>
    <Feather name="search" size={18} color="#64748b" />
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#94a3b8"
      value={value}
      onChangeText={onChangeText}
      returnKeyType="search"
      onSubmitEditing={onSubmit}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderWidth:0.3,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#0f172a',
  },
});

export default SearchBar;

