import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
  onAdd: (name: string, calories: number) => void;
};

export default function AddMealModal({visible, onClose, onAdd}: Props) {
  const [foodName, setFoodName] = useState('');
  const [foodCalories, setFoodCalories] = useState('');

  const handleAdd = () => {
    if (!foodName || !foodCalories) return;
    onAdd(foodName, Number(foodCalories));
    setFoodName('');
    setFoodCalories('');
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>Add Meal</Text>
          <TextInput
            style={styles.input}
            placeholder="Food name"
            placeholderTextColor="#888"
            value={foodName}
            onChangeText={setFoodName}
          />
          <TextInput
            style={styles.input}
            placeholder="Calories"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={foodCalories}
            onChangeText={setFoodCalories}
          />
          <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
            <Text style={styles.addBtnText}>Add Meal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.6)'},
  content: {
    backgroundColor: '#16213e',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  title: {color: '#fff', fontSize: 22, fontWeight: '700', marginBottom: 20},
  input: {
    backgroundColor: '#0f3460',
    color: '#fff',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 12,
  },
  addBtn: {backgroundColor: '#e94560', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 4},
  addBtnText: {color: '#fff', fontSize: 16, fontWeight: '700'},
  cancelBtn: {padding: 16, alignItems: 'center'},
  cancelBtnText: {color: '#888', fontSize: 16},
});