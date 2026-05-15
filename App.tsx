import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from 'react-native';
import CalorieCard from './src/components/CalorieCard';
import FoodItem from './src/components/FoodItem';
import AddMealModal from './src/components/AddMealModal';
import BiometricLock from './src/components/BiometricLock';
import {FoodItem as FoodItemType} from './src/types';
import BootSplash from 'react-native-bootsplash';

export default function App() {
  const [foods, setFoods] = useState<FoodItemType[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLocked, setIsLocked] = useState(true);

  useEffect(() => {
    BootSplash.hide({fade: true});
  }, []);

  const totalCalories = foods.reduce((sum, f) => sum + f.calories, 0);

  const addFood = (name: string, calories: number) => {
    setFoods([...foods, {id: Date.now().toString(), name, calories}]);
    setModalVisible(false);
  };

  const removeFood = (id: string) => {
    setFoods(foods.filter(f => f.id !== id));
  };

  if (isLocked) {
    return <BiometricLock onUnlock={() => setIsLocked(false)} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Calorie Tracker</Text>
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