import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {FoodItem as FoodItemType} from '../types';

type Props = {
  item: FoodItemType;
  onDelete: (id: string) => void;
};

export default function FoodItem({item, onDelete}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.calories}>{item.calories} kcal</Text>
      </View>
      <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.deleteBtn}>
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16213e',
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
  },
  info: {flex: 1},
  name: {color: '#fff', fontSize: 16, fontWeight: '600'},
  calories: {color: '#888', fontSize: 13, marginTop: 2},
  deleteBtn: {padding: 6},
  deleteText: {color: '#F44336', fontSize: 16},
});