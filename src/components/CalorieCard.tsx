import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {DAILY_GOAL} from '../types';

type Props = {
  totalCalories: number;
};

export default function CalorieCard({totalCalories}: Props) {
  const progress = Math.min(totalCalories / DAILY_GOAL, 1);
  const remaining = DAILY_GOAL - totalCalories;
  const progressColor =
    progress < 0.6 ? '#4CAF50' : progress < 0.9 ? '#FF9800' : '#F44336';

  return (
    <View style={styles.card}>
      <View style={styles.calorieRow}>
        <View style={styles.block}>
          <Text style={styles.number}>{totalCalories}</Text>
          <Text style={styles.label}>Eaten</Text>
        </View>
        <View style={styles.block}>
          <Text style={[styles.number, {color: remaining < 0 ? '#F44336' : '#4CAF50'}]}>
            {Math.abs(remaining)}
          </Text>
          <Text style={styles.label}>{remaining < 0 ? 'Over' : 'Remaining'}</Text>
        </View>
        <View style={styles.block}>
          <Text style={styles.number}>{DAILY_GOAL}</Text>
          <Text style={styles.label}>Goal</Text>
        </View>
      </View>
      <View style={styles.progressBg}>
        <View style={[styles.progressFill, {width: `${progress * 100}%`, backgroundColor: progressColor}]} />
      </View>
      <Text style={styles.progressText}>{Math.round(progress * 100)}% of daily goal</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {margin: 16, backgroundColor: '#16213e', borderRadius: 20, padding: 20},
  calorieRow: {flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20},
  block: {alignItems: 'center'},
  number: {fontSize: 24, fontWeight: '700', color: '#fff'},
  label: {fontSize: 12, color: '#888', marginTop: 4},
  progressBg: {height: 10, backgroundColor: '#0f3460', borderRadius: 10, overflow: 'hidden'},
  progressFill: {height: '100%', borderRadius: 10},
  progressText: {textAlign: 'center', color: '#888', fontSize: 12, marginTop: 8},
});
