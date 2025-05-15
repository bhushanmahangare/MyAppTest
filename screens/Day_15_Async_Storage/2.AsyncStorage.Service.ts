// storageService.ts
// A utility service for interacting with AsyncStorage in a React Native application.

import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Save a string or an object to AsyncStorage.
 * @param key - Unique key to store the value.
 * @param value - Value to be stored. Can be string or object.
 */
export const setItem = async (key: string, value: any): Promise<void> => {
  try {
    const stringValue =
      typeof value === 'string' ? value : JSON.stringify(value);
    await AsyncStorage.setItem(key, stringValue);
  } catch (error) {
    console.error(`Error saving data for key "${key}":`, error);
    throw error;
  }
};

/**
 * Retrieve a string or object from AsyncStorage.
 * @param key - Key of the value to retrieve.
 * @returns The retrieved value, parsed if JSON, or null if not found.
 */
export const getItem = async <T = any>(key: string): Promise<T | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value != null) {
      try {
        return JSON.parse(value);
      } catch {
        return value as unknown as T;
      }
    }
    return null;
  } catch (error) {
    console.error(`Error retrieving data for key "${key}":`, error);
    throw error;
  }
};

/**
 * Remove a specific item from AsyncStorage.
 * @param key - Key of the item to be removed.
 */
export const removeItem = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item for key "${key}":`, error);
    throw error;
  }
};

/**
 * Clear all data from AsyncStorage.
 * Use with caution - this will remove everything stored.
 */
export const clearStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error);
    throw error;
  }
};

/**
 * Get all keys stored in AsyncStorage.
 * @returns Array of keys.
 */
export const getAllKeys = async (): Promise<string[]> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return [...keys]; // convert readonly string[] to mutable string[]
  } catch (error) {
    console.error('Error getting all keys from AsyncStorage:', error);
    throw error;
  }
};

/**
 * Multi-set key-value pairs in AsyncStorage.
 * @param items - Array of key-value pairs to set.
 */
export const multiSet = async (items: [string, any][]): Promise<void> => {
  try {
    const stringifiedItems: [string, string][] = items.map(
      ([key, value]): [string, string] => [
        key,
        typeof value === 'string' ? value : JSON.stringify(value),
      ],
    );
    await AsyncStorage.multiSet(stringifiedItems);
  } catch (error) {
    console.error('Error in multiSet:', error);
    throw error;
  }
};

/**
 * Multi-get values from AsyncStorage for given keys.
 * @param keys - Array of keys.
 * @returns Array of [key, parsed value]
 */
export const multiGet = async (keys: string[]): Promise<[string, any][]> => {
  try {
    const result = await AsyncStorage.multiGet(keys);
    return result.map(([key, value]) => {
      try {
        return [key, value != null ? JSON.parse(value) : null];
      } catch {
        return [key, value];
      }
    });
  } catch (error) {
    console.error('Error in multiGet:', error);
    throw error;
  }
};

/**
 * Multi-remove values from AsyncStorage.
 * @param keys - Array of keys to remove.
 */
export const multiRemove = async (keys: string[]): Promise<void> => {
  try {
    await AsyncStorage.multiRemove(keys);
  } catch (error) {
    console.error('Error in multiRemove:', error);
    throw error;
  }
};
