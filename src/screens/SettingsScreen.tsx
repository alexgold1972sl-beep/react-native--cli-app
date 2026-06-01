import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚙️ Settings</Text>
      <Text style={styles.subtitle}>App preferences</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#1a1a2e', justifyContent: 'center', alignItems: 'center'},
  title: {fontSize: 28, fontWeight: '800', color: '#fff', marginBottom: 8},
  subtitle: {fontSize: 16, color: '#888'},
});