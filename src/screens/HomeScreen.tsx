import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import CalorieCard from '../components/CalorieCard';
import FoodItem from '../components/FoodItem';
import AddMealModal from '../components/AddMealModal';
import {FoodItem as FoodItemType} from '../types';

export default function HomeScreen({navigation}: any) {
  const [foods, setFoods] = useState<FoodItemType[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const totalCalories = foods.reduce((sum, f) => sum + f.calories, 0);

  const addFood = (name: string, calories: number) => {
    setFoods([...foods, {id: Date.now().toString(), name, calories}]);
    setModalVisible(false);
  };

  const removeFood = (id: string) => {
    setFoods(foods.filter(f => f.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Calorie Tracker</Text>
        </View>
        <Text style={styles.headerDate}>
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
      </View>

      <CalorieCard totalCalories={totalCalories} />

      <FlatList
        data={foods}
        keyExtractor={item => item.id}
        style={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🍽️</Text>
            <Text style={styles.emptyText}>No meals added yet</Text>
            <Text style={styles.emptySubtext}>Tap + to add your first meal</Text>
          </View>
        }
        renderItem={({item}) => (
          <FoodItem item={item} onDelete={removeFood} />
        )}
      />

      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <AddMealModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={addFood}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#1a1a2e'},
  header: {paddingTop: 50, paddingHorizontal: 24, paddingBottom: 16},
  headerRow: {flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 4},
  menuIcon: {fontSize: 24, color: '#fff'},
  headerTitle: {fontSize: 28, fontWeight: '800', color: '#fff'},
  headerDate: {fontSize: 14, color: '#888', marginTop: 4},
  list: {flex: 1, paddingHorizontal: 16},
  emptyContainer: {alignItems: 'center', marginTop: 60},
  emptyIcon: {fontSize: 48},
  emptyText: {color: '#fff', fontSize: 18, fontWeight: '600', marginTop: 12},
  emptySubtext: {color: '#888', fontSize: 14, marginTop: 4},
  fab: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e94560',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  fabText: {color: '#fff', fontSize: 32, lineHeight: 36},
});