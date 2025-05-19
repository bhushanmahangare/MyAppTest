import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button, Platform } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';

const BiometricAuthScreen = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [biometricType, setBiometricType] = useState<string>('');

  const rnBiometrics = new ReactNativeBiometrics();

  const checkBiometricSupport = async () => {
    try {
      const { available, biometryType } = await rnBiometrics.isSensorAvailable();
      
      if (!available) {
        setError('Biometric authentication not available');
        return false;
      }

      setBiometricType(biometryType ?? '');
      return true;
    } catch (err) {
      setError('Error checking biometric support');
      return false;
    }
  };

  const authenticateUser = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const isSupported = await checkBiometricSupport();
      if (!isSupported) return;

      const promptMessage = biometricType === 'FaceID' 
        ? 'Authenticate with Face ID' 
        : 'Authenticate with fingerprint';

      const { success } = await rnBiometrics.simplePrompt({
        promptMessage,
        cancelButtonText: 'Cancel',
      });

      if (success) {
        setIsAuthenticated(true);
      } else {
        setError('Authentication failed');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(`Authentication error: ${err.message}`);
      } else {
        setError('Authentication error: Unknown error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Checking biometric capabilities...</Text>
      </View>
    );
  }

  if (isAuthenticated) {
    return (
      <View style={styles.container}>
        <Text style={styles.successText}>Authentication Successful!</Text>
        {/* Your main app content here */}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {error && <Text style={styles.errorText}>{error}</Text>}
      
      <Text style={styles.title}>
        {biometricType === 'FaceID' ? 'Face ID Required' : 'Fingerprint Required'}
      </Text>
      
      <Button
        title="Try Again"
        onPress={authenticateUser}
        color={Platform.OS === 'ios' ? '#007AFF' : '#3F51B5'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: '600',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6c757d',
  },
  successText: {
    fontSize: 24,
    color: 'green',
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default BiometricAuthScreen;