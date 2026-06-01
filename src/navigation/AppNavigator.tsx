import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Text} from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import HistoryScreen from '../screens/HistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor: '#16213e', borderTopColor: '#0f3460'},
        tabBarActiveTintColor: '#e94560',
        tabBarInactiveTintColor: '#888',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{tabBarLabel: 'Home', tabBarIcon: ({color}) => <Text style={{color, fontSize: 20}}>🏠</Text>}}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{tabBarLabel: 'History', tabBarIcon: ({color}) => <Text style={{color, fontSize: 20}}>📅</Text>}}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{tabBarLabel: 'Settings', tabBarIcon: ({color}) => <Text style={{color, fontSize: 20}}>⚙️</Text>}}
      />
    </Tab.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {backgroundColor: '#16213e'},
        drawerActiveTintColor: '#e94560',
        drawerInactiveTintColor: '#888',
      }}>
      <Drawer.Screen name="Tabs" component={TabNavigator} options={{drawerLabel: 'Home'}} />
      <Drawer.Screen name="Settings" component={SettingsScreen} options={{drawerLabel: 'Settings'}} />
    </Drawer.Navigator>
  );
}

function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}