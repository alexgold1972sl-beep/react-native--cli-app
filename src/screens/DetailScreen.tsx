import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function DetailScreen({navigation}: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Details</Text>
      <Text style={styles.subtitle}>Your meal breakdown</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#1a1a2e', justifyContent: 'center', alignItems: 'center'},
  title: {fontSize: 28, fontWeight: '800', color: '#fff', marginBottom: 8},
  subtitle: {fontSize: 16, color: '#888', marginBottom: 32},
  button: {backgroundColor: '#e94560', borderRadius: 12, paddingHorizontal: 32, paddingVertical: 14},
  buttonText: {color: '#fff', fontSize: 16, fontWeight: '700'},
});