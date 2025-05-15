import React, {useEffect, useState} from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {getItem, setItem} from './2.AsyncStorage.Service';

const STORAGE_KEY = 'userName';

const AsyncStorageExample2: React.FC = () => {
  const [userName, setUserName] = useState<string>('');

  // Load saved name on mount
  useEffect(() => {
    (async () => {
      try {
        const storedName = await getItem<string>(STORAGE_KEY);
        if (storedName) {
          setUserName(storedName);
        }
      } catch (error) {
        console.error('Failed to load username:', error);
        Alert.alert('Error', 'Unable to load saved username.');
      }
    })();
  }, []);

  // Save name when changed
  const handleNameChange = async (name: string) => {
    setUserName(name);
    try {
      await setItem(STORAGE_KEY, name);
    } catch (error) {
      console.error('Failed to save username:', error);
      Alert.alert('Error', 'Unable to save username.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ios: 'padding', android: undefined})}>
      <Text style={styles.label}>Your Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        placeholderTextColor="#999"
        value={userName}
        onChangeText={handleNameChange}
        autoCapitalize="words"
        returnKeyType="done"
      />
    </KeyboardAvoidingView>
  );
};

export default AsyncStorageExample2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fafafa',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 14,
    borderRadius: 8,
    fontSize: 16,
    color: '#000',
  },
});
