import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';

type Props = {
  onUnlock: () => void;
};

export default function BiometricLock({onUnlock}: Props) {
  const [error, setError] = useState('');
  const rnBiometrics = new ReactNativeBiometrics();

  const authenticate = async () => {
    try {
      const {available} = await rnBiometrics.isSensorAvailable();
      if (!available) {
        setError('Biometrics not available on this device');
        return;
      }
      const {success} = await rnBiometrics.simplePrompt({
        promptMessage: 'Confirm your identity',
        cancelButtonText: 'Cancel',
      });
      if (success) {
        onUnlock();
      } else {
        setError('Authentication failed');
      }
    } catch (e) {
      setError('Authentication cancelled');
    }
  };

  useEffect(() => {
    authenticate();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🔒</Text>
      <Text style={styles.title}>Calorie Tracker</Text>
      <Text style={styles.subtitle}>Authenticate to continue</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={authenticate}>
        <Text style={styles.buttonText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#1a1a2e', justifyContent: 'center', alignItems: 'center'},
  icon: {fontSize: 64, marginBottom: 24},
  title: {fontSize: 28, fontWeight: '800', color: '#fff', marginBottom: 8},
  subtitle: {fontSize: 16, color: '#888', marginBottom: 32},
  error: {color: '#e94560', marginBottom: 16, fontSize: 14},
  button: {backgroundColor: '#e94560', borderRadius: 12, paddingHorizontal: 32, paddingVertical: 14},
  buttonText: {color: '#fff', fontSize: 16, fontWeight: '700'},
});